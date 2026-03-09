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
import Alert from '@cloudscape-design/components/alert';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';

import '../../styles/base.scss';
import './network-dashboard.scss';

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

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 1.8 },
      { x: 'x2', y: 2.2 },
      { x: 'x3', y: 2.5 },
      { x: 'x4', y: 2.8 },
      { x: 'x5', y: 2.6 },
      { x: 'x6', y: 2.7 },
      { x: 'x7', y: 2.9 },
      { x: 'x8', y: 3.1 },
      { x: 'x9', y: 3.4 },
      { x: 'x10', y: 3.6 },
      { x: 'x11', y: 3.9 },
      { x: 'x12', y: 4.5 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 1.7 },
      { x: 'x2', y: 2.5 },
      { x: 'x3', y: 3.2 },
      { x: 'x4', y: 3.8 },
      { x: 'x5', y: 3.5 },
      { x: 'x6', y: 3.0 },
      { x: 'x7', y: 3.8 },
      { x: 'x8', y: 4.3 },
      { x: 'x9', y: 4.8 },
      { x: 'x10', y: 5.0 },
      { x: 'x11', y: 4.7 },
      { x: 'x12', y: 5.0 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
    color: '#5F6B7A',
  },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 4 },
      { x: 'x2', y: 6 },
      { x: 'x3', y: 5 },
      { x: 'x4', y: 3 },
      { x: 'x5', y: 5 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
    color: '#5F6B7A',
  },
];

const devices: Device[] = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
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

export default function NetworkDashboard() {
  const [warningVisible, setWarningVisible] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

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
          ariaLabel="Breadcrumbs"
        />
      }
      content={
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

          <div className="network-filter-row">
            <div className="network-search-wrapper">
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter"
                onChange={({ detail }) => setFilterText(detail.filteringText)}
              />
            </div>
            <div className="network-pagination-controls">
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
              <div className="network-pagination-divider" />
              <Button variant="icon" iconName="settings" ariaLabel="Preferences" />
            </div>
          </div>

          {warningVisible && (
            <Alert
              type="warning"
              dismissible
              onDismiss={() => setWarningVisible(false)}
            >
              This is a warning message
            </Alert>
          )}

          <Grid
            gridDefinition={[
              { colspan: { default: 12, l: 6 } },
              { colspan: { default: 12, l: 6 } },
            ]}
          >
            <div className="network-chart-panel network-chart-panel--elevated">
              <Box variant="h3" padding={{ bottom: 's' }}>
                Network traffic
              </Box>
              <AreaChart
                series={networkTrafficSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                yDomain={[1, 6]}
                xScaleType="categorical"
                xTitle="Day"
                height={300}
                hideFilter
                ariaLabel="Network traffic area chart"
                yTickFormatter={(value) => `y${value}`}
              />
            </div>

            <div className="network-chart-panel">
              <Box variant="h3" padding={{ bottom: 's' }}>
                Credit Usage
              </Box>
              <BarChart
                series={creditUsageSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                yDomain={[1, 6]}
                xScaleType="categorical"
                xTitle="Day"
                height={300}
                hideFilter
                ariaLabel="Credit usage bar chart"
                yTickFormatter={(value) => `y${value}`}
              />
            </div>
          </Grid>

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
            columnDefinitions={deviceColumns}
            items={devices}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            trackBy="id"
            ariaLabels={{
              selectionGroupLabel: 'Items selection',
              allItemsSelectionLabel: () => 'select all',
              itemSelectionLabel: ({ selectedItems: sel }, item) =>
                `${item.id} is ${sel.indexOf(item) >= 0 ? '' : 'not '}selected`,
            }}
          />
        </SpaceBetween>
      }
    />
  );
}
