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
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Sample data for Network Traffic chart
const networkTrafficData = [
  { x: 'x1', y1: 150, y2: 130 },
  { x: 'x2', y1: 180, y2: 160 },
  { x: 'x3', y1: 200, y2: 185 },
  { x: 'x4', y1: 220, y2: 210 },
  { x: 'x5', y1: 250, y2: 240 },
  { x: 'x6', y1: 280, y2: 270 },
  { x: 'x7', y1: 260, y2: 250 },
  { x: 'x8', y1: 240, y2: 230 },
  { x: 'x9', y1: 210, y2: 200 },
  { x: 'x10', y1: 190, y2: 180 },
  { x: 'x11', y1: 170, y2: 160 },
  { x: 'x12', y1: 150, y2: 140 },
];

// Sample data for Credit Usage chart
const creditUsageData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
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
    cell: (item: typeof devicesData[0]) => item.name,
    sortingField: 'name',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: typeof devicesData[0]) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: typeof devicesData[0]) => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: typeof devicesData[0]) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: typeof devicesData[0]) => item.type,
    sortingField: 'type',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: typeof devicesData[0]) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: typeof devicesData[0]) => item.lastSeen,
    sortingField: 'lastSeen',
  },
];

export function App() {
  const [filterText, setFilterText] = useState('');
  const [selectedItems, setSelectedItems] = useState<typeof devicesData>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);
  const itemsPerPage = 5;

  const filteredDevices = devicesData.filter(device =>
    device.name.toLowerCase().includes(filterText.toLowerCase())
  );

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
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {showWarning && (
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    dismissLabel: 'Dismiss',
                    onDismiss: () => setShowWarning(false),
                    buttonText: 'Dismiss',
                    onButtonClick: () => setShowWarning(false),
                  },
                ]}
              />
            )}

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <Box variant="h2" padding={{ bottom: 's' }}>
                  Network traffic
                </Box>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                      valueFormatter: (value) => `${value}`,
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                      valueFormatter: (value) => `${value}`,
                    },
                  ]}
                  xDomain={networkTrafficData.map(d => d.x)}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
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
                <Box variant="h2" padding={{ bottom: 's' }}>
                  Credit Usage
                </Box>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      valueFormatter: (value) => `${value}`,
                    },
                  ]}
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
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
                    filteringPlaceholder="Placeholder"
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
