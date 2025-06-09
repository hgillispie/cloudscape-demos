// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { DailyForecast } from '../types';
import { getWeatherDescription, formatTemperature, formatDate } from '../utils/weather-api';

interface ForecastScrollProps {
  daily: DailyForecast;
  temperatureUnit: 'celsius' | 'fahrenheit';
}

export function ForecastScroll({ daily, temperatureUnit }: ForecastScrollProps) {
  const forecastItems = daily.time.map((time, index) => ({
    date: time,
    weather: getWeatherDescription(daily.weatherCode[index]),
    tempMax: daily.temperatureMax[index],
    tempMin: daily.temperatureMin[index],
    precipitation: daily.precipitationSum[index],
  }));

  return (
    <Container header={<Header variant="h2">7-Day Forecast</Header>}>
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: '8px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            minWidth: 'fit-content',
            paddingBottom: '4px',
          }}
        >
          {forecastItems.map((item, index) => (
            <div
              key={index}
              style={{
                minWidth: '120px',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: index === 0 ? '#e3f2fd' : '#f8fafc',
                border: index === 0 ? '2px solid #1976d2' : '1px solid #e2e8f0',
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              <SpaceBetween size="xs" alignItems="center">
                <Box
                  variant="small"
                  fontWeight={index === 0 ? 'bold' : 'normal'}
                  color={index === 0 ? 'inherit' : 'text-status-subdued'}
                >
                  {index === 0 ? 'Today' : formatDate(item.date)}
                </Box>

                <div style={{ fontSize: '2.5em', margin: '8px 0' }}>{item.weather.icon}</div>

                <Box variant="small" fontWeight="bold">
                  {item.weather.description}
                </Box>

                <SpaceBetween size="xxs" alignItems="center">
                  <Box variant="span" fontWeight="bold" fontSize="body-m">
                    {formatTemperature(item.tempMax, temperatureUnit)}
                  </Box>
                  <Box variant="span" color="text-status-subdued" fontSize="body-s">
                    {formatTemperature(item.tempMin, temperatureUnit)}
                  </Box>
                </SpaceBetween>

                {item.precipitation > 0 && (
                  <Box variant="small" color="text-status-info">
                    🌧️ {item.precipitation.toFixed(1)}mm
                  </Box>
                )}
              </SpaceBetween>
            </div>
          ))}
        </div>
      </div>

      <Box variant="small" color="text-status-subdued" textAlign="center" margin={{ top: 'xs' }}>
        Scroll horizontally to view more days
      </Box>

      <style>
        {`
          /* Custom scrollbar styles for webkit browsers */
          div::-webkit-scrollbar {
            height: 8px;
          }
          
          div::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }
          
          div::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          
          div::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>
    </Container>
  );
}
