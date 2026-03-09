// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import './styles.css';

// --- Chart Data ---

const networkTrafficSite1 = [
  { x: 'x1', y: 3.2 },
  { x: 'x2', y: 2.8 },
  { x: 'x3', y: 2.5 },
  { x: 'x4', y: 3.0 },
  { x: 'x5', y: 2.8 },
  { x: 'x6', y: 3.5 },
  { x: 'x7', y: 3.8 },
  { x: 'x8', y: 4.2 },
  { x: 'x9', y: 4.5 },
  { x: 'x10', y: 4.8 },
  { x: 'x11', y: 4.4 },
  { x: 'x12', y: 5.0 },
];

const networkTrafficSite2 = [
  { x: 'x1', y: 3.8 },
  { x: 'x2', y: 4.5 },
  { x: 'x3', y: 3.5 },
  { x: 'x4', y: 4.8 },
  { x: 'x5', y: 4.2 },
  { x: 'x6', y: 3.9 },
  { x: 'x7', y: 4.7 },
  { x: 'x8', y: 5.0 },
  { x: 'x9', y: 5.3 },
  { x: 'x10', y: 4.9 },
  { x: 'x11', y: 5.2 },
  { x: 'x12', y: 5.6 },
];

const creditUsageData = [
  { x: 'x1', y: 4.1 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 4.8 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 4.9 },
];

// --- Table Data ---

const deviceColumns = [
  { id: 'col1', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col7' },
];

const deviceItems = Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1) }));

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<{ id: string }[]>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);

  const flashItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
          dismissLabel: 'Dismiss',
          onDismiss: () => setWarningDismissed(true),
          id: 'warning-1',
        },
      ];

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
        />
      }
      content={
        <div className="dashboard-content">
          {/* Page Header */}
          <div className="dashboard-page-header">
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconName="external" iconAlign="right">
                  Refresh Data
                </Button>
              }
            >
              Network Adminstration Dashboard
            </Header>
          </div>

          {/* Search + Pagination row */}
          <div className="dashboard-toolbar">
            <div className="dashboard-filter">
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Placeholder"
                onChange={({ detail }) => setFilterText(detail.filteringText)}
              />
            </div>
            <div className="dashboard-pagination">
              <Pagination
                currentPageIndex={currentPage}
                pagesCount={5}
                onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
              />
            </div>
          </div>

          {/* Warning Banner */}
          {!warningDismissed && (
            <Flashbar items={flashItems} />
          )}

          {/* Charts Section */}
          <div className="dashboard-charts">
            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              {/* Network Traffic Area Chart */}
              <Container
                header={<Header variant="h2">Network traffic</Header>}
              >
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficSite1,
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficSite2,
                      color: '#C33D69',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 3.5,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[1, 6]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  height={280}
                  hideFilter
                  ariaLabel="Network traffic area chart"
                  i18nStrings={{
                    xTickFormatter: (v) => String(v),
                    yTickFormatter: (v) => `y${v}`,
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                  }}
                  errorText="Error loading data"
                  loadingText="Loading chart"
                  recoveryText="Retry"
                  empty={<Box textAlign="center" color="inherit"><b>No data</b></Box>}
                  noMatch={<Box textAlign="center" color="inherit"><b>No matching data</b></Box>}
                />
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container
                header={<Header variant="h2">Credit Usage</Header>}
              >
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 3.8,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[1, 6]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  height={280}
                  hideFilter
                  ariaLabel="Credit usage bar chart"
                  i18nStrings={{
                    xTickFormatter: (v) => String(v),
                    yTickFormatter: (v) => `y${v}`,
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                  }}
                  errorText="Error loading data"
                  loadingText="Loading chart"
                  recoveryText="Retry"
                  empty={<Box textAlign="center" color="inherit"><b>No data</b></Box>}
                  noMatch={<Box textAlign="center" color="inherit"><b>No matching data</b></Box>}
                />
              </Container>
            </Grid>
          </div>

          {/* Devices Table */}
          <div className="dashboard-devices-section">
            <Table
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
              columnDefinitions={deviceColumns}
              items={deviceItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              sortingDisabled={false}
              variant="full-page"
              stickyHeader
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter((i) => i.id === item.id).length > 0;
                  return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
                },
              }}
            />
          </div>
        </div>
      }
    />
  );
}
