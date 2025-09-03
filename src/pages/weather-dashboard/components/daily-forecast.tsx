// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Cards from '@cloudscape-design/components/cards';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { WeatherData } from '../services/weather-api';
import { WeatherApiService } from '../services/weather-api';

interface DailyForecastProps {
  weatherData: WeatherData;
}

interface DailyData {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  windSpeedMax: number;
  weatherCode: number;
}

export function DailyForecast({ weatherData }: DailyForecastProps) {
  const dailyData: DailyData[] = weatherData.daily.time.map((time, index) => ({
    date: time,
    temperatureMax: weatherData.daily.temperatureMax[index],
    temperatureMin: weatherData.daily.temperatureMin[index],
    precipitation: weatherData.daily.precipitation[index],
    windSpeedMax: weatherData.daily.windSpeedMax[index],
    weatherCode: weatherData.daily.weatherCode[index],
  }));

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
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <Container header={<Box variant="h2">7-Day Forecast</Box>}>
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, n) => `select ${formatDate(n.date)}`,
          selectionGroupLabel: 'Daily forecast selection',
        }}
        cardDefinition={{
          header: (item: DailyData) => (
            <Box variant="h3">{formatDate(item.date)}</Box>
          ),
          sections: [
            {
              id: 'weather',
              content: (item: DailyData) => (
                <StatusIndicator 
                  type={WeatherApiService.getWeatherIcon(item.weatherCode) as any}
                >
                  {WeatherApiService.getWeatherDescription(item.weatherCode)}
                </StatusIndicator>
              ),
            },
            {
              id: 'temperature',
              content: (item: DailyData) => (
                <ColumnLayout columns={2} variant="text-grid">
                  <div>
                    <Box variant="awsui-key-label">High</Box>
                    <Box fontSize="heading-m" fontWeight="bold" color="text-status-error">
                      {Math.round(item.temperatureMax)}°F
                    </Box>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Low</Box>
                    <Box fontSize="heading-m" fontWeight="bold" color="text-status-info">
                      {Math.round(item.temperatureMin)}°F
                    </Box>
                  </div>
                </ColumnLayout>
              ),
            },
            {
              id: 'details',
              content: (item: DailyData) => (
                <ColumnLayout columns={2} variant="text-grid">
                  <div>
                    <Box variant="awsui-key-label">Precipitation</Box>
                    <Box>{item.precipitation.toFixed(2)}"</Box>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Max Wind</Box>
                    <Box>{Math.round(item.windSpeedMax)} mph</Box>
                  </div>
                </ColumnLayout>
              ),
            },
          ],
        }}
        cardsPerRow={[
          { cards: 1, minWidth: 0 },
          { cards: 2, minWidth: 600 },
          { cards: 3, minWidth: 900 },
          { cards: 4, minWidth: 1200 },
        ]}
        items={dailyData}
        loadingText="Loading daily forecast"
        trackBy="date"
        visibleSections={['weather', 'temperature', 'details']}
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No daily forecast available
            </Box>
          </Box>
        }
      />
    </Container>
  );
}
