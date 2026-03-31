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
import Alert from '@cloudscape-design/components/alert';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';

// --- Chart Data ---
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 189.8 },
      { x: 'x2', y: 181.2 },
      { x: 'x3', y: 166.3 },
      { x: 'x4', y: 157.7 },
      { x: 'x5', y: 134.3 },
      { x: 'x6', y: 129.6 },
      { x: 'x7', y: 100.7 },
      { x: 'x8', y: 113.9 },
      { x: 'x9', y: 106.9 },
      { x: 'x10', y: 94.4 },
      { x: 'x11', y: 63.9 },
      { x: 'x12', y: 149.1 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 176.5 },
      { x: 'x2', y: 149.8 },
      { x: 'x3', y: 132.0 },
      { x: 'x4', y: 108.9 },
      { x: 'x5', y: 82.3 },
      { x: 'x6', y: 59.2 },
      { x: 'x7', y: 69.0 },
      { x: 'x8', y: 73.4 },
      { x: 'x9', y: 82.3 },
      { x: 'x10', y: 37.8 },
      { x: 'x11', y: 45.8 },
      { x: 'x12', y: 127.6 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 130,
    color: '#5F6B7A',
  },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 4.1 },
      { x: 'x2', y: 5.7 },
      { x: 'x3', y: 4.8 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 4.7 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 4.0,
    color: '#5F6B7A',
  },
];

// --- Table Data ---
interface Device {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

const deviceRows: Device[] = Array.from({ length: 13 }, (_, i) => ({
  id: `device-${i + 1}`,
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

const deviceColumnDefinitions = [
  { id: 'col1', header: 'Column header', cell: (item: Device) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: Device) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: Device) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: Device) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: Device) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: Device) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: Device) => item.col7, sortingField: 'col7' },
];

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

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
                Network Adminstration Dashboard
              </Header>

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, s: 8, m: 9 } },
                  { colspan: { default: 12, s: 4, m: 3 } },
                ]}
              >
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <div className="dashboard-pagination-wrapper">
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                </div>
              </Grid>

              {!warningDismissed && (
                <Alert
                  type="warning"
                  dismissible
                  onDismiss={() => setWarningDismissed(true)}
                  dismissAriaLabel="Dismiss warning"
                >
                  This is a warning message
                </Alert>
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts section */}
            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <AreaChart
                series={networkTrafficSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                yDomain={[0, 220]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Network traffic"
                height={280}
                ariaLabel="Network traffic area chart"
                statusType="finished"
                hideFilter
              />
              <BarChart
                series={creditUsageSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                yDomain={[0, 7]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Credit Usage"
                height={280}
                ariaLabel="Credit usage bar chart"
                statusType="finished"
                hideFilter
              />
            </Grid>

            {/* Devices table */}
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
              columnDefinitions={deviceColumnDefinitions}
              items={deviceRows}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              variant="full-page"
              stickyHeader
              empty={
                <Box textAlign="center" color="inherit">
                  <Box variant="p" color="inherit">
                    No devices found
                  </Box>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
