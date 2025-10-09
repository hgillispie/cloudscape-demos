// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Spinner from '@cloudscape-design/components/spinner';

import { fetchWeatherData, HourlyForecast } from '../../services/weather-api';
import { WidgetConfig } from '../interfaces';

function HourlyTemperatureHeader() {
  return (
    <Header variant="h2" description="24-hour temperature forecast">
      Hourly Temperature
    </Header>
  );
}

function HourlyTemperatureContent() {
  const [hourlyData, setHourlyData] = useState<HourlyForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();
        setHourlyData(data.hourly);
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

  if (!hourlyData) {
    return null;
  }

  const chartData = hourlyData.time.map((time, index) => {
    const date = new Date(time);
    const hour = date.getHours();
    return {
      x: date,
      y: hourlyData.temperature[index],
    };
  });

  return (
    <LineChart
      series={[
        {
          title: 'Temperature',
          type: 'line',
          data: chartData,
        },
      ]}
      xDomain={[new Date(hourlyData.time[0]), new Date(hourlyData.time[hourlyData.time.length - 1])]}
      yTitle="Temperature (°F)"
      xTitle="Time"
      ariaLabel="Hourly temperature forecast"
      height={300}
      xScaleType="time"
      i18nStrings={{
        filterLabel: 'Filter displayed data',
        filterPlaceholder: 'Filter data',
        filterSelectedAriaLabel: 'selected',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'line chart',
        xTickFormatter: (value: Date) => {
          const hours = value.getHours();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const displayHours = hours % 12 || 12;
          return `${displayHours}${ampm}`;
        },
        yTickFormatter: (value: number) => `${Math.round(value)}°F`,
      }}
    />
  );
}

export const hourlyTemperature: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2 },
  data: {
    icon: 'lineChart',
    title: 'Hourly Temperature',
    description: '24-hour temperature forecast',
    header: HourlyTemperatureHeader,
    content: HourlyTemperatureContent,
    staticMinHeight: 400,
  },
};
