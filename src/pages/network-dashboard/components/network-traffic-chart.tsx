// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import { AreaChartProps } from '@cloudscape-design/components/area-chart';

const chartData = [
  { x: 1, site1: 150, site2: 180 },
  { x: 2, site1: 160, site2: 175 },
  { x: 3, site1: 155, site2: 168 },
  { x: 4, site1: 165, site2: 172 },
  { x: 5, site1: 170, site2: 165 },
  { x: 6, site1: 158, site2: 155 },
  { x: 7, site1: 162, site2: 148 },
  { x: 8, site1: 168, site2: 142 },
  { x: 9, site1: 155, site2: 152 },
  { x: 10, site1: 148, site2: 160 },
  { x: 11, site1: 152, site2: 168 },
  { x: 12, site1: 145, site2: 175 },
];

export function NetworkTrafficChart() {
  const series: AreaChartProps.Series<number>[] = [
    {
      title: 'Site 1',
      type: 'area',
      data: chartData.map(item => ({ x: item.x, y: item.site1 })),
    },
    {
      title: 'Site 2',
      type: 'area',
      data: chartData.map(item => ({ x: item.x, y: item.site2 })),
    },
  ];

  return (
    <Container
      header={<Header variant="h2">Network traffic</Header>}
      footer={
        <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '2px',
                border: '1px solid #688AE8',
                background: 'rgba(116, 146, 231, 0.40)',
              }}
            />
            <span style={{ fontSize: '14px' }}>Site 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '2px',
                border: '1px solid #C33D69',
                background: 'rgba(195, 61, 105, 0.40)',
              }}
            />
            <span style={{ fontSize: '14px' }}>Site 2</span>
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
      <AreaChart
        series={series}
        xScaleType="linear"
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
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: (value: number) => `x${value}`,
          yTickFormatter: (value: number) => `y${Math.round(value / 30)}`,
        }}
        additionalFilters={
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '2px',
              borderTop: '2px dashed #5F6B7A',
              pointerEvents: 'none',
            }}
          />
        }
      />
    </Container>
  );
}
