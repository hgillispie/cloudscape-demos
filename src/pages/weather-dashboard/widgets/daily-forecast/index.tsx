// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import Spinner from '@cloudscape-design/components/spinner';
import Table from '@cloudscape-design/components/table';

import { DailyForecast, fetchWeatherData, getWeatherDescription } from '../../services/weather-api';
import { WidgetConfig } from '../interfaces';

interface DailyForecastRow {
  date: string;
  conditions: string;
  high: number;
  low: number;
  precipitation: number;
}

function DailyForecastHeader() {
  return (
    <Header variant="h2" description="7-day weather outlook">
      Daily Forecast
    </Header>
  );
}

function DailyForecastContent() {
  const [dailyData, setDailyData] = useState<DailyForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();
        setDailyData(data.daily);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
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

  if (!dailyData) {
    return null;
  }

  const tableData: DailyForecastRow[] = dailyData.time.map((time, index) => {
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return {
      date: date.toLocaleDateString('en-US', options),
      conditions: getWeatherDescription(dailyData.weatherCode[index]),
      high: Math.round(dailyData.temperatureMax[index]),
      low: Math.round(dailyData.temperatureMin[index]),
      precipitation: dailyData.precipitationSum[index],
    };
  });

  return (
    <Table
      columnDefinitions={[
        {
          id: 'date',
          header: 'Date',
          cell: item => item.date,
          sortingField: 'date',
        },
        {
          id: 'conditions',
          header: 'Conditions',
          cell: item => item.conditions,
        },
        {
          id: 'high',
          header: 'High',
          cell: item => `${item.high}°F`,
        },
        {
          id: 'low',
          header: 'Low',
          cell: item => `${item.low}°F`,
        },
        {
          id: 'precipitation',
          header: 'Precipitation',
          cell: item => `${item.precipitation.toFixed(2)}"`,
        },
      ]}
      items={tableData}
      variant="embedded"
      stickyHeader={true}
    />
  );
}

export const dailyForecast: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2 },
  data: {
    icon: 'table',
    title: 'Daily Forecast',
    description: '7-day weather outlook',
    header: DailyForecastHeader,
    content: DailyForecastContent,
    staticMinHeight: 400,
  },
};
