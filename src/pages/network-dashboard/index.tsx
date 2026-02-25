// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import AppLayout from '@cloudscape-design/components/app-layout';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

// ── Network traffic data (area chart) ────────────────────────────────────────
const networkDays = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];

const site1Data = [
  { x: 'x1', y: 1 },
  { x: 'x2', y: 1.5 },
  { x: 'x3', y: 2 },
  { x: 'x4', y: 2.8 },
  { x: 'x5', y: 3 },
  { x: 'x6', y: 3.2 },
  { x: 'x7', y: 3.5 },
  { x: 'x8', y: 3.8 },
  { x: 'x9', y: 4 },
  { x: 'x10', y: 4.2 },
  { x: 'x11', y: 4.5 },
  { x: 'x12', y: 4.1 },
];

const site2Data = [
  { x: 'x1', y: 2.5 },
  { x: 'x2', y: 2.8 },
  { x: 'x3', y: 3.2 },
  { x: 'x4', y: 4 },
  { x: 'x5', y: 3.8 },
  { x: 'x6', y: 3.5 },
  { x: 'x7', y: 4 },
  { x: 'x8', y: 4.2 },
  { x: 'x9', y: 4.6 },
  { x: 'x10', y: 4.8 },
  { x: 'x11', y: 5.2 },
  { x: 'x12', y: 5 },
];

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: site1Data,
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: site2Data,
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.3,
    color: '#5F6B7A',
  },
];

// ── Credit usage data (bar chart) ────────────────────────────────────────────
const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 4 },
      { x: 'x2', y: 5.8 },
      { x: 'x3', y: 5 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 5 },
    ],
    color: '#688AE8',
  },
];

// ── Devices table data ────────────────────────────────────────────────────────
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
  id: `device-${i}`,
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

// ── Page component ────────────────────────────────────────────────────────────
export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [warningVisible, setWarningVisible] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '/' },
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
                  <div className="dashboard-pagination-row">
                    <Pagination
                      currentPageIndex={currentPage}
                      pagesCount={5}
                      onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: n => `Page ${n}`,
                      }}
                    />
                  </div>
                </Grid>

                {warningVisible && (
                  <Flashbar
                    items={[
                      {
                        type: 'warning',
                        content: 'This is a warning message',
                        dismissible: true,
                        dismissLabel: 'Dismiss',
                        onDismiss: () => setWarningVisible(false),
                        id: 'network-warning',
                      },
                    ]}
                  />
                )}
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              {/* Charts row */}
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, m: 6 } },
                  { colspan: { default: 12, m: 6 } },
                ]}
              >
                {/* Network traffic area chart */}
                <Container header={<Header variant="h3">Network traffic</Header>}>
                  <AreaChart
                    series={networkTrafficSeries}
                    xDomain={networkDays}
                    yDomain={[0, 6]}
                    xScaleType="categorical"
                    xTitle="Day"
                    height={300}
                    hideFilter
                    ariaLabel="Network traffic"
                    ariaDescription="Area chart showing network traffic for Site 1 and Site 2"
                    i18nStrings={{
                      xTickFormatter: v => String(v),
                      yTickFormatter: (v: number) => `y${v}`,
                      filterLabel: 'Filter series',
                      filterPlaceholder: 'Filter series',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                    }}
                  />
                </Container>

                {/* Credit usage bar chart */}
                <Container header={<Header variant="h3">Credit Usage</Header>}>
                  <BarChart
                    series={creditUsageSeries}
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                    yDomain={[0, 6]}
                    xScaleType="categorical"
                    xTitle="Day"
                    height={300}
                    hideFilter
                    ariaLabel="Credit usage"
                    ariaDescription="Bar chart showing credit usage for Site 1"
                    i18nStrings={{
                      xTickFormatter: v => String(v),
                      yTickFormatter: (v: number) => `y${v}`,
                      filterLabel: 'Filter series',
                      filterPlaceholder: 'Filter series',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                    }}
                  />
                </Container>
              </Grid>

              {/* Devices table */}
              <Table
                columnDefinitions={deviceColumns}
                items={deviceRows}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                trackBy="id"
                sortingDisabled={false}
                header={
                  <Header
                    variant="h2"
                    description="Devices on your local network"
                    counter={`(${deviceRows.length})`}
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
                      No devices found.
                    </Box>
                  </Box>
                }
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}
