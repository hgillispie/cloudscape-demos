import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Grid from '@cloudscape-design/components/grid';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useState } from 'react';

export default function NetworkDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  // Area chart data
  const areaChartSeries = [
    {
      title: 'Site 1',
      type: 'area',
      data: [
        { x: 1, y: 3 },
        { x: 2, y: 2.8 },
        { x: 3, y: 3.2 },
        { x: 4, y: 3.5 },
        { x: 5, y: 4.2 },
        { x: 6, y: 5.1 },
        { x: 7, y: 4.8 },
        { x: 8, y: 4.5 },
        { x: 9, y: 5.2 },
        { x: 10, y: 5.5 },
        { x: 11, y: 5.8 },
        { x: 12, y: 4.2 }
      ],
      valueFormatter: (value) => `${value}`
    },
    {
      title: 'Site 2',
      type: 'area',
      data: [
        { x: 1, y: 2 },
        { x: 2, y: 2.5 },
        { x: 3, y: 2.8 },
        { x: 4, y: 3.2 },
        { x: 5, y: 3.8 },
        { x: 6, y: 4.5 },
        { x: 7, y: 3.8 },
        { x: 8, y: 3.2 },
        { x: 9, y: 3.5 },
        { x: 10, y: 2.8 },
        { x: 11, y: 2.5 },
        { x: 12, y: 2.2 }
      ],
      valueFormatter: (value) => `${value}`
    }
  ];

  // Bar chart data
  const barChartSeries = [
    {
      title: 'Site 1',
      type: 'bar',
      data: [
        { x: 1, y: 3.5 },
        { x: 2, y: 5 },
        { x: 3, y: 4.2 },
        { x: 4, y: 2.5 },
        { x: 5, y: 4.1 }
      ],
      valueFormatter: (value) => `${value}`
    }
  ];

  // Table data
  const tableItems = Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `Device ${i + 1}`,
    ipAddress: `192.168.1.${i + 10}`,
    macAddress: `00:1B:44:11:3A:${(i + 10).toString(16).padStart(2, '0')}`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
    type: ['Router', 'Switch', 'Access Point', 'Server'][i % 4],
    location: ['Floor 1', 'Floor 2', 'Floor 3'][i % 3],
    lastSeen: `${i + 1} hours ago`
  }));

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Device Name',
      cell: (item) => item.name,
      sortingField: 'name'
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item) => item.ipAddress,
      sortingField: 'ipAddress'
    },
    {
      id: 'macAddress',
      header: 'MAC Address',
      cell: (item) => item.macAddress,
      sortingField: 'macAddress'
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item) => item.status,
      sortingField: 'status'
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item) => item.type,
      sortingField: 'type'
    },
    {
      id: 'location',
      header: 'Location',
      cell: (item) => item.location,
      sortingField: 'location'
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item) => item.lastSeen,
      sortingField: 'lastSeen'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <SpaceBetween size="l">
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' }
          ]}
        />

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

        <Flashbar
          items={[
            {
              type: 'warning',
              dismissible: true,
              content: 'This is a warning message',
              id: 'warning-message'
            }
          ]}
        />

        <Box>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Input
              type="search"
              value={searchValue}
              onChange={({ detail }) => setSearchValue(detail.value)}
              placeholder="Placeholder"
              style={{ maxWidth: '500px' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={5}
              />
            </div>
          </div>
        </Box>

        <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
          <Container>
            <AreaChart
              series={areaChartSeries}
              xDomain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              yDomain={[0, 6]}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'area chart',
                xTickFormatter: (value) => `x${value}`,
                yTickFormatter: (value) => `y${value}`
              }}
              ariaLabel="Network traffic chart"
              height={300}
              xTitle="Day"
              yTitle="Network traffic"
              hideFilter
              statusType="finished"
            />
          </Container>

          <Container>
            <BarChart
              series={barChartSeries}
              xDomain={[1, 2, 3, 4, 5]}
              yDomain={[0, 6]}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'bar chart',
                xTickFormatter: (value) => `x${value}`,
                yTickFormatter: (value) => `y${value}`
              }}
              ariaLabel="Credit usage chart"
              height={300}
              xTitle="Day"
              yTitle="Credit Usage"
              hideFilter
              statusType="finished"
            />
          </Container>
        </Grid>

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

        <Table
          columnDefinitions={columnDefinitions}
          items={tableItems}
          selectionType="multi"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
          trackBy="id"
          variant="container"
          stickyHeader
          resizableColumns
          wrapLines
          stripedRows
          sortingDisabled={false}
        />
      </SpaceBetween>
    </div>
  );
}
