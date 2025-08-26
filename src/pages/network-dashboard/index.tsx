// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Flashbar from '@cloudscape-design/components/flashbar';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Checkbox from '@cloudscape-design/components/checkbox';

// Mock data for the network traffic area chart
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 120 },
      { x: new Date('2024-01-02'), y: 140 },
      { x: new Date('2024-01-03'), y: 135 },
      { x: new Date('2024-01-04'), y: 160 },
      { x: new Date('2024-01-05'), y: 155 },
      { x: new Date('2024-01-06'), y: 170 },
      { x: new Date('2024-01-07'), y: 165 },
      { x: new Date('2024-01-08'), y: 180 },
      { x: new Date('2024-01-09'), y: 175 },
      { x: new Date('2024-01-10'), y: 190 },
      { x: new Date('2024-01-11'), y: 185 },
      { x: new Date('2024-01-12'), y: 200 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 80 },
      { x: new Date('2024-01-02'), y: 90 },
      { x: new Date('2024-01-03'), y: 85 },
      { x: new Date('2024-01-04'), y: 95 },
      { x: new Date('2024-01-05'), y: 100 },
      { x: new Date('2024-01-06'), y: 110 },
      { x: new Date('2024-01-07'), y: 105 },
      { x: new Date('2024-01-08'), y: 115 },
      { x: new Date('2024-01-09'), y: 120 },
      { x: new Date('2024-01-10'), y: 125 },
      { x: new Date('2024-01-11'), y: 130 },
      { x: new Date('2024-01-12'), y: 135 },
    ],
    color: '#C33D69',
  },
];

// Mock data for the credit usage bar chart
const creditUsageData = [
  {
    title: 'Usage',
    type: 'bar',
    data: [
      { x: 'Day 1', y: 180 },
      { x: 'Day 2', y: 250 },
      { x: 'Day 3', y: 210 },
      { x: 'Day 4', y: 120 },
      { x: 'Day 5', y: 230 },
    ],
    color: '#688AE8',
  },
];

// Mock data for devices table
const devicesData = [
  {
    id: '1',
    deviceName: 'Server-01',
    ipAddress: '192.168.1.10',
    status: 'Online',
    location: 'Data Center A',
    lastSeen: '2024-01-12 14:30',
    bandwidth: '1.2 Gbps',
    type: 'Server',
  },
  {
    id: '2',
    deviceName: 'Router-Main',
    ipAddress: '192.168.1.1',
    status: 'Online',
    location: 'Network Room',
    lastSeen: '2024-01-12 14:29',
    bandwidth: '10 Gbps',
    type: 'Router',
  },
  {
    id: '3',
    deviceName: 'Switch-Floor2',
    ipAddress: '192.168.2.5',
    status: 'Online',
    location: 'Floor 2',
    lastSeen: '2024-01-12 14:28',
    bandwidth: '1 Gbps',
    type: 'Switch',
  },
  {
    id: '4',
    deviceName: 'AP-Conference',
    ipAddress: '192.168.3.20',
    status: 'Offline',
    location: 'Conference Room',
    lastSeen: '2024-01-12 12:15',
    bandwidth: '300 Mbps',
    type: 'Access Point',
  },
  {
    id: '5',
    deviceName: 'Firewall-01',
    ipAddress: '192.168.1.2',
    status: 'Online',
    location: 'Network Room',
    lastSeen: '2024-01-12 14:30',
    bandwidth: '5 Gbps',
    type: 'Firewall',
  },
  {
    id: '6',
    deviceName: 'Server-02',
    ipAddress: '192.168.1.11',
    status: 'Maintenance',
    location: 'Data Center A',
    lastSeen: '2024-01-12 13:45',
    bandwidth: '1.2 Gbps',
    type: 'Server',
  },
  {
    id: '7',
    deviceName: 'Switch-Floor1',
    ipAddress: '192.168.1.5',
    status: 'Online',
    location: 'Floor 1',
    lastSeen: '2024-01-12 14:31',
    bandwidth: '1 Gbps',
    type: 'Switch',
  },
  {
    id: '8',
    deviceName: 'AP-Lobby',
    ipAddress: '192.168.3.21',
    status: 'Online',
    location: 'Lobby',
    lastSeen: '2024-01-12 14:27',
    bandwidth: '300 Mbps',
    type: 'Access Point',
  },
  {
    id: '9',
    deviceName: 'Printer-HR',
    ipAddress: '192.168.4.10',
    status: 'Online',
    location: 'HR Department',
    lastSeen: '2024-01-12 14:20',
    bandwidth: '100 Mbps',
    type: 'Printer',
  },
  {
    id: '10',
    deviceName: 'Camera-Entrance',
    ipAddress: '192.168.5.15',
    status: 'Online',
    location: 'Main Entrance',
    lastSeen: '2024-01-12 14:32',
    bandwidth: '50 Mbps',
    type: 'Security Camera',
  },
  {
    id: '11',
    deviceName: 'Server-Backup',
    ipAddress: '192.168.1.12',
    status: 'Online',
    location: 'Data Center B',
    lastSeen: '2024-01-12 14:25',
    bandwidth: '1.2 Gbps',
    type: 'Server',
  },
  {
    id: '12',
    deviceName: 'UPS-Main',
    ipAddress: '192.168.6.1',
    status: 'Online',
    location: 'Power Room',
    lastSeen: '2024-01-12 14:33',
    bandwidth: 'N/A',
    type: 'UPS',
  },
];

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
    isRowHeader: true,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
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
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showAlert, setShowAlert] = useState(true);
  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = devicesData.filter(
    device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(filterText.toLowerCase()) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()) ||
      device.location.toLowerCase().includes(filterText.toLowerCase())
  );

  // Paginate the filtered devices
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
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
                  { text: 'Service', href: '/' },
                  { text: 'Administrative Dashboard' },
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

              {showAlert && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setShowAlert(false),
                      dismissLabel: 'Dismiss',
                    },
                  ]}
                />
              )}

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
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={networkTrafficData}
                  height={300}
                  xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
                  yDomain={[0, 250]}
                  xScaleType="time"
                  xTitle="Day"
                  yTitle=""
                  hideFilter={false}
                  hideLegend={false}
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

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={creditUsageData}
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  hideFilter={true}
                  hideLegend={false}
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

            {/* Devices Table Section */}
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
                items={paginatedDevices}
                loadingText="Loading devices"
                sortingDisabled={false}
                variant="container"
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                ariaLabels={{
                  selectionGroupLabel: "Items selection",
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${
                      selectedItems.length === 1 ? "item" : "items"
                    } selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(
                      (i) => i.id === item.id
                    ).length;
                    return `${item.deviceName} is ${
                      isItemSelected ? "" : "not"
                    } selected`;
                  },
                }}
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      <b>No devices</b>
                    </Box>
                    <Box variant="p">No devices found on your network</Box>
                  </Box>
                }
                filter={
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Find devices"
                    filteringAriaLabel="Filter devices"
                    countText={`${filteredDevices.length} matches`}
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                }
                header={
                  <Header
                    counter={`(${filteredDevices.length})`}
                    actions={
                      <SpaceBetween direction="horizontal" size="xs">
                        <Button disabled={selectedItems.length === 0}>Edit</Button>
                        <Button disabled={selectedItems.length === 0}>Delete</Button>
                      </SpaceBetween>
                    }
                  >
                    Devices
                  </Header>
                }
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
