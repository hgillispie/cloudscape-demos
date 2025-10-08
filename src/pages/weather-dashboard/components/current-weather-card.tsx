// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { CurrentWeather } from '../utils/weather-api';
import { getWeatherDescription, getWeatherIcon } from '../utils/weather-api';

interface CurrentWeatherCardProps {
  data: CurrentWeather;
  locationName: string;
}

export function CurrentWeatherCard({ data, locationName }: CurrentWeatherCardProps) {
  const weatherDescription = getWeatherDescription(data.weatherCode);
  const weatherIcon = getWeatherIcon(data.weatherCode);

  return (
    <Container header={<Header variant="h2">Current Weather - {locationName}</Header>}>
      <SpaceBetween size="l">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', marginBottom: '10px' }}>{weatherIcon}</div>
          <Box variant="h1" fontSize="display-l" fontWeight="bold">
            {Math.round(data.temperature)}°F
          </Box>
          <Box variant="p" fontSize="heading-m" color="text-body-secondary">
            {weatherDescription}
          </Box>
        </div>

        <ColumnLayout columns={3} variant="text-grid">
          <div>
            <Box variant="awsui-key-label">Temperature</Box>
            <Box variant="awsui-value-large">{Math.round(data.temperature)}°F</Box>
          </div>
          <div>
            <Box variant="awsui-key-label">Humidity</Box>
            <Box variant="awsui-value-large">{data.humidity}%</Box>
          </div>
          <div>
            <Box variant="awsui-key-label">Wind Speed</Box>
            <Box variant="awsui-value-large">{Math.round(data.windSpeed)} mph</Box>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
}
