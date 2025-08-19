// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Badge from '@cloudscape-design/components/badge';

import { Breadcrumbs } from '../commons';
import { generateNetworkTrafficData, generateCreditUsageData, generateDeviceData, NetworkDevice } from './network-data';

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<NetworkDevice[]>([]);
  const [networkData, setNetworkData] = useState(generateNetworkTrafficData());
  const [creditData, setCreditData] = useState(generateCreditUsageData());
  const [devices, setDevices] = useState(generateDeviceData());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = devices.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText),
  );

  // Paginate devices
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setNetworkData(generateNetworkTrafficData());
      setCreditData(generateCreditUsageData());
      setDevices(generateDeviceData());
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusBadge = (status: NetworkDevice['status']) => {
    switch (status) {
      case 'online':
        return <Badge color="green">Online</Badge>;
      case 'offline':
        return <Badge color="red">Offline</Badge>;
      case 'warning':
        return <Badge color="yellow">Warning</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const deviceColumns = [
    {
      id: 'name',
      header: 'Device Name',
      cell: (item: NetworkDevice) => item.name,
      sortingField: 'name',
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item: NetworkDevice) => item.type,
      sortingField: 'type',
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: NetworkDevice) => item.ipAddress,
      sortingField: 'ipAddress',
    },
    {
      id: 'macAddress',
      header: 'MAC Address',
      cell: (item: NetworkDevice) => item.macAddress,
      sortingField: 'macAddress',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: NetworkDevice) => getStatusBadge(item.status),
      sortingField: 'status',
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: NetworkDevice) => new Date(item.lastSeen).toLocaleString(),
      sortingField: 'lastSeen',
    },
    {
      id: 'dataUsage',
      header: 'Data Usage',
      cell: (item: NetworkDevice) => item.dataUsage,
      sortingField: 'dataUsage',
    },
  ];

  return (
    <AppLayout
      navigation={null}
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="refresh" loading={isRefreshing} onClick={handleRefresh}>
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              <Flashbar
                items={[
                  {
                    type: 'error',
                    content: 'This is a warning message',
                    dismissible: true,
                    buttonText: 'Dismiss',
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Search and Pagination Controls */}
            <Container>
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
                ]}
              >
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
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                </Box>
              </Grid>
            </Container>

            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
              {/* Network Traffic Area Chart */}
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={networkData.series}
                  xDomain={networkData.xAxisLabels}
                  yDomain={[0, 70]}
                  height={300}
                  xTitle="Day"
                  yTitle="Traffic"
                  hideFilter
                  statusType="finished"
                  additionalFilters={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '2px',
                            background: 'rgba(116, 146, 231, 0.4)',
                            border: '1px solid #688AE8',
                          }}
                        ></div>
                        <span style={{ fontSize: '14px', color: '#000716' }}>Site 1</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '2px',
                            background: 'rgba(195, 61, 105, 0.4)',
                            border: '1px solid #C33D69',
                          }}
                        ></div>
                        <span style={{ fontSize: '14px', color: '#000716' }}>Site 2</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '12px',
                            height: '3px',
                            display: 'flex',
                            gap: '2px',
                          }}
                        >
                          <div
                            style={{ width: '6px', height: '3px', background: '#5F6B7A', borderRadius: '1px' }}
                          ></div>
                          <div
                            style={{ width: '6px', height: '3px', background: '#5F6B7A', borderRadius: '1px' }}
                          ></div>
                        </div>
                        <span style={{ fontSize: '14px', color: '#000716' }}>Performance goal</span>
                      </div>
                    </div>
                  }
                />
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={creditData.series}
                  xDomain={creditData.xAxisLabels}
                  yDomain={[0, 100]}
                  height={300}
                  xTitle="Day"
                  yTitle="Credits"
                  hideFilter
                  statusType="finished"
                  additionalFilters={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '2px',
                            background: '#688AE8',
                          }}
                        ></div>
                        <span style={{ fontSize: '14px', color: '#000716' }}>Site 1</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '12px',
                            height: '3px',
                            display: 'flex',
                            gap: '2px',
                          }}
                        >
                          <div
                            style={{ width: '6px', height: '3px', background: '#5F6B7A', borderRadius: '1px' }}
                          ></div>
                          <div
                            style={{ width: '6px', height: '3px', background: '#5F6B7A', borderRadius: '1px' }}
                          ></div>
                        </div>
                        <span style={{ fontSize: '14px', color: '#000716' }}>Performance goal</span>
                      </div>
                    </div>
                  }
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
                    <Button variant="primary" iconName="add-plus">
                      Add Device
                    </Button>
                  }
                  counter={`(${filteredDevices.length})`}
                >
                  My Devices
                </Header>
              }
            >
              <Table
                columnDefinitions={deviceColumns}
                items={paginatedDevices}
                loadingText="Loading devices"
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No devices
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      No devices to display.
                    </Box>
                  </Box>
                }
                selectionType="multi"
                selectedItems={selectedDevices}
                onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                    return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
                  },
                }}
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
    />
  );
}
