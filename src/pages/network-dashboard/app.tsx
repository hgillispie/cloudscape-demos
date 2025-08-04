// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import '../../styles/network-dashboard.scss';

// Mock data for charts
const areaChartData = [
  { x: 'x1', y1: 20, y2: 15 },
  { x: 'x2', y1: 25, y2: 18 },
  { x: 'x3', y1: 22, y2: 20 },
  { x: 'x4', y1: 30, y2: 25 },
  { x: 'x5', y1: 28, y2: 22 },
  { x: 'x6', y1: 35, y2: 28 },
  { x: 'x7', y1: 32, y2: 30 },
  { x: 'x8', y1: 38, y2: 35 },
  { x: 'x9', y1: 40, y2: 32 },
  { x: 'x10', y1: 45, y2: 38 },
  { x: 'x11', y1: 42, y2: 40 },
  { x: 'x12', y1: 48, y2: 42 },
];

const barChartData = [
  { x: 'x1', y: 25 },
  { x: 'x2', y: 40 },
  { x: 'x3', y: 35 },
  { x: 'x4', y: 20 },
  { x: 'x5', y: 35 },
];

// Mock data for devices table
const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Cell Value`,
  type: `Cell Value`,
  status: `Cell Value`,
  ip: `Cell Value`,
  location: `Cell Value`,
  lastSeen: `Cell Value`,
  actions: `Cell Value`,
}));

const devicesColumns = [
  { id: 'name', header: 'Column header', cell: (item: any) => item.name, sortingField: 'name' },
  { id: 'type', header: 'Column header', cell: (item: any) => item.type, sortingField: 'type' },
  { id: 'status', header: 'Column header', cell: (item: any) => item.status, sortingField: 'status' },
  { id: 'ip', header: 'Column header', cell: (item: any) => item.ip, sortingField: 'ip' },
  { id: 'location', header: 'Column header', cell: (item: any) => item.location, sortingField: 'location' },
  { id: 'lastSeen', header: 'Column header', cell: (item: any) => item.lastSeen, sortingField: 'lastSeen' },
  { id: 'actions', header: 'Column header', cell: (item: any) => item.actions, sortingField: 'actions' },
];

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  return (
    <HelpPanelProvider value={() => {}}>
      <div className="network-dashboard">
        <CustomAppLayout
        ref={appLayout}
        content={
          <ContentLayout
            header={
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
                  Network Administration Dashboard
                </Header>

                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      buttonText: 'Dismiss',
                    },
                  ]}
                />

                <Grid gridDefinition={[{ colspan: { default: 12, s: 6, m: 6 } }, { colspan: { default: 12, s: 6, m: 6 } }]}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                  <Box textAlign="right">
                    <Pagination
                      currentPageIndex={1}
                      pagesCount={5}
                      onChange={() => {}}
                    />
                  </Box>
                </Grid>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              {/* Charts Section */}
              <Grid gridDefinition={[{ colspan: { default: 12, l: 6 } }, { colspan: { default: 12, l: 6 } }]}>
                <Container>
                  <AreaChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'area',
                        data: areaChartData.map(d => ({ x: d.x, y: d.y1 })),
                        color: '#688AE8',
                      },
                      {
                        title: 'Site 2',
                        type: 'area',
                        data: areaChartData.map(d => ({ x: d.x, y: d.y2 })),
                        color: '#C33D69',
                      },
                    ]}
                    xDomain={areaChartData.map(d => d.x)}
                    yDomain={[0, 50]}
                    xTitle="Day"
                    yTitle="Network traffic"
                    ariaLabel="Network traffic area chart"
                    height={300}
                    hideFilter
                    hideLegend={false}
                    legendTitle="Legend"
                    additionalFilters={
                      <Box color="text-status-inactive" fontSize="body-s">
                        Performance goal
                      </Box>
                    }
                  />
                </Container>

                <Container>
                  <BarChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: barChartData,
                        color: '#688AE8',
                      },
                    ]}
                    xDomain={barChartData.map(d => d.x)}
                    yDomain={[0, 50]}
                    xTitle="Day"
                    yTitle="Credit Usage"
                    ariaLabel="Credit usage bar chart"
                    height={300}
                    hideFilter
                    hideLegend={false}
                    legendTitle="Legend"
                    additionalFilters={
                      <Box color="text-status-inactive" fontSize="body-s">
                        Performance goal
                      </Box>
                    }
                  />
                </Container>
              </Grid>

              {/* My Devices Section */}
              <Container
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
              >
                <Table
                  columnDefinitions={devicesColumns}
                  items={devicesData}
                  selectionType="multi"
                  selectedItems={selectedItems}
                  onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                  ariaLabels={{
                    selectionGroupLabel: 'Items selection',
                    allItemsSelectionLabel: ({ selectedItems }) =>
                      `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                    itemSelectionLabel: ({ selectedItems }, item) => {
                      const isItemSelected = selectedItems.filter(i => i.name === item.name).length;
                      return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
                    },
                  }}
                  trackBy="id"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <Box variant="strong" textAlign="center" color="inherit">
                        No devices
                      </Box>
                      <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                        No devices to display.
                      </Box>
                    </Box>
                  }
                  header={
                    <Header counter={`(${devicesData.length})`}>
                      Devices
                    </Header>
                  }
                />
              </Container>
            </SpaceBetween>
          </ContentLayout>
        }
        breadcrumbs={
          <Breadcrumbs
            items={[
              { text: 'Service', href: '#/' },
              { text: 'Administrative Dashboard', href: '#/network-dashboard' },
            ]}
          />
        }
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
        />
      </div>
    </HelpPanelProvider>
  );
}
