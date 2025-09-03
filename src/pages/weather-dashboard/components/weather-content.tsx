// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';
import { CurrentWeather } from './current-weather';
import { HourlyForecast } from './hourly-forecast';
import { DailyForecast } from './daily-forecast';
import { WeatherApiService, WeatherData } from '../services/weather-api';

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface WeatherContentProps {
  location: Location;
}

export function WeatherContent({ location }: WeatherContentProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await WeatherApiService.getWeatherData(location);
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        statusIconAriaLabel="Error"
        type="error"
        header="Weather data unavailable"
        action={{
          children: 'Retry',
          onClick: () => window.location.reload(),
        }}
      >
        {error}
      </Alert>
    );
  }

  if (!weatherData) {
    return (
      <Alert statusIconAriaLabel="Warning" type="warning" header="No weather data">
        Weather data is not available for this location.
      </Alert>
    );
  }

  return (
    <SpaceBetween size="l">
      <CurrentWeather weatherData={weatherData} locationName={location.name} />
      <HourlyForecast weatherData={weatherData} />
      <DailyForecast weatherData={weatherData} />
    </SpaceBetween>
  );
}
