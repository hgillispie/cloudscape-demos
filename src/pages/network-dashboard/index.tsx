// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * NetworkDashboard page
 *
 * Displays an administrative overview of network activity, credit usage,
 * and locally connected devices. The page is composed of three main sections:
 *
 *  1. Page header — title, description, search/filter bar, pagination,
 *     and a dismissible warning notification.
 *  2. Charts row — an area chart for real-time network traffic across two
 *     sites and a bar chart summarising credit consumption per day.
 *  3. Devices table — a multi-select, sortable table listing every device
 *     detected on the local network.
 *
 * All layout primitives come from the Cloudscape Design System
 * (@cloudscape-design/components). The page is wrapped in I18nProvider so
 * that built-in component strings are properly localised.
 */

import React, { useState } from 'react';

// Cloudscape layout & navigation components
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';

// Cloudscape content components
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

// Cloudscape i18n — provides English translations for all built-in strings
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';

// ── Network traffic chart data ────────────────────────────────────────────────
//
// Twelve categorical x-axis ticks, one per day (x1–x12).
// Two area series (Site 1 and Site 2) share the same x-domain so their
// areas are visually comparable. A threshold series marks the performance goal.

/** X-axis categories representing each measured day. */
const networkDays = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];

/** Daily network traffic data points for Site 1 (values in arbitrary units). */
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

/** Daily network traffic data points for Site 2 (values in arbitrary units). */
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

/**
 * Series configuration for the network traffic AreaChart.
 * - "Site 1" and "Site 2" are rendered as filled area series.
 * - "Performance goal" is a horizontal threshold line used as a reference.
 */
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: site1Data,
    color: '#688AE8', // blue — matches the design system data-viz palette
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: site2Data,
    color: '#C33D69', // pink — secondary data-viz palette colour
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.3, // target threshold value drawn as a dashed horizontal line
    color: '#5F6B7A', // neutral grey to visually separate it from the data series
  },
];

// ── Credit usage chart data ───────────────────────────────────────────────────
//
// Five-day summary of credit consumption for Site 1, rendered as a bar chart.
// Each bar represents total credits used on that day.

/**
 * Series configuration for the credit usage BarChart.
 * A single "Site 1" bar series is shown across five days (x1–x5).
 */
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
    color: '#688AE8', // consistent blue to match Site 1 in the traffic chart
  },
];

// ── Device table types & data ─────────────────────────────────────────────────

/**
 * Represents a single network device row in the "My Devices" table.
 * In a real integration, each field would map to a meaningful device attribute
 * (e.g. hostname, IP address, MAC address, status, etc.).
 */
interface Device {
  /** Unique identifier used as the table row key. */
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

/**
 * Placeholder device rows — 13 entries with generic "Cell Value" content.
 * Replace with real API data in a production implementation.
 */
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

/**
 * Column definitions for the devices Table.
 * Each column is sortable so users can re-order the list by any attribute.
 * The `sortingField` value must match the corresponding key on the Device type.
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

// ── Page component ────────────────────────────────────────────────────────────

/**
 * NetworkDashboard is the top-level page component for the Network
 * Administration Dashboard route (/network-dashboard).
 *
 * State managed here:
 * - `filterText`     — current text entered in the search/filter input.
 * - `currentPage`    — active page index for the header pagination control.
 * - `warningVisible` — controls whether the dismissible warning Flashbar is shown.
 * - `selectedItems`  — items currently checked in the devices table.
 */
export default function NetworkDashboard() {
  // Controlled value for the TextFilter input in the page header.
  const [filterText, setFilterText] = useState('');

  // Current page for the header-level Pagination (not tied to table pagination here).
  const [currentPage, setCurrentPage] = useState(1);

  // Tracks whether the dismissible warning banner should be rendered.
  const [warningVisible, setWarningVisible] = useState(true);

  // Tracks which device rows are checked in the multi-select table.
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

  return (
    // I18nProvider must wrap the entire page so Cloudscape components can
    // resolve their built-in translated strings (e.g. pagination labels,
    // dismiss button text, etc.).
    <I18nProvider locale="en" messages={[enMessages]}>
      <AppLayout
        // Hide the left navigation panel and right tools panel — this page
        // is self-contained and does not require those chrome elements.
        navigationHide
        toolsHide
        breadcrumbs={
          // Breadcrumb trail: Service > Administrative Dashboard
          // "Service" links back to the app root; the active crumb has no link.
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
              // The ContentLayout header contains the page title, search bar,
              // pagination, and the warning notification — all stacked
              // vertically with consistent spacing.
              <SpaceBetween size="m">
                {/* Page title with inline "Refresh Data" action button */}
                <Header
                  variant="h1"
                  description="Network Traffic, Credit Usage, and Your Devices"
                  actions={
                    // External icon signals to users that this triggers an
                    // out-of-page data refresh action.
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Refresh Data
                    </Button>
                  }
                >
                  Network Adminstration Dashboard
                </Header>

                {/* Search bar + pagination laid out side-by-side on larger viewports.
                    On small screens both controls stack to full width. */}
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, s: 8, m: 9 } }, // TextFilter takes most of the row
                    { colspan: { default: 12, s: 4, m: 3 } }, // Pagination sits at the right end
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

                {/* Dismissible warning banner — hidden once the user clicks "Dismiss". */}
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
              {/* ── Charts row ──────────────────────────────────────────────────
                  Two charts placed side-by-side. On medium+ screens each takes
                  half the available width; on small screens they stack. */}
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, m: 6 } }, // Network traffic chart
                  { colspan: { default: 12, m: 6 } }, // Credit usage chart
                ]}
              >
                {/* Network Traffic — AreaChart
                    Shows two overlapping filled areas (Site 1 and Site 2) over
                    12 days, with a dashed threshold line for the performance goal.
                    `hideFilter` removes the built-in series filter UI since the
                    legend alone is sufficient for this view. */}
                <Container header={<Header variant="h3">Network traffic</Header>}>
                  <AreaChart
                    series={networkTrafficSeries}
                    xDomain={networkDays}
                    yDomain={[0, 6]} // fixed y-axis so both charts share the same scale
                    xScaleType="categorical"
                    xTitle="Day"
                    height={300}
                    hideFilter
                    ariaLabel="Network traffic"
                    ariaDescription="Area chart showing network traffic for Site 1 and Site 2"
                    i18nStrings={{
                      xTickFormatter: v => String(v),
                      yTickFormatter: (v: number) => `y${v}`, // prefix ticks with "y" to match the design
                      filterLabel: 'Filter series',
                      filterPlaceholder: 'Filter series',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                    }}
                  />
                </Container>

                {/* Credit Usage — BarChart
                    Shows a single bar series (Site 1) across five days.
                    `hideFilter` removes the built-in series filter UI. */}
                <Container header={<Header variant="h3">Credit Usage</Header>}>
                  <BarChart
                    series={creditUsageSeries}
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                    yDomain={[0, 6]} // matches the area chart y-scale for visual consistency
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

              {/* ── Devices Table ────────────────────────────────────────────────
                  Multi-select table listing all devices on the local network.
                  - `selectionType="multi"` enables row checkboxes.
                  - `trackBy="id"` ensures React uses stable keys for rows.
                  - `sortingDisabled={false}` enables column-level sorting. */}
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
                      // "Add Device" opens an external registration flow.
                      <Button variant="primary" iconAlign="right" iconName="external">
                        Add Device
                      </Button>
                    }
                  >
                    My Devices
                  </Header>
                }
                // Shown when the items array is empty (e.g. no devices discovered).
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
