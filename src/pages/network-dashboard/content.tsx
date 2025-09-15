// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Alert from '@cloudscape-design/components/alert';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

// Mock data for network traffic
const networkTrafficData = [
  { x: 'x1', site1: 85, site2: 45 },
  { x: 'x2', site1: 90, site2: 52 },
  { x: 'x3', site1: 88, site2: 48 },
  { x: 'x4', site1: 92, site2: 55 },
  { x: 'x5', site1: 87, site2: 50 },
  { x: 'x6', site1: 95, site2: 58 },
  { x: 'x7', site1: 89, site2: 53 },
  { x: 'x8', site1: 93, site2: 56 },
  { x: 'x9', site1: 91, site2: 54 },
  { x: 'x10', site1: 88, site2: 51 },
  { x: 'x11', site1: 94, site2: 57 },
  { x: 'x12', site1: 90, site2: 52 },
];

// Mock data for credit usage
const creditUsageData = [
  { x: 'x1', usage: 120 },
  { x: 'x2', usage: 180 },
  { x: 'x3', usage: 150 },
  { x: 'x4', usage: 90 },
  { x: 'x5', usage: 160 },
];

// Mock data for devices table
const devicesData = [
  {
    id: '1',
    name: 'Router-Main',
    type: 'Router',
    status: 'Online',
    ip: '192.168.1.1',
    mac: '00:1B:44:11:3A:B7',
    location: 'Office',
  },
  {
    id: '2',
    name: 'Switch-Floor1',
    type: 'Switch',
    status: 'Online',
    ip: '192.168.1.10',
    mac: '00:1B:44:11:3A:B8',
    location: 'Floor 1',
  },
  {
    id: '3',
    name: 'AP-Conference',
    type: 'Access Point',
    status: 'Warning',
    ip: '192.168.1.20',
    mac: '00:1B:44:11:3A:B9',
    location: 'Conference Room',
  },
  {
    id: '4',
    name: 'Printer-Office',
    type: 'Printer',
    status: 'Online',
    ip: '192.168.1.50',
    mac: '00:1B:44:11:3A:C0',
    location: 'Office',
  },
  {
    id: '5',
    name: 'Server-NAS',
    type: 'NAS',
    status: 'Online',
    ip: '192.168.1.100',
    mac: '00:1B:44:11:3A:C1',
    location: 'Server Room',
  },
  {
    id: '6',
    name: 'Camera-Front',
    type: 'IP Camera',
    status: 'Offline',
    ip: '192.168.1.201',
    mac: '00:1B:44:11:3A:C2',
    location: 'Front Door',
  },
  {
    id: '7',
    name: 'Smart-TV',
    type: 'Smart TV',
    status: 'Online',
    ip: '192.168.1.75',
    mac: '00:1B:44:11:3A:C3',
    location: 'Living Room',
  },
  {
    id: '8',
    name: 'Laptop-John',
    type: 'Laptop',
    status: 'Online',
    ip: '192.168.1.150',
    mac: '00:1B:44:11:3A:C4',
    location: 'Home Office',
  },
];

export function NetworkContent() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const itemsPerPage = 10;

  const filteredDevices = devicesData.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ip.includes(filterText) ||
      device.location.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Online':
        return <StatusIndicator type="success">Online</StatusIndicator>;
      case 'Warning':
        return <StatusIndicator type="warning">Warning</StatusIndicator>;
      case 'Offline':
        return <StatusIndicator type="error">Offline</StatusIndicator>;
      default:
        return <StatusIndicator type="pending">Unknown</StatusIndicator>;
    }
  };

  return (
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

      {!warningDismissed && (
        <Alert type="error" dismissible onDismiss={() => setWarningDismissed(true)} dismissAriaLabel="Dismiss">
          This is a warning message
        </Alert>
      )}

      <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
        <Container>
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
            ]}
            xDomain={networkTrafficData.map(d => d.x)}
            yDomain={[0, 100]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'area chart',
              xTickFormatter: e => e,
              yTickFormatter: e => `${e}`,
            }}
            ariaLabel="Network traffic area chart"
            errorText="Error loading data."
            height={300}
            loadingText="Loading chart"
            recoveryText="Retry"
            xScaleType="categorical"
            yScaleType="linear"
            xTitle="Day"
            yTitle="Network traffic"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
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
                data: creditUsageData.map(d => ({ x: d.x, y: d.usage })),
                color: '#688AE8',
              },
            ]}
            xDomain={creditUsageData.map(d => d.x)}
            yDomain={[0, 200]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'bar chart',
              xTickFormatter: e => e,
              yTickFormatter: e => `${e}`,
            }}
            ariaLabel="Credit usage bar chart"
            errorText="Error loading data."
            height={300}
            loadingText="Loading chart"
            recoveryText="Retry"
            xScaleType="categorical"
            yScaleType="linear"
            xTitle="Day"
            yTitle="Credit Usage"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
              </Box>
            }
          />
        </Container>
      </Grid>

      <Container
        header={
          <Header
            variant="h2"
            description="Devices on your local network"
            actions={
              <Button variant="primary" iconName="external" iconAlign="right">
                Add Device
              </Button>
            }
          >
            My Devices
          </Header>
        }
      >
        <SpaceBetween size="m">
          <Grid gridDefinition={[{ colspan: { default: 12, s: 8, m: 6 } }, { colspan: { default: 12, s: 4, m: 6 } }]}>
            <TextFilter
              filteringText={filterText}
              filteringPlaceholder="Placeholder"
              filteringAriaLabel="Filter devices"
              countText={`${filteredDevices.length} matches`}
              onChange={({ detail }) => {
                setFilterText(detail.filteringText);
                setCurrentPageIndex(1);
              }}
            />
            <Box textAlign="right">
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber}`,
                }}
              />
            </Box>
          </Grid>

          <Table
            trackBy="id"
            items={paginatedDevices}
            loadingText="Loading devices"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            selectionType="multi"
            columnDefinitions={[
              { id: 'name', header: 'Device Name', cell: (item: any) => item.name, sortingField: 'name' },
              { id: 'type', header: 'Type', cell: (item: any) => item.type, sortingField: 'type' },
              {
                id: 'status',
                header: 'Status',
                cell: (item: any) => getStatusIcon(item.status),
                sortingField: 'status',
              },
              { id: 'ip', header: 'IP Address', cell: (item: any) => item.ip, sortingField: 'ip' },
              { id: 'mac', header: 'MAC Address', cell: (item: any) => item.mac, sortingField: 'mac' },
              { id: 'location', header: 'Location', cell: (item: any) => item.location, sortingField: 'location' },
            ]}
            empty={
              <Box textAlign="center" color="inherit" margin={{ vertical: 'xs' }}>
                <SpaceBetween size="xxs">
                  <div>
                    <b>No devices</b>
                    <Box variant="p" color="inherit">
                      No devices found on your network.
                    </Box>
                  </div>
                  <Button>Add Device</Button>
                </SpaceBetween>
              </Box>
            }
            filter={
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Search devices"
                filteringAriaLabel="Filter devices"
                onChange={({ detail }) => {
                  setFilterText(detail.filteringText);
                  setCurrentPageIndex(1);
                }}
              />
            }
            header={
              <Header
                counter={
                  selectedItems.length
                    ? `(${selectedItems.length}/${filteredDevices.length})`
                    : `(${filteredDevices.length})`
                }
              >
                Network Devices
              </Header>
            }
            pagination={
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber}`,
                }}
              />
            }
          />
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
