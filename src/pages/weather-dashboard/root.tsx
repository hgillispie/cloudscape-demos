// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import Table from '@cloudscape-design/components/table';
import Alert from '@cloudscape-design/components/alert';

import { Breadcrumbs, Navigation, Notifications } from '../commons/common-components';
import { CustomAppLayout } from '../commons/common-components';

import '../../styles/base.scss';

interface GeoResult {
  id: number;
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
}

interface ForecastDayItem {
  date: string;
  min: number;
  max: number;
  precip: number;
  code: number;
}

const unitOptions = [
  { label: 'Celsius', value: 'celsius' },
  { label: 'Fahrenheit', value: 'fahrenheit' },
] as const;

type UnitValue = (typeof unitOptions)[number]['value'];

function getWeatherCodeText(code: number): string {
  // Based on https://open-meteo.com/en/docs#weathervariables
  const mapping: Record<number, string> = {
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
  return mapping[code] ?? String(code);
}

export function App() {
  const [query, setQuery] = useState('Seattle');
  const [unit, setUnit] = useState<UnitValue>('celsius');

  const [location, setLocation] = useState<GeoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [forecast, setForecast] = useState<ForecastDayItem[]>([]);

  const unitSelect = useMemo(() => unitOptions.find(o => o.value === unit)!, [unit]);

  async function fetchWeather() {
    setError(null);
    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`,
      );
      if (!geoRes.ok) throw new Error('Failed to fetch location');
      const geoJson = await geoRes.json();
      const result = (geoJson?.results?.[0] ?? null) as
        | (GeoResult & { country_code?: string; admin1?: string })
        | null;
      if (!result) {
        setLocation(null);
        setForecast([]);
        throw new Error('No results found for the provided location');
      }

      const selected: GeoResult = {
        id: result.id,
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
      };
      setLocation(selected);

      const dailyParams = [
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'weathercode',
      ].join(',');

      const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast');
      forecastUrl.searchParams.set('latitude', String(selected.latitude));
      forecastUrl.searchParams.set('longitude', String(selected.longitude));
      forecastUrl.searchParams.set('daily', dailyParams);
      forecastUrl.searchParams.set('timezone', 'auto');
      forecastUrl.searchParams.set('temperature_unit', unit);

      const fcRes = await fetch(forecastUrl.toString());
      if (!fcRes.ok) throw new Error('Failed to fetch forecast');
      const fcJson = await fcRes.json();

      const times: string[] = fcJson?.daily?.time ?? [];
      const tmax: number[] = fcJson?.daily?.temperature_2m_max ?? [];
      const tmin: number[] = fcJson?.daily?.temperature_2m_min ?? [];
      const precip: number[] = fcJson?.daily?.precipitation_sum ?? [];
      const codes: number[] = fcJson?.daily?.weathercode ?? [];

      const items: ForecastDayItem[] = times.map((date, i) => ({
        date,
        max: Number(tmax[i]),
        min: Number(tmin[i]),
        precip: Number(precip[i]),
        code: Number(codes[i]),
      }));
      setForecast(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  const summary = useMemo(() => {
    if (!forecast?.length) return null;
    const today = forecast[0];
    return {
      title: location ? `${location.name}${location.country ? ', ' + location.country : ''}` : undefined,
      min: today.min,
      max: today.max,
      code: getWeatherCodeText(today.code),
    };
  }, [forecast, location]);

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="l">
          <Header variant="h1">Weather Dashboard</Header>

          <Container header={<Header variant="h2">Search</Header>}>
            <form
              onSubmit={e => {
                e.preventDefault();
                fetchWeather();
              }}
            >
              <SpaceBetween size="m">
                <Grid gridDefinition={[{ colspan: { default: 12, s: 7 } }, { colspan: { default: 12, s: 5 } }]}>
                  <FormField label="Location" description="City, state or country name.">
                    <Input
                      value={query}
                      placeholder="e.g., Seattle"
                      onChange={({ detail }) => setQuery(detail.value)}
                      ariaLabel="Location"
                    />
                  </FormField>
                  <FormField label="Units">
                    <Select
                      selectedOption={unitSelect}
                      onChange={({ detail }) => setUnit((detail.selectedOption.value as UnitValue) ?? 'celsius')}
                      options={unitOptions as unknown as { label: string; value: string }[]}
                      ariaLabel="Units"
                    />
                  </FormField>
                </Grid>
                <Box>
                  <Button variant="primary" loading={loading} iconAlign="right" iconName="search">Search</Button>
                </Box>
              </SpaceBetween>
            </form>
            {error && (
              <Box margin={{ top: 'm' }}>
                <Alert type="error" header="Could not load weather data">
                  {error}
                </Alert>
              </Box>
            )}
          </Container>

          {loading && (
            <Box textAlign="center" color="inherit">
              <Spinner />
            </Box>
          )}

          {!loading && summary && (
            <Container
              header={<Header variant="h2">Today</Header>}
              footer={
                location ? (
                  <Box variant="small" color="inherit">
                    Latitude {location.latitude.toFixed(2)}, Longitude {location.longitude.toFixed(2)}
                  </Box>
                ) : undefined
              }
            >
              <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                <Box>
                  <Box variant="h3">{summary.title}</Box>
                  <Box variant="p">{summary.code}</Box>
                </Box>
                <SpaceBetween size="s">
                  <Box variant="h3">High: {summary.max}°</Box>
                  <Box variant="h3">Low: {summary.min}°</Box>
                </SpaceBetween>
              </Grid>
            </Container>
          )}

          {!loading && forecast.length > 0 && (
            <Container header={<Header variant="h2" className="weather-section-title"><span className="forecast-title-emphasis">7-day forecast</span></Header>}>
              <Table
                trackBy="date"
                columnDefinitions={[
                  { id: 'date', header: 'Date', cell: i => i.date },
                  { id: 'min', header: 'Min', cell: i => `${i.min}°` },
                  { id: 'max', header: 'Max', cell: i => `${i.max}°` },
                  { id: 'precip', header: 'Precip (mm)', cell: i => i.precip.toFixed(1) },
                  { id: 'code', header: 'Conditions', cell: i => getWeatherCodeText(i.code) },
                ]}
                items={forecast}
                loadingText="Loading forecast"
                header={<Header counter={`(${forecast.length})`}>Daily forecast</Header>}
              />
            </Container>
          )}
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs items={[{ text: 'Weather Dashboard', href: '#/weather-dashboard' }]} />}
      navigation={<Navigation activeHref="#/weather-dashboard" />}
      toolsHide={true}
      notifications={<Notifications />}
    />
  );
}
