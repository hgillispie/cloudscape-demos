// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';

import { Breadcrumbs } from '../commons';
import { networkTrafficSeries, creditUsageSeries, devicesData, deviceColumns } from './data';

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      onDismiss: () => setFlashbarItems([]),
    },
  ]);

  const itemsPerPage = 10;
  const filteredDevices = devicesData.filter(device =>
    device.name.toLowerCase().includes(filterText.toLowerCase()) ||
    device.type.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ipAddress.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Administrative Dashboard' }
          ]}
        />
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
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Warning Banner */}
            <Flashbar items={flashbarItems} />

            {/* Search and Pagination Controls */}
            <Container>
              <Grid gridDefinition={[
                { colspan: { default: 12, s: 8, m: 8, l: 8 } },
                { colspan: { default: 12, s: 4, m: 4, l: 4 } }
              ]}>
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <Box float="right">
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                    <Box color="text-status-inactive" fontSize="body-s">
                      |
                    </Box>
                    <Button variant="icon" iconName="settings" />
                  </SpaceBetween>
                </Box>
              </Grid>
            </Container>

            {/* Charts Section */}
            <Grid gridDefinition={[
              { colspan: { default: 12, m: 6 } },
              { colspan: { default: 12, m: 6 } }
            ]}>
              {/* Network Traffic Area Chart */}
              <Container
                header={
                  <Header variant="h2">
                    Network traffic
                  </Header>
                }
              >
                <AreaChart
                  series={networkTrafficSeries}
                  xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
                  yDomain={[0, 200]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  height={300}
                  hideFilter={false}
                  hideLegend={false}
                  ariaLabel="Network traffic area chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data series',
                    filterPlaceholder: 'Filter series',
                    legendAriaLabel: 'Chart legend',
                  }}
                />
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container
                header={
                  <Header variant="h2">
                    Credit Usage
                  </Header>
                }
              >
                <BarChart
                  series={creditUsageSeries}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  height={300}
                  hideFilter={false}
                  hideLegend={false}
                  ariaLabel="Credit usage bar chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data series',
                    filterPlaceholder: 'Filter series',
                    legendAriaLabel: 'Chart legend',
                  }}
                />
              </Container>
            </Grid>

            {/* My Devices Table */}
            <Table
              columnDefinitions={deviceColumns}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              header={
                <Header
                  variant="h2"
                  counter={filteredDevices.length > 0 ? `(${filteredDevices.length})` : undefined}
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
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                />
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <Box variant="strong" textAlign="center" color="inherit">
                    No devices
                  </Box>
                  <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                    No devices to display.
                  </Box>
                  <Button>Add device</Button>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
