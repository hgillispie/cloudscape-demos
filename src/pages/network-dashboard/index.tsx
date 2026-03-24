// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import AppLayout from '@cloudscape-design/components/app-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import BarChart from '@cloudscape-design/components/bar-chart';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

// ---- Chart Data ----

const networkTrafficSeries: any[] = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 2.5 },
      { x: 'x2', y: 2.8 },
      { x: 'x3', y: 3.2 },
      { x: 'x4', y: 3.5 },
      { x: 'x5', y: 3.1 },
      { x: 'x6', y: 3.8 },
      { x: 'x7', y: 4.0 },
      { x: 'x8', y: 4.2 },
      { x: 'x9', y: 4.5 },
      { x: 'x10', y: 4.8 },
      { x: 'x11', y: 5.0 },
      { x: 'x12', y: 4.7 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 3.2 },
      { x: 'x2', y: 3.8 },
      { x: 'x3', y: 4.1 },
      { x: 'x4', y: 4.5 },
      { x: 'x5', y: 4.8 },
      { x: 'x6', y: 4.3 },
      { x: 'x7', y: 5.0 },
      { x: 'x8', y: 5.2 },
      { x: 'x9', y: 5.4 },
      { x: 'x10', y: 5.1 },
      { x: 'x11', y: 5.3 },
      { x: 'x12', y: 5.0 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
    color: 'rgba(74, 74, 74, 1)',
  },
];

const creditUsageSeries: any[] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 4.2 },
      { x: 'x2', y: 5.8 },
      { x: 'x3', y: 5.0 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 4.9 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.8,
    color: 'rgba(74, 74, 74, 1)',
  },
];

// ---- Device Table Data ----

type Device = { id: string; col1: string; col2: string; col3: string; col4: string; col5: string; col6: string; col7: string };

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

const deviceColumns = [
  { id: 'col1', header: 'Column header', cell: (item: Device) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: Device) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: Device) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: Device) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: Device) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: Device) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: Device) => item.col7, sortingField: 'col7' },
];

export default function NetworkDashboard() {
  const [alertVisible, setAlertVisible] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
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
                description={<span style={{ fontWeight: 600 }}>Network Traffic, Credit Usage, and Your Devices</span>}
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
                    currentPageIndex={currentPage}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of 5`,
                    }}
                  />
                </div>
              </Grid>

              <Flashbar
                items={
                  alertVisible
                    ? [
                        {
                          type: 'error',
                          content: 'This is a warning message',
                          dismissible: true,
                          dismissLabel: 'Dismiss',
                          onDismiss: () => setAlertVisible(false),
                        },
                      ]
                    : []
                }
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="xl">
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              <AreaChart
                series={networkTrafficSeries}
                xScaleType="categorical"
                xTitle="Day"
                yDomain={[0, 6]}
                height={300}
                ariaLabel="Network traffic chart"
                i18nStrings={{
                  legendAriaLabel: 'Legend',
                  chartContainerAriaRoleDescription: 'area chart',
                  xTickFormatter: v => String(v),
                  yTickFormatter: (v: number) => `y${v}`,
                }}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                hideFilter
              />

              <BarChart
                series={creditUsageSeries}
                xScaleType="categorical"
                xTitle="Day"
                yDomain={[0, 6]}
                height={300}
                ariaLabel="Credit usage chart"
                i18nStrings={{
                  legendAriaLabel: 'Legend',
                  chartContainerAriaRoleDescription: 'bar chart',
                  xTickFormatter: v => String(v),
                  yTickFormatter: (v: number) => `y${v}`,
                }}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                hideFilter
              />
            </Grid>

            <Table
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              columnDefinitions={deviceColumns}
              items={deviceRows}
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
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: () => 'Select all devices',
                itemSelectionLabel: ({ selectedItems }, item) =>
                  selectedItems.indexOf(item) >= 0 ? 'Deselect device' : 'Select device',
              }}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
