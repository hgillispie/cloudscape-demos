// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import LineChart from '@cloudscape-design/components/line-chart';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

import { commonChartProps, dateFormatter } from '../../dashboard/widgets/chart-commons';

// Generate mock network traffic data
const generateNetworkData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 12; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(date.getHours() - i);
    
    // Generate varying data that roughly matches the Figma design pattern
    const site1Base = 60000 + Math.random() * 20000;
    const site2Base = 40000 + Math.random() * 15000;
    
    data.push({
      date,
      site1: Math.floor(site1Base + Math.sin(i * 0.5) * 10000),
      site2: Math.floor(site2Base + Math.cos(i * 0.3) * 8000),
    });
  }
  
  return data;
};

const networkTrafficData = generateNetworkData();

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: networkTrafficData.map(datum => ({ x: datum.date, y: datum.site1 })),
    valueFormatter: (value: number) => value.toLocaleString('en-US'),
  },
  {
    title: 'Site 2', 
    type: 'area' as const,
    data: networkTrafficData.map(datum => ({ x: datum.date, y: datum.site2 })),
    valueFormatter: (value: number) => value.toLocaleString('en-US'),
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    data: networkTrafficData.map(datum => ({ x: datum.date, y: 50000 })),
    valueFormatter: (value: number) => value.toLocaleString('en-US'),
  },
];

export function NetworkTrafficChart() {
  return (
    <Container
      header={
        <Header variant="h2">
          Network traffic
        </Header>
      }
    >
      <AreaChart
        {...commonChartProps}
        series={networkTrafficSeries}
        xDomain={[networkTrafficData[0].date, networkTrafficData[networkTrafficData.length - 1].date]}
        yDomain={[0, 100000]}
        i18nStrings={{
          ...commonChartProps.i18nStrings,
          xTickFormatter: dateFormatter,
          yTickFormatter: (value: number) => {
            if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'k';
            }
            return value.toString();
          },
        }}
        ariaLabel="Network traffic area chart"
        errorText="Error loading data."
        height={300}
        xScaleType="time"
        xTitle="Day"
        yTitle="Traffic (bytes)"
        statusType="finished"
        detailPopoverSeriesContent={({ series, x, y }) => [
          { key: 'Time', value: dateFormatter(x) },
          { key: series.title, value: series.valueFormatter ? series.valueFormatter(y) : y },
        ]}
      />
    </Container>
  );
}
