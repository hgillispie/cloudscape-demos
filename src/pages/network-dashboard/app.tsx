// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Checkbox from '@cloudscape-design/components/checkbox';
import Box from '@cloudscape-design/components/box';
import { ContentLayout } from './components/content-layout';

// Sample data for charts
const networkTrafficData = [
  { x: new Date(2024, 0, 1), y1: 20, y2: 15 },
  { x: new Date(2024, 0, 2), y1: 25, y2: 18 },
  { x: new Date(2024, 0, 3), y1: 30, y2: 22 },
  { x: new Date(2024, 0, 4), y1: 35, y2: 28 },
  { x: new Date(2024, 0, 5), y1: 40, y2: 32 },
  { x: new Date(2024, 0, 6), y1: 45, y2: 35 },
  { x: new Date(2024, 0, 7), y1: 50, y2: 40 },
  { x: new Date(2024, 0, 8), y1: 48, y2: 38 },
  { x: new Date(2024, 0, 9), y1: 52, y2: 42 },
  { x: new Date(2024, 0, 10), y1: 55, y2: 45 },
  { x: new Date(2024, 0, 11), y1: 58, y2: 48 },
  { x: new Date(2024, 0, 12), y1: 60, y2: 50 },
];

const creditUsageData = [
  { x: 'x1', y: 30 },
  { x: 'x2', y: 45 },
  { x: 'x3', y: 35 },
  { x: 'x4', y: 20 },
  { x: 'x5', y: 38 },
];

// Sample data for devices table
const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  ip: `192.168.1.${10 + i}`,
  type: ['Router', 'Switch', 'Access Point', 'Firewall'][i % 4],
  status: i % 3 === 0 ? 'Online' : 'Online',
  location: ['Building A', 'Building B', 'Data Center'][i % 3],
  lastSeen: '2 minutes ago',
  bandwidth: `${Math.floor(Math.random() * 100)}%`,
}));

const columnDefinitions = [
  {
    id: 'selection',
    header: '',
    cell: () => <Checkbox />,
    width: 50,
    minWidth: 50,
  },
  {
    id: 'name',
    header: 'Column header',
    cell: () => 'Cell Value',
    sortingField: 'name',
  },
  {
    id: 'ip',
    header: 'Column header',
    cell: () => 'Cell Value',
    sortingField: 'ip',
  },
  {
    id: 'type',
    header: 'Column header',
    cell: () => 'Cell Value',
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Column header',
    cell: () => 'Cell Value',
    sortingField: 'status',
  },
  {
    id: 'location',
    header: 'Column header',
    cell: () => 'Cell Value',
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Column header',
    cell: () => 'Cell Value',
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Column header',
    cell: () => 'Cell Value',
    sortingField: 'bandwidth',
  },
];

export function App() {
  const [filterText, setFilterText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);

  const filteredDevices = devicesData.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ip.includes(filterText) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()),
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

              <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={5}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                  <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
                  <Button variant="icon" iconName="settings" />
                </div>
              </Grid>

              {showWarning && (
                <Flashbar
                  items={[
                    {
                      type: 'error',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setShowWarning(false),
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
                <SpaceBetween size="m">
                  <Box variant="h3" color="text-label">
                    Network traffic
                  </Box>
                  <div
                    style={{ height: '300px', backgroundColor: '#fff', boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}
                  >
                    <AreaChart
                      series={[
                        {
                          title: 'Site 1',
                          type: 'area',
                          data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                          color: '#688AE8',
                        },
                        {
                          title: 'Site 2',
                          type: 'area',
                          data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                          color: '#C33D69',
                        },
                      ]}
                      xDomain={networkTrafficData.map(d => d.x)}
                      yDomain={[0, 70]}
                      xTitle="Day"
                      yTitle=""
                      height={300}
                      hideFilter
                      hideLegend={false}
                      legendTitle=""
                      ariaLabel="Network traffic area chart"
                      ariaDescription="Area chart showing network traffic over time for two sites"
                      additionalFilters={
                        <div style={{ fontSize: '14px', color: '#5F6B7A' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <div
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '2px',
                                  border: '1px solid #688AE8',
                                  backgroundColor: 'rgba(116, 146, 231, 0.40)',
                                }}
                              />
                              <span>Site 1</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <div
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '2px',
                                  border: '1px solid #C33D69',
                                  backgroundColor: 'rgba(195, 61, 105, 0.40)',
                                }}
                              />
                              <span>Site 2</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <div style={{ width: '12px', height: '3px', display: 'flex', gap: '2px' }}>
                                <div
                                  style={{
                                    width: '6px',
                                    height: '3px',
                                    backgroundColor: '#5F6B7A',
                                    borderRadius: '1px',
                                  }}
                                />
                                <div
                                  style={{
                                    width: '6px',
                                    height: '3px',
                                    backgroundColor: '#5F6B7A',
                                    borderRadius: '1px',
                                  }}
                                />
                              </div>
                              <span>Performance goal</span>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </SpaceBetween>
              </Container>

              <Container>
                <SpaceBetween size="m">
                  <Box variant="h3" color="text-label">
                    Credit Usage
                  </Box>
                  <div style={{ height: '300px', backgroundColor: '#fff' }}>
                    <BarChart
                      series={[
                        {
                          title: 'Site 1',
                          type: 'bar',
                          data: creditUsageData,
                          color: '#688AE8',
                        },
                      ]}
                      xDomain={creditUsageData.map(d => d.x)}
                      yDomain={[0, 50]}
                      xTitle="Day"
                      yTitle=""
                      height={300}
                      hideFilter
                      hideLegend={false}
                      legendTitle=""
                      ariaLabel="Credit usage bar chart"
                      ariaDescription="Bar chart showing credit usage over time"
                      additionalFilters={
                        <div style={{ fontSize: '14px', color: '#5F6B7A' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <div
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '2px',
                                  backgroundColor: '#688AE8',
                                }}
                              />
                              <span>Site 1</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <div style={{ width: '12px', height: '3px', display: 'flex', gap: '2px' }}>
                                <div
                                  style={{
                                    width: '6px',
                                    height: '3px',
                                    backgroundColor: '#5F6B7A',
                                    borderRadius: '1px',
                                  }}
                                />
                                <div
                                  style={{
                                    width: '6px',
                                    height: '3px',
                                    backgroundColor: '#5F6B7A',
                                    borderRadius: '1px',
                                  }}
                                />
                              </div>
                              <span>Performance goal</span>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </SpaceBetween>
              </Container>
            </Grid>

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
                selectionType="multi"
                selectedItems={selectedDevices}
                onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  itemSelectionLabel: ({ selectedItems }, item) =>
                    selectedItems.indexOf(item) < 0 ? `Select ${item.name}` : `Deselect ${item.name}`,
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    selectedItems.length === filteredDevices.length ? 'Deselect all' : 'Select all',
                }}
                trackBy="id"
                empty="No devices found"
                loadingText="Loading devices"
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
