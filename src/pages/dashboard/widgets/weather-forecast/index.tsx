// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import LineChart from '@cloudscape-design/components/line-chart';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { barChartInstructions, commonChartProps, dateFormatter, lineChartInstructions } from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { currentWeather, precipitationSeries, temperatureSeries, weatherDomain, weeklyForecast } from './data';

function WeatherHeader() {
  return (
    <Header variant="h2" description="7-day weather forecast with current conditions">
      Weather Forecast
    </Header>
  );
}

function WeatherContent() {
  const getConditionStatus = (condition: string) => {
    switch (condition) {
      case 'Clear':
        return 'success';
      case 'Drizzle':
        return 'info';
      case 'Rainy':
        return 'warning';
      default:
        return 'info';
    }
  };

  const formatTemperature = (temp: number) => `${temp.toFixed(1)}°C`;
  const formatPrecipitation = (precip: number) => `${precip}mm`;
  const formatWindSpeed = (speed: number) => `${speed} km/h`;
  const formatHumidity = (humidity: number) => `${humidity}%`;

  return (
    <SpaceBetween size="l">
      {/* Current Weather Overview */}
      <ColumnLayout columns={2} variant="text-grid">
        <SpaceBetween size="m">
          <Box variant="h3">Current Conditions</Box>
          <KeyValuePairs
            columns={2}
            items={[
              {
                label: 'Temperature',
                value: formatTemperature(currentWeather.temperature),
              },
              {
                label: 'Condition',
                value: (
                  <StatusIndicator type={getConditionStatus(currentWeather.condition)}>
                    {currentWeather.condition}
                  </StatusIndicator>
                ),
              },
              {
                label: 'Humidity',
                value: formatHumidity(currentWeather.humidity),
              },
              {
                label: 'Wind Speed',
                value: formatWindSpeed(currentWeather.windSpeed),
              },
            ]}
          />
        </SpaceBetween>

        <SpaceBetween size="m">
          <Box variant="h3">7-Day Outlook</Box>
          <Box fontSize="body-s" color="text-body-secondary">
            {weeklyForecast.slice(1, 4).map((day, index) => (
              <Box key={index} margin={{ bottom: 'xs' }}>
                {day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}:{' '}
                <Box component="span" fontWeight="bold">
                  {formatTemperature(day.temperature)}
                </Box>{' '}
                - {day.condition}
              </Box>
            ))}
          </Box>
        </SpaceBetween>
      </ColumnLayout>

      {/* Temperature Trend Chart */}
      <SpaceBetween size="s">
        <Box variant="h3">Temperature Trend</Box>
        <LineChart
          {...commonChartProps}
          fitHeight={true}
          height={200}
          xDomain={weatherDomain}
          xScaleType="time"
          yTitle="Temperature (°C)"
          series={temperatureSeries}
          hideFilter={true}
          hideLegend={true}
          ariaLabel="Temperature forecast"
          ariaDescription={`Line chart showing temperature forecast for the next 7 days. ${lineChartInstructions}`}
          i18nStrings={{
            ...commonChartProps.i18nStrings,
            xTickFormatter: (date: Date) => dateFormatter(date),
            yTickFormatter: (value: number) => `${value.toFixed(0)}°C`,
          }}
        />
      </SpaceBetween>

      {/* Precipitation Chart */}
      <SpaceBetween size="s">
        <Box variant="h3">Precipitation Forecast</Box>
        <BarChart
          {...commonChartProps}
          fitHeight={true}
          height={180}
          xDomain={weatherDomain}
          xScaleType="time"
          yTitle="Precipitation (mm)"
          series={precipitationSeries}
          hideFilter={true}
          hideLegend={true}
          ariaLabel="Precipitation forecast"
          ariaDescription={`Bar chart showing precipitation forecast for the next 7 days. ${barChartInstructions}`}
          i18nStrings={{
            ...commonChartProps.i18nStrings,
            xTickFormatter: (date: Date) => dateFormatter(date),
            yTickFormatter: (value: number) => `${value}mm`,
          }}
        />
      </SpaceBetween>
    </SpaceBetween>
  );
}

export const weatherForecast: WidgetConfig = {
  definition: { defaultRowSpan: 6, defaultColumnSpan: 3, minRowSpan: 5 },
  data: {
    icon: 'lineChart',
    title: 'Weather Forecast',
    description: '7-day weather forecast with current conditions and trends',
    header: WeatherHeader,
    content: WeatherContent,
    staticMinHeight: 680,
  },
};
