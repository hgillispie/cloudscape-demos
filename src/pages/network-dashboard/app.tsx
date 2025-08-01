// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Checkbox from '@cloudscape-design/components/checkbox';
import { ContentLayout } from './components/content-layout';

// Sample data for charts
const networkTrafficData = [
  { x: 'x1', y1: 20, y2: 15 },
  { x: 'x2', y1: 25, y2: 18 },
  { x: 'x3', y1: 30, y2: 22 },
  { x: 'x4', y1: 35, y2: 28 },
  { x: 'x5', y1: 40, y2: 32 },
  { x: 'x6', y1: 45, y2: 35 },
  { x: 'x7', y1: 50, y2: 40 },
  { x: 'x8', y1: 48, y2: 38 },
  { x: 'x9', y1: 52, y2: 42 },
  { x: 'x10', y1: 55, y2: 45 },
  { x: 'x11', y1: 58, y2: 48 },
  { x: 'x12', y1: 60, y2: 50 },
];

const creditUsageData = [
  { x: 'x1', y: 30 },
  { x: 'x2', y: 45 },
  { x: 'x3', y: 35 },
  { x: 'x4', y: 20 },
  { x: 'x5', y: 38 },
];

// Sample data for devices table
const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  ip: `192.168.1.${10 + i}`,
  type: ['Router', 'Switch', 'Access Point', 'Firewall'][i % 4],
  status: i % 3 === 0 ? 'Online' : 'Online',
  location: ['Building A', 'Building B', 'Data Center'][i % 3],
  lastSeen: '2 minutes ago',
  bandwidth: `${Math.floor(Math.random() * 100)}%`,
}));

const columnDefinitions = [
  {
    id: 'selection',
    header: '',
    cell: () => <Checkbox />,
    width: 50,
    minWidth: 50,
  },
  {
    id: 'name',
    header: 'Device Name',
    cell: item => item.name,
    sortingField: 'name',
  },
  {
    id: 'ip',
    header: 'IP Address',
    cell: item => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'type',
    header: 'Type',
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
  {
    id: 'bandwidth',
    header: 'Bandwidth Usage',
    cell: item => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export function App() {
  const [filterText, setFilterText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);

  const filteredDevices = devicesData.filter(device =>
    device.name.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ip.includes(filterText) ||
    device.type.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
              />
              
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

              <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={5}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                  <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
                  <Button variant="icon" iconName="settings" />
                </div>
              </Grid>

              {showWarning && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setShowWarning(false),
                      buttonText: 'Dismiss',
                    },
                  ]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={networkTrafficData.map(d => d.x)}
                  yDomain={[0, 70]}
                  xTitle="Day"
                  yTitle="Network traffic"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  visibleSeries={['Site 1', 'Site 2']}
                  legendTitle="Legend"
                  ariaLabel="Network traffic area chart"
                  ariaDescription="Area chart showing network traffic over time for two sites"
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
                  yDomain={[0, 50]}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  visibleSeries={['Site 1']}
                  legendTitle="Legend"
                  ariaLabel="Credit usage bar chart"
                  ariaDescription="Bar chart showing credit usage over time"
                />
              </Container>
            </Grid>

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
                columnDefinitions={columnDefinitions}
                items={filteredDevices}
                selectionType="multi"
                selectedItems={selectedDevices}
                onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  itemSelectionLabel: ({ selectedItems }, item) =>
                    selectedItems.indexOf(item) < 0 ? `Select ${item.name}` : `Deselect ${item.name}`,
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    selectedItems.length === filteredDevices.length ? 'Deselect all' : 'Select all',
                }}
                trackBy="id"
                empty="No devices found"
                loadingText="Loading devices"
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
