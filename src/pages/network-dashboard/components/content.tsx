// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { networkTrafficData, creditUsageData, deviceData } from '../data/dashboard-data';

export function NetworkContent() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filterText, setFilterText] = useState('');

  const filteredDevices = deviceData.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(filterText.toLowerCase()) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()),
  );

  const itemsPerPage = 10;
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

  return (
    <SpaceBetween size="l">
      <Flashbar
        items={[
          {
            type: 'error',
            content: 'This is an error message',
            dismissible: true,
            id: 'error-message',
          },
        ]}
      />

      <Grid gridDefinition={[{ colspan: { l: 6, m: 12, default: 12 } }, { colspan: { l: 6, m: 12, default: 12 } }]}>
        <Container header={<Header variant="h2">Network traffic</Header>}>
          <AreaChart
            series={networkTrafficData.series}
            xDomain={networkTrafficData.domain}
            yDomain={[0, 100]}
            xScaleType="categorical"
            xTitle="Day"
            yTitle="Traffic (%)"
            ariaLabel="Network traffic over time"
            height={300}
            hideFilter
            i18nStrings={{
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

        <Container header={<Header variant="h2">Credit Usage</Header>}>
          <BarChart
            series={creditUsageData.series}
            xDomain={creditUsageData.domain}
            yDomain={[0, 100]}
            xScaleType="categorical"
            xTitle="Day"
            yTitle="Credits"
            ariaLabel="Credit usage over time"
            height={300}
            hideFilter
            i18nStrings={{
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
      </Grid>

      <Container
        header={
          <Header
            variant="h2"
            description="Devices on your local network"
            actions={
              <Button variant="primary" iconName="add-plus">
                Add Device
              </Button>
            }
          >
            My Devices
          </Header>
        }
      >
        <SpaceBetween size="m">
          <Grid gridDefinition={[{ colspan: { l: 8, m: 8, default: 12 } }, { colspan: { l: 4, m: 4, default: 12 } }]}>
            <TextFilter
              filteringText={filterText}
              filteringPlaceholder="Search devices..."
              filteringAriaLabel="Filter devices"
              countText={`${filteredDevices.length} matches`}
              onChange={({ detail }) => {
                setFilterText(detail.filteringText);
                setCurrentPageIndex(1);
              }}
            />
            <Box textAlign="right">
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                }}
              />
            </Box>
          </Grid>

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
                header: 'Device Type',
                cell: item => item.type,
                sortingField: 'type',
              },
              {
                id: 'ipAddress',
                header: 'IP Address',
                cell: item => item.ipAddress,
                sortingField: 'ipAddress',
              },
              {
                id: 'macAddress',
                header: 'MAC Address',
                cell: item => item.macAddress,
                sortingField: 'macAddress',
              },
              {
                id: 'status',
                header: 'Status',
                cell: item => item.status,
                sortingField: 'status',
              },
              {
                id: 'lastSeen',
                header: 'Last Seen',
                cell: item => item.lastSeen,
                sortingField: 'lastSeen',
              },
              {
                id: 'bandwidth',
                header: 'Bandwidth Usage',
                cell: item => item.bandwidth,
                sortingField: 'bandwidth',
              },
            ]}
            items={paginatedDevices}
            loadingText="Loading devices"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            selectionType="multi"
            trackBy="id"
            empty={
              <Box textAlign="center" color="inherit">
                <Box variant="strong" textAlign="center" color="inherit">
                  No devices found
                </Box>
                <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                  No devices match the current filter
                </Box>
                <Button>Add Device</Button>
              </Box>
            }
            header={
              <Header
                counter={
                  selectedItems.length
                    ? `(${selectedItems.length}/${filteredDevices.length})`
                    : `(${filteredDevices.length})`
                }
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button disabled={selectedItems.length === 0}>Remove</Button>
                    <Button disabled={selectedItems.length === 0}>Edit</Button>
                  </SpaceBetween>
                }
              >
                Devices
              </Header>
            }
          />
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
