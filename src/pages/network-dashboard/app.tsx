// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { CustomAppLayout } from '../commons/common-components';

// --- Types ---

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

// --- Data ---

const networkTrafficSite1Data = [
  { x: 'x1', y: 1.8 },
  { x: 'x2', y: 2.5 },
  { x: 'x3', y: 2.8 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 3.0 },
  { x: 'x6', y: 3.5 },
  { x: 'x7', y: 3.8 },
  { x: 'x8', y: 3.6 },
  { x: 'x9', y: 4.0 },
  { x: 'x10', y: 4.2 },
  { x: 'x11', y: 4.5 },
  { x: 'x12', y: 4.3 },
];

const networkTrafficSite2Data = [
  { x: 'x1', y: 3.0 },
  { x: 'x2', y: 3.2 },
  { x: 'x3', y: 2.8 },
  { x: 'x4', y: 3.5 },
  { x: 'x5', y: 3.7 },
  { x: 'x6', y: 3.2 },
  { x: 'x7', y: 4.0 },
  { x: 'x8', y: 4.5 },
  { x: 'x9', y: 4.8 },
  { x: 'x10', y: 4.3 },
  { x: 'x11', y: 5.0 },
  { x: 'x12', y: 4.6 },
];

const creditUsageData = [
  { x: 'x1', y: 4.3 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 4.8 },
  { x: 'x4', y: 3.3 },
  { x: 'x5', y: 4.8 },
];

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

const allDevices = generateDevices(12);

// --- Top Navigation i18n ---

const topNavI18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const profileActions = [
  { id: 'profile', text: 'Profile' },
  { id: 'preferences', text: 'Preferences' },
  { id: 'security', text: 'Security' },
  { id: 'signout', text: 'Sign out' },
];

// --- Portal for demo header ---

interface DemoHeaderPortalProps {
  children: ReactNode;
}

const DemoHeaderPortal = ({ children }: DemoHeaderPortalProps) => {
  const domNode = document.querySelector('#h');
  if (!domNode) return null;
  return createPortal(children, domNode);
};

// --- Device table column definitions ---

const deviceColumnDefs = [
  {
    id: 'col1',
    header: 'Column header',
    cell: (item: Device) => item.col1,
    sortingField: 'col1',
  },
  {
    id: 'col2',
    header: 'Column header',
    cell: (item: Device) => item.col2,
    sortingField: 'col2',
  },
  {
    id: 'col3',
    header: 'Column header',
    cell: (item: Device) => item.col3,
    sortingField: 'col3',
  },
  {
    id: 'col4',
    header: 'Column header',
    cell: (item: Device) => item.col4,
    sortingField: 'col4',
  },
  {
    id: 'col5',
    header: 'Column header',
    cell: (item: Device) => item.col5,
    sortingField: 'col5',
  },
  {
    id: 'col6',
    header: 'Column header',
    cell: (item: Device) => item.col6,
    sortingField: 'col6',
  },
  {
    id: 'col7',
    header: 'Column header',
    cell: (item: Device) => item.col7,
    sortingField: 'col7',
  },
];

// --- Chart i18n strings ---

const chartI18nStrings = {
  filterLabel: 'Filter displayed data series',
  filterPlaceholder: 'Filter series',
  filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  chartAriaRoleDescription: 'chart',
  xAxisAriaRoleDescription: 'x axis',
  yAxisAriaRoleDescription: 'y axis',
  xTickFormatter: (v: string) => String(v),
  yTickFormatter: (v: number) => `y${v}`,
};

// --- Main Dashboard Page Content ---

function DashboardPageContent() {
  const [warningVisible, setWarningVisible] = useState(true);
  const [deviceFilter, setDeviceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const itemsPerPage = 12;
  const filteredDevices = allDevices.filter(device =>
    Object.values(device)
      .filter(v => v !== device.id)
      .some(v => v.toLowerCase().includes(deviceFilter.toLowerCase())),
  );
  const pageDevices = filteredDevices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredDevices.length / itemsPerPage));

  return (
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
            Network Adminstration Dashboard
          </Header>
          <SpaceBetween direction="horizontal" size="xs" alignItems="center">
            <Box className="dashboard-filter-wrapper">
              <TextFilter
                filteringText={deviceFilter}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter devices"
                onChange={({ detail }) => {
                  setDeviceFilter(detail.filteringText);
                  setCurrentPage(1);
                }}
              />
            </Box>
            <Pagination
              currentPageIndex={currentPage}
              pagesCount={totalPages}
              onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
              ariaLabels={{
                nextPageLabel: 'Next page',
                previousPageLabel: 'Previous page',
                pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
              }}
            />
          </SpaceBetween>
        </SpaceBetween>
      }
    >
      <SpaceBetween size="l">
        {warningVisible && (
          <Flashbar
            items={[
              {
                type: 'warning',
                content: 'This is a warning message',
                dismissible: true,
                dismissLabel: 'Dismiss',
                onDismiss: () => setWarningVisible(false),
              },
            ]}
          />
        )}

        <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
          <Container>
            <AreaChart
              series={[
                {
                  title: 'Site 1',
                  type: 'area',
                  data: networkTrafficSite1Data,
                  color: '#688AE8',
                },
                {
                  title: 'Site 2',
                  type: 'area',
                  data: networkTrafficSite2Data,
                  color: '#C33D69',
                },
                {
                  title: 'Performance goal',
                  type: 'threshold',
                  y: 3.3,
                  color: '#5F6B7A',
                },
              ]}
              xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
              yDomain={[0, 6]}
              i18nStrings={chartI18nStrings}
              ariaLabel="Network traffic area chart"
              height={300}
              xTitle="Day"
              yTitle="Network traffic"
              hideFilter
            />
          </Container>

          <Container>
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
                  y: 3,
                  color: '#5F6B7A',
                },
              ]}
              xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
              yDomain={[0, 6]}
              i18nStrings={chartI18nStrings}
              ariaLabel="Credit usage bar chart"
              height={300}
              xTitle="Day"
              yTitle="Credit Usage"
              hideFilter
            />
          </Container>
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
          columnDefinitions={deviceColumnDefs}
          items={pageDevices}
          selectionType="multi"
          selectedItems={selectedDevices}
          onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
          trackBy="id"
          enableKeyboardNavigation
          ariaLabels={{
            selectionGroupLabel: 'Device selection',
            allItemsSelectionLabel: () => 'select all',
            itemSelectionLabel: (_, item) => `select ${item.id}`,
          }}
          sortingDisabled
        />
      </SpaceBetween>
    </ContentLayout>
  );
}

// --- App Root ---

export function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <DemoHeaderPortal>
        <TopNavigation
          i18nStrings={topNavI18nStrings}
          identity={{
            href: '#',
            title: 'Service name',
          }}
          search={
            <Input
              ariaLabel="Search"
              clearAriaLabel="Clear"
              value={searchValue}
              type="search"
              placeholder="Search"
              onChange={({ detail }) => setSearchValue(detail.value)}
            />
          }
          utilities={[
            {
              type: 'button',
              text: 'Link',
              href: '#',
              external: true,
              externalIconAriaLabel: 'Opens in new tab',
            },
            {
              type: 'button',
              iconName: 'notification',
              ariaLabel: 'Notifications',
              badge: true,
              disableUtilityCollapse: true,
            },
            {
              type: 'button',
              iconName: 'settings',
              title: 'Settings',
              ariaLabel: 'Settings',
              disableUtilityCollapse: true,
            },
            {
              type: 'menu-dropdown',
              text: 'Customer name',
              description: 'customer@example.com',
              iconName: 'user-profile',
              items: profileActions,
            },
          ]}
        />
      </DemoHeaderPortal>

      <CustomAppLayout
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
        content={<DashboardPageContent />}
      />
    </>
  );
}
