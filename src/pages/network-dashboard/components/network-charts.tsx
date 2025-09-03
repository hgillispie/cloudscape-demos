// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

// Mock chart components since Cloudscape doesn't have built-in charts
function NetworkTrafficChart() {
  return (
    <Container header={<Box variant="h2">Network traffic</Box>}>
      <SpaceBetween size="m">
        <div style={{ height: '300px', position: 'relative', background: '#fff' }}>
          {/* Y-axis labels */}
          <div style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#5F6B7A',
            paddingTop: '8px',
            paddingBottom: '20px'
          }}>
            {['y6', 'y5', 'y4', 'y3', 'y2', 'y1'].map((label, i) => (
              <div key={i}>{label}</div>
            ))}
          </div>
          
          {/* Chart area */}
          <div style={{ 
            marginLeft: '48px', 
            height: '268px', 
            position: 'relative', 
            background: 'linear-gradient(180deg, rgba(195, 61, 105, 0.4) 0%, rgba(116, 146, 231, 0.4) 100%)',
            border: '1px solid #E9EBED'
          }}>
            {/* Mock area chart visualization */}
            <svg width="100%" height="100%" viewBox="0 0 566 268" style={{ position: 'absolute' }}>
              <path 
                d="M1 176L42 150L75 132H99L133 109L183 59L247 69L314 73L353 82L413 38L494 46L566 128V149L488 64H440L403 94L333 107L271 114L225 100L156 129L130 134L105 158L66 166L36 181L1 190V176Z" 
                fill="rgba(195, 61, 105, 0.4)" 
              />
              <path 
                d="M1 176L42 150L75 132H99L133 109L183 59L247 69L314 73L353 82L413 38L494 46L566 128" 
                stroke="#C33D69" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M36 181L1 190V268H566V149L488 64H440L403 94L333 107L271 114L225 100L156 129L130 134L105 158L66 166L36 181Z" 
                fill="rgba(116, 146, 231, 0.4)"
              />
              <path 
                d="M1 190L36 181L66 166L105 158L130 134L156 129L225 100L271 114L333 107L403 94L440 64H488L566 149" 
                stroke="#688AE8" 
                strokeWidth="2" 
                fill="none"
              />
              <line 
                x1="1" 
                y1="150" 
                x2="566" 
                y2="150" 
                stroke="#5F6B7A" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          
          {/* X-axis labels */}
          <div style={{ 
            marginLeft: '48px', 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#5F6B7A',
            paddingTop: '8px'
          }}>
            {['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'].map((label, i) => (
              <div key={i}>{label}</div>
            ))}
          </div>
        </div>
        
        <Box textAlign="center" variant="h3" fontWeight="bold">Day</Box>
        
        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              borderRadius: '2px', 
              border: '1px solid #688AE8', 
              background: 'rgba(116, 146, 231, 0.40)' 
            }} />
            <span style={{ fontSize: '14px', color: '#000716' }}>Site 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              borderRadius: '2px', 
              border: '1px solid #C33D69', 
              background: 'rgba(195, 61, 105, 0.40)' 
            }} />
            <span style={{ fontSize: '14px', color: '#000716' }}>Site 2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ 
              width: '12px', 
              height: '3px', 
              background: 'repeating-linear-gradient(to right, #5F6B7A 0, #5F6B7A 6px, transparent 6px, transparent 8px)'
            }} />
            <span style={{ fontSize: '14px', color: '#000716' }}>Performance goal</span>
          </div>
        </div>
      </SpaceBetween>
    </Container>
  );
}

function CreditUsageChart() {
  const barHeights = [183, 257, 213, 122, 210]; // Heights from design
  
  return (
    <Container header={<Box variant="h2">Credit Usage</Box>}>
      <SpaceBetween size="m">
        <div style={{ height: '360px', position: 'relative', background: '#fff' }}>
          {/* Y-axis labels */}
          <div style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            height: '284px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#5F6B7A',
            paddingTop: '8px'
          }}>
            {['y6', 'y5', 'y4', 'y3', 'y2', 'y1'].map((label, i) => (
              <div key={i}>{label}</div>
            ))}
          </div>
          
          {/* Chart area */}
          <div style={{ 
            marginLeft: '48px', 
            height: '300px', 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid #D1D5DB'
          }}>
            {barHeights.map((height, i) => (
              <div key={i} style={{ 
                width: '95px', 
                height: `${height}px`, 
                backgroundColor: '#688AE8',
                borderRadius: '4px',
                border: '2px solid #FFF',
                borderBottom: 'none'
              }} />
            ))}
          </div>
          
          {/* X-axis labels */}
          <div style={{ 
            marginLeft: '48px', 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#5F6B7A',
            paddingTop: '8px'
          }}>
            {['x1', 'x2', 'x3', 'x4', 'x5'].map((label, i) => (
              <div key={i}>{label}</div>
            ))}
          </div>
        </div>
        
        <Box textAlign="center" variant="h3" fontWeight="bold">Day</Box>
        
        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              borderRadius: '2px', 
              background: '#688AE8' 
            }} />
            <span style={{ fontSize: '14px', color: '#000716' }}>Site 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ 
              width: '12px', 
              height: '3px', 
              background: 'repeating-linear-gradient(to right, #5F6B7A 0, #5F6B7A 6px, transparent 6px, transparent 8px)'
            }} />
            <span style={{ fontSize: '14px', color: '#000716' }}>Performance goal</span>
          </div>
        </div>
      </SpaceBetween>
    </Container>
  );
}

export function NetworkCharts() {
  return (
    <ColumnLayout
      columns={{ default: 1, s: 1, m: 2, l: 2, xl: 2 }}
      variant="text-grid"
    >
      <NetworkTrafficChart />
      <CreditUsageChart />
    </ColumnLayout>
  );
}
