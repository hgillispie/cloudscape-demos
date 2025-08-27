// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import ColumnLayout from '@cloudscape-design/components/column-layout';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Mock data for network traffic area chart
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 25 },
      { x: new Date('2024-01-02'), y: 30 },
      { x: new Date('2024-01-03'), y: 35 },
      { x: new Date('2024-01-04'), y: 28 },
      { x: new Date('2024-01-05'), y: 32 },
      { x: new Date('2024-01-06'), y: 40 },
      { x: new Date('2024-01-07'), y: 38 },
      { x: new Date('2024-01-08'), y: 42 },
      { x: new Date('2024-01-09'), y: 45 },
      { x: new Date('2024-01-10'), y: 48 },
      { x: new Date('2024-01-11'), y: 44 },
      { x: new Date('2024-01-12'), y: 50 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 15 },
      { x: new Date('2024-01-02'), y: 18 },
      { x: new Date('2024-01-03'), y: 22 },
      { x: new Date('2024-01-04'), y: 25 },
      { x: new Date('2024-01-05'), y: 20 },
      { x: new Date('2024-01-06'), y: 28 },
      { x: new Date('2024-01-07'), y: 30 },
      { x: new Date('2024-01-08'), y: 26 },
      { x: new Date('2024-01-09'), y: 32 },
      { x: new Date('2024-01-10'), y: 35 },
      { x: new Date('2024-01-11'), y: 38 },
      { x: new Date('2024-01-12'), y: 40 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    data: [
      { x: new Date('2024-01-01'), y: 35 },
      { x: new Date('2024-01-02'), y: 35 },
      { x: new Date('2024-01-03'), y: 35 },
      { x: new Date('2024-01-04'), y: 35 },
      { x: new Date('2024-01-05'), y: 35 },
      { x: new Date('2024-01-06'), y: 35 },
      { x: new Date('2024-01-07'), y: 35 },
      { x: new Date('2024-01-08'), y: 35 },
      { x: new Date('2024-01-09'), y: 35 },
      { x: new Date('2024-01-10'), y: 35 },
      { x: new Date('2024-01-11'), y: 35 },
      { x: new Date('2024-01-12'), y: 35 },
    ],
    color: '#5F6B7A',
  },
];

// Mock data for credit usage bar chart
const creditUsageData = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 75 },
      { x: 'x2', y: 95 },
      { x: 'x3', y: 85 },
      { x: 'x4', y: 60 },
      { x: 'x5', y: 90 },
    ],
    color: '#688AE8',
  },
];

// Mock data for devices table
const devicesData = [
  {
    id: '1',
    name: 'Router-Main',
    ipAddress: '192.168.1.1',
    status: 'Online',
    type: 'Router',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    name: 'Switch-Core',
    ipAddress: '192.168.1.10',
    status: 'Online',
    type: 'Switch',
    lastSeen: '5 minutes ago',
    bandwidth: '10 Gbps',
  },
  {
    id: '3',
    name: 'AP-Office-1',
    ipAddress: '192.168.1.20',
    status: 'Offline',
    type: 'Access Point',
    lastSeen: '2 hours ago',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    name: 'Firewall-Edge',
    ipAddress: '192.168.1.2',
    status: 'Online',
    type: 'Firewall',
    lastSeen: '1 minute ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '5',
    name: 'Server-DB',
    ipAddress: '192.168.1.100',
    status: 'Online',
    type: 'Server',
    lastSeen: '30 seconds ago',
    bandwidth: '10 Gbps',
  },
];

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
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
    cell: (item: any) => (
      <Box color={item.status === 'Online' ? 'text-status-success' : 'text-status-error'}>{item.status}</Box>
    ),
    sortingField: 'status',
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

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'error',
      content: 'This is a warning message',
      dismissible: true,
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const filteredItems = devicesData.filter(
    item =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.ipAddress.includes(filterText) ||
      item.type.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <HelpPanelProvider value={() => {}}>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="l">
            {/* Alert Banner */}
            {showAlert && (
              <Alert statusIconAriaLabel="Error" type="error" dismissible onDismiss={() => setShowAlert(false)}>
                This is a warning message
              </Alert>
            )}

            {/* Main Header */}
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

            {/* Search and Pagination Controls */}
            <Container>
              <SpaceBetween size="m" direction="horizontal">
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Find demos"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={5}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                />
              </SpaceBetween>
            </Container>

            {/* Charts Section */}
            <ColumnLayout columns={2} variant="text-grid">
              <Container>
                <AreaChart
                  series={networkTrafficData}
                  xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
                  yDomain={[0, 60]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Search in data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e => {
                      const date = e instanceof Date ? e : new Date(e);
                      return date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                    },
                    yTickFormatter: function o(e) {
                      return Math.abs(e) >= 1e9
                        ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                        : Math.abs(e) >= 1e6
                          ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                          : Math.abs(e) >= 1e3
                            ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                            : e.toString();
                    },
                  }}
                  ariaLabel="Network traffic"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  xTitle="Day"
                  yTitle="Network traffic"
                />
              </Container>

              <Container>
                <BarChart
                  series={creditUsageData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Search in data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    yTickFormatter: function o(e) {
                      return Math.abs(e) >= 1e9
                        ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                        : Math.abs(e) >= 1e6
                          ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                          : Math.abs(e) >= 1e3
                            ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                            : e.toString();
                    },
                  }}
                  ariaLabel="Credit Usage"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  xTitle="Day"
                  yTitle="Credit Usage"
                />
              </Container>
            </ColumnLayout>

            {/* Devices Table Section */}
            <Container>
              <Table
                columnDefinitions={columnDefinitions}
                items={filteredItems}
                loadingText="Loading devices"
                sortingDisabled
                variant="container"
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
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
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      No devices to display.
                    </Box>
                  </Box>
                }
              />
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
        tools={<div>Tools content can go here</div>}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
      />
    </HelpPanelProvider>
  );
}
