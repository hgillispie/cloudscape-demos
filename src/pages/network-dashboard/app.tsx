// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Flashbar from '@cloudscape-design/components/flashbar';
import BarChart from '@cloudscape-design/components/bar-chart';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Chart data for Network Traffic
const networkTrafficData = [
  { x: 'Day 1', y: 150 },
  { x: 'Day 2', y: 180 },
  { x: 'Day 3', y: 200 },
  { x: 'Day 4', y: 220 },
  { x: 'Day 5', y: 250 },
  { x: 'Day 6', y: 280 },
  { x: 'Day 7', y: 260 },
  { x: 'Day 8', y: 240 },
  { x: 'Day 9', y: 210 },
  { x: 'Day 10', y: 190 },
  { x: 'Day 11', y: 170 },
  { x: 'Day 12', y: 150 },
];

// Chart data for Credit Usage
const creditUsageData = [
  { x: 'Mon', y: 183 },
  { x: 'Tue', y: 257 },
  { x: 'Wed', y: 213 },
  { x: 'Thu', y: 122 },
  { x: 'Fri', y: 210 },
];

// Sample data for devices table
const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  ipAddress: `192.168.1.${i + 10}`,
  macAddress: `00:1B:44:11:3A:${(i + 10).toString(16).toUpperCase().padStart(2, '0')}`,
  status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
  type: i % 2 === 0 ? 'Router' : 'Switch',
  location: `Floor ${Math.floor(i / 3) + 1}`,
  lastSeen: `${i + 1} hours ago`,
}));

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: (typeof devicesData)[0]) => item.name,
    sortingField: 'name',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: (typeof devicesData)[0]) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: (typeof devicesData)[0]) => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: (typeof devicesData)[0]) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: (typeof devicesData)[0]) => item.type,
    sortingField: 'type',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: (typeof devicesData)[0]) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: (typeof devicesData)[0]) => item.lastSeen,
    sortingField: 'lastSeen',
  },
];

export function App() {
  const [filterText, setFilterText] = useState('');
  const [selectedItems, setSelectedItems] = useState<typeof devicesData>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);
  const itemsPerPage = 5;

  const filteredDevices = devicesData.filter(device => device.name.toLowerCase().includes(filterText.toLowerCase()));

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
                Network Admin Dashboard
              </Header>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {showWarning && (
              <Flashbar
                items={[
                  {
                    type: 'error',
                    content: 'This is a warning message',
                    dismissible: true,
                    onDismiss: () => setShowWarning(false),
                  },
                ]}
              />
            )}

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <Header variant="h2" description="Daily network traffic">
                  Network Traffic
                </Header>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: networkTrafficData,
                    },
                  ]}
                  xDomain={networkTrafficData.map(d => d.x)}
                  yDomain={[0, 300]}
                  hideFilter={true}
                  hideLegend={true}
                  fitHeight={true}
                  height={20}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  ariaLabel="Network traffic bar chart"
                />
              </Container>

              <Container>
                <Header variant="h2" description="Daily credit usage">
                  Credit Usage
                </Header>
                <BarChart
                  series={[
                    {
                      title: 'Credits Used',
                      type: 'bar',
                      data: creditUsageData,
                    },
                  ]}
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 300]}
                  hideFilter={true}
                  hideLegend={true}
                  fitHeight={true}
                  height={20}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  ariaLabel="Credit usage bar chart"
                />
              </Container>
            </Grid>

            <Table
              columnDefinitions={columnDefinitions}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: (_, item) => item.name,
              }}
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
              filter={
                <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Find devices"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                  <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                      <Pagination
                        currentPageIndex={currentPageIndex}
                        onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                        pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                        ariaLabels={{
                          nextPageLabel: 'Next page',
                          previousPageLabel: 'Previous page',
                          pageLabel: pageNumber => `Page ${pageNumber}`,
                        }}
                      />
                      <Button iconName="settings" variant="icon" />
                    </SpaceBetween>
                  </Box>
                </Grid>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Button>Add device</Button>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
