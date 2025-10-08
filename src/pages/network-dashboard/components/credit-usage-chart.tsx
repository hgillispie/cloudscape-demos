// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

const chartData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

export function CreditUsageChart() {
  const series: BarChartProps.BarDataSeries<string>[] = [
    {
      title: 'Site 1',
      type: 'bar',
      data: chartData.map(item => ({ x: item.x, y: item.y })),
    },
  ];

  return (
    <Container
      header={<Header variant="h2">Credit Usage</Header>}
      footer={
        <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '2px',
                background: '#688AE8',
              }}
            />
            <span style={{ fontSize: '14px' }}>Site 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '3px', display: 'flex', gap: '2px' }}>
              <div
                style={{
                  width: '6px',
                  height: '3px',
                  borderRadius: '1px',
                  background: '#5F6B7A',
                }}
              />
              <div
                style={{
                  width: '6px',
                  height: '3px',
                  borderRadius: '1px',
                  background: '#5F6B7A',
                }}
              />
            </div>
            <span style={{ fontSize: '14px' }}>Performance goal</span>
          </div>
        </div>
      }
    >
      <BarChart
        series={series}
        xScaleType="categorical"
        yTitle="y6"
        xTitle="Day"
        height={300}
        statusType="finished"
        hideFilter
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (value: string) => value,
          yTickFormatter: (value: number) => `y${Math.round(value / 50)}`,
        }}
      />
    </Container>
  );
}
