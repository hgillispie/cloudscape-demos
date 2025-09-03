// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { WeatherData } from '../services/weather-api';
import { WeatherApiService } from '../services/weather-api';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  locationName: string;
}

export function CurrentWeather({ weatherData, locationName }: CurrentWeatherProps) {
  const { current } = weatherData;
  
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString();
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <Container
      header={
        <Box variant="h2">
          Current Weather - {locationName}
        </Box>
      }
    >
      <ColumnLayout columns={4} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Temperature</Box>
          <Box fontSize="display-l" fontWeight="bold" color="text-status-info">
            {Math.round(current.temperature)}°F
          </Box>
          <StatusIndicator 
            type={WeatherApiService.getWeatherIcon(current.weatherCode) as any}
          >
            {WeatherApiService.getWeatherDescription(current.weatherCode)}
          </StatusIndicator>
        </div>

        <div>
          <Box variant="awsui-key-label">Humidity</Box>
          <Box fontSize="heading-l" fontWeight="bold">
            {current.humidity}%
          </Box>
        </div>

        <div>
          <Box variant="awsui-key-label">Wind</Box>
          <Box fontSize="heading-l" fontWeight="bold">
            {Math.round(current.windSpeed)} mph
          </Box>
          <Box variant="small" color="text-body-secondary">
            {getWindDirection(current.windDirection)} ({current.windDirection}°)
          </Box>
        </div>

        <div>
          <Box variant="awsui-key-label">Last Updated</Box>
          <Box fontSize="body-s">
            {formatTime(current.time)}
          </Box>
        </div>
      </ColumnLayout>
    </Container>
  );
}
