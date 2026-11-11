import { Button, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import actionButtonClasses from '../../styles/actionButton.module.css';
import homeClasses from '../HomePage/HomePage.module.css';
import {
  buildHalfHourChart,
  flightsAroundNow,
  withoutCodeshares,
  type ChartBucket,
  type AnalyzedFlight,
  type FlightRow,
} from './analyzeWawFlights';
import styles from './WawArrivals.module.css';

const FLIGHTS_API =
  import.meta.env.VITE_FLIGHTS_API_URL ?? 'https://damp-thunder-c7d5.2595092.workers.dev/';
const AERODATABOX_API =
  import.meta.env.VITE_FLIGHTS_AERODATABOX_URL ??
  'https://waw-aerodatabox.2595092.workers.dev/';

const STORAGE_KEY = 'waw-arrivals-analysis';
const AERODATABOX_STORAGE_KEY = 'waw-arrivals-aerodatabox';
const REFRESH_COOLDOWN_MS = 10 * 60 * 1000;

type Analysis = {
  buckets: ChartBucket[];
  nearby: AnalyzedFlight[];
  savedAt: Date;
};

type StoredAnalysis = {
  savedAt: string;
  buckets: { start: string; label: string; count: number }[];
  nearby: { at: string; timeLabel: string; flight: string; from: string }[];
};

function loadStoredAnalysis(key: string): Analysis | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredAnalysis;
    if (!data?.savedAt || !Array.isArray(data.buckets) || !Array.isArray(data.nearby)) {
      return null;
    }
    return {
      savedAt: new Date(data.savedAt),
      buckets: data.buckets.map((bucket) => ({
        start: new Date(bucket.start),
        label: bucket.label,
        count: bucket.count,
      })),
      nearby: data.nearby.map((flight) => ({
        at: new Date(flight.at),
        timeLabel: flight.timeLabel,
        flight: flight.flight,
        from: flight.from,
      })),
    };
  } catch {
    return null;
  }
}

function saveAnalysis(key: string, analysis: Analysis): void {
  const payload: StoredAnalysis = {
    savedAt: analysis.savedAt.toISOString(),
    buckets: analysis.buckets.map((bucket) => ({
      start: bucket.start.toISOString(),
      label: bucket.label,
      count: bucket.count,
    })),
    nearby: analysis.nearby.map((flight) => ({
      at: flight.at.toISOString(),
      timeLabel: flight.timeLabel,
      flight: flight.flight,
      from: flight.from,
    })),
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

function convertAeroDataBoxJsonToFlights(data: unknown): FlightRow[] {
  const arrivals = (data as { arrivals?: unknown })?.arrivals;
  if (!Array.isArray(arrivals)) return [];
  return arrivals.map((row) => {
    const f = row as {
      number?: string;
      status?: string;
      departure?: { airport?: { iata?: string } };
      arrival?: {
        scheduledTime?: { local?: string; utc?: string };
        revisedTime?: { local?: string; utc?: string };
        runwayTime?: { local?: string; utc?: string };
      };
    };
    const a = f.arrival;
    return {
      flight_iata: String(f.number ?? '').replace(/\s+/g, ''),
      dep_iata: f.departure?.airport?.iata,
      arr_time: a?.scheduledTime?.local ?? a?.scheduledTime?.utc,
      arr_estimated:
        a?.revisedTime?.local ??
        a?.revisedTime?.utc ??
        a?.runwayTime?.local ??
        a?.runwayTime?.utc,
      status: f.status,
      cs_flight_iata: null,
    };
  });
}

type ArrivalsBoardProps = {
  title: string;
  analysis: Analysis | null;
  loading: boolean;
  error: string | null;
  onLoad: () => void;
};

function ArrivalsBoard({ title, analysis, loading, error, onLoad }: ArrivalsBoardProps) {
  const { t, i18n } = useTranslation();
  const buckets =
    analysis && analysis.buckets.length > 0 ? analysis.buckets : buildHalfHourChart([]);
  const nearby = analysis?.nearby ?? [];
  const maxCount = Math.max(1, ...buckets.map((bucket) => bucket.count));

  return (
    <>
      <Title order={3} className={styles.panelTitle}>
        {title}
      </Title>

      {error && (
        <Text className={homeClasses.text} c="red">
          {t('tools.flightsError')}: {error}
        </Text>
      )}

      <div className={styles.chartHeader}>
        <Title order={3} className={styles.panelTitle}>
          {t('tools.chartTitle')}
        </Title>
        <div className={styles.chartHeaderActions}>
          {analysis && (
            <Text className={`${homeClasses.text} ${styles.savedAt}`}>
              {t('tools.flightsSavedAt', {
                time: analysis.savedAt.toLocaleString(i18n.language, {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }),
              })}
            </Text>
          )}
          <Button
            className={actionButtonClasses.actionButton}
            onClick={() => void onLoad()}
            disabled={loading}
          >
            {loading ? t('tools.flightsLoading') : t('tools.flightsRefresh')}
          </Button>
        </div>
      </div>
      <div className={styles.chart}>
        {buckets.map((bucket) => (
          <div key={bucket.start.toISOString()} className={styles.barWrap}>
            <span className={styles.barCount}>{bucket.count || ''}</span>
            <div
              className={styles.bar}
              style={{ height: `${bucket.count ? (bucket.count / maxCount) * 120 : 4}px` }}
            />
            <span className={styles.barLabel}>{bucket.label}</span>
          </div>
        ))}
      </div>

      {nearby.length > 0 && (
        <>
          <Title order={3} className={styles.panelTitle}>
            {t('tools.nearbyTitle')}
          </Title>
          <ul className={styles.list}>
            {nearby.map((flight) => (
              <li
                key={`${flight.flight}-${flight.at.toISOString()}`}
                className={styles.listItem}
              >
                <span className={styles.listTime}>{flight.timeLabel}</span>
                <span>{flight.flight}</span>
                <span>{flight.from}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export function WawArrivals() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(() =>
    loadStoredAnalysis(STORAGE_KEY),
  );

  const [aeroLoading, setAeroLoading] = useState(false);
  const [aeroError, setAeroError] = useState<string | null>(null);
  const [aeroAnalysis, setAeroAnalysis] = useState<Analysis | null>(() =>
    loadStoredAnalysis(AERODATABOX_STORAGE_KEY),
  );

  const load = async () => {
    if (analysis && Date.now() - analysis.savedAt.getTime() < REFRESH_COOLDOWN_MS) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(FLIGHTS_API);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : data.response;
      if (!Array.isArray(list)) {
        throw new Error('Unexpected response');
      }

      const flights = withoutCodeshares(list as FlightRow[]);
      const now = new Date();
      const next: Analysis = {
        buckets: buildHalfHourChart(flights, now),
        nearby: flightsAroundNow(flights, now),
        savedAt: now,
      };
      saveAnalysis(STORAGE_KEY, next);
      setAnalysis(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.flightsError'));
    } finally {
      setLoading(false);
    }
  };

  const loadAero = async () => {
    if (aeroAnalysis && Date.now() - aeroAnalysis.savedAt.getTime() < REFRESH_COOLDOWN_MS) {
      return;
    }

    setAeroLoading(true);
    setAeroError(null);

    try {
      const res = await fetch(AERODATABOX_API);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const flights = convertAeroDataBoxJsonToFlights(await res.json());
      const now = new Date();
      const next: Analysis = {
        buckets: buildHalfHourChart(flights, now),
        nearby: flightsAroundNow(flights, now),
        savedAt: now,
      };
      saveAnalysis(AERODATABOX_STORAGE_KEY, next);
      setAeroAnalysis(next);
    } catch (err) {
      setAeroError(err instanceof Error ? err.message : t('tools.flightsError'));
    } finally {
      setAeroLoading(false);
    }
  };

  return (
    <section className={homeClasses.frontendSection}>
      <Title order={2} className={homeClasses.sectionTitle}>
        {t('tools.airportTitle')}
      </Title>
      <Text className={homeClasses.text}>{t('tools.airportIntro')}</Text>
      <Text className={homeClasses.text}>{t('tools.airportWhy')}</Text>
      <Text className={homeClasses.text}>{t('tools.airportHow')}</Text>

      <ArrivalsBoard
        title="AeroDataBox"
        analysis={aeroAnalysis}
        loading={aeroLoading}
        error={aeroError}
        onLoad={loadAero}
      />

      <ArrivalsBoard
        title="AirLabs"
        analysis={analysis}
        loading={loading}
        error={error}
        onLoad={load}
      />
    </section>
  );
}
