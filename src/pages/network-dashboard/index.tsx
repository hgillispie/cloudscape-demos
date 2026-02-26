// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Network Administration Dashboard
 *
 * A full-page dashboard that gives network administrators a single view of:
 *   - Network traffic trends across two sites (area chart)
 *   - Credit consumption per day (bar chart)
 *   - All devices registered on the local network (sortable, selectable table)
 *
 * Layout uses Cloudscape AppLayout so breadcrumbs, navigation slots, and the
 * content area all behave consistently with the rest of the application.
 */

import React, { useState } from 'react';

// Cloudscape component imports — each is a named sub-package so only the
// components actually used are included in the bundle.
import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

// Global Cloudscape base styles (resets, typography tokens, etc.)
import '../../styles/base.scss';
// Page-scoped CSS module — keeps these styles from leaking into other routes.
import styles from './network-dashboard.module.css';

// ─── Network Traffic Chart Data ───────────────────────────────────────────────
//
// Each data point maps a categorical day label (x) to a numeric value (y).
// The y values are on an abstract 1–6 scale matching the Figma design axes.
// In a real implementation these would be fetched from an API.

/** Ordered day labels used as the categorical x-axis for the traffic chart. */
const TRAFFIC_DAYS = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];

/** Inbound/outbound traffic measurements for Site 1, one entry per day. */
const site1TrafficData = [
  { x: 'x1', y: 2 },
  { x: 'x2', y: 2.5 },
  { x: 'x3', y: 2.2 },
  { x: 'x4', y: 3.5 },
  { x: 'x5', y: 3.8 },
  { x: 'x6', y: 4 },
  { x: 'x7', y: 4.2 },
  { x: 'x8', y: 4.5 },
  { x: 'x9', y: 4.8 },
  { x: 'x10', y: 5 },
  { x: 'x11', y: 5.2 },
  { x: 'x12', y: 4.8 },
];

/** Inbound/outbound traffic measurements for Site 2, one entry per day. */
const site2TrafficData = [
  { x: 'x1', y: 3 },
  { x: 'x2', y: 3.5 },
  { x: 'x3', y: 3.2 },
  { x: 'x4', y: 4.2 },
  { x: 'x5', y: 4.8 },
  { x: 'x6', y: 3.8 },
  { x: 'x7', y: 4.5 },
  { x: 'x8', y: 5.2 },
  { x: 'x9', y: 5.5 },
  { x: 'x10', y: 5.1 },
  { x: 'x11', y: 5.8 },
  { x: 'x12', y: 5.4 },
];

// ─── Credit Usage Chart Data ──────────────────────────────────────────────────

/** Ordered day labels used as the categorical x-axis for the credit usage chart. */
const CREDIT_DAYS = ['x1', 'x2', 'x3', 'x4', 'x5'];

/** Daily credit consumption values for the bar chart. */
const creditUsageData = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 5.0 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 4.8 },
];

// ─── Shared Y-Axis Formatter ──────────────────────────────────────────────────

/**
 * Maps integer values 1–6 to the label strings shown in the Figma design
 * (y1 … y6). Values that don't land on a whole number are rounded before
 * lookup; anything outside the map renders as an empty string so the axis
 * stays clean.
 */
const Y_TICK_LABELS: Record<number, string> = { 1: 'y1', 2: 'y2', 3: 'y3', 4: 'y4', 5: 'y5', 6: 'y6' };
const yTickFormatter = (v: number) => Y_TICK_LABELS[Math.round(v)] ?? '';

// ─── Device Table Types & Data ────────────────────────────────────────────────

/**
 * Represents a single network device row in the "My Devices" table.
 * Column names are generic (col1–col7) because the design uses placeholder
 * content; replace with domain-specific field names when connecting real data.
 */
interface Device {
  /** Unique identifier used by the Table component for row tracking. */
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
 * Generates an array of placeholder Device objects.
 * @param count - Number of device rows to create.
 */
const generateDevices = (count: number): Device[] =>
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

/**
 * Column definitions passed to the Cloudscape Table component.
 * Each entry specifies the column id, visible header label, cell renderer,
 * and the field name used for client-side sorting.
 */
const DEVICE_COLUMNS = [
  { id: 'col1', header: 'Column header', cell: (item: Device) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: Device) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: Device) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: Device) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: Device) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: Device) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: Device) => item.col7, sortingField: 'col7' },
];

/** Static placeholder dataset — 13 rows matching the Figma design. */
const ALL_DEVICES = generateDevices(13);

// ─── Warning Banner Component ─────────────────────────────────────────────────

interface WarningBannerProps {
  /** Callback invoked when the user clicks the "Dismiss" button. */
  onDismiss: () => void;
}

/**
 * WarningBanner
 *
 * A dismissible yellow notification strip rendered above the charts.
 * The SVG icon is inlined rather than using the Cloudscape Icon component so
 * the stroke color (#946C00) can precisely match the Figma design token.
 *
 * Accessibility notes:
 *   - `role="alert"` causes screen readers to announce the message immediately.
 *   - The SVG carries `aria-hidden="true"` because the text already conveys the meaning.
 *   - The dismiss button has an explicit `aria-label` for icon-only button clarity.
 */
function WarningBanner({ onDismiss }: WarningBannerProps) {
  return (
    <div className={styles.warningBanner} role="alert">
      <div className={styles.warningContent}>
        {/* Inline warning circle SVG — matches the #946C00 amber stroke from the design */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={styles.warningIcon}
        >
          <g clipPath="url(#clip-warning-icon)">
            <mask
              id="mask-warning-icon"
              style={{ maskType: 'luminance' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="16"
              height="16"
            >
              <path d="M15.6544 0.470581H0.595581V15.5294H15.6544V0.470581Z" fill="white" />
            </mask>
            <g mask="url(#mask-warning-icon)">
              {/* Vertical stem and dot of the "!" symbol inside the circle */}
              <path
                d="M8.125 5.64703V8.78428M8.125 10.6666H8.13128M14.3995 7.99997C14.3995 11.4653 11.5903 14.2745 8.125 14.2745C4.65969 14.2745 1.85049 11.4653 1.85049 7.99997C1.85049 4.53466 4.65969 1.72546 8.125 1.72546C11.5903 1.72546 14.3995 4.53466 14.3995 7.99997Z"
                stroke="#946C00"
                strokeWidth="1.88235"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip-warning-icon">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className={styles.warningText}>This is a warning message</span>
      </div>

      {/* Dismiss button — styled as a text link to keep visual weight low */}
      <button className={styles.dismissButton} onClick={onDismiss} aria-label="Dismiss warning message">
        Dismiss
      </button>
    </div>
  );
}

// ─── Shared Chart i18n Strings ────────────────────────────────────────────────

/**
 * Base i18n strings shared by both charts.
 * Extracted to avoid duplication; each chart spreads this object and
 * overrides `chartAriaRoleDescription` with its own value.
 */
const chartI18nBase = {
  filterLabel: 'Filter displayed data',
  filterPlaceholder: 'Filter data',
  filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  xAxisAriaRoleDescription: 'x axis',
  yAxisAriaRoleDescription: 'y axis',
  /** Maps numeric y values to the y1–y6 labels shown in the Figma design. */
  yTickFormatter,
  /** Pass x values through as-is; they are already formatted day strings. */
  xTickFormatter: (v: string) => v,
};

// ─── Main Dashboard Component ─────────────────────────────────────────────────

/**
 * NetworkDashboard
 *
 * Root page component for the Network Administration Dashboard route
 * (`/network-dashboard`). Manages all local UI state:
 *
 * - `filterText`      — drives the device table search filter
 * - `currentPage`     — tracks the active pagination page
 * - `warningVisible`  — controls whether the dismissible warning banner is shown
 * - `selectedDevices` — tracks which table rows the user has checked
 */
export default function NetworkDashboard() {
  /** Current value of the device search input. Resets pagination on change. */
  const [filterText, setFilterText] = useState('');

  /** 1-based index of the currently visible page in the pagination control. */
  const [currentPage, setCurrentPage] = useState(1);

  /** Whether the dismissible warning banner is currently rendered. */
  const [warningVisible, setWarningVisible] = useState(true);

  /** Array of Device objects the user has selected via table checkboxes. */
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  /**
   * Derived list of devices that match the current filter text.
   * Searches all string fields of each device so the filter is broad.
   * In a real implementation this would be replaced by a server-side query.
   */
  const filteredDevices = ALL_DEVICES.filter(d =>
    Object.values(d).some(v => v.toLowerCase().includes(filterText.toLowerCase())),
  );

  return (
    <AppLayout
      // Side navigation and tools panel are hidden on this page — the
      // dashboard is self-contained and doesn't need contextual help.
      navigationHide
      toolsHide
      breadcrumbs={
        // BreadcrumbGroup renders the "Service > Administrative Dashboard" trail
        // shown at the top of the Figma design.
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        // SpaceBetween stacks the major page sections with consistent vertical
        // spacing driven by Cloudscape design tokens.
        <SpaceBetween size="l">

          {/* ── Page Header ──────────────────────────────────────────────────
              h1 variant with a subtitle and a primary CTA that opens an
              external refresh workflow (external icon indicates navigation
              away from the current page). */}
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

          {/* ── Search + Pagination Row ───────────────────────────────────────
              Displayed as a single horizontal bar: the TextFilter grows to
              fill available space while the Pagination control stays fixed
              on the right. Changing the filter text resets to page 1 to
              avoid showing an empty page after narrowing results. */}
          <div className={styles.searchPaginationRow}>
            <div className={styles.searchWrapper}>
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter devices"
                onChange={({ detail }) => {
                  setFilterText(detail.filteringText);
                  setCurrentPage(1);
                }}
              />
            </div>
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

          {/* ── Dismissible Warning Banner ────────────────────────────────────
              Conditionally rendered; removed from the DOM (not just hidden)
              when the user dismisses it so it doesn't occupy vertical space. */}
          {warningVisible && <WarningBanner onDismiss={() => setWarningVisible(false)} />}

          {/* ── Charts Grid ──────────────────────────────────────────────────
              Two charts side-by-side on medium+ viewports, stacked on small
              screens. Each chart is wrapped in a Container to get the titled
              card appearance matching the Figma design. */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, m: 6 } }, // Network traffic — left column
              { colspan: { default: 12, m: 6 } }, // Credit usage   — right column
            ]}
          >
            {/* Network Traffic Area Chart
                Two overlapping area series (Site 1 blue, Site 2 pink) with a
                dashed threshold line representing the performance goal.
                `hideFilter` removes the built-in series filter UI because the
                legend alone is sufficient for this dashboard view. */}
            <Container header={<Header variant="h3">Network traffic</Header>}>
              <AreaChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'area',
                    data: site1TrafficData,
                    color: '#688AE8', // Data-viz blue matching design tokens
                  },
                  {
                    title: 'Site 2',
                    type: 'area',
                    data: site2TrafficData,
                    color: '#C33D69', // Data-viz pink matching design tokens
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold', // Renders as a horizontal dashed line
                    y: 3.5,
                    color: '#5F6B7A', // Neutral grey for reference lines
                  },
                ]}
                xDomain={TRAFFIC_DAYS}
                yDomain={[1, 6]} // Matches the y1–y6 axis labels in the design
                xScaleType="categorical"
                xTitle="Day"
                height={300}
                hideFilter
                ariaLabel="Network traffic chart"
                i18nStrings={{
                  ...chartI18nBase,
                  chartAriaRoleDescription: 'area chart',
                }}
                loadingText="Loading chart"
                errorText="Error loading data."
                recoveryText="Retry"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                  </Box>
                }
                noMatch={
                  <Box textAlign="center" color="inherit">
                    <b>No matching data</b>
                  </Box>
                }
              />
            </Container>

            {/* Credit Usage Bar Chart
                Single bar series (Site 1) with a threshold line for the
                performance goal. Uses the same y-axis scale as the traffic
                chart for visual consistency across the two panels. */}
            <Container header={<Header variant="h3">Credit Usage</Header>}>
              <BarChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageData,
                    color: '#688AE8', // Same blue as Site 1 in the traffic chart
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold', // Horizontal dashed reference line
                    y: 4.0,
                    color: '#5F6B7A',
                  },
                ]}
                xDomain={CREDIT_DAYS}
                yDomain={[1, 6]}
                xScaleType="categorical"
                xTitle="Day"
                height={300}
                hideFilter
                ariaLabel="Credit usage chart"
                i18nStrings={{
                  ...chartI18nBase,
                  chartAriaRoleDescription: 'bar chart',
                }}
                loadingText="Loading chart"
                errorText="Error loading data."
                recoveryText="Retry"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                  </Box>
                }
                noMatch={
                  <Box textAlign="center" color="inherit">
                    <b>No matching data</b>
                  </Box>
                }
              />
            </Container>
          </Grid>

          {/* ── My Devices Table ─────────────────────────────────────────────
              Multi-select table with client-side filtering driven by the
              TextFilter above. `trackBy="id"` ensures React reconciles rows
              by the device's unique id rather than array index, which prevents
              stale selection state when the list is filtered. */}
          <Table
            columnDefinitions={DEVICE_COLUMNS}
            items={filteredDevices}
            selectionType="multi"
            selectedItems={selectedDevices}
            onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
            trackBy="id"
            header={
              <Header
                variant="h2"
                description="Devices on your local network"
                actions={
                  // "Add Device" launches an external flow (e.g. a device
                  // registration wizard) — the external icon signals this.
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
              allItemsSelectionLabel: () => 'select all devices',
              itemSelectionLabel: (_, row) => `select device ${row.id}`,
            }}
            empty={
              // Shown when the device list is empty or no rows match the filter.
              <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                <b>No devices</b>
                <Box variant="p" color="inherit">
                  No devices found on your local network
                </Box>
              </Box>
            }
          />
        </SpaceBetween>
      }
    />
  );
}
