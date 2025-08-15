// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Flashbar from '@cloudscape-design/components/flashbar';
import Icon from '@cloudscape-design/components/icon';

// Sample data for the charts
const networkTrafficData = [
  { x: 'x1', y: 23 },
  { x: 'x2', y: 19 },
  { x: 'x3', y: 25 },
  { x: 'x4', y: 22 },
  { x: 'x5', y: 28 },
  { x: 'x6', y: 24 },
  { x: 'x7', y: 30 },
  { x: 'x8', y: 26 },
  { x: 'x9', y: 32 },
  { x: 'x10', y: 35 },
  { x: 'x11', y: 29 },
  { x: 'x12', y: 33 },
];

const networkTrafficData2 = [
  { x: 'x1', y: 18 },
  { x: 'x2', y: 22 },
  { x: 'x3', y: 20 },
  { x: 'x4', y: 26 },
  { x: 'x5', y: 24 },
  { x: 'x6', y: 28 },
  { x: 'x7', y: 25 },
  { x: 'x8', y: 31 },
  { x: 'x9', y: 27 },
  { x: 'x10', y: 30 },
  { x: 'x11', y: 33 },
  { x: 'x12', y: 28 },
];

const creditUsageData = [
  { x: 'x1', y: 65 },
  { x: 'x2', y: 85 },
  { x: 'x3', y: 75 },
  { x: 'x4', y: 45 },
  { x: 'x5', y: 80 },
];

// Sample device data
const deviceData = [
  {
    id: '1',
    deviceName: 'Router-001',
    ipAddress: '192.168.1.1',
    macAddress: 'AA:BB:CC:DD:EE:01',
    status: 'Online',
    type: 'Router',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    deviceName: 'Switch-002',
    ipAddress: '192.168.1.2',
    macAddress: 'AA:BB:CC:DD:EE:02',
    status: 'Online',
    type: 'Switch',
    lastSeen: '5 minutes ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '3',
    deviceName: 'AP-003',
    ipAddress: '192.168.1.3',
    macAddress: 'AA:BB:CC:DD:EE:03',
    status: 'Offline',
    type: 'Access Point',
    lastSeen: '1 hour ago',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    deviceName: 'Printer-004',
    ipAddress: '192.168.1.4',
    macAddress: 'AA:BB:CC:DD:EE:04',
    status: 'Online',
    type: 'Printer',
    lastSeen: '10 minutes ago',
    bandwidth: '10 Mbps',
  },
  {
    id: '5',
    deviceName: 'Camera-005',
    ipAddress: '192.168.1.5',
    macAddress: 'AA:BB:CC:DD:EE:05',
    status: 'Online',
    type: 'Security Camera',
    lastSeen: '1 minute ago',
    bandwidth: '50 Mbps',
  },
];

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: any) => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Box color={item.status === 'Online' ? 'text-status-success' : 'text-status-error'} fontWeight="bold">
        {item.status}
      </Box>
    ),
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'error' as const,
      dismissible: true,
      content: 'This is a warning message',
      id: 'warning-message',
      onDismiss: () => setFlashbarItems([]),
    },
  ]);

  const filteredDevices = deviceData.filter(
    device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()),
  );

  const itemsPerPage = 10;
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
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
                ariaLabel="Breadcrumbs"
              />

              <Header
                variant="h1"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              <Box variant="p" color="text-body-secondary">
                Network Traffic, Credit Usage, and Your Devices
              </Box>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Flashbar items={flashbarItems} />

            <Container>
              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } }]}>
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
              </Grid>
            </Container>

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData,
                      valueFormatter: value => `${value}%`,
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData2,
                      valueFormatter: value => `${value}%`,
                    },
                  ]}
                  xTitle="Day"
                  yTitle="Traffic (%)"
                  height={300}
                  hideFilter
                  showLegend
                  legendTitle="Sites"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <Box variant="p" color="inherit">
                        No network traffic data available
                      </Box>
                    </Box>
                  }
                />
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      valueFormatter: value => `${value} credits`,
                    },
                  ]}
                  xTitle="Day"
                  yTitle="Credits"
                  height={300}
                  hideFilter
                  showLegend
                  legendTitle="Performance goal"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <Box variant="p" color="inherit">
                        No credit usage data available
                      </Box>
                    </Box>
                  }
                />
              </Container>
            </Grid>

            <Container
              header={
                <Header
                  variant="h2"
                  counter={`(${filteredDevices.length})`}
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
              <Box variant="p" color="text-body-secondary" padding={{ bottom: 'm' }}>
                Devices on your local network
              </Box>

              <Table
                columnDefinitions={columnDefinitions}
                items={paginatedDevices}
                loading={false}
                loadingText="Loading devices"
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="p" color="inherit">
                      No devices found
                    </Box>
                  </Box>
                }
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                selectionType="multi"
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                    return `${item.deviceName} is ${isItemSelected ? '' : 'not'} selected`;
                  },
                }}
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                }
                preferences={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="settings" />
                  </div>
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
