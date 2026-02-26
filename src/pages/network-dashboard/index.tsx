// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

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

import '../../styles/base.scss';
import styles from './network-dashboard.module.css';

// ─── Chart Data ──────────────────────────────────────────────────────────────

const TRAFFIC_DAYS = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];

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

const CREDIT_DAYS = ['x1', 'x2', 'x3', 'x4', 'x5'];

const creditUsageData = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 5.0 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 4.8 },
];

const Y_TICK_LABELS: Record<number, string> = { 1: 'y1', 2: 'y2', 3: 'y3', 4: 'y4', 5: 'y5', 6: 'y6' };
const yTickFormatter = (v: number) => Y_TICK_LABELS[Math.round(v)] ?? '';

// ─── Device Table Data ───────────────────────────────────────────────────────

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

const DEVICE_COLUMNS = [
  { id: 'col1', header: 'Column header', cell: (item: Device) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: Device) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: Device) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: Device) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: Device) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: Device) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: Device) => item.col7, sortingField: 'col7' },
];

const ALL_DEVICES = generateDevices(13);

// ─── Warning Banner ───────────────────────────────────────────────────────────

function WarningBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className={styles.warningBanner} role="alert">
      <div className={styles.warningContent}>
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
      <button className={styles.dismissButton} onClick={onDismiss} aria-label="Dismiss warning message">
        Dismiss
      </button>
    </div>
  );
}

// ─── Shared chart i18n ────────────────────────────────────────────────────────

const chartI18nBase = {
  filterLabel: 'Filter displayed data',
  filterPlaceholder: 'Filter data',
  filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  xAxisAriaRoleDescription: 'x axis',
  yAxisAriaRoleDescription: 'y axis',
  yTickFormatter,
  xTickFormatter: (v: string) => v,
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [warningVisible, setWarningVisible] = useState(true);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const filteredDevices = ALL_DEVICES.filter(d =>
    Object.values(d).some(v => v.toLowerCase().includes(filterText.toLowerCase())),
  );

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
            Network Adminstration Dashboard
          </Header>

          {/* Search + Pagination row */}
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

          {/* Warning Banner */}
          {warningVisible && <WarningBanner onDismiss={() => setWarningVisible(false)} />}

          {/* Charts */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, m: 6 } },
              { colspan: { default: 12, m: 6 } },
            ]}
          >
            {/* Network Traffic Area Chart */}
            <Container header={<Header variant="h3">Network traffic</Header>}>
              <AreaChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'area',
                    data: site1TrafficData,
                    color: '#688AE8',
                  },
                  {
                    title: 'Site 2',
                    type: 'area',
                    data: site2TrafficData,
                    color: '#C33D69',
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: 3.5,
                    color: '#5F6B7A',
                  },
                ]}
                xDomain={TRAFFIC_DAYS}
                yDomain={[1, 6]}
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

            {/* Credit Usage Bar Chart */}
            <Container header={<Header variant="h3">Credit Usage</Header>}>
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

          {/* My Devices Table */}
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
