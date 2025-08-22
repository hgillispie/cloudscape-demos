import React, { useState } from 'react';
import {
  Alert,
  AreaChart,
  BarChart,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Header,
  Input,
  Pagination,
  SpaceBetween,
  Table,
  Box,
} from '@cloudscape-design/components';

// Sample data for the charts
const networkTrafficData = [
  { x: new Date('2024-01-01'), site1: 45, site2: 38 },
  { x: new Date('2024-01-02'), site1: 52, site2: 43 },
  { x: new Date('2024-01-03'), site1: 48, site2: 45 },
  { x: new Date('2024-01-04'), site1: 61, site2: 47 },
  { x: new Date('2024-01-05'), site1: 55, site2: 52 },
  { x: new Date('2024-01-06'), site1: 67, site2: 48 },
  { x: new Date('2024-01-07'), site1: 72, site2: 55 },
  { x: new Date('2024-01-08'), site1: 68, site2: 58 },
  { x: new Date('2024-01-09'), site1: 75, site2: 62 },
  { x: new Date('2024-01-10'), site1: 71, site2: 59 },
  { x: new Date('2024-01-11'), site1: 78, site2: 65 },
  { x: new Date('2024-01-12'), site1: 74, site2: 61 },
];

const creditUsageData = [
  { x: 'Day 1', usage: 75 },
  { x: 'Day 2', usage: 92 },
  { x: 'Day 3', usage: 87 },
  { x: 'Day 4', usage: 68 },
  { x: 'Day 5', usage: 84 },
];

// Sample table data
const deviceTableItems = [
  {
    id: '1',
    name: 'Router-01',
    type: 'Router',
    status: 'Active',
    location: 'Building A',
    ip: '192.168.1.1',
    uptime: '15 days',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    name: 'Switch-01',
    type: 'Switch',
    status: 'Active',
    location: 'Building A',
    ip: '192.168.1.2',
    uptime: '12 days',
    bandwidth: '10 Gbps',
  },
  {
    id: '3',
    name: 'AP-01',
    type: 'Access Point',
    status: 'Warning',
    location: 'Floor 1',
    ip: '192.168.1.10',
    uptime: '8 days',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    name: 'Router-02',
    type: 'Router',
    status: 'Active',
    location: 'Building B',
    ip: '192.168.2.1',
    uptime: '22 days',
    bandwidth: '1 Gbps',
  },
  {
    id: '5',
    name: 'Switch-02',
    type: 'Switch',
    status: 'Inactive',
    location: 'Building B',
    ip: '192.168.2.2',
    uptime: '0 days',
    bandwidth: '10 Gbps',
  },
  {
    id: '6',
    name: 'AP-02',
    type: 'Access Point',
    status: 'Active',
    location: 'Floor 2',
    ip: '192.168.1.11',
    uptime: '5 days',
    bandwidth: '300 Mbps',
  },
  {
    id: '7',
    name: 'Firewall-01',
    type: 'Firewall',
    status: 'Active',
    location: 'DMZ',
    ip: '192.168.0.1',
    uptime: '45 days',
    bandwidth: '2 Gbps',
  },
  {
    id: '8',
    name: 'Router-03',
    type: 'Router',
    status: 'Active',
    location: 'Building C',
    ip: '192.168.3.1',
    uptime: '30 days',
    bandwidth: '1 Gbps',
  },
];

const tableColumnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Box
        color={
          item.status === 'Active'
            ? 'text-status-success'
            : item.status === 'Warning'
              ? 'text-status-warning'
              : 'text-status-error'
        }
      >
        {item.status}
      </Box>
    ),
    sortingField: 'status',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'ip',
    header: 'IP Address',
    cell: (item: any) => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'uptime',
    header: 'Uptime',
    cell: (item: any) => item.uptime,
    sortingField: 'uptime',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export default function NetworkDashboard() {
  const [showAlert, setShowAlert] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const pageSize = 10;
  const filteredItems = deviceTableItems.filter(
    item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.type.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.location.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

  const breadcrumbItems = [
    { text: 'Service', href: '/' },
    { text: 'Administrative Dashboard', href: '#' },
  ];

  const handleRefreshData = () => {
    // Simulate data refresh
    console.log('Refreshing data...');
  };

  const handleAddDevice = () => {
    // Navigate to add device page
    console.log('Add device...');
  };

  return (
    <ContentLayout
      breadcrumbs={<BreadcrumbGroup items={breadcrumbItems} />}
      header={
        <Header
          variant="h1"
          description="Network Traffic, Credit Usage, and Your Devices"
          actions={
            <Button variant="primary" iconName="external" onClick={handleRefreshData}>
              Refresh Data
            </Button>
          }
        >
          Network Administration Dashboard
        </Header>
      }
    >
      <SpaceBetween size="l">
        {/* Warning Alert */}
        {showAlert && (
          <Alert dismissible onDismiss={() => setShowAlert(false)} type="error" header="System Alert">
            This is a warning message
          </Alert>
        )}

        {/* Search and Pagination Controls */}
        <Container>
          <SpaceBetween direction="horizontal" size="l">
            <Input
              type="search"
              placeholder="Placeholder"
              value={searchValue}
              onChange={({ detail }) => setSearchValue(detail.value)}
            />
            <Pagination
              currentPageIndex={currentPageIndex}
              pagesCount={Math.ceil(filteredItems.length / pageSize)}
              onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            />
          </SpaceBetween>
        </Container>

        {/* Charts Section */}
        <SpaceBetween direction="horizontal" size="l">
          {/* Network Traffic Chart */}
          <Container header={<Header variant="h2">Network traffic</Header>}>
            <AreaChart
              series={[
                {
                  title: 'Site 1',
                  type: 'area',
                  data: networkTrafficData.map(d => ({ x: d.x, y: d.site1 })),
                  color: '#688AE8',
                },
                {
                  title: 'Site 2',
                  type: 'area',
                  data: networkTrafficData.map(d => ({ x: d.x, y: d.site2 })),
                  color: '#C33D69',
                },
                {
                  title: 'Performance goal',
                  type: 'threshold',
                  data: networkTrafficData.map(d => ({ x: d.x, y: 60 })),
                  color: '#5F6B7A',
                },
              ]}
              xDomain={[networkTrafficData[0].x, networkTrafficData[networkTrafficData.length - 1].x]}
              yDomain={[0, 100]}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'area chart',
                xTickFormatter: value =>
                  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                yTickFormatter: value => `${value}%`,
              }}
              ariaLabel="Network traffic over time"
              height={300}
              hideLegend={false}
              hideFilter={true}
              fitHeight={false}
              xScaleType="time"
              yTitle="Usage (%)"
              xTitle="Day"
            />
          </Container>

          {/* Credit Usage Chart */}
          <Container header={<Header variant="h2">Credit Usage</Header>}>
            <BarChart
              series={[
                {
                  title: 'Site 1',
                  type: 'bar',
                  data: creditUsageData.map(d => ({ x: d.x, y: d.usage })),
                  color: '#688AE8',
                },
              ]}
              xDomain={creditUsageData.map(d => d.x)}
              yDomain={[0, 100]}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'bar chart',
                yTickFormatter: value => `${value}%`,
              }}
              ariaLabel="Credit usage by day"
              height={300}
              hideLegend={false}
              hideFilter={true}
              fitHeight={false}
              xScaleType="categorical"
              yTitle="Usage (%)"
              xTitle="Day"
            />
          </Container>
        </SpaceBetween>

        {/* My Devices Section */}
        <Container
          header={
            <Header
              variant="h2"
              description="Devices on your local network"
              actions={
                <Button variant="primary" iconName="add-plus" onClick={handleAddDevice}>
                  Add Device
                </Button>
              }
            >
              My Devices
            </Header>
          }
        >
          <Table
            columnDefinitions={tableColumnDefinitions}
            items={paginatedItems}
            loadingText="Loading devices..."
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No devices found</b>
                <Box variant="p" color="inherit">
                  No devices match the current filter criteria.
                </Box>
              </Box>
            }
            pagination={
              <Pagination
                currentPageIndex={currentPageIndex}
                pagesCount={Math.ceil(filteredItems.length / pageSize)}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
              />
            }
          />
        </Container>
      </SpaceBetween>
    </ContentLayout>
  );
}
