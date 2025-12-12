// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';

export function NetworkDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

  // Sample data for network traffic area chart
  const networkTrafficData = [
    {
      title: 'Site 1',
      type: 'area',
      data: [
        { x: new Date(2024, 0, 1), y: 3 },
        { x: new Date(2024, 0, 2), y: 3.5 },
        { x: new Date(2024, 0, 3), y: 3.2 },
        { x: new Date(2024, 0, 4), y: 3.8 },
        { x: new Date(2024, 0, 5), y: 4.1 },
        { x: new Date(2024, 0, 6), y: 4.5 },
        { x: new Date(2024, 0, 7), y: 3.8 },
        { x: new Date(2024, 0, 8), y: 3.5 },
        { x: new Date(2024, 0, 9), y: 3.7 },
        { x: new Date(2024, 0, 10), y: 3.2 },
        { x: new Date(2024, 0, 11), y: 2.8 },
        { x: new Date(2024, 0, 12), y: 2.5 },
      ],
    },
    {
      title: 'Site 2',
      type: 'area',
      data: [
        { x: new Date(2024, 0, 1), y: 1.8 },
        { x: new Date(2024, 0, 2), y: 2.2 },
        { x: new Date(2024, 0, 3), y: 2.8 },
        { x: new Date(2024, 0, 4), y: 3.5 },
        { x: new Date(2024, 0, 5), y: 4.2 },
        { x: new Date(2024, 0, 6), y: 4.8 },
        { x: new Date(2024, 0, 7), y: 5.2 },
        { x: new Date(2024, 0, 8), y: 4.8 },
        { x: new Date(2024, 0, 9), y: 4.5 },
        { x: new Date(2024, 0, 10), y: 3.8 },
        { x: new Date(2024, 0, 11), y: 3.2 },
        { x: new Date(2024, 0, 12), y: 2.8 },
      ],
    },
  ];

  // Sample data for credit usage bar chart
  const creditUsageData = [
    { x: 'x1', y: 183 },
    { x: 'x2', y: 257 },
    { x: 'x3', y: 213 },
    { x: 'x4', y: 122 },
    { x: 'x5', y: 210 },
  ];

  // Sample data for devices table
  const deviceItems = Array.from({ length: 50 }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `Device ${i + 1}`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
    ipAddress: `192.168.1.${i + 1}`,
    macAddress: `00:1B:44:11:3A:${(i + 10).toString(16).toUpperCase()}`,
    type: i % 4 === 0 ? 'Router' : i % 4 === 1 ? 'Switch' : i % 4 === 2 ? 'Access Point' : 'Computer',
    location: i % 2 === 0 ? 'Building A' : 'Building B',
    lastSeen: new Date(2024, 0, Math.floor(Math.random() * 12) + 1).toLocaleDateString(),
  }));

  const itemsPerPage = 10;
  const paginatedDevices = deviceItems.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Name',
      cell: (item: any) => item.name,
      sortingField: 'name',
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
      id: 'macAddress',
      header: 'MAC Address',
      cell: (item: any) => item.macAddress,
      sortingField: 'macAddress',
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
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: any) => item.lastSeen,
      sortingField: 'lastSeen',
    },
  ];

  return (
    <AppLayout
      navigationHide
      toolsHide
      contentType="default"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-dashboard' },
          ]}
        />
      }
      content={
        <SpaceBetween size="l">
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

          {flashbarItems.length > 0 && <Flashbar items={flashbarItems} />}

          <Grid
            gridDefinition={[
              { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
              { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
            ]}
          >
            <Container header={<Header variant="h2">Network traffic</Header>}>
              <AreaChart
                series={networkTrafficData}
                xDomain={[new Date(2024, 0, 1), new Date(2024, 0, 12)]}
                yDomain={[0, 6]}
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  xTickFormatter: e =>
                    e
                      .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      .split(' ')
                      .reverse()
                      .join(' '),
                  yTickFormatter: undefined,
                }}
                ariaLabel="Network traffic area chart"
                height={300}
                hideFilter
                hideLegend={false}
                statusType="finished"
                xScaleType="time"
                xTitle="Day"
                yTitle=""
              />
            </Container>

            <Container header={<Header variant="h2">Credit Usage</Header>}>
              <BarChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageData,
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
                  xTickFormatter: e => e.toString(),
                  yTickFormatter: undefined,
                }}
                ariaLabel="Credit usage bar chart"
                height={300}
                hideFilter
                hideLegend={false}
                statusType="finished"
                xScaleType="categorical"
                xTitle="Day"
                yTitle=""
              />
            </Container>
          </Grid>

          <Container
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
          >
            <Table
              columnDefinitions={columnDefinitions}
              items={paginatedDevices}
              loadingText="Loading devices"
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems as any)}
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Button>Add device</Button>
                </Box>
              }
              filter={
                <Input
                  type="search"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  placeholder="Placeholder"
                />
              }
              header={<Header counter={`(${deviceItems.length})`}>Devices</Header>}
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(deviceItems.length / itemsPerPage)}
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
