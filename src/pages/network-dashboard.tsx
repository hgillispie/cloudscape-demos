// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import { AreaChartProps, BarChartProps } from '@cloudscape-design/components';

export default function NetworkDashboard() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'error' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

  // Network Traffic data
  const networkTrafficSeries: AreaChartProps.Series<number>[] = [
    {
      type: 'area',
      title: 'Site 1',
      data: [
        { x: 1, y: 3 },
        { x: 2, y: 3.2 },
        { x: 3, y: 3.5 },
        { x: 4, y: 3.8 },
        { x: 5, y: 4.0 },
        { x: 6, y: 4.2 },
        { x: 7, y: 4.5 },
        { x: 8, y: 4.8 },
        { x: 9, y: 5.0 },
        { x: 10, y: 5.2 },
        { x: 11, y: 5.0 },
        { x: 12, y: 4.5 },
      ],
      color: '#688AE8',
    },
    {
      type: 'area',
      title: 'Site 2',
      data: [
        { x: 1, y: 2.5 },
        { x: 2, y: 2.8 },
        { x: 3, y: 3.0 },
        { x: 4, y: 3.5 },
        { x: 5, y: 4.2 },
        { x: 6, y: 4.5 },
        { x: 7, y: 4.8 },
        { x: 8, y: 5.0 },
        { x: 9, y: 5.2 },
        { x: 10, y: 4.8 },
        { x: 11, y: 4.2 },
        { x: 12, y: 3.5 },
      ],
      color: '#C33D69',
    },
    {
      type: 'threshold',
      title: 'Performance goal',
      y: 3.3,
    },
  ];

  // Credit Usage data
  const creditUsageSeries: BarChartProps.Series<number>[] = [
    {
      type: 'bar',
      title: 'Site 1',
      data: [
        { x: 1, y: 4 },
        { x: 2, y: 6 },
        { x: 3, y: 5 },
        { x: 4, y: 3 },
        { x: 5, y: 5 },
      ],
    },
    {
      type: 'threshold',
      title: 'Performance goal',
      y: 3.3,
    },
  ];

  // Table data
  const tableItems = Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`,
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  }));

  const columnDefinitions = [
    {
      id: 'column1',
      header: 'Column header',
      cell: (item: any) => item.column1,
      sortingField: 'column1',
    },
    {
      id: 'column2',
      header: 'Column header',
      cell: (item: any) => item.column2,
      sortingField: 'column2',
    },
    {
      id: 'column3',
      header: 'Column header',
      cell: (item: any) => item.column3,
      sortingField: 'column3',
    },
    {
      id: 'column4',
      header: 'Column header',
      cell: (item: any) => item.column4,
      sortingField: 'column4',
    },
    {
      id: 'column5',
      header: 'Column header',
      cell: (item: any) => item.column5,
      sortingField: 'column5',
    },
    {
      id: 'column6',
      header: 'Column header',
      cell: (item: any) => item.column6,
      sortingField: 'column6',
    },
    {
      id: 'column7',
      header: 'Column header',
      cell: (item: any) => item.column7,
      sortingField: 'column7',
    },
  ];

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
                  { text: 'Service', href: '/' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
                ariaLabel="Breadcrumbs"
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Page Header */}
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconAlign="right" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              <Box
                fontSize="heading-xl"
                fontWeight="heavy"
                display="inline"
                color="inherit"
              >
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 800, marginLeft: '1px' }}>
                  Network Adminstration Dashboard
                </span>
              </Box>
            </Header>

            {/* Search and Pagination */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
              ]}
            >
              <TextFilter
                filteringText={filteringText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter items"
                onChange={({ detail }) => setFilteringText(detail.filteringText)}
              />
              <Box float="right">
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={5}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              </Box>
            </Grid>

            {/* Warning Banner */}
            <Flashbar items={flashbarItems} />

            {/* Charts */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <Container>
                <AreaChart
                  series={networkTrafficSeries}
                  xTitle="Day"
                  yTitle="Network traffic"
                  height={300}
                  ariaLabel="Network traffic area chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  xDomain={[1, 12]}
                  xTickFormatter={value => `x${value}`}
                  yTickFormatter={value => `y${value}`}
                />
              </Container>

              <Container>
                <BarChart
                  series={creditUsageSeries}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  height={300}
                  ariaLabel="Credit usage bar chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  xDomain={[1, 5]}
                  xTickFormatter={value => `x${value}`}
                  yTickFormatter={value => `y${value}`}
                />
              </Container>
            </Grid>

            {/* My Devices Table */}
            <Table
              columnDefinitions={columnDefinitions}
              items={tableItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems as any)}
              variant="container"
              stickyHeader
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
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices
                  </Box>
                </Box>
              }
              trackBy="id"
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
