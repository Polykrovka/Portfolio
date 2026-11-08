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

type Analysis = {
  buckets: ChartBucket[];
  nearby: AnalyzedFlight[];
};

export function WawArrivals() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

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
      setAnalysis({
        buckets: buildHalfHourChart(flights, now),
        nearby: flightsAroundNow(flights, now),
      });
    } catch (err) {
      setAnalysis(null);
      setError(err instanceof Error ? err.message : t('tools.flightsError'));
    } finally {
      setLoading(false);
    }
  };

  const maxCount = analysis
    ? Math.max(1, ...analysis.buckets.map((bucket) => bucket.count))
    : 1;

  return (
    <section className={homeClasses.frontendSection}>
      <Title order={2} className={homeClasses.sectionTitle}>
        {t('tools.airportTitle')}
      </Title>
      <Text className={homeClasses.text}>{t('tools.airportIntro')}</Text>
      <Text className={homeClasses.text}>{t('tools.airportWhy')}</Text>
      <Text className={homeClasses.text}>{t('tools.airportHow')}</Text>

      <Button
        className={actionButtonClasses.actionButton}
        onClick={() => void load()}
        disabled={loading}
        mt="md"
        mb="md"
      >
        {loading ? t('tools.flightsLoading') : t('tools.flightsFetch')}
      </Button>

      {error && (
        <Text className={homeClasses.text} c="red">
          {t('tools.flightsError')}: {error}
        </Text>
      )}

      {analysis && (
        <>
          <Title order={3} className={homeClasses.subtitle}>
            {t('tools.chartTitle')}
          </Title>
          <div className={styles.chart}>
            {analysis.buckets.map((bucket) => (
              <div key={bucket.start.toISOString()} className={styles.barWrap}>
                <span className={styles.barCount}>{bucket.count || ''}</span>
                <div
                  className={styles.bar}
                  style={{ height: `${Math.max(4, (bucket.count / maxCount) * 120)}px` }}
                />
                <span className={styles.barLabel}>{bucket.label}</span>
              </div>
            ))}
          </div>

          <Title order={3} className={homeClasses.subtitle}>
            {t('tools.nearbyTitle')}
          </Title>
          {analysis.nearby.length === 0 ? (
            <Text className={homeClasses.text}>{t('tools.nearbyEmpty')}</Text>
          ) : (
            <ul className={styles.list}>
              {analysis.nearby.map((flight) => (
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
          )}
        </>
      )}
    </section>
  );
}
