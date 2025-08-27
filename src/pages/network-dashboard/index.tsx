import React, { useState } from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Button,
  Header,
  SpaceBetween,
  Container,
  Grid,
  Alert,
  Input,
  Pagination,
  Table,
  AreaChart,
  BarChart,
  Box,
  Flashbar,
} from '@cloudscape-design/components';

// Sample data for charts
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 85 },
      { x: 'x2', y: 90 },
      { x: 'x3', y: 88 },
      { x: 'x4', y: 95 },
      { x: 'x5', y: 92 },
      { x: 'x6', y: 98 },
      { x: 'x7', y: 94 },
      { x: 'x8', y: 89 },
      { x: 'x9', y: 93 },
      { x: 'x10', y: 96 },
      { x: 'x11', y: 91 },
      { x: 'x12', y: 97 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 70 },
      { x: 'x2', y: 75 },
      { x: 'x3', y: 72 },
      { x: 'x4', y: 80 },
      { x: 'x5', y: 77 },
      { x: 'x6', y: 83 },
      { x: 'x7', y: 79 },
      { x: 'x8', y: 74 },
      { x: 'x9', y: 78 },
      { x: 'x10', y: 81 },
      { x: 'x11', y: 76 },
      { x: 'x12', y: 82 },
    ],
    color: '#C33D69',
  },
];

const creditUsageData = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 183 },
      { x: 'x2', y: 257 },
      { x: 'x3', y: 213 },
      { x: 'x4', y: 122 },
      { x: 'x5', y: 210 },
    ],
    color: '#688AE8',
  },
];

// Sample data for devices table
const generateDeviceData = () => {
  const devices = [];
  for (let i = 1; i <= 15; i++) {
    devices.push({
      id: `device-${i}`,
      name: `Device ${i}`,
      ipAddress: `192.168.1.${i + 100}`,
      status: i % 3 === 0 ? 'Offline' : 'Online',
      type: ['Router', 'Switch', 'Access Point'][i % 3],
      location: ['Building A', 'Building B', 'Building C'][i % 3],
      lastSeen: `2024-01-${String(15 + (i % 16)).padStart(2, '0')}`,
    });
  }
  return devices;
};

const deviceColumns = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
];

export default function NetworkDashboard() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState(false);

  const deviceData = generateDeviceData();
  const pageSize = 10;
  const totalPages = Math.ceil(deviceData.length / pageSize);

  const handleRefreshData = async () => {
    setLoading(true);
    // Simulate refresh delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleAddDevice = () => {
    console.log('Add device clicked');
  };

  const paginatedDevices = deviceData.slice(
    (currentPageIndex - 1) * pageSize,
    currentPageIndex * pageSize
  );

  return (
    <AppLayout
      content={
        <SpaceBetween size="l">
          {/* Breadcrumbs and Header */}
          <Container>
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
              />
              
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button
                    variant="primary"
                    loading={loading}
                    onClick={handleRefreshData}
                    iconName="external"
                  >
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              {/* Search and Pagination Controls */}
              <Box float="right">
                <SpaceBetween direction="horizontal" size="m">
                  <Input
                    type="search"
                    placeholder="Placeholder"
                    value={searchText}
                    onChange={({ detail }) => setSearchText(detail.value)}
                  />
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  />
                </SpaceBetween>
              </Box>
            </SpaceBetween>
          </Container>

          {/* Warning Alert */}
          {showAlert && (
            <Alert
              type="warning"
              dismissible
              onDismiss={() => setShowAlert(false)}
            >
              This is a warning message
            </Alert>
          )}

          {/* Charts Section */}
          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            {/* Network Traffic Chart */}
            <Container
              header={
                <Header variant="h2">
                  Network traffic
                </Header>
              }
            >
              <AreaChart
                series={networkTrafficData}
                xTitle="Day"
                yTitle=""
                height={300}
                hideLegend={false}
                hideFilter={false}
              />
            </Container>

            {/* Credit Usage Chart */}
            <Container
              header={
                <Header variant="h2">
                  Credit Usage
                </Header>
              }
            >
              <BarChart
                series={creditUsageData}
                xTitle="Day"
                yTitle=""
                height={360}
                hideLegend={false}
                hideFilter={false}
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
                  <Button
                    variant="primary"
                    onClick={handleAddDevice}
                    iconName="external"
                  >
                    Add Device
                  </Button>
                }
              >
                My Devices
              </Header>
            }
          >
            <Table
              columnDefinitions={deviceColumns}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                  <Box variant="p" color="inherit">
                    No devices to display.
                  </Box>
                </Box>
              }
              footer={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={totalPages}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                />
              }
            />
          </Container>
        </SpaceBetween>
      }
      navigationHide
      toolsHide
    />
  );
}
