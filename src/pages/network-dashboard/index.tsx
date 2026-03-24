// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * NetworkDashboard page
 *
 * Provides an administrative overview of the local network, including:
 *  - Network traffic trends across two sites visualised as an area chart
 *  - Credit usage per day visualised as a bar chart
 *  - A paginated, filterable device table listing all devices on the local network
 *
 * Layout uses the Cloudscape AppLayout shell so the page inherits the standard
 * breadcrumb rail, main-content region, and (hidden) navigation/tools drawers.
 */

import React, { useState } from 'react';

// ---- Cloudscape layout & navigation components ----
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

// ---- Cloudscape action & notification components ----
import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';

// ---- Cloudscape data-display & filter components ----
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

// ---------------------------------------------------------------------------
// Chart data
// ---------------------------------------------------------------------------

/**
 * Area-chart series for the "Network traffic" panel.
 *
 * Contains two area series (one per site) and a horizontal threshold line
 * representing the agreed performance goal. X-axis values are categorical day
 * labels (x1–x12); Y-axis values are arbitrary traffic units.
 */
const networkTrafficSeries: any[] = [
  {
    title: 'Site 1',
    type: 'area',
    // 12 data points covering a sample monitoring period
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
    color: '#688AE8', // blue – matches the Cloudscape data-viz palette
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
    color: '#C33D69', // pink – matches the Cloudscape data-viz palette
  },
  {
    // Horizontal threshold line indicating the target traffic level
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
    color: 'rgba(74, 74, 74, 1)', // neutral dark grey so it doesn't compete with series colours
  },
];

/**
 * Bar-chart series for the "Credit Usage" panel.
 *
 * A single bar series tracks credit consumption across 5 days. The threshold
 * line marks the performance goal so operators can quickly spot over-runs.
 */
const creditUsageSeries: any[] = [
  {
    title: 'Site 1',
    type: 'bar',
    // 5 data points – one per reporting day
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
    // Horizontal threshold line – same performance goal as the traffic chart
    title: 'Performance goal',
    type: 'threshold',
    y: 3.8,
    color: 'rgba(74, 74, 74, 1)',
  },
];

// ---------------------------------------------------------------------------
// Device table data & column definitions
// ---------------------------------------------------------------------------

/**
 * Shape of a single device row.
 * In a real implementation these fields would be named (e.g. hostname, IP,
 * MAC address, status…). They are left generic here to match the placeholder
 * design spec.
 */
type Device = {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
};

/**
 * Placeholder device rows. Replace with a real API call or data hook when
 * integrating with a back-end.
 */
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

/**
 * Column definitions for the device table.
 * Each column is sortable; update `header` and `cell` accessor when real
 * field names are available.
 */
const deviceColumns = [
  { id: 'col1', header: 'Column header', cell: (item: Device) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: Device) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: Device) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: Device) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: Device) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: Device) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: Device) => item.col7, sortingField: 'col7' },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

/**
 * NetworkDashboard – the default export rendered at /network-dashboard.
 *
 * State:
 *  - `alertVisible`   – controls whether the dismissible top-of-page Flashbar is shown
 *  - `filterText`     – current value of the device-table search input
 *  - `currentPage`    – active page index for device-table pagination (1-based)
 *  - `selectedDevices`– array of Device rows currently checked in the table
 */
export default function NetworkDashboard() {
  // Show the page-level warning notification until the user dismisses it
  const [alertVisible, setAlertVisible] = useState(true);

  // Device table filter text – used to drive a real filtering hook once data is live
  const [filterText, setFilterText] = useState('');

  // Current page shown in the device table pagination control
  const [currentPage, setCurrentPage] = useState(1);

  // Tracks which device rows the user has checked for bulk actions
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  return (
    <AppLayout
      // Hide side navigation and tools panel — this page uses full-width content
      navigationHide
      toolsHide
      breadcrumbs={
        // Breadcrumb trail: Service > Administrative Dashboard
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
              {/* ---- Page title & primary action ---- */}
              <Header
                variant="h1"
                description={<span style={{ fontWeight: 600 }}>Network Traffic, Credit Usage, and Your Devices</span>}
                actions={
                  // Opens an external data-refresh flow
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Adminstration Dashboard
              </Header>

              {/* ---- Search + pagination row ---- */}
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, s: 8, m: 9 } }, // text filter takes most of the row
                  { colspan: { default: 12, s: 4, m: 3 } }, // pagination is right-aligned
                ]}
              >
                {/* Free-text filter for the device table below */}
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />

                <div className="dashboard-pagination-wrapper">
                  {/* 5-page pagination control; wire to real page count when data is live */}
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

              {/* ---- Dismissible page-level notification ---- */}
              <Flashbar
                items={
                  alertVisible
                    ? [
                        {
                          type: 'error',
                          content: 'This is a warning message',
                          dismissible: true,
                          dismissLabel: 'Dismiss',
                          // Hide the bar when dismissed; state is not persisted across page loads
                          onDismiss: () => setAlertVisible(false),
                        },
                      ]
                    : [] // empty array collapses the Flashbar entirely
                }
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="xl">
            {/* ---- Charts row ---- */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } }, // network traffic – left half
                { colspan: { default: 12, m: 6 } }, // credit usage   – right half
              ]}
            >
              {/*
               * Network traffic area chart
               * Shows two overlapping area series (Site 1 & Site 2) plus a
               * threshold line representing the performance goal.
               * X-axis: categorical day labels; Y-axis: traffic units (0–6).
               */}
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
                  // Prefix Y-axis tick values with "y" to match the design spec
                  yTickFormatter: (v: number) => `y${v}`,
                }}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                // Filter UI is not needed here; legend alone is sufficient
                hideFilter
              />

              {/*
               * Credit usage bar chart
               * Single bar series tracks per-day credit consumption for Site 1.
               * A threshold line marks the performance goal.
               * X-axis: 5 categorical day labels; Y-axis: credit units (0–6).
               */}
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

            {/*
             * My Devices table
             * Lists all devices discovered on the local network.
             * Supports multi-row selection for future bulk operations.
             * Replace `deviceRows` / `deviceColumns` with real API data
             * and proper field names before shipping.
             */}
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
                    // Launches the add-device flow in an external view
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
