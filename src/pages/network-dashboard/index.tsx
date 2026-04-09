// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import ContentLayout from '@cloudscape-design/components/content-layout';

import '../../styles/base.scss';

const networkTrafficData = {
  site1: [
    { x: 'x1', y: 2.8 },
    { x: 'x2', y: 3.2 },
    { x: 'x3', y: 3.8 },
    { x: 'x4', y: 4.0 },
    { x: 'x5', y: 3.5 },
    { x: 'x6', y: 3.9 },
    { x: 'x7', y: 4.1 },
    { x: 'x8', y: 4.3 },
    { x: 'x9', y: 4.5 },
    { x: 'x10', y: 4.2 },
    { x: 'x11', y: 4.0 },
    { x: 'x12', y: 3.8 },
  ],
  site2: [
    { x: 'x1', y: 3.5 },
    { x: 'x2', y: 3.0 },
    { x: 'x3', y: 4.2 },
    { x: 'x4', y: 4.8 },
    { x: 'x5', y: 5.0 },
    { x: 'x6', y: 4.6 },
    { x: 'x7', y: 4.8 },
    { x: 'x8', y: 5.1 },
    { x: 'x9', y: 5.2 },
    { x: 'x10', y: 4.9 },
    { x: 'x11', y: 4.7 },
    { x: 'x12', y: 4.5 },
  ],
};

const creditUsageData = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 4.9 },
  { x: 'x4', y: 3.3 },
  { x: 'x5', y: 5.0 },
];

interface Device {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
  location: string;
}

const allDevices: Device[] = Array.from({ length: 50 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device-${String(i + 1).padStart(3, '0')}`,
  type: ['Router', 'Switch', 'Access Point', 'Server', 'Workstation'][i % 5],
  ipAddress: `192.168.${Math.floor(i / 254) + 1}.${(i % 254) + 1}`,
  status: ['Active', 'Idle', 'Offline'][i % 3],
  lastSeen: `${Math.floor(Math.random() * 60) + 1}m ago`,
  bandwidth: `${(Math.random() * 100).toFixed(1)} Mbps`,
  location: ['Floor 1', 'Floor 2', 'Floor 3', 'Data Center', 'Remote'][i % 5],
}));

const DEVICES_PER_PAGE = 12;

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [warningVisible, setWarningVisible] = useState(true);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const filteredDevices = allDevices.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const pagedDevices = filteredDevices.slice((currentPage - 1) * DEVICES_PER_PAGE, currentPage * DEVICES_PER_PAGE);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '/network-dashboard' },
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

              <SpaceBetween size="s" direction="horizontal">
                <div className="network-dashboard__filter-row">
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPage(1);
                    }}
                  />
                  <Pagination
                    currentPageIndex={currentPage}
                    pagesCount={Math.ceil(filteredDevices.length / DEVICES_PER_PAGE)}
                    onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                </div>
              </SpaceBetween>

              {warningVisible && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setWarningVisible(false),
                      id: 'network-warning',
                    },
                  ]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData.site1,
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData.site2,
                      color: '#C33D69',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 3.5,
                      color: '#5F6B7A',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Network traffic"
                  height={280}
                  hideFilter
                  ariaLabel="Network traffic area chart"
                  ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days with performance goal threshold."
                  i18nStrings={{
                    filterLabel: 'Filter displayed series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    xTickFormatter: value => String(value),
                    yTickFormatter: value => `y${value}`,
                  }}
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
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 4.0,
                      color: '#5F6B7A',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Credit Usage"
                  height={280}
                  hideFilter
                  ariaLabel="Credit usage bar chart"
                  ariaDescription="Bar chart showing credit usage for Site 1 over 5 periods with performance goal threshold."
                  i18nStrings={{
                    filterLabel: 'Filter displayed series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    xTickFormatter: value => String(value),
                    yTickFormatter: value => `y${value}`,
                  }}
                />
              </Container>
            </Grid>

            <Table
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
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device Name',
                  cell: item => item.name,
                  sortingField: 'name',
                  minWidth: 140,
                },
                {
                  id: 'type',
                  header: 'Device Type',
                  cell: item => item.type,
                  sortingField: 'type',
                  minWidth: 140,
                },
                {
                  id: 'ipAddress',
                  header: 'IP Address',
                  cell: item => item.ipAddress,
                  minWidth: 140,
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: item => item.status,
                  sortingField: 'status',
                  minWidth: 140,
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                  minWidth: 140,
                },
                {
                  id: 'bandwidth',
                  header: 'Bandwidth',
                  cell: item => item.bandwidth,
                  minWidth: 140,
                },
                {
                  id: 'location',
                  header: 'Location',
                  cell: item => item.location,
                  sortingField: 'location',
                  minWidth: 140,
                },
              ]}
              items={pagedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                  <Box variant="h3">No devices found</Box>
                  <Box variant="p">No devices match your filter criteria.</Box>
                </Box>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={Math.ceil(filteredDevices.length / DEVICES_PER_PAGE)}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
              }
              filter={
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Find devices"
                  filteringAriaLabel="Filter devices"
                  countText={`${filteredDevices.length} matches`}
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPage(1);
                  }}
                />
              }
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: ({ selectedItems }, item) =>
                  `${item.name} is ${selectedItems.indexOf(item) >= 0 ? '' : 'not '}selected`,
              }}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
