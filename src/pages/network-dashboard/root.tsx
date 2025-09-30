// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useMemo } from 'react';

import Alert from '@cloudscape-design/components/alert';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Breadcrumbs, Navigation, Notifications } from '../commons/common-components';
import { CustomAppLayout } from '../commons/common-components';

import '../../styles/base.scss';
import '../../styles/network-dashboard.scss';

// Mock data for network traffic (area chart)
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 45 },
      { x: 'x2', y: 52 },
      { x: 'x3', y: 48 },
      { x: 'x4', y: 61 },
      { x: 'x5', y: 55 },
      { x: 'x6', y: 67 },
      { x: 'x7', y: 59 },
      { x: 'x8', y: 73 },
      { x: 'x9', y: 68 },
      { x: 'x10', y: 81 },
      { x: 'x11', y: 76 },
      { x: 'x12', y: 89 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 32 },
      { x: 'x2', y: 38 },
      { x: 'x3', y: 35 },
      { x: 'x4', y: 42 },
      { x: 'x5', y: 39 },
      { x: 'x6', y: 46 },
      { x: 'x7', y: 43 },
      { x: 'x8', y: 51 },
      { x: 'x9', y: 47 },
      { x: 'x10', y: 58 },
      { x: 'x11', y: 54 },
      { x: 'x12', y: 62 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    data: [
      { x: 'x1', y: 50 },
      { x: 'x12', y: 50 },
    ],
    color: '#5F6B7A',
  },
];

// Mock data for credit usage (bar chart)
const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 65 },
      { x: 'x2', y: 92 },
      { x: 'x3', y: 78 },
      { x: 'x4', y: 45 },
      { x: 'x5', y: 83 },
    ],
    color: '#688AE8',
  },
];

// Mock data for devices table
const devicesData = [
  { id: '1', deviceName: 'Router-01', ipAddress: '192.168.1.1', status: 'Active', lastSeen: '2 minutes ago', bandwidth: '100 Mbps', location: 'Data Center A', type: 'Router' },
  { id: '2', deviceName: 'Switch-01', ipAddress: '192.168.1.10', status: 'Active', lastSeen: '1 minute ago', bandwidth: '1 Gbps', location: 'Data Center A', type: 'Switch' },
  { id: '3', deviceName: 'AP-Office-01', ipAddress: '192.168.1.50', status: 'Warning', lastSeen: '5 minutes ago', bandwidth: '300 Mbps', location: 'Office Floor 1', type: 'Access Point' },
  { id: '4', deviceName: 'Firewall-01', ipAddress: '192.168.1.2', status: 'Active', lastSeen: '30 seconds ago', bandwidth: '500 Mbps', location: 'Data Center A', type: 'Firewall' },
  { id: '5', deviceName: 'Server-DB-01', ipAddress: '192.168.1.100', status: 'Active', lastSeen: '1 minute ago', bandwidth: '10 Gbps', location: 'Data Center B', type: 'Server' },
  { id: '6', deviceName: 'AP-Office-02', ipAddress: '192.168.1.51', status: 'Inactive', lastSeen: '2 hours ago', bandwidth: '300 Mbps', location: 'Office Floor 2', type: 'Access Point' },
  { id: '7', deviceName: 'Switch-02', ipAddress: '192.168.1.11', status: 'Active', lastSeen: '3 minutes ago', bandwidth: '1 Gbps', location: 'Data Center B', type: 'Switch' },
  { id: '8', deviceName: 'Load-Balancer-01', ipAddress: '192.168.1.20', status: 'Active', lastSeen: '45 seconds ago', bandwidth: '2 Gbps', location: 'Data Center A', type: 'Load Balancer' },
];

const deviceColumnDefinitions = [
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
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Box color={item.status === 'Active' ? 'text-status-success' : item.status === 'Warning' ? 'text-status-warning' : 'text-status-error'}>
        {item.status}
      </Box>
    ),
    sortingField: 'status',
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
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
];

export function App() {
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [isWarningDismissed, setIsWarningDismissed] = useState(false);

  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = useMemo(() => {
    if (!filterText) return devicesData;
    return devicesData.filter(device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()) ||
      device.location.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  // Paginate filtered devices
  const paginatedDevices = useMemo(() => {
    const startIndex = (currentPageIndex - 1) * itemsPerPage;
    return filteredDevices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDevices, currentPageIndex]);

  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            actions={
              <Button variant="primary" iconAlign="right" iconName="refresh">
                Refresh Data
              </Button>
            }
          >
            Network Administration Dashboard
          </Header>

          <Box variant="p" color="text-body-secondary">
            Network Traffic, Credit Usage, and Your Devices
          </Box>

          {!isWarningDismissed && (
            <Alert
              type="warning"
              dismissible
              onDismiss={() => setIsWarningDismissed(true)}
              dismissAriaLabel="Dismiss warning"
            >
              This is a warning message
            </Alert>
          )}

          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            <Container>
              <AreaChart
                series={networkTrafficSeries}
                xTitle="Day"
                yTitle="Network traffic"
                height={300}
                xScaleType="categorical"
                hideLegend={false}
                ariaLabel="Network traffic over time for Site 1 and Site 2"
                i18nStrings={{
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'Area chart showing network traffic trends',
                }}
              />
            </Container>

            <Container>
              <BarChart
                series={creditUsageSeries}
                xTitle="Day"
                yTitle="Credit Usage"
                height={300}
                xScaleType="categorical"
                hideLegend={false}
                ariaLabel="Credit usage by day"
                i18nStrings={{
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'Bar chart showing credit usage over time',
                }}
              />
            </Container>
          </Grid>

          <Container
            header={
              <Header
                variant="h2"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="add-plus">
                    Add Device
                  </Button>
                }
                counter={`(${filteredDevices.length})`}
              >
                My Devices
              </Header>
            }
          >
            <SpaceBetween size="m">
              <Box variant="p" color="text-body-secondary">
                Devices on your local network
              </Box>

              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter devices"
                onChange={({ detail }) => {
                  setFilterText(detail.filteringText);
                  setCurrentPageIndex(1);
                }}
              />

              <Table
                columnDefinitions={deviceColumnDefinitions}
                items={paginatedDevices}
                loadingText="Loading devices"
                selectedItems={selectedDevices}
                onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
                selectionType="multi"
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => item.deviceName,
                }}
                header={
                  <Header counter={`(${filteredDevices.length})`}>
                    Devices
                  </Header>
                }
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={totalPages}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of ${totalPages}`,
                    }}
                  />
                }
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No devices
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      No devices found.
                    </Box>
                    <Button>Add device</Button>
                  </Box>
                }
              />
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      }
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-dashboard' },
          ]}
        />
      }
      navigation={<Navigation activeHref="#/network-dashboard" />}
      toolsHide={true}
      notifications={<Notifications />}
    />
  );
}
