// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import { AreaChartProps } from '@cloudscape-design/components/area-chart';

import { HourlyData } from '../utils/weather-api';

interface TemperatureChartCardProps {
  hourlyData: HourlyData[];
}

export function TemperatureChartCard({ hourlyData }: TemperatureChartCardProps) {
  const series: AreaChartProps.Series<Date>[] = [
    {
      title: 'Temperature',
      type: 'area',
      data: hourlyData.map(item => ({
        x: new Date(item.time),
        y: item.temperature,
      })),
      valueFormatter: value => `${Math.round(value)}°F`,
    },
    {
      title: 'Precipitation Probability',
      type: 'area',
      data: hourlyData.map(item => ({
        x: new Date(item.time),
        y: item.precipitationProbability,
      })),
      valueFormatter: value => `${Math.round(value)}%`,
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2">
          <span style={{ fontWeight: 800 }}>24-Hour Temperature & Precipitation Forecast</span>
        </Header>
      }
    >
      <AreaChart
        series={series}
        xScaleType="time"
        yTitle="Temperature (°F) / Precipitation (%)"
        xTitle="Time"
        height={300}
        statusType="finished"
        empty={<div>No data available</div>}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: (value: Date) =>
            value.toLocaleTimeString('en-US', {
              hour: 'numeric',
              hour12: true,
            }),
        }}
      />
    </Container>
  );
}
