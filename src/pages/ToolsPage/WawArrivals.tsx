import { Button, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import actionButtonClasses from '../../styles/actionButton.module.css';
import homeClasses from '../HomePage/HomePage.module.css';

const FLIGHTS_API =
  import.meta.env.VITE_FLIGHTS_API_URL ?? 'https://damp-thunder-c7d5.2595092.workers.dev/';

type Flight = Record<string, unknown>;

export function WawArrivals() {
  const { t } = useTranslation();
  const [flights, setFlights] = useState<Flight[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

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

      setFlights(list as Flight[]);
      setResult(t('tools.flightsLoaded', { count: list.length }));
    } catch (err) {
      setFlights(null);
      setResult(null);
      setError(err instanceof Error ? err.message : t('tools.flightsError'));
    } finally {
      setLoading(false);
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
      {result && <Text className={homeClasses.text}>{result}</Text>}
    </section>
  );
}
