// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { DailyForecast, HourlyForecast } from '../types';
import {
  getWeatherDescription,
  formatTemperature,
  formatDate,
  formatTime,
  getWindDirection,
} from '../utils/weather-api';

interface ForecastTableProps {
  daily: DailyForecast;
  hourly: HourlyForecast;
  viewMode: 'daily' | 'hourly';
  onViewModeChange: (mode: 'daily' | 'hourly') => void;
  temperatureUnit: 'celsius' | 'fahrenheit';
}

export function ForecastTable({ daily, hourly, viewMode, onViewModeChange, temperatureUnit }: ForecastTableProps) {
  const dailyItems = daily.time.map((time, index) => ({
    id: `daily-${index}`,
    date: time,
    weather: getWeatherDescription(daily.weatherCode[index]),
    tempMax: daily.temperatureMax[index],
    tempMin: daily.temperatureMin[index],
    precipitation: daily.precipitationSum[index],
    windSpeed: daily.windSpeedMax[index],
    windDirection: getWindDirection(daily.windDirectionDominant[index]),
  }));

  const hourlyItems = hourly.time.map((time, index) => ({
    id: `hourly-${index}`,
    time: time,
    weather: getWeatherDescription(hourly.weatherCode[index]),
    temperature: hourly.temperature[index],
    humidity: hourly.humidity[index],
    precipitation: hourly.precipitation[index],
    windSpeed: hourly.windSpeed[index],
  }));

  const dailyColumnDefinitions = [
    {
      id: 'date',
      header: 'Date',
      cell: (item: (typeof dailyItems)[0]) => (
        <Box variant="span" fontWeight="bold">
          {formatDate(item.date)}
        </Box>
      ),
      minWidth: 120,
    },
    {
      id: 'weather',
      header: 'Weather',
      cell: (item: (typeof dailyItems)[0]) => (
        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
          <span style={{ fontSize: '1.5em' }}>{item.weather.icon}</span>
          <Box variant="span">{item.weather.description}</Box>
        </SpaceBetween>
      ),
      minWidth: 180,
    },
    {
      id: 'temperature',
      header: 'Temperature',
      cell: (item: (typeof dailyItems)[0]) => (
        <SpaceBetween direction="horizontal" size="xs">
          <Badge color="red">{formatTemperature(item.tempMax, temperatureUnit)}</Badge>
          <Badge color="blue">{formatTemperature(item.tempMin, temperatureUnit)}</Badge>
        </SpaceBetween>
      ),
      minWidth: 140,
    },
    {
      id: 'precipitation',
      header: 'Precipitation',
      cell: (item: (typeof dailyItems)[0]) => `${item.precipitation.toFixed(1)} mm`,
      minWidth: 120,
    },
    {
      id: 'wind',
      header: 'Wind',
      cell: (item: (typeof dailyItems)[0]) => `${item.windSpeed.toFixed(1)} km/h ${item.windDirection}`,
      minWidth: 120,
    },
  ];

  const hourlyColumnDefinitions = [
    {
      id: 'time',
      header: 'Time',
      cell: (item: (typeof hourlyItems)[0]) => (
        <Box variant="span" fontWeight="bold">
          {formatTime(item.time)}
        </Box>
      ),
      minWidth: 80,
    },
    {
      id: 'weather',
      header: 'Weather',
      cell: (item: (typeof hourlyItems)[0]) => (
        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
          <span style={{ fontSize: '1.2em' }}>{item.weather.icon}</span>
          <Box variant="span">{item.weather.description}</Box>
        </SpaceBetween>
      ),
      minWidth: 160,
    },
    {
      id: 'temperature',
      header: 'Temperature',
      cell: (item: (typeof hourlyItems)[0]) => formatTemperature(item.temperature, temperatureUnit),
      minWidth: 100,
    },
    {
      id: 'humidity',
      header: 'Humidity',
      cell: (item: (typeof hourlyItems)[0]) => `${item.humidity}%`,
      minWidth: 80,
    },
    {
      id: 'precipitation',
      header: 'Rain',
      cell: (item: (typeof hourlyItems)[0]) => `${item.precipitation.toFixed(1)} mm`,
      minWidth: 80,
    },
    {
      id: 'wind',
      header: 'Wind',
      cell: (item: (typeof hourlyItems)[0]) => `${item.windSpeed.toFixed(1)} km/h`,
      minWidth: 100,
    },
  ];

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Box variant="span" color="text-status-subdued">
                View:
              </Box>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: viewMode === 'daily' ? 'underline' : 'none',
                  fontWeight: viewMode === 'daily' ? 'bold' : 'normal',
                }}
                onClick={() => onViewModeChange('daily')}
              >
                7-Day
              </button>
              <Box variant="span" color="text-status-subdued">
                |
              </Box>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: viewMode === 'hourly' ? 'underline' : 'none',
                  fontWeight: viewMode === 'hourly' ? 'bold' : 'normal',
                }}
                onClick={() => onViewModeChange('hourly')}
              >
                24-Hour
              </button>
            </SpaceBetween>
          }
        >
          Weather Forecast
        </Header>
      }
    >
      <Table
        columnDefinitions={viewMode === 'daily' ? dailyColumnDefinitions : hourlyColumnDefinitions}
        items={viewMode === 'daily' ? dailyItems : hourlyItems}
        loadingText="Loading forecast..."
        trackBy="id"
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No forecast data available
            </Box>
          </Box>
        }
        stripedRows
      />
    </Container>
  );
}
