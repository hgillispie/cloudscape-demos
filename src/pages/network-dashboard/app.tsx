// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { CustomAppLayout } from '../commons/common-components';

// ─── Network Traffic Chart Data ───────────────────────────────────────────────

const TRAFFIC_DAYS = ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7','Day 8','Day 9','Day 10','Day 11','Day 12'];

const SITE1_VALS = [189, 181, 115, 95, 154, 160, 108, 63, 100, 157, 149, 149];
const SITE2_VALS = [270, 318, 230, 200, 360, 350, 340, 270, 360, 360, 340, 290];

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: TRAFFIC_DAYS.map((x, i) => ({ x, y: SITE1_VALS[i] })),
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: TRAFFIC_DAYS.map((x, i) => ({ x, y: SITE2_VALS[i] })),
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 280,
    color: '#5F6B7A',
  },
];

// ─── Credit Usage Chart Data ──────────────────────────────────────────────────

const CREDIT_WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'Week 1', y: 400 },
      { x: 'Week 2', y: 600 },
      { x: 'Week 3', y: 480 },
      { x: 'Week 4', y: 320 },
      { x: 'Week 5', y: 490 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 440,
    color: '#5F6B7A',
  },
];

// ─── Device Table Data ────────────────────────────────────────────────────────

interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  lastSeen: string;
  trafficIn: string;
}

const ALL_DEVICES: Device[] = [
  { id: '1', deviceName: 'Router-001', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:DD:EE:01', deviceType: 'Router', status: 'Online', lastSeen: '1 min ago', trafficIn: '45.2 MB/s' },
  { id: '2', deviceName: 'Switch-002', ipAddress: '192.168.1.2', macAddress: 'AA:BB:CC:DD:EE:02', deviceType: 'Switch', status: 'Online', lastSeen: '2 min ago', trafficIn: '82.7 MB/s' },
  { id: '3', deviceName: 'Server-003', ipAddress: '192.168.1.3', macAddress: 'AA:BB:CC:DD:EE:03', deviceType: 'Server', status: 'Offline', lastSeen: '15 min ago', trafficIn: '0 MB/s' },
  { id: '4', deviceName: 'Workstation-004', ipAddress: '192.168.1.4', macAddress: 'AA:BB:CC:DD:EE:04', deviceType: 'Workstation', status: 'Online', lastSeen: '4 min ago', trafficIn: '12.1 MB/s' },
  { id: '5', deviceName: 'Printer-005', ipAddress: '192.168.1.5', macAddress: 'AA:BB:CC:DD:EE:05', deviceType: 'Printer', status: 'Warning', lastSeen: '5 min ago', trafficIn: '0.3 MB/s' },
  { id: '6', deviceName: 'Router-006', ipAddress: '192.168.1.6', macAddress: 'AA:BB:CC:DD:EE:06', deviceType: 'Router', status: 'Online', lastSeen: '1 min ago', trafficIn: '67.9 MB/s' },
  { id: '7', deviceName: 'Switch-007', ipAddress: '192.168.1.7', macAddress: 'AA:BB:CC:DD:EE:07', deviceType: 'Switch', status: 'Online', lastSeen: '3 min ago', trafficIn: '55.4 MB/s' },
  { id: '8', deviceName: 'Server-008', ipAddress: '192.168.1.8', macAddress: 'AA:BB:CC:DD:EE:08', deviceType: 'Server', status: 'Online', lastSeen: '2 min ago', trafficIn: '93.0 MB/s' },
  { id: '9', deviceName: 'Workstation-009', ipAddress: '192.168.1.9', macAddress: 'AA:BB:CC:DD:EE:09', deviceType: 'Workstation', status: 'Offline', lastSeen: '30 min ago', trafficIn: '0 MB/s' },
  { id: '10', deviceName: 'Printer-010', ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:DD:EE:0A', deviceType: 'Printer', status: 'Online', lastSeen: '8 min ago', trafficIn: '0.1 MB/s' },
  { id: '11', deviceName: 'Router-011', ipAddress: '192.168.1.11', macAddress: 'AA:BB:CC:DD:EE:0B', deviceType: 'Router', status: 'Online', lastSeen: '1 min ago', trafficIn: '38.6 MB/s' },
  { id: '12', deviceName: 'Switch-012', ipAddress: '192.168.1.12', macAddress: 'AA:BB:CC:DD:EE:0C', deviceType: 'Switch', status: 'Warning', lastSeen: '6 min ago', trafficIn: '11.2 MB/s' },
];

const COLUMN_DEFINITIONS = [
  { id: 'deviceName', header: 'Device Name', cell: (d: Device) => d.deviceName, sortingField: 'deviceName' },
  { id: 'ipAddress', header: 'IP Address', cell: (d: Device) => d.ipAddress, sortingField: 'ipAddress' },
  { id: 'macAddress', header: 'MAC Address', cell: (d: Device) => d.macAddress },
  { id: 'deviceType', header: 'Device Type', cell: (d: Device) => d.deviceType, sortingField: 'deviceType' },
  { id: 'status', header: 'Status', cell: (d: Device) => d.status, sortingField: 'status' },
  { id: 'lastSeen', header: 'Last Seen', cell: (d: Device) => d.lastSeen, sortingField: 'lastSeen' },
  { id: 'trafficIn', header: 'Traffic (In)', cell: (d: Device) => d.trafficIn },
];

const PAGE_SIZE = 10;

// ─── Main Component ───────────────────────────────────────────────────────────

export function App() {
  const [warningVisible, setWarningVisible] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const filteredDevices = ALL_DEVICES.filter(
    d =>
      filterText === '' ||
      d.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      d.ipAddress.includes(filterText) ||
      d.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      d.status.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredDevices.length / PAGE_SIZE));
  const pagedDevices = filteredDevices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (text: string) => {
    setFilterText(text);
    setCurrentPage(1);
  };

  return (
    <CustomAppLayout
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
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              <Flashbar
                items={
                  warningVisible
                    ? [
                        {
                          id: 'network-dashboard-warning',
                          type: 'warning',
                          content: 'This is a warning message',
                          dismissible: true,
                          dismissLabel: 'Dismiss warning message',
                          onDismiss: () => setWarningVisible(false),
                        },
                      ]
                    : []
                }
              />

              <div className="dashboard-filter-row">
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices..."
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => handleFilterChange(detail.filteringText)}
                />
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={totalPages}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                />
              </div>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="xl">
            {/* ── Charts ── */}
            <ColumnLayout columns={2} variant="default">
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={networkTrafficSeries}
                  xScaleType="categorical"
                  xDomain={TRAFFIC_DAYS}
                  yDomain={[0, 450]}
                  xTitle="Day"
                  yTitle="Traffic (MB/s)"
                  height={280}
                  ariaLabel="Network traffic"
                  hideFilter
                  i18nStrings={{
                    filterLabel: 'Filter displayed series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                  }}
                />
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={creditUsageSeries}
                  xScaleType="categorical"
                  xDomain={CREDIT_WEEKS}
                  yDomain={[0, 700]}
                  xTitle="Day"
                  yTitle="Credits Used"
                  height={280}
                  ariaLabel="Credit usage"
                  hideFilter
                  i18nStrings={{
                    filterLabel: 'Filter displayed series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                  }}
                />
              </Container>
            </ColumnLayout>

            {/* ── My Devices Table ── */}
            <Table
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  counter={`(${filteredDevices.length})`}
                  actions={
                    <Button variant="primary" iconName="external" iconAlign="right">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              columnDefinitions={COLUMN_DEFINITIONS}
              items={pagedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              filter={
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices..."
                  filteringAriaLabel="Filter devices table"
                  countText={filterText ? `${filteredDevices.length} matches` : undefined}
                  onChange={({ detail }) => handleFilterChange(detail.filteringText)}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={totalPages}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                />
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <SpaceBetween size="xxs">
                    <div><b>No devices found</b></div>
                    <Box variant="p" color="inherit">No devices match your filter criteria.</Box>
                  </SpaceBetween>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
