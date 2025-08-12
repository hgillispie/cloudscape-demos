// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

// Mock data for the area chart (Network Traffic)
const networkTrafficData = [
  { x: 'x1', site1: 25, site2: 15 },
  { x: 'x2', site1: 28, site2: 18 },
  { x: 'x3', site1: 32, site2: 22 },
  { x: 'x4', site1: 35, site2: 25 },
  { x: 'x5', site1: 38, site2: 28 },
  { x: 'x6', site1: 42, site2: 32 },
  { x: 'x7', site1: 45, site2: 35 },
  { x: 'x8', site1: 48, site2: 38 },
  { x: 'x9', site1: 46, site2: 40 },
  { x: 'x10', site1: 50, site2: 42 },
  { x: 'x11', site1: 52, site2: 45 },
  { x: 'x12', site1: 55, site2: 48 },
];

// Mock data for the bar chart (Credit Usage)
const creditUsageData = [
  { x: 'x1', value: 183 },
  { x: 'x2', value: 257 },
  { x: 'x3', value: 213 },
  { x: 'x4', value: 122 },
  { x: 'x5', value: 210 },
];

// Mock data for the devices table
const devicesData = [
  { id: '1', name: 'Device-001', type: 'Router', status: 'Active', ip: '192.168.1.1', location: 'Office A', lastSeen: '2 min ago' },
  { id: '2', name: 'Device-002', type: 'Switch', status: 'Active', ip: '192.168.1.2', location: 'Office B', lastSeen: '5 min ago' },
  { id: '3', name: 'Device-003', type: 'Access Point', status: 'Inactive', ip: '192.168.1.3', location: 'Office C', lastSeen: '1 hour ago' },
  { id: '4', name: 'Device-004', type: 'Firewall', status: 'Active', ip: '192.168.1.4', location: 'Data Center', lastSeen: '1 min ago' },
  { id: '5', name: 'Device-005', type: 'Router', status: 'Warning', ip: '192.168.1.5', location: 'Remote Site', lastSeen: '30 min ago' },
];

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
    id: 'ip',
    header: 'IP Address',
    cell: (item: any) => item.ip,
    sortingField: 'ip',
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
  const [showWarning, setShowWarning] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  // Filter devices based on search text
  const filteredDevices = devicesData.filter(device =>
    device.name.toLowerCase().includes(filterText.toLowerCase()) ||
    device.type.toLowerCase().includes(filterText.toLowerCase()) ||
    device.status.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
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
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

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

              <SpaceBetween size="m" direction="horizontal">
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredDevices.length / 10)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
              </SpaceBetween>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              {/* Network Traffic Area Chart */}
              <Container
                header={
                  <Box variant="h3" color="text-label">
                    Network traffic
                  </Box>
                }
              >
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData.map(point => ({ x: point.x, y: point.site1 })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData.map(point => ({ x: point.x, y: point.site2 })),
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={networkTrafficData.map(point => point.x)}
                  yDomain={[0, 60]}
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
                  xTitle="Day"
                  yTitle=""
                  hideLegend={false}
                  legendTitle="Performance goal"
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
                        Try different filter settings
                      </Box>
                    </Box>
                  }
                />
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container
                header={
                  <Box variant="h3" color="text-label">
                    Credit Usage
                  </Box>
                }
              >
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={creditUsageData.map(point => point.x)}
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
                  xTitle="Day"
                  yTitle=""
                  hideLegend={false}
                  legendTitle="Performance goal"
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
                        Try different filter settings
                      </Box>
                    </Box>
                  }
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
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                selectionType="multi"
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => item.name,
                }}
                trackBy="id"
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
                loadingText="Loading devices"
                sortingDisabled
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
