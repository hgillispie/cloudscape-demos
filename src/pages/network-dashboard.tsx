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
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';

const networkTrafficSite1 = [
  { x: 'x1', y: 1.8 },
  { x: 'x2', y: 2.2 },
  { x: 'x3', y: 2.8 },
  { x: 'x4', y: 3.5 },
  { x: 'x5', y: 3.2 },
  { x: 'x6', y: 3.8 },
  { x: 'x7', y: 4.0 },
  { x: 'x8', y: 4.2 },
  { x: 'x9', y: 4.5 },
  { x: 'x10', y: 4.8 },
  { x: 'x11', y: 5.2 },
  { x: 'x12', y: 4.9 },
];

const networkTrafficSite2 = [
  { x: 'x1', y: 2.5 },
  { x: 'x2', y: 3.0 },
  { x: 'x3', y: 2.6 },
  { x: 'x4', y: 4.0 },
  { x: 'x5', y: 4.8 },
  { x: 'x6', y: 4.5 },
  { x: 'x7', y: 5.0 },
  { x: 'x8', y: 4.8 },
  { x: 'x9', y: 5.2 },
  { x: 'x10', y: 5.5 },
  { x: 'x11', y: 5.0 },
  { x: 'x12', y: 5.8 },
];

const creditUsageData = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 4.8 },
  { x: 'x4', y: 3.5 },
  { x: 'x5', y: 4.9 },
];

const deviceTableItems = Array.from({ length: 13 }, (_, i) => ({
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
  { id: 'col1', header: 'Column header', cell: (item: typeof deviceTableItems[0]) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: typeof deviceTableItems[0]) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: typeof deviceTableItems[0]) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: typeof deviceTableItems[0]) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: typeof deviceTableItems[0]) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: typeof deviceTableItems[0]) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: typeof deviceTableItems[0]) => item.col7, sortingField: 'col7' },
];

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [alertVisible, setAlertVisible] = useState(true);
  const [selectedDevices, setSelectedDevices] = useState<typeof deviceTableItems>([]);

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
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Adminstration Dashboard
              </Header>

              <SpaceBetween size="s">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <TextFilter
                      filteringText={filterText}
                      filteringPlaceholder="Placeholder"
                      filteringAriaLabel="Filter devices"
                      onChange={({ detail }) => setFilterText(detail.filteringText)}
                    />
                  </div>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of 5`,
                    }}
                  />
                </div>

                {alertVisible && (
                  <Alert
                    type="warning"
                    action={
                      <Button variant="link" onClick={() => setAlertVisible(false)}>
                        Dismiss
                      </Button>
                    }
                  >
                    This is a warning message
                  </Alert>
                )}
              </SpaceBetween>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <ColumnLayout columns={2}>
              <Container>
                <AreaChart
                  series={[
                    {
                      type: 'area',
                      title: 'Site 1',
                      data: networkTrafficSite1,
                      color: '#688AE8',
                    },
                    {
                      type: 'area',
                      title: 'Site 2',
                      data: networkTrafficSite2,
                      color: '#C33D69',
                    },
                    {
                      type: 'threshold',
                      title: 'Performance goal',
                      y: 3.5,
                      color: '#5F6B7A',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Network traffic"
                  height={300}
                  hideFilter
                  ariaLabel="Network traffic area chart"
                  i18nStrings={{
                    chartAriaRoleDescription: 'Area chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                    legendAriaLabel: 'Legend',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                  }}
                />
              </Container>

              <Container>
                <BarChart
                  series={[
                    {
                      type: 'bar',
                      title: 'Site 1',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                    {
                      type: 'threshold',
                      title: 'Performance goal',
                      y: 4.0,
                      color: '#5F6B7A',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Credit Usage"
                  height={300}
                  hideFilter
                  ariaLabel="Credit usage bar chart"
                  i18nStrings={{
                    chartAriaRoleDescription: 'Bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                    legendAriaLabel: 'Legend',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                  }}
                />
              </Container>
            </ColumnLayout>

            <Table
              columnDefinitions={deviceColumnDefinitions}
              items={deviceTableItems}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter(i => i.id === item.id).length > 0;
                  return `${item.id} is ${isItemSelected ? '' : 'not '}selected`;
                },
              }}
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
                <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                  <Box variant="h3">No devices found</Box>
                  <Box variant="p">No devices are connected to your local network.</Box>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
