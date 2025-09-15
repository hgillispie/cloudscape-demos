// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useCallback, useMemo, useState } from 'react';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Table from '@cloudscape-design/components/table';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Link from '@cloudscape-design/components/link';

type GeoResult = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

type ForecastResponse = {
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum?: number[];
  };
  current_weather?: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
  timezone?: string;
};

const weatherCodeMap: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

function formatLocation(r: GeoResult) {
  return [r.name, r.admin1, r.country].filter(Boolean).join(', ');
}

export function WeatherContent() {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<GeoResult[]>([]);
  const [selected, setSelected] = useState<SelectProps.Option | null>(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const options: SelectProps.Options = useMemo(
    () =>
      locations.map(loc => ({
        label: formatLocation(loc),
        value: String(loc.id),
        description: `Lat ${loc.latitude.toFixed(2)}, Lon ${loc.longitude.toFixed(2)}`,
      })),
    [locations]
  );

  const selectedLocation = useMemo(() => {
    if (!selected) return undefined;
    const id = Number(selected.value);
    return locations.find(l => l.id === id);
  }, [selected, locations]);

  const searchLocations = useCallback(async () => {
    setError(null);
    setForecast(null);
    setLocations([]);
    setSelected(null);
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setError('Enter at least 2 characters to search.');
      return;
    }
    setLoading(true);
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        trimmed
      )}&count=10&language=en&format=json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch locations');
      const json = await res.json();
      const results: GeoResult[] = (json.results || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        country: r.country,
        admin1: r.admin1,
        latitude: r.latitude,
        longitude: r.longitude,
      }));
      setLocations(results);
      if (results.length === 1) {
        const only = results[0];
        setSelected({ label: formatLocation(only), value: String(only.id) });
      }
    } catch (e: any) {
      setError(e.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [query]);

  const fetchForecast = useCallback(async () => {
    if (!selectedLocation) return;
    setError(null);
    setLoading(true);
    try {
      const { latitude, longitude } = selectedLocation;
      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        timezone: 'auto',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
        current_weather: 'true',
      });
      const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data: ForecastResponse = await res.json();
      setForecast(data);
    } catch (e: any) {
      setError(e.message || 'Weather request failed');
    } finally {
      setLoading(false);
    }
  }, [selectedLocation]);

  const dailyItems = useMemo(() => {
    if (!forecast?.daily) return [] as Array<{ date: string; min: number; max: number; precip: number | undefined }>;
    const { time, temperature_2m_min, temperature_2m_max, precipitation_sum } = forecast.daily;
    return time.map((t, i) => ({
      date: t,
      min: temperature_2m_min[i],
      max: temperature_2m_max[i],
      precip: precipitation_sum ? precipitation_sum[i] : undefined,
    }));
  }, [forecast]);

  const summary = useMemo(() => {
    const cw = forecast?.current_weather;
    if (!cw) return null;
    return {
      temperature: cw.temperature,
      windspeed: cw.windspeed,
      code: cw.weathercode,
      description: weatherCodeMap[cw.weathercode] ?? 'Unknown',
      time: cw.time,
    };
  }, [forecast]);

  return (
    <SpaceBetween size="l">
      <Header variant="h1" description="Real-time weather powered by Open-Meteo">
        Weather Dashboard
      </Header>

      <Container header={<Header variant="h2">Search location</Header>}>
        <Grid gridDefinition={[{ colspan: { default: 12, m: 6, l: 4 } }, { colspan: { default: 12, m: 3, l: 2 } }, { colspan: { default: 12, m: 3, l: 2 } }]}>
          <FormField label="City or place name">
            <Input
              value={query}
              onChange={({ detail }) => setQuery(detail.value)}
              placeholder="e.g., Seattle, Berlin, Tokyo"
              onKeyDown={e => {
                if (e.detail.key === 'Enter') searchLocations();
              }}
            />
          </FormField>
          <FormField label="">
            <Button variant="primary" onClick={searchLocations} loading={loading}>
              Search
            </Button>
          </FormField>
          <FormField label="Select a location" stretch>
            <Select
              selectedOption={selected ?? undefined}
              onChange={({ detail }) => setSelected(detail.selectedOption)}
              options={options as SelectProps.Options}
              placeholder="Search to load locations"
              disabled={options.length === 0}
            />
          </FormField>
        </Grid>
        <Box margin={{ top: 's' }}>
          <Button onClick={fetchForecast} disabled={!selectedLocation} iconName="arrow-right">
            Load forecast
          </Button>
        </Box>
        {error && (
          <Box margin={{ top: 'm' }}>
            <StatusIndicator type="error">{error}</StatusIndicator>
          </Box>
        )}
      </Container>

      <Container header={<Header variant="h2">Current conditions</Header>}>
        {summary ? (
          <Grid gridDefinition={[{ colspan: { default: 12, s: 6, l: 3 } }, { colspan: { default: 12, s: 6, l: 3 } }, { colspan: { default: 12, s: 6, l: 3 } }, { colspan: { default: 12, s: 6, l: 3 } }]}>
            <Box>
              <Box variant="awsui-key-label">Temperature</Box>
              <Box variant="p">{summary.temperature} °C</Box>
            </Box>
            <Box>
              <Box variant="awsui-key-label">Condition</Box>
              <Box variant="p">{summary.description}</Box>
            </Box>
            <Box>
              <Box variant="awsui-key-label">Wind speed</Box>
              <Box variant="p">{summary.windspeed} km/h</Box>
            </Box>
            <Box>
              <Box variant="awsui-key-label">As of</Box>
              <Box variant="p">{new Date(summary.time).toLocaleString()}</Box>
            </Box>
          </Grid>
        ) : (
          <StatusIndicator type="stopped">No data loaded</StatusIndicator>
        )}
      </Container>

      <Container
        header={<Header variant="h2">7-day forecast</Header>}
        footer={
          <Box variant="p">
            Data from <Link href="https://open-meteo.com/" external>Open-Meteo</Link>
          </Box>
        }
      >
        <Table
          trackBy="date"
          items={dailyItems}
          loadingText="Loading forecast"
          columnDefinitions={[
            { id: 'date', header: 'Date', cell: (item: any) => new Date(item.date).toLocaleDateString() },
            { id: 'min', header: 'Min (°C)', cell: (item: any) => `${item.min.toFixed(1)}` },
            { id: 'max', header: 'Max (°C)', cell: (item: any) => `${item.max.toFixed(1)}` },
            { id: 'precip', header: 'Precip (mm)', cell: (item: any) => (item.precip ?? 0).toFixed(1) },
          ]}
          empty={<Box variant="p">Search and select a location, then load the forecast.</Box>}
          header={<Header counter={dailyItems.length ? `(${dailyItems.length})` : undefined}>Daily forecast</Header>}
        />
      </Container>
    </SpaceBetween>
  );
}
