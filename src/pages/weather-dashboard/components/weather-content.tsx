// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Alert from '@cloudscape-design/components/alert';
import Spinner from '@cloudscape-design/components/spinner';

import { CurrentWeatherCard } from './current-weather-card';
import { ForecastCard } from './forecast-card';
import { TemperatureChartCard } from './temperature-chart-card';
import { WeatherData, fetchWeatherData } from '../utils/weather-api';

interface WeatherContentProps {
  latitude: number;
  longitude: number;
  locationName: string;
  refreshKey: number;
}

export function WeatherContent({ latitude, longitude, locationName, refreshKey }: WeatherContentProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWeatherData(latitude, longitude);
        if (!cancelled) {
          setWeatherData(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWeatherData();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, refreshKey]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" header="Failed to load weather data">
        {error}
      </Alert>
    );
  }

  if (!weatherData) {
    return (
      <Alert type="info" header="No weather data available">
        Please try again later.
      </Alert>
    );
  }

  return (
    <SpaceBetween size="l">
      <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
        <CurrentWeatherCard data={weatherData.current} locationName={locationName} />
        <ForecastCard dailyForecasts={weatherData.daily} />
      </Grid>
      <TemperatureChartCard hourlyData={weatherData.hourly} />
    </SpaceBetween>
  );
}
