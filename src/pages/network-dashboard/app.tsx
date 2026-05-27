// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import Alert from '@cloudscape-design/components/alert';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import { CustomAppLayout } from '../commons/common-components';

const networkTrafficSite1 = [
  { x: 'x1', y: 3.2 },
  { x: 'x2', y: 2.8 },
  { x: 'x3', y: 3.5 },
  { x: 'x4', y: 3.8 },
  { x: 'x5', y: 4.2 },
  { x: 'x6', y: 4.0 },
  { x: 'x7', y: 3.9 },
  { x: 'x8', y: 4.1 },
  { x: 'x9', y: 4.3 },
  { x: 'x10', y: 4.0 },
  { x: 'x11', y: 3.7 },
  { x: 'x12', y: 3.5 },
];

const networkTrafficSite2 = [
  { x: 'x1', y: 3.8 },
  { x: 'x2', y: 3.0 },
  { x: 'x3', y: 4.2 },
  { x: 'x4', y: 4.8 },
  { x: 'x5', y: 5.1 },
  { x: 'x6', y: 5.3 },
  { x: 'x7', y: 4.9 },
  { x: 'x8', y: 5.0 },
  { x: 'x9', y: 5.2 },
  { x: 'x10', y: 4.8 },
  { x: 'x11', y: 4.5 },
  { x: 'x12', y: 4.1 },
];

const creditUsageData = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 6.1 },
  { x: 'x3', y: 4.9 },
  { x: 'x4', y: 3.3 },
  { x: 'x5', y: 4.8 },
];

const deviceData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  deviceName: 'Cell Value',
  ipAddress: 'Cell Value',
  macAddress: 'Cell Value',
  status: 'Cell Value',
  type: 'Cell Value',
  lastSeen: 'Cell Value',
  actions: 'Cell Value',
}));

const columnDefinitions = [
  { id: 'deviceName', header: 'Device Name', cell: (item: (typeof deviceData)[0]) => item.deviceName, sortingField: 'deviceName' },
  { id: 'ipAddress', header: 'IP Address', cell: (item: (typeof deviceData)[0]) => item.ipAddress, sortingField: 'ipAddress' },
  { id: 'macAddress', header: 'MAC Address', cell: (item: (typeof deviceData)[0]) => item.macAddress, sortingField: 'macAddress' },
  { id: 'status', header: 'Status', cell: (item: (typeof deviceData)[0]) => item.status, sortingField: 'status' },
  { id: 'type', header: 'Type', cell: (item: (typeof deviceData)[0]) => item.type, sortingField: 'type' },
  { id: 'lastSeen', header: 'Last Seen', cell: (item: (typeof deviceData)[0]) => item.lastSeen, sortingField: 'lastSeen' },
  { id: 'actions', header: 'Actions', cell: (item: (typeof deviceData)[0]) => item.actions },
];

export function App() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<typeof deviceData>([]);

  const breadcrumbs = (
    <BreadcrumbGroup
      items={[
        { text: 'Service', href: '#' },
        { text: 'Administrative Dashboard', href: '#' },
      ]}
    />
  );

  const notifications = !warningDismissed ? (
    <Alert
      type="warning"
      dismissible
      onDismiss={() => setWarningDismissed(true)}
    >
      This is a warning message
    </Alert>
  ) : undefined;

  const content = (
    <SpaceBetween size="l">
      <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
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
          yDomain={[0, 6]}
          xScaleType="categorical"
          xTitle="Day"
          yTitle="Network traffic"
          height={300}
          hideFilter
          ariaLabel="Network traffic area chart"
        />
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
          xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
          yDomain={[0, 7]}
          xScaleType="categorical"
          xTitle="Day"
          yTitle="Credit Usage"
          height={300}
          hideFilter
          ariaLabel="Credit usage bar chart"
        />
      </Grid>

      <Table
        columnDefinitions={columnDefinitions}
        items={deviceData}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        header={
          <Header
            variant="h2"
            description="Devices on your local network"
            actions={
              <Button iconName="external" iconAlign="right" variant="primary">
                Add Device
              </Button>
            }
          >
            My Devices
          </Header>
        }
        filter={
          <TextFilter
            filteringText={filterText}
            filteringPlaceholder="Placeholder"
            onChange={({ detail }) => setFilterText(detail.filteringText)}
          />
        }
        pagination={
          <Pagination
            currentPageIndex={currentPage}
            pagesCount={5}
            onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
          />
        }
        sortingDisabled={false}
        variant="container"
        stickyHeader
      />
    </SpaceBetween>
  );

  return (
    <CustomAppLayout
      breadcrumbs={breadcrumbs}
      notifications={notifications}
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button iconName="external" iconAlign="right" variant="primary">
                  Refresh Data
                </Button>
              }
            >
              Network Administration Dashboard
            </Header>
          }
        >
          {content}
        </ContentLayout>
      }
    />
  );
}
