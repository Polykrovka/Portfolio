export type FlightRow = {
  flight_iata?: string;
  dep_iata?: string;
  arr_time?: string;
  arr_estimated?: string;
  status?: string;
  cs_flight_iata?: string | null;
};

/** Keep operating flights only — drop codeshare marketing duplicates. */
export function withoutCodeshares(flights: FlightRow[]): FlightRow[] {
  return flights.filter((flight) => !flight.cs_flight_iata);
}

export type ChartBucket = {
  start: Date;
  label: string;
  count: number;
};

export type AnalyzedFlight = {
  at: Date;
  timeLabel: string;
  flight: string;
  from: string;
};

const HALF_HOUR_MS = 30 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const CHART_FORWARD_MS = 6 * HOUR_MS;

export function parseFlightTime(value?: string): Date | null {
  if (!value || typeof value !== 'string') {
    return null;
  }
  const normalized = value.includes('T') ? value : value.replace(' ', 'T');
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function landingTime(flight: FlightRow): Date | null {
  return parseFlightTime(flight.arr_estimated) ?? parseFlightTime(flight.arr_time);
}

export function formatTime24(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function floorToHalfHour(date: Date): Date {
  const result = new Date(date);
  result.setSeconds(0, 0);
  result.setMinutes(result.getMinutes() < 30 ? 0 : 30);
  return result;
}

export function buildHalfHourChart(flights: FlightRow[], now = new Date()): ChartBucket[] {
  const times = flights
    .map((flight) => landingTime(flight))
    .filter((at): at is Date => at !== null)
    .sort((a, b) => a.getTime() - b.getTime());

  const rangeStart = floorToHalfHour(
    times.length
      ? new Date(Math.min(times[0].getTime(), now.getTime() - HOUR_MS))
      : new Date(now.getTime() - HOUR_MS),
  );
  const lastFlight = times.length ? times[times.length - 1].getTime() : now.getTime();
  const rangeEnd = new Date(
    Math.max(lastFlight + HALF_HOUR_MS, now.getTime() + CHART_FORWARD_MS),
  );
  const buckets: ChartBucket[] = [];

  for (let startMs = rangeStart.getTime(); startMs < rangeEnd.getTime(); startMs += HALF_HOUR_MS) {
    const start = new Date(startMs);
    buckets.push({
      start,
      label: formatTime24(start),
      count: 0,
    });
  }

  for (const at of times) {
    if (at < rangeStart || at >= rangeEnd) {
      continue;
    }
    const index = Math.floor((at.getTime() - rangeStart.getTime()) / HALF_HOUR_MS);
    if (index >= 0 && index < buckets.length) {
      buckets[index].count += 1;
    }
  }

  return buckets;
}

export function flightsAroundNow(flights: FlightRow[], now = new Date()): AnalyzedFlight[] {
  const from = now.getTime() - HALF_HOUR_MS;
  const to = now.getTime() + HOUR_MS;

  return flights
    .map((flight) => {
      const at = landingTime(flight);
      if (!at) {
        return null;
      }
      const time = at.getTime();
      if (time < from || time > to) {
        return null;
      }
      return {
        at,
        timeLabel: formatTime24(at),
        flight: flight.flight_iata ?? '—',
        from: flight.dep_iata ?? '—',
      };
    })
    .filter((row): row is AnalyzedFlight => row !== null)
    .sort((a, b) => a.at.getTime() - b.at.getTime());
}
