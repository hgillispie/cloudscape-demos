// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import ContentLayout from '@cloudscape-design/components/content-layout';

interface DeviceItem {
  id: string;
  name: string;
  type: string;
  status: string;
  ipAddress: string;
  macAddress: string;
  lastSeen: string;
  bandwidth: string;
}

const networkTrafficData = [
  { x: 'x1', y: 2.5 },
  { x: 'x2', y: 3.2 },
  { x: 'x3', y: 3.8 },
  { x: 'x4', y: 4.1 },
  { x: 'x5', y: 4.5 },
  { x: 'x6', y: 5.2 },
  { x: 'x7', y: 4.8 },
  { x: 'x8', y: 4.3 },
  { x: 'x9', y: 3.9 },
  { x: 'x10', y: 3.5 },
  { x: 'x11', y: 3.2 },
  { x: 'x12', y: 2.8 },
];

const networkTrafficData2 = [
  { x: 'x1', y: 1.8 },
  { x: 'x2', y: 2.3 },
  { x: 'x3', y: 2.1 },
  { x: 'x4', y: 2.5 },
  { x: 'x5', y: 2.2 },
  { x: 'x6', y: 3.1 },
  { x: 'x7', y: 2.9 },
  { x: 'x8', y: 2.4 },
  { x: 'x9', y: 1.5 },
  { x: 'x10', y: 1.2 },
  { x: 'x11', y: 1.8 },
  { x: 'x12', y: 1.5 },
];

const creditUsageData = [
  { x: 'x1', y: 3.2 },
  { x: 'x2', y: 4.5 },
  { x: 'x3', y: 3.8 },
  { x: 'x4', y: 2.1 },
  { x: 'x5', y: 3.7 },
];

const allDevices: DeviceItem[] = [
  {
    id: '1',
    name: 'Server-01',
    type: 'Server',
    status: 'Active',
    ipAddress: '192.168.1.10',
    macAddress: '00:1B:44:11:3A:B7',
    lastSeen: '2 minutes ago',
    bandwidth: '125 Mbps',
  },
  {
    id: '2',
    name: 'Router-Main',
    type: 'Router',
    status: 'Active',
    ipAddress: '192.168.1.1',
    macAddress: '00:1B:44:11:3A:B8',
    lastSeen: '1 minute ago',
    bandwidth: '890 Mbps',
  },
  {
    id: '3',
    name: 'Switch-Floor1',
    type: 'Switch',
    status: 'Active',
    ipAddress: '192.168.1.20',
    macAddress: '00:1B:44:11:3A:B9',
    lastSeen: '5 minutes ago',
    bandwidth: '450 Mbps',
  },
  {
    id: '4',
    name: 'AP-Office-01',
    type: 'Access Point',
    status: 'Active',
    ipAddress: '192.168.1.50',
    macAddress: '00:1B:44:11:3A:C0',
    lastSeen: '3 minutes ago',
    bandwidth: '220 Mbps',
  },
  {
    id: '5',
    name: 'Firewall-01',
    type: 'Firewall',
    status: 'Active',
    ipAddress: '192.168.1.2',
    macAddress: '00:1B:44:11:3A:C1',
    lastSeen: '1 minute ago',
    bandwidth: '780 Mbps',
  },
  {
    id: '6',
    name: 'Server-02',
    type: 'Server',
    status: 'Inactive',
    ipAddress: '192.168.1.11',
    macAddress: '00:1B:44:11:3A:C2',
    lastSeen: '2 hours ago',
    bandwidth: '0 Mbps',
  },
  {
    id: '7',
    name: 'Switch-Floor2',
    type: 'Switch',
    status: 'Active',
    ipAddress: '192.168.1.21',
    macAddress: '00:1B:44:11:3A:C3',
    lastSeen: '4 minutes ago',
    bandwidth: '380 Mbps',
  },
  {
    id: '8',
    name: 'AP-Office-02',
    type: 'Access Point',
    status: 'Active',
    ipAddress: '192.168.1.51',
    macAddress: '00:1B:44:11:3A:C4',
    lastSeen: '6 minutes ago',
    bandwidth: '195 Mbps',
  },
  {
    id: '9',
    name: 'Storage-NAS',
    type: 'Storage',
    status: 'Active',
    ipAddress: '192.168.1.100',
    macAddress: '00:1B:44:11:3A:C5',
    lastSeen: '1 minute ago',
    bandwidth: '540 Mbps',
  },
  {
    id: '10',
    name: 'Printer-Office',
    type: 'Printer',
    status: 'Active',
    ipAddress: '192.168.1.150',
    macAddress: '00:1B:44:11:3A:C6',
    lastSeen: '10 minutes ago',
    bandwidth: '2 Mbps',
  },
];

export function App() {
  const [selectedItems, setSelectedItems] = useState<DeviceItem[]>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [dismissedWarning, setDismissedWarning] = useState(false);

  const itemsPerPage = 10;

  const filteredDevices = allDevices.filter(
    device =>
      device.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.type.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(filteringText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
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
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Refresh Data
                  </Button>
                }
              >
                Network Adminstration Dashboard
              </Header>

              {!dismissedWarning && (
                <Flashbar
                  items={[
                    {
                      type: 'error',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setDismissedWarning(true),
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
                      data: networkTrafficData,
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData2,
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e => e.toString(),
                    yTickFormatter: e => `y${Math.round(e)}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="categorical"
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
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: e => e.toString(),
                    yTickFormatter: e => `y${Math.round(e)}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
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
                  id: 'ipAddress',
                  header: 'IP Address',
                  cell: item => item.ipAddress,
                  sortingField: 'ipAddress',
                },
                {
                  id: 'macAddress',
                  header: 'MAC Address',
                  cell: item => item.macAddress,
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                },
                {
                  id: 'bandwidth',
                  header: 'Bandwidth',
                  cell: item => item.bandwidth,
                  sortingField: 'bandwidth',
                },
              ]}
              items={paginatedDevices}
              loadingText="Loading devices"
              selectionType="multi"
              trackBy="id"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
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
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilteringText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                  countText={`${filteredDevices.length} matches`}
                />
              }
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="external" iconAlign="right">
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
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
