import { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Grid from '@cloudscape-design/components/grid';

export default function NetworkDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  // Network traffic data (area chart)
  const networkTrafficData = [
    {
      title: 'Site 1',
      type: 'area',
      data: [
        { x: new Date(2024, 0, 1), y: 3 },
        { x: new Date(2024, 0, 2), y: 3.5 },
        { x: new Date(2024, 0, 3), y: 3.2 },
        { x: new Date(2024, 0, 4), y: 3.8 },
        { x: new Date(2024, 0, 5), y: 4.2 },
        { x: new Date(2024, 0, 6), y: 4.5 },
        { x: new Date(2024, 0, 7), y: 4.3 },
        { x: new Date(2024, 0, 8), y: 4.1 },
        { x: new Date(2024, 0, 9), y: 3.9 },
        { x: new Date(2024, 0, 10), y: 3.7 },
        { x: new Date(2024, 0, 11), y: 3.5 },
        { x: new Date(2024, 0, 12), y: 3.2 },
      ],
      color: '#688AE8',
    },
    {
      title: 'Site 2',
      type: 'area',
      data: [
        { x: new Date(2024, 0, 1), y: 2 },
        { x: new Date(2024, 0, 2), y: 2.5 },
        { x: new Date(2024, 0, 3), y: 2.8 },
        { x: new Date(2024, 0, 4), y: 3.2 },
        { x: new Date(2024, 0, 5), y: 3.5 },
        { x: new Date(2024, 0, 6), y: 3.8 },
        { x: new Date(2024, 0, 7), y: 3.6 },
        { x: new Date(2024, 0, 8), y: 3.2 },
        { x: new Date(2024, 0, 9), y: 2.8 },
        { x: new Date(2024, 0, 10), y: 2.5 },
        { x: new Date(2024, 0, 11), y: 2.3 },
        { x: new Date(2024, 0, 12), y: 2.1 },
      ],
      color: '#C33D69',
    },
  ];

  // Credit usage data (bar chart)
  const creditUsageData = [
    { x: 'Day 1', y: 183 },
    { x: 'Day 2', y: 257 },
    { x: 'Day 3', y: 213 },
    { x: 'Day 4', y: 122 },
    { x: 'Day 5', y: 210 },
  ];

  // Table data
  const tableItems = Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`,
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  }));

  const tableColumns = [
    {
      id: 'column1',
      header: 'Column header',
      cell: (item) => item.column1,
      sortingField: 'column1',
    },
    {
      id: 'column2',
      header: 'Column header',
      cell: (item) => item.column2,
      sortingField: 'column2',
    },
    {
      id: 'column3',
      header: 'Column header',
      cell: (item) => item.column3,
      sortingField: 'column3',
    },
    {
      id: 'column4',
      header: 'Column header',
      cell: (item) => item.column4,
      sortingField: 'column4',
    },
    {
      id: 'column5',
      header: 'Column header',
      cell: (item) => item.column5,
      sortingField: 'column5',
    },
    {
      id: 'column6',
      header: 'Column header',
      cell: (item) => item.column6,
      sortingField: 'column6',
    },
    {
      id: 'column7',
      header: 'Column header',
      cell: (item) => item.column7,
      sortingField: 'column7',
    },
  ];

  return (
    <AppLayout
      contentType="default"
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                <p>Network Admin Dashboard</p>
              </Header>
              <Flashbar
                items={[
                  {
                    type: 'error',
                    dismissible: true,
                    content: 'This is a warning message',
                    id: 'warning-message',
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              {/* Network Traffic Chart */}
              <Container>
                <AreaChart
                  series={networkTrafficData}
                  xDomain={[
                    new Date(2024, 0, 1),
                    new Date(2024, 0, 12),
                  ]}
                  yDomain={[0, 6]}
                  height={300}
                  xTitle="Day"
                  yTitle="Network traffic"
                  ariaLabel="Network traffic chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) =>
                      `x${new Date(value).getDate()}`,
                    yTickFormatter: (value) => `y${Math.round(value)}`,
                  }}
                  legendTitle="Legend"
                  statusType="finished"
                />
              </Container>

              {/* Credit Usage Chart */}
              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                    },
                  ]}
                  xDomain={creditUsageData.map((d) => d.x)}
                  yDomain={[0, 300]}
                  height={300}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  ariaLabel="Credit usage chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    yTickFormatter: (value) => `y${Math.round(value)}`,
                  }}
                  legendTitle="Legend"
                  statusType="finished"
                />
              </Container>
            </Grid>

            {/* My Devices Table */}
            <Table
              columnDefinitions={tableColumns}
              items={tableItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) =>
                setSelectedItems(detail.selectedItems)
              }
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              filter={
                <Input
                  type="search"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  placeholder="Placeholder"
                  ariaLabel="Search devices"
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={5}
                  onChange={({ detail }) =>
                    setCurrentPage(detail.currentPageIndex)
                  }
                />
              }
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter(
                    (i) => i.id === item.id
                  ).length;
                  return `${item.id} is ${isItemSelected ? '' : 'not '}selected`;
                },
              }}
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices to display.
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
