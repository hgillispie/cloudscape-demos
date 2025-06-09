// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';

import { CurrentWeather, WeatherLocation } from '../types';
import { getWeatherDescription, formatTemperature, getWindDirection, formatTime } from '../utils/weather-api';

interface WeatherCardProps {
  location: WeatherLocation;
  weather: CurrentWeather;
  temperatureUnit: 'celsius' | 'fahrenheit';
  onTemperatureUnitChange: (unit: 'celsius' | 'fahrenheit') => void;
}

export function WeatherCard({ location, weather, temperatureUnit, onTemperatureUnitChange }: WeatherCardProps) {
  const weatherInfo = getWeatherDescription(weather.weatherCode);
  const windDirection = getWindDirection(weather.windDirection);
  const lastUpdated = formatTime(weather.time);

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <ButtonDropdown
              items={[
                {
                  id: 'celsius',
                  text: 'Celsius (°C)',
                  disabled: temperatureUnit === 'celsius',
                },
                {
                  id: 'fahrenheit',
                  text: 'Fahrenheit (°F)',
                  disabled: temperatureUnit === 'fahrenheit',
                },
              ]}
              onItemClick={({ detail }) => onTemperatureUnitChange(detail.id as 'celsius' | 'fahrenheit')}
              variant="icon"
              ariaLabel="Temperature unit"
            >
              {temperatureUnit === 'celsius' ? '°C' : '°F'}
            </ButtonDropdown>
          }
        >
          Current Weather
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
          <SpaceBetween size="m">
            <Box>
              <Box variant="h3" margin={{ bottom: 'xs' }}>
                {location.name}
              </Box>
              <Box variant="small" color="text-status-subdued">
                {location.admin1 && `${location.admin1}, `}
                {location.country}
              </Box>
            </Box>

            <div style={{ textAlign: 'center' }}>
              <Box fontSize="display-l" fontWeight="light">
                {weatherInfo.icon}
              </Box>
              <Box variant="h1" margin={{ vertical: 'xs' }}>
                {formatTemperature(weather.temperature, temperatureUnit)}
              </Box>
              <Box variant="h4" color="text-status-subdued">
                {weatherInfo.description}
              </Box>
            </div>
          </SpaceBetween>

          <SpaceBetween size="m">
            <KeyValuePairs
              columns={1}
              items={[
                {
                  label: 'Humidity',
                  value: `${weather.humidity}%`,
                },
                {
                  label: 'Wind',
                  value: `${weather.windSpeed} km/h ${windDirection}`,
                },
                {
                  label: 'Pressure',
                  value: `${weather.pressure} hPa`,
                },
                {
                  label: 'Visibility',
                  value: `${weather.visibility} km`,
                },
              ]}
            />

            <Box variant="small" color="text-status-subdued" textAlign="right">
              Last updated: {lastUpdated}
            </Box>
          </SpaceBetween>
        </Grid>
      </SpaceBetween>
    </Container>
  );
}
