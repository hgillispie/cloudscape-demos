// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import LineChart from '@cloudscape-design/components/line-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

// Sample data for Network Traffic area chart
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 30 },
      { x: new Date('2024-01-02'), y: 35 },
      { x: new Date('2024-01-03'), y: 32 },
      { x: new Date('2024-01-04'), y: 38 },
      { x: new Date('2024-01-05'), y: 42 },
      { x: new Date('2024-01-06'), y: 45 },
      { x: new Date('2024-01-07'), y: 43 },
      { x: new Date('2024-01-08'), y: 40 },
      { x: new Date('2024-01-09'), y: 38 },
      { x: new Date('2024-01-10'), y: 35 },
      { x: new Date('2024-01-11'), y: 30 },
      { x: new Date('2024-01-12'), y: 28 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 20 },
      { x: new Date('2024-01-02'), y: 22 },
      { x: new Date('2024-01-03'), y: 19 },
      { x: new Date('2024-01-04'), y: 15 },
      { x: new Date('2024-01-05'), y: 12 },
      { x: new Date('2024-01-06'), y: 10 },
      { x: new Date('2024-01-07'), y: 8 },
      { x: new Date('2024-01-08'), y: 12 },
      { x: new Date('2024-01-09'), y: 15 },
      { x: new Date('2024-01-10'), y: 18 },
      { x: new Date('2024-01-11'), y: 20 },
      { x: new Date('2024-01-12'), y: 22 },
    ],
    color: '#C33D69',
  },
];

// Sample data for Credit Usage bar chart
const creditUsageData = [
  { x: 'Day 1', y: 183 },
  { x: 'Day 2', y: 257 },
  { x: 'Day 3', y: 213 },
  { x: 'Day 4', y: 122 },
  { x: 'Day 5', y: 210 },
];

// Sample data for devices table
const devicesData = Array.from({ length: 50 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  type: i % 3 === 0 ? 'Router' : i % 3 === 1 ? 'Switch' : 'Access Point',
  status: i % 4 === 0 ? 'Online' : 'Active',
  ipAddress: `192.168.${Math.floor(i / 10)}.${i % 10 + 1}`,
  location: i % 2 === 0 ? 'Building A' : 'Building B',
  lastSeen: `${Math.floor(Math.random() * 24)}h ago`,
  firmware: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
}));

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'firmware',
    header: 'Firmware',
    cell: (item: any) => item.firmware,
    sortingField: 'firmware',
  },
];

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showWarning, setShowWarning] = useState(true);
  const pageSize = 10;

  const filteredItems = devicesData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(filteringText.toLowerCase())
    )
  );

  const paginatedItems = filteredItems.slice(
    (currentPageIndex - 1) * pageSize,
    currentPageIndex * pageSize
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      content={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            description="Network Traffic, Credit Usage, and Your Devices"
            actions={
              <Button variant="primary" iconAlign="right" iconName="external">
                Refresh Data
              </Button>
            }
          >
            Network Administration Dashboard
          </Header>

          <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
            <TextFilter
              filteringText={filteringText}
              filteringPlaceholder="Placeholder"
              onChange={({ detail }) => setFilteringText(detail.filteringText)}
            />
            <Box textAlign="right">
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={5}
              />
            </Box>
          </Grid>

          {showWarning && (
            <Flashbar
              items={[
                {
                  type: 'warning',
                  content: 'This is a warning message',
                  dismissible: true,
                  dismissLabel: 'Dismiss',
                  onDismiss: () => setShowWarning(false),
                  id: 'warning-message',
                },
              ]}
            />
          )}

          <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
            <Container>
              <LineChart
                series={networkTrafficData}
                xDomain={[
                  new Date('2024-01-01'),
                  new Date('2024-01-12'),
                ]}
                yDomain={[0, 50]}
                height={300}
                xTitle="Day"
                yTitle="Network traffic"
                ariaLabel="Network traffic chart"
                xScaleType="time"
                statusType="finished"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'line chart',
                  xTickFormatter: (value) =>
                    new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                }}
                additionalFilters={null}
              />
            </Container>

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
                xDomain={creditUsageData.map(d => d.x)}
                yDomain={[0, 300]}
                height={300}
                xTitle="Day"
                yTitle="Credit Usage"
                ariaLabel="Credit usage chart"
                statusType="finished"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                }}
              />
            </Container>
          </Grid>

          <Container>
            <Table
              columnDefinitions={columnDefinitions}
              items={paginatedItems}
              loadingText="Loading devices"
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems as any)}
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Box variant="p" color="inherit">
                    No devices to display.
                  </Box>
                </Box>
              }
              filter={
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Find devices"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilteringText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
              }
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
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredItems.length / pageSize)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
            />
          </Container>
        </SpaceBetween>
      }
    />
  );
}
