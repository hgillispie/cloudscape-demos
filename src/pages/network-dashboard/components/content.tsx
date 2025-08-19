// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo, useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Button from '@cloudscape-design/components/button';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import { NetworkData, DeviceData } from '../data/mock-data';

interface NetworkContentProps {
  networkData: NetworkData;
  loading: boolean;
}

interface NetworkTrafficChartProps {
  data: NetworkData['networkTraffic'];
  loading: boolean;
}

function NetworkTrafficChart({ data, loading }: NetworkTrafficChartProps) {
  const chartData = useMemo(() => {
    return data.map(item => ({
      x: item.day,
      y1: item.site1,
      y2: item.site2
    }));
  }, [data]);

  return (
    <Container header={<Header variant="h2">Network traffic</Header>}>
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: chartData.map(item => ({ x: item.x, y: item.y1 })),
            color: '#688AE8'
          },
          {
            title: 'Site 2',
            type: 'area',
            data: chartData.map(item => ({ x: item.x, y: item.y2 })),
            color: '#C33D69'
          }
        ]}
        xTitle="Day"
        yTitle="Traffic"
        height={300}
        statusType={loading ? 'loading' : 'finished'}
        loadingText="Loading chart data..."
        errorText="Error loading chart data"
        empty={<Box textAlign="center">No data available</Box>}
        i18nStrings={{
          filterLabel: 'Filter',
          filterPlaceholder: 'Filter data',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart'
        }}
        additionalFilters={
          <div style={{ 
            borderTop: '2px dashed #5F6B7A', 
            width: '100%', 
            position: 'relative',
            marginTop: '20px'
          }}>
            <Box variant="small" color="text-body-secondary" textAlign="center" margin={{ top: 's' }}>
              Performance goal
            </Box>
          </div>
        }
      />
    </Container>
  );
}

interface CreditUsageChartProps {
  data: NetworkData['creditUsage'];
  loading: boolean;
}

function CreditUsageChart({ data, loading }: CreditUsageChartProps) {
  const chartData = useMemo(() => {
    return data.map(item => ({
      x: item.day,
      y: item.usage
    }));
  }, [data]);

  return (
    <Container header={<Header variant="h2">Credit Usage</Header>}>
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: chartData,
            color: '#688AE8'
          }
        ]}
        xTitle="Day"
        yTitle="Usage"
        height={300}
        statusType={loading ? 'loading' : 'finished'}
        loadingText="Loading chart data..."
        errorText="Error loading chart data"
        empty={<Box textAlign="center">No data available</Box>}
        i18nStrings={{
          filterLabel: 'Filter',
          filterPlaceholder: 'Filter data',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart'
        }}
        additionalFilters={
          <div style={{ 
            borderTop: '2px dashed #5F6B7A', 
            width: '100%', 
            position: 'relative',
            marginTop: '20px'
          }}>
            <Box variant="small" color="text-body-secondary" textAlign="center" margin={{ top: 's' }}>
              Performance goal
            </Box>
          </div>
        }
      />
    </Container>
  );
}

interface DevicesTableProps {
  devices: DeviceData[];
  loading: boolean;
}

function DevicesTable({ devices, loading }: DevicesTableProps) {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<DeviceData[]>([]);
  const pageSize = 10;

  const filteredDevices = useMemo(() => {
    return devices.filter(device =>
      device.deviceName.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.ipAddress.includes(filteringText) ||
      device.deviceType.toLowerCase().includes(filteringText.toLowerCase())
    );
  }, [devices, filteringText]);

  const paginatedDevices = useMemo(() => {
    const startIndex = (currentPageIndex - 1) * pageSize;
    return filteredDevices.slice(startIndex, startIndex + pageSize);
  }, [filteredDevices, currentPageIndex]);

  const columnDefinitions = [
    {
      id: 'deviceName',
      header: 'Device Name',
      cell: (item: DeviceData) => item.deviceName,
      sortingField: 'deviceName',
      width: 150
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: DeviceData) => item.ipAddress,
      sortingField: 'ipAddress',
      width: 130
    },
    {
      id: 'macAddress',
      header: 'MAC Address',
      cell: (item: DeviceData) => item.macAddress,
      sortingField: 'macAddress',
      width: 150
    },
    {
      id: 'deviceType',
      header: 'Device Type',
      cell: (item: DeviceData) => item.deviceType,
      sortingField: 'deviceType',
      width: 120
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: DeviceData) => (
        <Badge color={item.status === 'Online' ? 'green' : 'red'}>
          {item.status}
        </Badge>
      ),
      sortingField: 'status',
      width: 100
    },
    {
      id: 'bandwidth',
      header: 'Bandwidth',
      cell: (item: DeviceData) => item.bandwidth,
      sortingField: 'bandwidth',
      width: 120
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: DeviceData) => new Date(item.lastSeen).toLocaleString(),
      sortingField: 'lastSeen',
      width: 160
    }
  ];

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Devices on your local network"
          actions={
            <Button iconName="external" iconAlign="right" variant="primary">
              Add Device
            </Button>
          }
        >
          My Devices
        </Header>
      }
    >
      <Table
        columnDefinitions={columnDefinitions}
        items={paginatedDevices}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        ariaLabels={{
          itemSelectionLabel: (data, item) => `select ${item.deviceName}`,
          selectionGroupLabel: 'Device selection',
        }}
        variant="borderless"
        loading={loading}
        loadingText="Loading devices..."
        trackBy="id"
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No devices found
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              No devices match the current filter.
            </Box>
          </Box>
        }
        filter={
          <TextFilter
            filteringText={filteringText}
            filteringPlaceholder="Search devices..."
            filteringAriaLabel="Filter devices"
            onChange={({ detail }) => {
              setFilteringText(detail.filteringText);
              setCurrentPageIndex(1);
            }}
            countText={`${filteredDevices.length} matches`}
          />
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            pagesCount={Math.ceil(filteredDevices.length / pageSize)}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
            }}
          />
        }
        header={
          <Header
            counter={selectedItems.length > 0 ? `(${selectedItems.length}/${filteredDevices.length})` : `(${filteredDevices.length})`}
          >
            Network Devices
          </Header>
        }
      />
    </Container>
  );
}

export function NetworkContent({ networkData, loading }: NetworkContentProps) {
  return (
    <SpaceBetween size="l">
      <Grid 
        gridDefinition={[
          { colspan: { default: 12, l: 6 } },
          { colspan: { default: 12, l: 6 } }
        ]}
      >
        <NetworkTrafficChart data={networkData.networkTraffic} loading={loading} />
        <CreditUsageChart data={networkData.creditUsage} loading={loading} />
      </Grid>
      
      <DevicesTable devices={networkData.devices} loading={loading} />
    </SpaceBetween>
  );
}
