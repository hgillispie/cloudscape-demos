// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { CustomAppLayout } from '../commons/common-components';

import '../../styles/base.scss';
import styles from './network-dashboard.module.scss';

// Sample data for Network Traffic (Area Chart)
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: new Date(2024, 0, 1), y: 3 },
      { x: new Date(2024, 0, 2), y: 3.5 },
      { x: new Date(2024, 0, 3), y: 3.2 },
      { x: new Date(2024, 0, 4), y: 3.8 },
      { x: new Date(2024, 0, 5), y: 4.2 },
      { x: new Date(2024, 0, 6), y: 5 },
      { x: new Date(2024, 0, 7), y: 5.2 },
      { x: new Date(2024, 0, 8), y: 4.8 },
      { x: new Date(2024, 0, 9), y: 4.5 },
      { x: new Date(2024, 0, 10), y: 3.8 },
      { x: new Date(2024, 0, 11), y: 3.5 },
      { x: new Date(2024, 0, 12), y: 3.2 },
    ],
    valueFormatter: (value: number) => `${value.toFixed(1)} GB`,
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: new Date(2024, 0, 1), y: 2 },
      { x: new Date(2024, 0, 2), y: 2.8 },
      { x: new Date(2024, 0, 3), y: 2.5 },
      { x: new Date(2024, 0, 4), y: 3.2 },
      { x: new Date(2024, 0, 5), y: 3.8 },
      { x: new Date(2024, 0, 6), y: 4.5 },
      { x: new Date(2024, 0, 7), y: 4.8 },
      { x: new Date(2024, 0, 8), y: 4.2 },
      { x: new Date(2024, 0, 9), y: 3.8 },
      { x: new Date(2024, 0, 10), y: 3 },
      { x: new Date(2024, 0, 11), y: 2.5 },
      { x: new Date(2024, 0, 12), y: 2.2 },
    ],
    valueFormatter: (value: number) => `${value.toFixed(1)} GB`,
  },
];

// Sample data for Credit Usage (Bar Chart)
const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'Day 1', y: 183 },
      { x: 'Day 2', y: 257 },
      { x: 'Day 3', y: 213 },
      { x: 'Day 4', y: 122 },
      { x: 'Day 5', y: 210 },
    ],
    valueFormatter: (value: number) => `${value} credits`,
  },
];

// Sample device data
const generateDevices = () => {
  const devices = [];
  for (let i = 1; i <= 13; i++) {
    devices.push({
      id: `device-${i}`,
      name: `Device ${i}`,
      type: 'Network Device',
      status: 'Active',
      ipAddress: `192.168.1.${i}`,
      macAddress: `00:1B:44:11:3A:${i.toString().padStart(2, '0')}`,
      location: `Building ${Math.ceil(i / 3)}`,
      lastSeen: '2024-01-09',
    });
  }
  return devices;
};

const COLUMN_DEFINITIONS = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
    isRowHeader: true,
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: any) => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
];

export function App() {
  const [devices] = useState(generateDevices());
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    devices,
    {
      filtering: {
        empty: <div>No devices</div>,
        noMatch: <div>No matches found</div>,
      },
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  );

  return (
    <CustomAppLayout
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
      notifications={<Flashbar items={flashbarItems} />}
      content={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            description="Network Traffic, Credit Usage, and Your Devices"
            actions={
              <Button variant="primary" iconName="external" iconAlign="right">
                Refresh Data
              </Button>
            }
          >
            Network Administration Dashboard
          </Header>

          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            <Container className={styles.chartContainer}>
              <div className={styles.chartWrapper}>
                <Header variant="h2">Network traffic</Header>
                <AreaChart
                  series={networkTrafficSeries}
                  height={300}
                  xScaleType="time"
                  yTitle="Traffic"
                  xTitle="Day"
                  ariaLabel="Network traffic area chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => {
                      const date = new Date(value);
                      return `x${date.getDate()}`;
                    },
                    yTickFormatter: (value) => `y${value}`,
                  }}
                  hideFilter
                  hideLegend={false}
                  statusType="finished"
                  detailPopoverSize="medium"
                  emphasizeBaselineAxis={false}
                />
                <div className={styles.legendContainer}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendBox} style={{ backgroundColor: '#688AE8' }}></span>
                    <span className={styles.legendLabel}>Site 1</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendBox} style={{ backgroundColor: '#C33D69' }}></span>
                    <span className={styles.legendLabel}>Site 2</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDash}></span>
                    <span className={styles.legendLabel}>Performance goal</span>
                  </div>
                </div>
              </div>
            </Container>

            <Container className={styles.chartContainer}>
              <div className={styles.chartWrapper}>
                <Header variant="h2">Credit Usage</Header>
                <BarChart
                  series={creditUsageSeries}
                  height={300}
                  xScaleType="categorical"
                  yTitle="Credits"
                  xTitle="Day"
                  ariaLabel="Credit usage bar chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => `y${value}`,
                  }}
                  hideFilter
                  hideLegend={false}
                  statusType="finished"
                  detailPopoverSize="medium"
                  emphasizeBaselineAxis={false}
                />
                <div className={styles.legendContainer}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendBox} style={{ backgroundColor: '#688AE8' }}></span>
                    <span className={styles.legendLabel}>Site 1</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDash}></span>
                    <span className={styles.legendLabel}>Performance goal</span>
                  </div>
                </div>
              </div>
            </Container>
          </Grid>

          <Container>
            <SpaceBetween size="l">
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

              <Table
                {...collectionProps}
                columnDefinitions={COLUMN_DEFINITIONS}
                items={items}
                selectionType="multi"
                variant="container"
                stickyHeader
                header={
                  <div className={styles.tableHeader}>
                    <TextFilter
                      {...filterProps}
                      filteringPlaceholder="Placeholder"
                      filteringAriaLabel="Filter devices"
                      countText={`${filteredItemsCount} matches`}
                    />
                    <div className={styles.paginationWrapper}>
                      <Pagination {...paginationProps} />
                    </div>
                  </div>
                }
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  allItemsSelectionLabel: () => 'select all',
                  itemSelectionLabel: (data, row) => `select ${row.name}`,
                }}
              />
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      }
    />
  );
}
