// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { WeatherData } from '../services/weather-api';
import { WeatherApiService } from '../services/weather-api';

interface HourlyForecastProps {
  weatherData: WeatherData;
}

interface HourlyData {
  time: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
}

export function HourlyForecast({ weatherData }: HourlyForecastProps) {
  // Show next 24 hours
  const hourlyData: HourlyData[] = weatherData.hourly.time
    .slice(0, 24)
    .map((time, index) => ({
      time,
      temperature: weatherData.hourly.temperature[index],
      humidity: weatherData.hourly.humidity[index],
      precipitation: weatherData.hourly.precipitation[index],
      windSpeed: weatherData.hourly.windSpeed[index],
      weatherCode: weatherData.hourly.weatherCode[index],
    }));

  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <Container header={<Box variant="h2">24-Hour Forecast</Box>}>
      <Table
        columnDefinitions={[
          {
            id: 'time',
            header: 'Time',
            cell: (item: HourlyData) => formatHour(item.time),
            sortingField: 'time',
            minWidth: 80,
          },
          {
            id: 'weather',
            header: 'Weather',
            cell: (item: HourlyData) => (
              <StatusIndicator 
                type={WeatherApiService.getWeatherIcon(item.weatherCode) as any}
              >
                {WeatherApiService.getWeatherDescription(item.weatherCode)}
              </StatusIndicator>
            ),
            minWidth: 160,
          },
          {
            id: 'temperature',
            header: 'Temperature',
            cell: (item: HourlyData) => `${Math.round(item.temperature)}°F`,
            sortingField: 'temperature',
            minWidth: 100,
          },
          {
            id: 'humidity',
            header: 'Humidity',
            cell: (item: HourlyData) => `${item.humidity}%`,
            sortingField: 'humidity',
            minWidth: 80,
          },
          {
            id: 'precipitation',
            header: 'Precipitation',
            cell: (item: HourlyData) => `${item.precipitation.toFixed(2)}"`,
            sortingField: 'precipitation',
            minWidth: 100,
          },
          {
            id: 'windSpeed',
            header: 'Wind Speed',
            cell: (item: HourlyData) => `${Math.round(item.windSpeed)} mph`,
            sortingField: 'windSpeed',
            minWidth: 100,
          },
        ]}
        items={hourlyData}
        loadingText="Loading forecast"
        sortingDisabled={false}
        trackBy="time"
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No hourly data available
            </Box>
          </Box>
        }
        variant="borderless"
      />
    </Container>
  );
}
