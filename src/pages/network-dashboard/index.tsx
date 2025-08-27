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
} from '@cloudscape-design/components';

// Sample data for charts - matching Figma design more closely
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 25 },
      { x: 'x2', y: 35 },
      { x: 'x3', y: 45 },
      { x: 'x4', y: 40 },
      { x: 'x5', y: 50 },
      { x: 'x6', y: 65 },
      { x: 'x7', y: 55 },
      { x: 'x8', y: 48 },
      { x: 'x9', y: 52 },
      { x: 'x10', y: 60 },
      { x: 'x11', y: 58 },
      { x: 'x12', y: 62 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 15 },
      { x: 'x2', y: 25 },
      { x: 'x3', y: 35 },
      { x: 'x4', y: 30 },
      { x: 'x5', y: 38 },
      { x: 'x6', y: 45 },
      { x: 'x7', y: 42 },
      { x: 'x8', y: 35 },
      { x: 'x9', y: 40 },
      { x: 'x10', y: 48 },
      { x: 'x11', y: 44 },
      { x: 'x12', y: 50 },
    ],
    color: '#C33D69',
  },
];

const thresholdData = {
  title: 'Performance goal',
  type: 'threshold' as const,
  data: Array.from({ length: 12 }, (_, i) => ({ x: `x${i + 1}`, y: 50 })),
  color: '#5F6B7A',
};

const creditUsageData = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 75 },
      { x: 'x2', y: 100 },
      { x: 'x3', y: 85 },
      { x: 'x4', y: 50 },
      { x: 'x5', y: 90 },
    ],
    color: '#688AE8',
  },
];

// Sample data for devices table
const generateDeviceData = () => {
  const devices = [];
  const deviceNames = [
    'Main Router', 'Core Switch', 'WiFi AP-01', 'Firewall-01', 'Switch-Floor2',
    'WiFi AP-02', 'Backup Router', 'Switch-Floor3', 'WiFi AP-03', 'Load Balancer',
    'Switch-Floor4', 'WiFi AP-04', 'DMZ Switch', 'WiFi AP-05', 'Edge Router'
  ];
  const deviceTypes = ['Router', 'Switch', 'Access Point', 'Firewall', 'Load Balancer'];
  const locations = ['Data Center', 'Floor 1', 'Floor 2', 'Floor 3', 'DMZ'];

  for (let i = 1; i <= 15; i++) {
    devices.push({
      id: `device-${i}`,
      name: deviceNames[i - 1] || `Device ${i}`,
      ipAddress: `192.168.${Math.floor(i / 10) + 1}.${(i % 100) + 10}`,
      status: i % 4 === 0 ? 'Offline' : 'Online',
      type: deviceTypes[i % deviceTypes.length],
      location: locations[i % locations.length],
      lastSeen: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    });
  }
  return devices;
};

const deviceColumns = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => <strong>{item.name}</strong>,
    sortingField: 'name',
    width: 180,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => <code style={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '3px' }}>{item.ipAddress}</code>,
    sortingField: 'ipAddress',
    width: 140,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <span style={{
        color: item.status === 'Online' ? '#16a34a' : '#dc2626',
        fontWeight: 'medium'
      }}>
        {item.status}
      </span>
    ),
    sortingField: 'status',
    width: 100,
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
    width: 140,
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
    width: 120,
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
    width: 110,
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
            <Box textAlign="right">
              <SpaceBetween direction="horizontal" size="m" alignItems="center">
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
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6 } },
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6 } }
            ]}
          >
            {/* Network Traffic Chart */}
            <Container
              header={
                <Header variant="h2">
                  Network traffic
                </Header>
              }
            >
              <AreaChart
                series={[...networkTrafficData, thresholdData]}
                xTitle="Day"
                yTitle=""
                height={300}
                hideLegend={false}
                hideFilter={false}
                yDomain={[0, 100]}
                statusType="finished"
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
                series={[
                  ...creditUsageData,
                  {
                    title: 'Performance goal',
                    type: 'threshold' as const,
                    data: Array.from({ length: 5 }, (_, i) => ({ x: `x${i + 1}`, y: 75 })),
                    color: '#5F6B7A',
                  }
                ]}
                xTitle="Day"
                yTitle=""
                height={360}
                hideLegend={false}
                hideFilter={false}
                yDomain={[0, 120]}
                statusType="finished"
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
