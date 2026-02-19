// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Alert from '@cloudscape-design/components/alert';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

// Mock data for Network Traffic Area Chart
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 3 },
      { x: 'x2', y: 3.2 },
      { x: 'x3', y: 3.5 },
      { x: 'x4', y: 3.8 },
      { x: 'x5', y: 4 },
      { x: 'x6', y: 4.2 },
      { x: 'x7', y: 4.3 },
      { x: 'x8', y: 4.5 },
      { x: 'x9', y: 4.7 },
      { x: 'x10', y: 5 },
      { x: 'x11', y: 4.8 },
      { x: 'x12', y: 4.5 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 2.5 },
      { x: 'x2', y: 2.7 },
      { x: 'x3', y: 3 },
      { x: 'x4', y: 3.3 },
      { x: 'x5', y: 3.5 },
      { x: 'x6', y: 3.8 },
      { x: 'x7', y: 4.2 },
      { x: 'x8', y: 4.5 },
      { x: 'x9', y: 4.8 },
      { x: 'x10', y: 5 },
      { x: 'x11', y: 4.6 },
      { x: 'x12', y: 3.8 },
    ],
  },
];

// Mock data for Credit Usage Bar Chart
const creditUsageData = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 4 },
      { x: 'x2', y: 6 },
      { x: 'x3', y: 5 },
      { x: 'x4', y: 3 },
      { x: 'x5', y: 5 },
    ],
  },
];

// Mock table data
const generateTableItems = (count: number) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: `device-${i}`,
      name: `Device ${i}`,
      type: 'Type A',
      status: 'Active',
      value1: 'Cell Value',
      value2: 'Cell Value',
      value3: 'Cell Value',
      value4: 'Cell Value',
      value5: 'Cell Value',
      value6: 'Cell Value',
    });
  }
  return items;
};

const tableItems = generateTableItems(50);

export function App() {
  const [selectedItems, setSelectedItems] = useState<typeof tableItems>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [alertVisible, setAlertVisible] = useState(true);

  const itemsPerPage = 10;
  const filteredItems = tableItems.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const paginatedItems = filteredItems.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      content={
        <ContentLayout
          header={
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
          }
        >
          <SpaceBetween size="l">
            {alertVisible && (
              <Alert
                type="error"
                dismissible
                dismissAriaLabel="Dismiss message"
                onDismiss={() => setAlertVisible(false)}
              >
                This is a warning message
              </Alert>
            )}

            <ColumnLayout columns={2} variant="text-grid">
              <Container
                header={<Header variant="h2">Network traffic</Header>}
              >
                <AreaChart
                  series={networkTrafficData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => value.toString(),
                    yTickFormatter: (value) => `y${value}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="categorical"
                  yTitle=""
                  xTitle="Day"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>

              <Container
                header={<Header variant="h2">Credit Usage</Header>}
              >
                <BarChart
                  series={creditUsageData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => value.toString(),
                    yTickFormatter: (value) => `y${value}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  xScaleType="categorical"
                  yTitle=""
                  xTitle="Day"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>
            </ColumnLayout>

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
                columnDefinitions={[
                  {
                    id: 'name',
                    header: 'Column header',
                    cell: item => item.name,
                    sortingField: 'name',
                  },
                  {
                    id: 'value1',
                    header: 'Column header',
                    cell: item => item.value1,
                  },
                  {
                    id: 'value2',
                    header: 'Column header',
                    cell: item => item.value2,
                  },
                  {
                    id: 'value3',
                    header: 'Column header',
                    cell: item => item.value3,
                  },
                  {
                    id: 'value4',
                    header: 'Column header',
                    cell: item => item.value4,
                  },
                  {
                    id: 'value5',
                    header: 'Column header',
                    cell: item => item.value5,
                  },
                  {
                    id: 'value6',
                    header: 'Column header',
                    cell: item => item.value6,
                  },
                ]}
                items={paginatedItems}
                loadingText="Loading resources"
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      No devices to display.
                    </Box>
                    <Button>Add device</Button>
                  </Box>
                }
                filter={
                  <Input
                    type="search"
                    value={filterText}
                    onChange={({ detail }) => {
                      setFilterText(detail.value);
                      setCurrentPageIndex(1);
                    }}
                    placeholder="Placeholder"
                  />
                }
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                }
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                    return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
                  },
                }}
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
