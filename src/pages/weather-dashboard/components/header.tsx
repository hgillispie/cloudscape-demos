// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Icon from '@cloudscape-design/components/icon';
import { WeatherData, Location, getWeatherDescription, formatTemperature } from '../weather-service';

interface WeatherHeaderProps {
  location: Location;
  weatherData: WeatherData | null;
  actions?: React.ReactNode;
}

export function WeatherHeader({ location, weatherData, actions }: WeatherHeaderProps) {
  const currentWeather = weatherData?.current;
  
  return (
    <Header
      variant="h1"
      actions={actions}
      description={
        currentWeather ? (
          <SpaceBetween direction="horizontal" size="m">
            <Box>
              <Icon name="location" /> {location.name}
            </Box>
            <Box>
              <strong>{formatTemperature(currentWeather.temperature)}</strong>
            </Box>
            <Box>
              {getWeatherDescription(currentWeather.weatherCode)}
            </Box>
            <Box>
              Feels like {formatTemperature(currentWeather.apparentTemperature)}
            </Box>
          </SpaceBetween>
        ) : (
          `Weather dashboard for ${location.name}`
        )
      }
    >
      Weather Dashboard
    </Header>
  );
}
