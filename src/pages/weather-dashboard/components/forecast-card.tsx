// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { DailyForecast } from '../utils/weather-api';
import { getWeatherIcon } from '../utils/weather-api';

interface ForecastCardProps {
  dailyForecasts: DailyForecast[];
}

export function ForecastCard({ dailyForecasts }: ForecastCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <Container header={<Header variant="h2">7-Day Forecast</Header>}>
      <SpaceBetween size="s">
        {dailyForecasts.map((forecast, index) => (
          <div
            key={forecast.date}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: index < dailyForecasts.length - 1 ? '1px solid #e9ebed' : 'none',
            }}
          >
            <Box variant="span" fontSize="body-m" fontWeight="bold" style={{ minWidth: '120px' }}>
              {formatDate(forecast.date)}
            </Box>
            <Box variant="span" fontSize="heading-l" style={{ minWidth: '40px', textAlign: 'center' }}>
              {getWeatherIcon(forecast.weatherCode)}
            </Box>
            <Box variant="span" fontSize="body-m" style={{ minWidth: '100px', textAlign: 'right' }}>
              <span style={{ fontWeight: 'bold' }}>{Math.round(forecast.temperatureMax)}°</span>
              <span style={{ color: '#5f6b7a', marginLeft: '8px' }}>{Math.round(forecast.temperatureMin)}°</span>
            </Box>
          </div>
        ))}
      </SpaceBetween>
    </Container>
  );
}
