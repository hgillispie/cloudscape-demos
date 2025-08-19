// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Box from '@cloudscape-design/components/box';

const generateSampleData = () => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      x: `x${i}`,
      site1: Math.floor(Math.random() * 50) + 30, // Random values between 30-80
      site2: Math.floor(Math.random() * 60) + 20, // Random values between 20-80
    });
  }
  return data;
};

const sampleData = generateSampleData();

const series = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: sampleData.map(item => ({ x: item.x, y: item.site1 })),
    color: '#688AE8',
    valueFormatter: (value: number) => `${value}%`,
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: sampleData.map(item => ({ x: item.x, y: item.site2 })),
    color: '#C33D69',
    valueFormatter: (value: number) => `${value}%`,
  },
];

export function NetworkTrafficChart() {
  return (
    <Container header={<Header variant="h2">Network traffic</Header>}>
      <LineChart
        series={series}
        xDomain={sampleData.map(item => item.x)}
        yDomain={[0, 100]}
        height={300}
        hideFilter
        hideLegend={false}
        xScaleType="categorical"
        xTitle="Day"
        yTitle=""
        ariaLabel="Network traffic area chart"
        ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over time"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: value => value,
          yTickFormatter: value => `y${value}`,
        }}
      />

      {/* Custom Legend */}
      <Box margin={{ top: 'm' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '2px',
                border: '1px solid #688AE8',
                backgroundColor: 'rgba(104, 138, 232, 0.4)',
              }}
            />
            <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#000716' }}>Site 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '2px',
                border: '1px solid #C33D69',
                backgroundColor: 'rgba(195, 61, 105, 0.4)',
              }}
            />
            <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#000716' }}>Site 2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '12px',
                height: '3px',
                display: 'flex',
                gap: '2px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '3px',
                  borderRadius: '1px',
                  backgroundColor: '#5F6B7A',
                }}
              />
              <div
                style={{
                  width: '6px',
                  height: '3px',
                  borderRadius: '1px',
                  backgroundColor: '#5F6B7A',
                }}
              />
            </div>
            <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#000716' }}>Performance goal</span>
          </div>
        </div>
      </Box>
    </Container>
  );
}
