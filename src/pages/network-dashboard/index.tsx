// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Alert from '@cloudscape-design/components/alert';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

// Mock data for network traffic (area chart)
const networkTrafficData = [
  { x: new Date('2024-01-01'), y1: 45, y2: 32 },
  { x: new Date('2024-01-02'), y1: 52, y2: 38 },
  { x: new Date('2024-01-03'), y1: 48, y2: 42 },
  { x: new Date('2024-01-04'), y1: 61, y2: 45 },
  { x: new Date('2024-01-05'), y1: 55, y2: 48 },
  { x: new Date('2024-01-06'), y1: 67, y2: 52 },
  { x: new Date('2024-01-07'), y1: 58, y2: 46 },
  { x: new Date('2024-01-08'), y1: 72, y2: 58 },
  { x: new Date('2024-01-09'), y1: 65, y2: 54 },
  { x: new Date('2024-01-10'), y1: 78, y2: 62 },
  { x: new Date('2024-01-11'), y1: 69, y2: 56 },
  { x: new Date('2024-01-12'), y1: 75, y2: 60 },
];

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
    color: '#688AE8',
  },
  {
    title: 'Site 2', 
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: 50 })),
    color: '#5F6B7A',
  },
];

// Mock data for credit usage (bar chart)
const creditUsageData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData,
    color: '#688AE8',
  },
];

// Mock data for devices table
const devicesData = [
  { id: '1', deviceName: 'Router-01', status: 'Online', ipAddress: '192.168.1.1', lastSeen: '2 minutes ago', deviceType: 'Router', location: 'Main Office' },
  { id: '2', deviceName: 'Switch-02', status: 'Online', ipAddress: '192.168.1.2', lastSeen: '5 minutes ago', deviceType: 'Switch', location: 'Server Room' },
  { id: '3', deviceName: 'AP-03', status: 'Offline', ipAddress: '192.168.1.3', lastSeen: '2 hours ago', deviceType: 'Access Point', location: 'Floor 2' },
  { id: '4', deviceName: 'Firewall-04', status: 'Online', ipAddress: '192.168.1.4', lastSeen: '1 minute ago', deviceType: 'Firewall', location: 'DMZ' },
  { id: '5', deviceName: 'Router-05', status: 'Warning', ipAddress: '192.168.1.5', lastSeen: '30 minutes ago', deviceType: 'Router', location: 'Branch Office' },
  { id: '6', deviceName: 'Switch-06', status: 'Online', ipAddress: '192.168.1.6', lastSeen: '3 minutes ago', deviceType: 'Switch', location: 'Main Office' },
  { id: '7', deviceName: 'AP-07', status: 'Online', ipAddress: '192.168.1.7', lastSeen: '7 minutes ago', deviceType: 'Access Point', location: 'Floor 1' },
  { id: '8', deviceName: 'Router-08', status: 'Online', ipAddress: '192.168.1.8', lastSeen: '4 minutes ago', deviceType: 'Router', location: 'Remote Site' },
  { id: '9', deviceName: 'Switch-09', status: 'Offline', ipAddress: '192.168.1.9', lastSeen: '1 day ago', deviceType: 'Switch', location: 'Warehouse' },
  { id: '10', deviceName: 'Firewall-10', status: 'Online', ipAddress: '192.168.1.10', lastSeen: '6 minutes ago', deviceType: 'Firewall', location: 'Main Office' },
];

const deviceColumns = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Box color={item.status === 'Online' ? 'text-status-success' : item.status === 'Warning' ? 'text-status-warning' : 'text-status-error'}>
        {item.status}
      </Box>
    ),
    sortingField: 'status',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'deviceType',
    header: 'Type',
    cell: (item: any) => item.deviceType,
    sortingField: 'deviceType',
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
];

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<any[]>([]);
  const [alertVisible, setAlertVisible] = useState(true);
  const [alertHover, setAlertHover] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = devicesData.filter(device =>
    device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ipAddress.includes(filterText) ||
    device.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
    device.location.toLowerCase().includes(filterText.toLowerCase())
  );

  // Paginate filtered devices
  const paginatedDevices = filteredDevices.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  const handleRefreshData = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleAddDevice = () => {
    // TODO: Implement add device functionality
    console.log('Add device clicked');
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard' },
          ]}
        />
      }
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button
                    variant="primary"
                    iconAlign="right"
                    iconName="external"
                    loading={refreshing}
                    onClick={handleRefreshData}
                  >
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              {alertVisible && (
                <div onMouseEnter={() => setAlertHover(true)} onMouseLeave={() => setAlertHover(false)}>
                  <Alert
                    type="error"
                    dismissible
                    onDismiss={() => setAlertVisible(false)}
                  >
                    <SpaceBetween size="xs">
                      <span>This is a warning message</span>
                      {alertHover && (
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.
                        </span>
                      )}
                    </SpaceBetween>
                  </Alert>
                </div>
              )}

              <Container>
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } },
                    { colspan: { default: 12, xs: 12, s: 12, m: 4, l: 4, xl: 4 } },
                  ]}
                >
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                  <Box textAlign="right" padding={{ top: 's' }}>
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
                  </Box>
                </Grid>
              </Container>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: { default: 12, s: 12, m: 12, l: 6, xl: 6 } }, { colspan: { default: 12, s: 12, m: 12, l: 6, xl: 6 } }]}>
              <Container>
                <AreaChart
                  series={networkTrafficSeries}
                  xDomain={[networkTrafficData[0].x, networkTrafficData[networkTrafficData.length - 1].x]}
                  yDomain={[0, 100]}
                  xScaleType="time"
                  xTitle="Day"
                  yTitle="Network traffic"
                  height={300}
                  hideFilter={false}
                  hideLegend={false}
                  legendTitle="Network traffic"
                  ariaLabel="Network traffic area chart showing data trends over time"
                />
              </Container>

              <Container>
                <BarChart
                  series={creditUsageSeries}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  height={300}
                  hideFilter={false}
                  hideLegend={false}
                  legendTitle="Credit Usage"
                  ariaLabel="Credit usage bar chart showing usage by time period"
                />
              </Container>
            </Grid>

            {/* My Devices Section */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button
                      variant="primary"
                      iconAlign="right"
                      iconName="external"
                      onClick={handleAddDevice}
                    >
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
            >
              <Table
                columnDefinitions={deviceColumns}
                items={paginatedDevices}
                selectionType="multi"
                selectedItems={selectedDevices}
                onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
                sortingDisabled={false}
                variant="borderless"
                ariaLabels={{
                  selectionGroupLabel: 'Devices selection',
                  allItemsSelectionLabel: ({ selectedItems }) => 
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => item.deviceName,
                }}
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No devices
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      No devices to display.
                    </Box>
                  </Box>
                }
                loadingText="Loading devices"
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
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
