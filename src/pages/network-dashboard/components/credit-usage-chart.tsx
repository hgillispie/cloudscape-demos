// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

import { commonChartProps } from '../../dashboard/widgets/chart-commons';

// Generate mock credit usage data that matches the Figma design pattern
const creditUsageData = [
  { day: 'x1', usage: 60 },
  { day: 'x2', usage: 95 },
  { day: 'x3', usage: 80 },
  { day: 'x4', usage: 40 },
  { day: 'x5', usage: 75 },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData.map(datum => ({ x: datum.day, y: datum.usage })),
    valueFormatter: (value: number) => `${value} credits`,
  },
];

// Add threshold line for performance goal
const creditUsageWithThreshold = [
  ...creditUsageSeries,
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    data: creditUsageData.map(datum => ({ x: datum.day, y: 70 })),
    valueFormatter: (value: number) => `${value} credits`,
  },
];

export function CreditUsageChart() {
  return (
    <Container header={<Header variant="h2">Credit Usage</Header>}>
      <BarChart
        {...commonChartProps}
        series={creditUsageWithThreshold}
        xDomain={creditUsageData.map(d => d.day)}
        yDomain={[0, 100]}
        i18nStrings={{
          ...commonChartProps.i18nStrings,
          chartAriaRoleDescription: 'bar chart',
          yTickFormatter: (value: number) => value.toString(),
        }}
        ariaLabel="Credit usage bar chart"
        errorText="Error loading data."
        height={300}
        xScaleType="categorical"
        xTitle="Day"
        yTitle="Credits"
        statusType="finished"
        detailPopoverSeriesContent={({ series, x, y }) => [
          { key: 'Day', value: x },
          { key: series.title, value: series.valueFormatter ? series.valueFormatter(y) : y },
        ]}
        hideLegend={false}
        hideFilter={false}
      />
    </Container>
  );
}
