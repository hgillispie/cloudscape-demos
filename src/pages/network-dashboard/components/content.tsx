// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';

const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 50 },
      { x: new Date('2024-01-02'), y: 60 },
      { x: new Date('2024-01-03'), y: 55 },
      { x: new Date('2024-01-04'), y: 70 },
      { x: new Date('2024-01-05'), y: 65 },
      { x: new Date('2024-01-06'), y: 80 },
      { x: new Date('2024-01-07'), y: 75 },
      { x: new Date('2024-01-08'), y: 90 },
      { x: new Date('2024-01-09'), y: 85 },
      { x: new Date('2024-01-10'), y: 95 },
      { x: new Date('2024-01-11'), y: 88 },
      { x: new Date('2024-01-12'), y: 82 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 30 },
      { x: new Date('2024-01-02'), y: 35 },
      { x: new Date('2024-01-03'), y: 40 },
      { x: new Date('2024-01-04'), y: 38 },
      { x: new Date('2024-01-05'), y: 42 },
      { x: new Date('2024-01-06'), y: 45 },
      { x: new Date('2024-01-07'), y: 50 },
      { x: new Date('2024-01-08'), y: 48 },
      { x: new Date('2024-01-09'), y: 52 },
      { x: new Date('2024-01-10'), y: 55 },
      { x: new Date('2024-01-11'), y: 58 },
      { x: new Date('2024-01-12'), y: 60 },
    ],
  },
];

const creditUsageData = [
  { x: 'x1', y: 120 },
  { x: 'x2', y: 180 },
  { x: 'x3', y: 150 },
  { x: 'x4', y: 80 },
  { x: 'x5', y: 140 },
];

const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  type: 'Network Device',
  status: i % 3 === 0 ? 'Active' : 'Inactive',
  ip: `192.168.1.${i + 10}`,
  location: `Location ${i + 1}`,
}));

export function Content() {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(1);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const pageSize = 10;
  const paginatedDevices = devicesData.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

  return (
    <SpaceBetween size="l">
      <ColumnLayout columns={2} variant="default">
        <Container header={<Header variant="h2">Network traffic</Header>} fitHeight>
          <AreaChart
            series={networkTrafficData}
            xScaleType="time"
            yTitle="Traffic"
            xTitle="Day"
            height={300}
            statusType="finished"
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'area chart',
              xTickFormatter: value => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              },
            }}
          />
        </Container>

        <Container header={<Header variant="h2">Credit Usage</Header>} fitHeight>
          <BarChart
            series={[
              {
                title: 'Site 1',
                type: 'bar',
                data: creditUsageData,
              },
            ]}
            xScaleType="categorical"
            yTitle="Usage"
            xTitle="Day"
            height={300}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'bar chart',
            }}
          />
        </Container>
      </ColumnLayout>

      <Container>
        <Table
          columnDefinitions={[
            {
              id: 'name',
              header: 'Device Name',
              cell: item => item.name,
              sortingField: 'name',
            },
            {
              id: 'type',
              header: 'Type',
              cell: item => item.type,
            },
            {
              id: 'status',
              header: 'Status',
              cell: item => item.status,
            },
            {
              id: 'ip',
              header: 'IP Address',
              cell: item => item.ip,
            },
            {
              id: 'location',
              header: 'Location',
              cell: item => item.location,
            },
          ]}
          items={paginatedDevices}
          selectionType="multi"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
          header={
            <Header
              variant="h2"
              description="Devices on your local network"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button iconName="external" iconAlign="right">
                    Add Device
                  </Button>
                </SpaceBetween>
              }
            >
              My Devices
            </Header>
          }
          pagination={
            <Pagination
              currentPageIndex={currentPageIndex}
              onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
              pagesCount={Math.ceil(devicesData.length / pageSize)}
              ariaLabels={{
                nextPageLabel: 'Next page',
                previousPageLabel: 'Previous page',
                pageLabel: pageNumber => `Page ${pageNumber}`,
              }}
            />
          }
          empty={
            <Box textAlign="center" color="inherit">
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                <b>No devices</b>
              </Box>
              <Button>Add Device</Button>
            </Box>
          }
        />
      </Container>
    </SpaceBetween>
  );
}
