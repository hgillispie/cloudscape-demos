// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Header from '@cloudscape-design/components/header';
import Spinner from '@cloudscape-design/components/spinner';

import { fetchWeatherData, getWeatherDescription, CurrentWeather as CurrentWeatherType } from '../../services/weather-api';
import { WidgetConfig } from '../interfaces';

function CurrentWeatherHeader() {
  return (
    <Header variant="h2" description="Live weather conditions">
      Current Weather
    </Header>
  );
}

function CurrentWeatherContent() {
  const [weatherData, setWeatherData] = useState<CurrentWeatherType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();
        setWeatherData(data.current);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
    const interval = setInterval(loadWeather, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" padding="xxl">
        <Spinner size="large" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding="xxl" color="text-status-error">
        {error}
      </Box>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <ColumnLayout columns={2} variant="text-grid">
      <div>
        <Box variant="awsui-key-label">Temperature</Box>
        <Box variant="h1" fontSize="display-l">
          {Math.round(weatherData.temperature)}°F
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Conditions</Box>
        <Box fontSize="heading-l" padding={{ top: 's' }}>
          {getWeatherDescription(weatherData.weatherCode)}
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Humidity</Box>
        <Box fontSize="heading-l" padding={{ top: 's' }}>
          {weatherData.humidity}%
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Wind Speed</Box>
        <Box fontSize="heading-l" padding={{ top: 's' }}>
          {Math.round(weatherData.windSpeed)} mph
        </Box>
      </div>
    </ColumnLayout>
  );
}

export const currentWeather: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'statusPositive',
    title: 'Current Weather',
    description: 'Live weather conditions',
    header: CurrentWeatherHeader,
    content: CurrentWeatherContent,
    staticMinHeight: 300,
  },
};
