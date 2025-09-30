// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Breadcrumbs, Navigation, Notifications } from '../commons';
import { CustomAppLayout, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { useLocalStorage } from '../commons/use-local-storage';
import { useColumnWidths } from '../commons/use-column-widths';
import { commonChartProps, dateFormatter } from '../dashboard/widgets/chart-commons';
import { creditUsageSeries, devicesData, networkTrafficSeries, performanceGoal } from './data';
import { DEVICES_COLUMN_DEFINITIONS, DEFAULT_DEVICES_PREFERENCES, Device } from './table-config';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  
  // Devices table state
  const [columnDefinitions, saveWidths] = useColumnWidths('Network-Devices-Table-Widths', DEVICES_COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('Network-Devices-Table-Preferences', DEFAULT_DEVICES_PREFERENCES);
  
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    devicesData,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Device" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  const handleAddDevice = () => {
    // Placeholder for add device functionality
    console.log('Add device clicked');
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      contentType="dashboard"
      content={
        <SpaceBetween size="l">
          {/* Warning Banner */}
          <Flashbar
            items={[
              {
                type: 'error',
                content: 'This is a warning message',
                dismissible: true,
                buttonText: 'Dismiss',
                id: 'warning-banner',
              },
            ]}
          />

          {/* Main Dashboard Header */}
          <Header
            variant="h1"
            actions={
              <Button variant="primary" iconAlign="right" iconName="external">
                Refresh Data
              </Button>
            }
          >
            Network Administration Dashboard
          </Header>
          
          <Box variant="p" color="text-body-secondary">
            Network Traffic, Credit Usage, and Your Devices
          </Box>

          {/* Charts Section */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } }
            ]}
          >
            {/* Network Traffic Area Chart */}
            <Container>
              <AreaChart
                {...commonChartProps}
                hideFilter={true}
                series={networkTrafficSeries}
                xTitle="Day"
                yTitle="Network traffic"
                height={300}
                xScaleType="categorical"
                additionalFilters={
                  <Box textAlign="center">
                    <hr style={{ border: 'none', borderTop: '2px dashed #5F6B7A', margin: '10px 0' }} />
                    <Box fontSize="body-s" color="text-body-secondary">Performance goal</Box>
                  </Box>
                }
                ariaLabel="Network traffic area chart"
                ariaDescription="Area chart showing network traffic for Site 1 and Site 2"
              />
            </Container>

            {/* Credit Usage Bar Chart */}
            <Container>
              <BarChart
                {...commonChartProps}
                hideFilter={true}
                series={creditUsageSeries}
                xTitle="Day"
                yTitle="Credit Usage"
                height={300}
                xScaleType="categorical"
                additionalFilters={
                  <Box textAlign="center">
                    <hr style={{ border: 'none', borderTop: '2px dashed #5F6B7A', margin: '10px 0' }} />
                    <Box fontSize="body-s" color="text-body-secondary">Performance goal</Box>
                  </Box>
                }
                ariaLabel="Credit usage bar chart"
                ariaDescription="Bar chart showing credit usage for Site 1"
              />
            </Container>
          </Grid>

          {/* My Devices Section */}
          <Container>
            <SpaceBetween size="l">
              <Header
                variant="h2"
                description="Devices on your local network"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="external" onClick={handleAddDevice}>
                    Add Device
                  </Button>
                }
              >
                My Devices
              </Header>

              <Table
                {...collectionProps}
                enableKeyboardNavigation={true}
                columnDefinitions={columnDefinitions}
                columnDisplay={preferences?.contentDisplay}
                items={items}
                selectionType="multi"
                variant="container"
                stickyHeader={true}
                resizableColumns={true}
                onColumnWidthsChange={saveWidths}
                wrapLines={preferences?.wrapLines}
                stripedRows={preferences?.stripedRows}
                contentDensity={preferences?.contentDensity}
                header={
                  <SpaceBetween direction="horizontal" size="xs">
                    <TextFilter
                      {...filterProps}
                      filteringPlaceholder="Search devices"
                      filteringAriaLabel="Filter devices"
                      countText={`${filteredItemsCount} matches`}
                    />
                    <Pagination 
                      {...paginationProps}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                      }}
                    />
                  </SpaceBetween>
                }
                filter={
                  <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Search devices"
                    filteringAriaLabel="Filter devices"
                    countText={`${filteredItemsCount} matches`}
                  />
                }
                pagination={
                  <Pagination 
                    {...paginationProps}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                }
                empty={<TableEmptyState resourceName="Device" />}
              />
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs items={[{ text: 'Administrative Dashboard', href: '#/network-dashboard' }]} />}
      navigation={<Navigation activeHref="#/network-dashboard" />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      notifications={<Notifications />}
    />
  );
}
