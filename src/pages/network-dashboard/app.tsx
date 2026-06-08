import React, { useState } from 'react';

import Flashbar from '@cloudscape-design/components/flashbar';
import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

const NETWORK_TRAFFIC_DATA = {
  site1: [
    { x: 'x1', y: 3.0 },
    { x: 'x2', y: 3.2 },
    { x: 'x3', y: 3.5 },
    { x: 'x4', y: 3.8 },
    { x: 'x5', y: 4.2 },
    { x: 'x6', y: 3.9 },
    { x: 'x7', y: 4.1 },
    { x: 'x8', y: 4.3 },
    { x: 'x9', y: 4.5 },
    { x: 'x10', y: 4.4 },
    { x: 'x11', y: 4.6 },
    { x: 'x12', y: 4.3 },
  ],
  site2: [
    { x: 'x1', y: 2.5 },
    { x: 'x2', y: 3.8 },
    { x: 'x3', y: 4.2 },
    { x: 'x4', y: 4.8 },
    { x: 'x5', y: 5.1 },
    { x: 'x6', y: 4.6 },
    { x: 'x7', y: 4.9 },
    { x: 'x8', y: 5.2 },
    { x: 'x9', y: 5.0 },
    { x: 'x10', y: 4.7 },
    { x: 'x11', y: 5.0 },
    { x: 'x12', y: 4.9 },
  ],
};

const CREDIT_USAGE_DATA = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 6.5 },
  { x: 'x3', y: 5.8 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 5.5 },
];

const DEVICE_COLUMNS = [
  { id: 'col1', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col7' },
];

const DEVICE_ITEMS = Array.from({ length: 12 }, (_, i) => ({ id: `device-${i + 1}` }));

export function App() {
  const [warningVisible, setWarningVisible] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<typeof DEVICE_ITEMS>([]);

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
        />
      }
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <div className="network-dashboard__heading">
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
              </div>

              <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                <div className="network-dashboard__filter-wrapper">
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
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
              </SpaceBetween>

              {warningVisible && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      dismissLabel: 'Dismiss warning',
                      onDismiss: () => setWarningVisible(false),
                    },
                  ]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="xl">
            <ColumnLayout columns={2}>
              <AreaChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'area',
                    data: NETWORK_TRAFFIC_DATA.site1,
                    color: '#688AE8',
                  },
                  {
                    title: 'Site 2',
                    type: 'area',
                    data: NETWORK_TRAFFIC_DATA.site2,
                    color: '#C33D69',
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: 3.8,
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
                    data: CREDIT_USAGE_DATA,
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
            </ColumnLayout>

            <Table
              columnDefinitions={DEVICE_COLUMNS}
              items={DEVICE_ITEMS}
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
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices found.
                  </Box>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
