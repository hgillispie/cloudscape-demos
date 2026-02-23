import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import '../../styles/base.scss';
import '../../styles/top-navigation.scss';
import './network-dashboard.scss';

// --- Chart Data ---

const trafficXDomain = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];

const site1TrafficValues = [3.1, 3.5, 3.3, 3.6, 3.4, 3.7, 3.5, 3.8, 4.0, 4.2, 4.5, 4.3];
const site2TrafficValues = [3.8, 4.2, 3.9, 4.3, 4.1, 4.5, 4.2, 4.6, 4.8, 5.0, 5.2, 4.9];
const performanceGoalTraffic = 3.5;

const creditUsageValues = [4.2, 5.8, 4.9, 3.2, 4.6];
const performanceGoalCredit = 4.0;

// --- Device Table Data ---

interface DeviceItem {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

const deviceItems: DeviceItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

const deviceColumns = [
  { id: 'col1', header: 'Column header', cell: (item: DeviceItem) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: DeviceItem) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: DeviceItem) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: DeviceItem) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: DeviceItem) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: DeviceItem) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: DeviceItem) => item.col7, sortingField: 'col7' },
];

const topNavI18n = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const chartI18n = {
  detailPopoverDismissAriaLabel: 'Dismiss',
  legendAriaLabel: 'Legend',
  filterLabel: 'Filter displayed data series',
  filterPlaceholder: 'Filter series',
  filterSelectedAriaLabel: 'selected',
};

export default function NetworkDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DeviceItem[]>([]);

  return (
    <div className="network-dashboard-root">
      <div className="network-dashboard-topnav">
        <TopNavigation
          i18nStrings={topNavI18n}
          identity={{
            href: '/network-dashboard',
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
              externalIconAriaLabel: '(opens in new tab)',
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
              iconName: 'user-profile',
              items: [
                { id: 'profile', text: 'Profile' },
                { id: 'preferences', text: 'Preferences' },
                { id: 'signout', text: 'Sign out' },
              ],
            },
          ]}
        />
      </div>

      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '/' },
              { text: 'Administrative Dashboard', href: '/network-dashboard' },
            ]}
            ariaLabel="Breadcrumbs"
          />
        }
        notifications={
          !warningDismissed ? (
            <Flashbar
              items={[
                {
                  type: 'warning',
                  content: 'This is a warning message',
                  dismissible: true,
                  dismissLabel: 'Dismiss',
                  onDismiss: () => setWarningDismissed(true),
                  id: 'warning-msg',
                },
              ]}
            />
          ) : undefined
        }
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <Header
                  variant="h1"
                  description="Network Traffic, Credit Usage, and Your Devices"
                  actions={
                    <Button variant="primary" iconName="external" iconAlign="right">
                      Refresh Data
                    </Button>
                  }
                >
                  Network Adminstration Dashboard
                </Header>
                <div className="dashboard-filter-row">
                  <div className="dashboard-filter-input">
                    <TextFilter
                      filteringText={filterText}
                      filteringPlaceholder="Placeholder"
                      onChange={({ detail }) => setFilterText(detail.filteringText)}
                    />
                  </div>
                  <div className="dashboard-pagination-row">
                    <Pagination
                      currentPageIndex={currentPage}
                      pagesCount={5}
                      onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                    />
                  </div>
                </div>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              {/* Charts Section */}
              <ColumnLayout columns={2} borders="vertical">
                {/* Network Traffic Area Chart */}
                <Container>
                  <Box variant="h3" padding={{ bottom: 's' }}>
                    Network traffic
                  </Box>
                  <AreaChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'area',
                        data: site1TrafficValues.map((y, i) => ({ x: `x${i + 1}`, y })),
                        color: '#688AE8',
                      },
                      {
                        title: 'Site 2',
                        type: 'area',
                        data: site2TrafficValues.map((y, i) => ({ x: `x${i + 1}`, y })),
                        color: '#C33D69',
                      },
                      {
                        title: 'Performance goal',
                        type: 'threshold',
                        y: performanceGoalTraffic,
                        color: '#5F6B7A',
                      },
                    ]}
                    xDomain={trafficXDomain}
                    yDomain={[0, 6]}
                    xTitle="Day"
                    yTitle=""
                    ariaLabel="Network traffic chart"
                    height={280}
                    hideFilter
                    xScaleType="categorical"
                    i18nStrings={{ ...chartI18n, chartAriaRoleDescription: 'area chart' }}
                  />
                </Container>

                {/* Credit Usage Bar Chart */}
                <Container>
                  <Box variant="h3" padding={{ bottom: 's' }}>
                    Credit Usage
                  </Box>
                  <BarChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: creditUsageValues.map((y, i) => ({ x: `x${i + 1}`, y })),
                        color: '#688AE8',
                      },
                      {
                        title: 'Performance goal',
                        type: 'threshold',
                        y: performanceGoalCredit,
                        color: '#5F6B7A',
                      },
                    ]}
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                    yDomain={[0, 6]}
                    xTitle="Day"
                    yTitle=""
                    ariaLabel="Credit usage chart"
                    height={280}
                    hideFilter
                    i18nStrings={{ ...chartI18n, chartAriaRoleDescription: 'bar chart' }}
                  />
                </Container>
              </ColumnLayout>

              {/* My Devices Table */}
              <Table
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                columnDefinitions={deviceColumns}
                items={deviceItems}
                trackBy="id"
                header={
                  <Header
                    variant="h2"
                    description="Devices on your local network"
                    counter={`(${deviceItems.length})`}
                    actions={
                      <Button variant="primary" iconName="external" iconAlign="right">
                        Add Device
                      </Button>
                    }
                  >
                    My Devices
                  </Header>
                }
                enableKeyboardNavigation
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </div>
  );
}
