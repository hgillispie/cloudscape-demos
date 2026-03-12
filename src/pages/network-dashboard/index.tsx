// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import '../../styles/network-dashboard.scss';

import Alert from '@cloudscape-design/components/alert';
import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

// ── Data ──────────────────────────────────────────────────────────────────────

const networkTrafficSite1 = [
  { x: 1, y: 2.5 },
  { x: 2, y: 2.8 },
  { x: 3, y: 3.0 },
  { x: 4, y: 3.5 },
  { x: 5, y: 3.2 },
  { x: 6, y: 3.8 },
  { x: 7, y: 4.0 },
  { x: 8, y: 4.2 },
  { x: 9, y: 4.5 },
  { x: 10, y: 4.3 },
  { x: 11, y: 4.8 },
  { x: 12, y: 4.6 },
];

const networkTrafficSite2 = [
  { x: 1, y: 3.2 },
  { x: 2, y: 3.0 },
  { x: 3, y: 3.5 },
  { x: 4, y: 4.5 },
  { x: 5, y: 4.2 },
  { x: 6, y: 4.8 },
  { x: 7, y: 5.2 },
  { x: 8, y: 5.0 },
  { x: 9, y: 5.5 },
  { x: 10, y: 5.3 },
  { x: 11, y: 5.0 },
  { x: 12, y: 5.4 },
];

const creditUsageData = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 5.0 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 4.8 },
];

// ── Placeholder device rows ────────────────────────────────────────────────────

const generateDeviceRows = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `device-${i + 1}`,
    col1: 'Cell Value',
    col2: 'Cell Value',
    col3: 'Cell Value',
    col4: 'Cell Value',
    col5: 'Cell Value',
    col6: 'Cell Value',
    col7: 'Cell Value',
  }));

const deviceRows = generateDeviceRows(13);

// ── Component ─────────────────────────────────────────────────────────────────

export default function NetworkDashboard() {
  const [warningVisible, setWarningVisible] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<typeof deviceRows>([]);

  return (
    <I18nProvider locale="en" messages={[enMessages]}>
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
        notifications={
          warningVisible ? (
            <Alert
              type="warning"
              dismissible
              onDismiss={() => setWarningVisible(false)}
            >
              This is a warning message
            </Alert>
          ) : undefined
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
              {/* Search + Pagination row */}
              <div className="dashboard-filter-row">
                <div className="dashboard-filter-search">
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                </div>
                <div className="dashboard-filter-pagination">
                  <Pagination
                    currentPageIndex={currentPage}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: n => `Page ${n} of 5`,
                    }}
                  />
                </div>
              </div>

              {/* Charts row */}
              <ColumnLayout columns={2} variant="default">
                {/* Network Traffic – Area Chart */}
                <Container header={<Header variant="h2">Network traffic</Header>}>
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
                    xDomain={[1, 12]}
                    yDomain={[0, 6]}
                    xTitle="Day"
                    xScaleType="linear"
                    height={300}
                    hideFilter
                    ariaLabel="Network traffic chart"
                    i18nStrings={{
                      xTickFormatter: v => `x${v}`,
                      yTickFormatter: v => `y${v}`,
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                  />
                </Container>

                {/* Credit Usage – Bar Chart */}
                <Container header={<Header variant="h2">Credit Usage</Header>}>
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
                        y: 3.5,
                        color: '#5F6B7A',
                      },
                    ]}
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                    yDomain={[0, 6]}
                    xTitle="Day"
                    height={300}
                    hideFilter
                    ariaLabel="Credit usage chart"
                    i18nStrings={{
                      yTickFormatter: v => `y${v}`,
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                  />
                </Container>
              </ColumnLayout>

              {/* My Devices table */}
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
                columnDefinitions={[
                  {
                    id: 'col1',
                    header: 'Column header',
                    cell: item => item.col1,
                    sortingField: 'col1',
                  },
                  {
                    id: 'col2',
                    header: 'Column header',
                    cell: item => item.col2,
                    sortingField: 'col2',
                  },
                  {
                    id: 'col3',
                    header: 'Column header',
                    cell: item => item.col3,
                    sortingField: 'col3',
                  },
                  {
                    id: 'col4',
                    header: 'Column header',
                    cell: item => item.col4,
                    sortingField: 'col4',
                  },
                  {
                    id: 'col5',
                    header: 'Column header',
                    cell: item => item.col5,
                    sortingField: 'col5',
                  },
                  {
                    id: 'col6',
                    header: 'Column header',
                    cell: item => item.col6,
                    sortingField: 'col6',
                  },
                  {
                    id: 'col7',
                    header: 'Column header',
                    cell: item => item.col7,
                    sortingField: 'col7',
                  },
                ]}
                items={deviceRows}
                selectionType="multi"
                selectedItems={selectedDevices}
                onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
                trackBy="id"
                sortingDisabled={false}
                variant="container"
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  allItemsSelectionLabel: () => 'select all',
                  itemSelectionLabel: (_, item) => `select ${item.id}`,
                }}
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box variant="p" color="inherit">
                      No devices found on your local network.
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
