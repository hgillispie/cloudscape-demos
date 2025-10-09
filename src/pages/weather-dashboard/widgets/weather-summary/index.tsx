// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Spinner from '@cloudscape-design/components/spinner';

import { fetchWeatherData } from '../../services/weather-api';
import { WidgetConfig } from '../interfaces';

function WeatherSummaryHeader() {
  return (
    <Header variant="h2" description="Weather overview for Seattle, WA">
      Location Summary
    </Header>
  );
}

function WeatherSummaryContent() {
  const [summaryData, setSummaryData] = useState<{
    location: string;
    todayHigh: number;
    todayLow: number;
    avgPrecipitation: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();

        const avgPrecipitation =
          data.daily.precipitationSum.reduce((sum, val) => sum + val, 0) / data.daily.precipitationSum.length;

        setSummaryData({
          location: 'Seattle, WA',
          todayHigh: Math.round(data.daily.temperatureMax[0]),
          todayLow: Math.round(data.daily.temperatureMin[0]),
          avgPrecipitation,
        });
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

  if (!summaryData) {
    return null;
  }

  return (
    <KeyValuePairs
      columns={2}
      items={[
        {
          label: 'Location',
          value: summaryData.location,
        },
        {
          label: "Today's High",
          value: `${summaryData.todayHigh}°F`,
        },
        {
          label: "Today's Low",
          value: `${summaryData.todayLow}°F`,
        },
        {
          label: 'Avg 7-Day Precipitation',
          value: `${summaryData.avgPrecipitation.toFixed(2)}"`,
        },
      ]}
    />
  );
}

export const weatherSummary: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'keyValuePairs',
    title: 'Weather Summary',
    description: 'Weather overview',
    header: WeatherSummaryHeader,
    content: WeatherSummaryContent,
    staticMinHeight: 300,
  },
};
