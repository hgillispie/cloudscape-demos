// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Flashbar from '@cloudscape-design/components/flashbar';

// --- Data ---

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 2.5 },
      { x: 'x2', y: 3.2 },
      { x: 'x3', y: 3.0 },
      { x: 'x4', y: 3.8 },
      { x: 'x5', y: 3.5 },
      { x: 'x6', y: 3.9 },
      { x: 'x7', y: 3.6 },
      { x: 'x8', y: 4.1 },
      { x: 'x9', y: 4.4 },
      { x: 'x10', y: 4.2 },
      { x: 'x11', y: 4.5 },
      { x: 'x12', y: 4.3 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 3.2 },
      { x: 'x2', y: 4.1 },
      { x: 'x3', y: 3.8 },
      { x: 'x4', y: 4.8 },
      { x: 'x5', y: 5.0 },
      { x: 'x6', y: 4.6 },
      { x: 'x7', y: 4.2 },
      { x: 'x8', y: 4.9 },
      { x: 'x9', y: 5.2 },
      { x: 'x10', y: 4.7 },
      { x: 'x11', y: 4.5 },
      { x: 'x12', y: 4.8 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
    color: '#5F6B7A',
  },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 4.2 },
      { x: 'x2', y: 6.5 },
      { x: 'x3', y: 5.0 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 5.2 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 4.5,
    color: '#5F6B7A',
  },
];

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  type: string;
  lastSeen: string;
  bandwidth: string;
}

const generateDevices = (): Device[] =>
  Array.from({ length: 12 }, (_, i) => ({
    id: `dev-${i + 1}`,
    name: `Device-${String(i + 1).padStart(3, '0')}`,
    ipAddress: `192.168.1.${i + 10}`,
    macAddress: `AA:BB:CC:DD:${String(i + 10).padStart(2, '0')}:FF`,
    status: i % 3 === 0 ? 'Offline' : 'Online',
    type: ['Router', 'Switch', 'Server', 'Workstation'][i % 4],
    lastSeen: `${i + 1}m ago`,
    bandwidth: `${(Math.random() * 100).toFixed(1)} Mbps`,
  }));

const allDevices = generateDevices();

const deviceColumnDefs = [
  { id: 'name', header: 'Device Name', cell: (item: Device) => item.name, sortingField: 'name' },
  { id: 'ipAddress', header: 'IP Address', cell: (item: Device) => item.ipAddress, sortingField: 'ipAddress' },
  { id: 'macAddress', header: 'MAC Address', cell: (item: Device) => item.macAddress },
  { id: 'type', header: 'Type', cell: (item: Device) => item.type, sortingField: 'type' },
  { id: 'status', header: 'Status', cell: (item: Device) => item.status, sortingField: 'status' },
  { id: 'lastSeen', header: 'Last Seen', cell: (item: Device) => item.lastSeen },
  { id: 'bandwidth', header: 'Bandwidth', cell: (item: Device) => item.bandwidth },
];

// --- Component ---

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const itemsPerPage = 10;

  const filteredDevices = allDevices.filter(
    d =>
      d.name.toLowerCase().includes(filterText.toLowerCase()) ||
      d.ipAddress.toLowerCase().includes(filterText.toLowerCase()) ||
      d.type.toLowerCase().includes(filterText.toLowerCase()),
  );

  const pagedDevices = filteredDevices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const warningItems = warningDismissed
    ? []
    : [
        {
          type: 'error' as const,
          content: 'This is a warning message',
          dismissible: true,
          onDismiss: () => setWarningDismissed(true),
          id: 'network-warning',
        },
      ];

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
                <span style={{ fontWeight: 900 }}>Network Administration Dashboard</span>
              </Header>

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, s: 8, m: 9 } },
                  { colspan: { default: 12, s: 4, m: 3 } },
                ]}
              >
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices..."
                  filteringAriaLabel="Search devices"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPage(1);
                  }}
                />
                <Box float="right">
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                    <Pagination
                      currentPageIndex={currentPage}
                      pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                      onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: n => `Page ${n}`,
                      }}
                    />
                    <Button iconName="settings" variant="icon" ariaLabel="Table preferences" />
                  </SpaceBetween>
                </Box>
              </Grid>

              <Flashbar items={warningItems} />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <AreaChart
                series={networkTrafficSeries}
                xScaleType="categorical"
                xTitle="Day"
                yTitle=""
                height={300}
                fitHeight={false}
                hideFilter
                ariaLabel="Network traffic area chart"
                statusType="finished"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  detailTotalLabel: 'Total',
                }}
                header={
                  <Box variant="h3" fontWeight="bold">
                    Network traffic
                  </Box>
                }
              />

              <BarChart
                series={creditUsageSeries}
                xScaleType="categorical"
                xTitle="Day"
                height={300}
                fitHeight={false}
                hideFilter
                ariaLabel="Credit usage bar chart"
                statusType="finished"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  detailTotalLabel: 'Total',
                }}
                header={
                  <Box variant="h3" fontWeight="bold">
                    Credit Usage
                  </Box>
                }
              />
            </Grid>

            {/* My Devices Table */}
            <Table
              columnDefinitions={deviceColumnDefs}
              items={pagedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              sortingDisabled={false}
              header={
                <Header
                  counter={`(${filteredDevices.length})`}
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
              empty={
                <Box textAlign="center" color="inherit" margin={{ top: 'l', bottom: 'l' }}>
                  <Box variant="h3">No devices found</Box>
                  <Box variant="p">Try adjusting your search criteria.</Box>
                </Box>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: n => `Page ${n}`,
                  }}
                />
              }
              filter={
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices..."
                  filteringAriaLabel="Search devices"
                  countText={`${filteredDevices.length} match${filteredDevices.length === 1 ? '' : 'es'}`}
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPage(1);
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
