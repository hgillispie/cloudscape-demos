// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Flashbar from '@cloudscape-design/components/flashbar';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';

// Network traffic area chart data
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 2.5 },
      { x: 'x2', y: 3.0 },
      { x: 'x3', y: 2.8 },
      { x: 'x4', y: 3.5 },
      { x: 'x5', y: 3.2 },
      { x: 'x6', y: 3.8 },
      { x: 'x7', y: 4.0 },
      { x: 'x8', y: 4.2 },
      { x: 'x9', y: 4.5 },
      { x: 'x10', y: 4.8 },
      { x: 'x11', y: 4.3 },
      { x: 'x12', y: 4.0 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 3.0 },
      { x: 'x2', y: 3.5 },
      { x: 'x3', y: 3.2 },
      { x: 'x4', y: 4.2 },
      { x: 'x5', y: 4.0 },
      { x: 'x6', y: 4.5 },
      { x: 'x7', y: 4.8 },
      { x: 'x8', y: 5.0 },
      { x: 'x9', y: 5.2 },
      { x: 'x10', y: 5.5 },
      { x: 'x11', y: 5.0 },
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

// Credit usage bar chart data
const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 4.2 },
      { x: 'x2', y: 5.8 },
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

// Device table columns
const deviceColumns = [
  { id: 'col1', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col7' },
];

// Generate device rows
const deviceItems = Array.from({ length: 13 }, (_, i) => ({ id: String(i + 1) }));

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<typeof deviceItems>([]);
  const [warningVisible, setWarningVisible] = useState(true);

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

              <div>
                <div className="nd-toolbar">
                  <div className="nd-search-wrapper">
                    <TextFilter
                      filteringText={filterText}
                      filteringPlaceholder="Placeholder"
                      filteringAriaLabel="Filter devices"
                      onChange={({ detail }) => setFilterText(detail.filteringText)}
                    />
                  </div>
                  <div className="nd-pagination-wrapper">
                    <Pagination
                      currentPageIndex={currentPage}
                      pagesCount={5}
                      onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <Flashbar
                items={
                  warningVisible
                    ? [
                        {
                          type: 'warning',
                          dismissible: true,
                          onDismiss: () => setWarningVisible(false),
                          dismissLabel: 'Dismiss',
                          content: 'This is a warning message',
                          id: 'warning-message',
                        },
                      ]
                    : []
                }
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <ColumnLayout columns={2} minColumnWidth={300}>
              <Container header={<Header variant="h3">Network traffic</Header>}>
                <AreaChart
                  series={networkTrafficSeries}
                  xScaleType="categorical"
                  xTitle="Day"
                  height={280}
                  hideFilter
                  ariaLabel="Network traffic chart"
                  ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over time, with performance goal threshold"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    detailTotalLabel: 'Total',
                  }}
                />
              </Container>

              <Container header={<Header variant="h3">Credit Usage</Header>}>
                <BarChart
                  series={creditUsageSeries}
                  xScaleType="categorical"
                  xTitle="Day"
                  height={280}
                  hideFilter
                  ariaLabel="Credit usage chart"
                  ariaDescription="Bar chart showing credit usage for Site 1 with performance goal threshold"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    detailTotalLabel: 'Total',
                  }}
                />
              </Container>
            </ColumnLayout>

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
              columnDefinitions={deviceColumns}
              items={deviceItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter(i => i.id === item.id).length > 0;
                  return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
                },
              }}
              sortingDisabled
              variant="full-page"
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
