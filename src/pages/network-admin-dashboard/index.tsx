import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';

import '../../styles/base.scss';
import './network-admin-dashboard.css';

const networkTrafficData = [
  { x: 'x1', site1: 3.2, site2: 2.8 },
  { x: 'x2', site1: 3.5, site2: 3.2 },
  { x: 'x3', site1: 3.8, site2: 4.1 },
  { x: 'x4', site1: 4.0, site2: 5.2 },
  { x: 'x5', site1: 3.9, site2: 5.5 },
  { x: 'x6', site1: 4.2, site2: 4.8 },
  { x: 'x7', site1: 4.1, site2: 5.1 },
  { x: 'x8', site1: 4.3, site2: 5.4 },
  { x: 'x9', site1: 4.5, site2: 5.3 },
  { x: 'x10', site1: 4.4, site2: 5.0 },
  { x: 'x11', site1: 4.6, site2: 4.9 },
  { x: 'x12', site1: 4.3, site2: 4.7 },
];

const creditUsageData = [
  { x: 'x1', credits: 4.2 },
  { x: 'x2', credits: 5.8 },
  { x: 'x3', credits: 4.8 },
  { x: 'x4', credits: 3.1 },
  { x: 'x5', credits: 4.9 },
];

interface Device {
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: string;
  location: string;
  lastSeen: string;
}

const devicesData: Device[] = Array.from({ length: 12 }, (_, i) => ({
  name: `device-${String(i + 1).padStart(3, '0')}`,
  ipAddress: `192.168.1.${10 + i}`,
  macAddress: `00:1A:2B:${String(i + 10).padStart(2, '0')}:4E:5F`,
  type: i % 3 === 0 ? 'Router' : i % 3 === 1 ? 'Server' : 'Workstation',
  status: i % 4 === 0 ? 'Offline' : 'Online',
  location: i % 2 === 0 ? 'Rack A' : 'Rack B',
  lastSeen: `${i + 1}m ago`,
}));

const PERFORMANCE_GOAL = 3.5;

export default function NetworkAdminDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);

  const filteredDevices = devicesData.filter(d =>
    Object.values(d).some(v => v.toLowerCase().includes(filterText.toLowerCase()))
  );

  const pageSize = 10;
  const totalPages = Math.ceil(filteredDevices.length / pageSize);
  const pagedDevices = filteredDevices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const flashItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          dismissible: true,
          content: 'This is a warning message',
          id: 'network-warning',
          onDismiss: () => setWarningDismissed(true),
        },
      ];

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
      notifications={<Flashbar items={flashItems} />}
      content={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            description="Network Traffic, Credit Usage, and Your Devices"
            actions={
              <Button variant="primary" iconName="external" iconAlign="right">
                Refresh Data
              </Button>
            }
          >
            Network Administration Dashboard
          </Header>

          <div className="dashboard-filter-row">
            <TextFilter
              filteringText={filterText}
              filteringPlaceholder="Placeholder"
              onChange={({ detail }) => setFilterText(detail.filteringText)}
            />
            <Pagination
              currentPageIndex={currentPage}
              pagesCount={totalPages || 5}
              onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
            />
          </div>

          <Grid
            gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}
          >
            <Container>
              <AreaChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'area',
                    data: networkTrafficData.map(d => ({ x: d.x, y: d.site1 })),
                    valueFormatter: v => v.toFixed(1),
                  },
                  {
                    title: 'Site 2',
                    type: 'area',
                    data: networkTrafficData.map(d => ({ x: d.x, y: d.site2 })),
                    valueFormatter: v => v.toFixed(1),
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: PERFORMANCE_GOAL,
                  },
                ]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Network traffic"
                height={280}
                hideFilter
                yDomain={[0, 6]}
                ariaLabel="Network traffic area chart"
              />
            </Container>

            <Container>
              <BarChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageData.map(d => ({ x: d.x, y: d.credits })),
                    valueFormatter: v => v.toFixed(1),
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: PERFORMANCE_GOAL,
                  },
                ]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Credit Usage"
                height={280}
                hideFilter
                yDomain={[0, 6]}
                ariaLabel="Credit usage bar chart"
              />
            </Container>
          </Grid>

          <Table
            header={
              <Header
                variant="h2"
                description="Devices on your local network"
                counter={`(${devicesData.length})`}
                actions={
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Add Device
                  </Button>
                }
              >
                My Devices
              </Header>
            }
            columnDefinitions={[
              { id: 'name', header: 'Device Name', cell: d => d.name, sortingField: 'name' },
              { id: 'ipAddress', header: 'IP Address', cell: d => d.ipAddress, sortingField: 'ipAddress' },
              { id: 'macAddress', header: 'MAC Address', cell: d => d.macAddress },
              { id: 'type', header: 'Type', cell: d => d.type, sortingField: 'type' },
              { id: 'status', header: 'Status', cell: d => d.status, sortingField: 'status' },
              { id: 'location', header: 'Location', cell: d => d.location, sortingField: 'location' },
              { id: 'lastSeen', header: 'Last Seen', cell: d => d.lastSeen, sortingField: 'lastSeen' },
            ]}
            items={pagedDevices}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            trackBy="name"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No devices found</b>
              </Box>
            }
          />
        </SpaceBetween>
      }
    />
  );
}
