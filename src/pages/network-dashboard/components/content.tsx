// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Checkbox from '@cloudscape-design/components/checkbox';
import Container from '@cloudscape-design/components/container';
import Alert from '@cloudscape-design/components/alert';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

import { NetworkDashboardControls } from './header';

// Mock data for charts
const networkTrafficData = [
  { x: new Date('2024-01-01'), y: 45 },
  { x: new Date('2024-01-02'), y: 52 },
  { x: new Date('2024-01-03'), y: 48 },
  { x: new Date('2024-01-04'), y: 61 },
  { x: new Date('2024-01-05'), y: 55 },
  { x: new Date('2024-01-06'), y: 67 },
  { x: new Date('2024-01-07'), y: 70 },
  { x: new Date('2024-01-08'), y: 58 },
  { x: new Date('2024-01-09'), y: 62 },
  { x: new Date('2024-01-10'), y: 65 },
  { x: new Date('2024-01-11'), y: 72 },
  { x: new Date('2024-01-12'), y: 68 },
];

const creditUsageData = [
  { x: 'Day 1', y: 85 },
  { x: 'Day 2', y: 120 },
  { x: 'Day 3', y: 95 },
  { x: 'Day 4', y: 60 },
  { x: 'Day 5', y: 105 },
];

// Mock data for devices table
const mockDevices = Array.from({ length: 15 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  type: i % 3 === 0 ? 'Router' : i % 3 === 1 ? 'Switch' : 'Access Point',
  status: i % 4 === 0 ? 'Offline' : 'Online',
  ipAddress: `192.168.1.${i + 10}`,
  location: `Building ${Math.floor(i / 3) + 1}`,
  lastSeen: new Date(Date.now() - Math.random() * 86400000).toLocaleDateString(),
}));

export function Content() {
  const [selectedDevices, setSelectedDevices] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <SpaceBetween size="l">
      {/* Warning Banner */}
      <Flashbar
        items={[
          {
            type: 'error',
            content: 'This is a warning message',
            dismissible: true,
            buttonText: 'Dismiss',
            onButtonClick: () => {},
          },
        ]}
      />

      {/* Controls */}
      <NetworkDashboardControls />

      {/* Charts Section */}
      <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
        {/* Network Traffic Chart */}
        <Container>
          <AreaChart
            series={[
              {
                title: 'Site 1',
                type: 'area',
                data: networkTrafficData.map(d => ({ x: d.x, y: d.y + Math.random() * 10 })),
                color: '#688AE8',
              },
              {
                title: 'Site 2',
                type: 'area',
                data: networkTrafficData.map(d => ({ x: d.x, y: d.y - Math.random() * 10 })),
                color: '#C33D69',
              },
            ]}
            height={300}
            xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
            yDomain={[0, 100]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'area chart',
              xTickFormatter: e => e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              yTickFormatter: e => `${e}%`,
            }}
            ariaLabel="Network traffic over time"
            errorText="Error loading data."
            loadingText="Loading chart"
            recoveryText="Retry"
            xScaleType="time"
            xTitle="Day"
            yTitle="Network traffic"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
              </Box>
            }
          />
        </Container>

        {/* Credit Usage Chart */}
        <Container>
          <BarChart
            series={[
              {
                title: 'Site 1',
                type: 'bar',
                data: creditUsageData,
                color: '#688AE8',
              },
            ]}
            height={300}
            xDomain={creditUsageData.map(d => d.x)}
            yDomain={[0, 150]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'bar chart',
              yTickFormatter: e => `${e}`,
            }}
            ariaLabel="Credit usage by day"
            errorText="Error loading data."
            loadingText="Loading chart"
            recoveryText="Retry"
            xScaleType="categorical"
            xTitle="Day"
            yTitle="Credit Usage"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
              </Box>
            }
          />
        </Container>
      </Grid>

      {/* Devices Section */}
      <Container
        header={
          <Header
            variant="h2"
            description="Devices on your local network"
            actions={
              <Button variant="primary" iconAlign="right" iconName="external">
                Add Device
              </Button>
            }
          >
            My Devices
          </Header>
        }
      >
        <Table
          columnDefinitions={[
            {
              id: 'name',
              header: 'Device Name',
              cell: item => item.name,
              sortingField: 'name',
            },
            {
              id: 'type',
              header: 'Device Type',
              cell: item => item.type,
              sortingField: 'type',
            },
            {
              id: 'status',
              header: 'Status',
              cell: item => item.status,
              sortingField: 'status',
            },
            {
              id: 'ipAddress',
              header: 'IP Address',
              cell: item => item.ipAddress,
              sortingField: 'ipAddress',
            },
            {
              id: 'location',
              header: 'Location',
              cell: item => item.location,
              sortingField: 'location',
            },
            {
              id: 'lastSeen',
              header: 'Last Seen',
              cell: item => item.lastSeen,
              sortingField: 'lastSeen',
            },
          ]}
          columnDisplay={[
            { id: 'name', visible: true },
            { id: 'type', visible: true },
            { id: 'status', visible: true },
            { id: 'ipAddress', visible: true },
            { id: 'location', visible: true },
            { id: 'lastSeen', visible: true },
          ]}
          items={mockDevices.slice((currentPageIndex - 1) * 10, currentPageIndex * 10)}
          loading={false}
          loadingText="Loading devices"
          selectedItems={selectedDevices}
          onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
          selectionType="multi"
          trackBy="id"
          empty={
            <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No devices</b>
                <Button>Add Device</Button>
              </SpaceBetween>
            </Box>
          }
          filter={
            <TextFilter filteringText="" filteringPlaceholder="Find devices" filteringAriaLabel="Filter devices" />
          }
          header={<Header counter={mockDevices.length > 0 ? `(${mockDevices.length})` : undefined}>Devices</Header>}
          pagination={
            <Pagination
              currentPageIndex={currentPageIndex}
              pagesCount={Math.ceil(mockDevices.length / 10)}
              ariaLabels={{
                nextPageLabel: 'Next page',
                previousPageLabel: 'Previous page',
                pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
              }}
              onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            />
          }
          preferences={<Button variant="icon" iconName="settings" ariaLabel="Preferences" />}
        />
      </Container>
    </SpaceBetween>
  );
}
