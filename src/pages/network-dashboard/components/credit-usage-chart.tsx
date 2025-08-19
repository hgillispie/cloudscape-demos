// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

const generateSampleData = () => {
  return [
    { x: 'x1', y: 75 },
    { x: 'x2', y: 95 },
    { x: 'x3', y: 85 },
    { x: 'x4', y: 45 },
    { x: 'x5', y: 80 }
  ];
};

const sampleData = generateSampleData();

const series = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: sampleData,
    color: '#688AE8',
    valueFormatter: (value: number) => `${value}%`
  }
];

export function CreditUsageChart() {
  return (
    <Container
      header={
        <Header variant="h2">
          Credit Usage
        </Header>
      }
    >
      <BarChart
        series={series}
        xDomain={sampleData.map(item => item.x)}
        yDomain={[0, 100]}
        height={300}
        hideFilter
        hideLegend={false}
        xScaleType="categorical"
        xTitle="Day"
        yTitle=""
        ariaLabel="Credit usage bar chart"
        ariaDescription="Bar chart showing credit usage for Site 1 over time"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (value) => value,
          yTickFormatter: (value) => `y${value}`,
        }}
      />
      
      {/* Custom Legend */}
      <Box margin={{ top: 'm' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '2px',
              backgroundColor: '#688AE8'
            }} />
            <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#000716' }}>Site 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ 
              width: '12px', 
              height: '3px',
              display: 'flex',
              gap: '2px'
            }}>
              <div style={{
                width: '6px',
                height: '3px',
                borderRadius: '1px',
                backgroundColor: '#5F6B7A'
              }} />
              <div style={{
                width: '6px',
                height: '3px',
                borderRadius: '1px',
                backgroundColor: '#5F6B7A'
              }} />
            </div>
            <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#000716' }}>Performance goal</span>
          </div>
        </div>
      </Box>
    </Container>
  );
}
