// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import SpaceBetween from '@cloudscape-design/components/space-between';

// Define the device data structure
interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
}

// Generate mock device data that matches the Figma design
const generateDeviceData = (): Device[] => {
  const deviceTypes = ['Router', 'Switch', 'Access Point', 'Server', 'Workstation', 'Printer', 'IoT Device'];
  const statuses = ['Online', 'Offline', 'Warning'];
  const devices: Device[] = [];

  for (let i = 1; i <= 15; i++) {
    devices.push({
      id: `device-${i}`,
      deviceName: `Device-${i.toString().padStart(3, '0')}`,
      ipAddress: `192.168.1.${100 + i}`,
      macAddress: `00:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`,
      deviceType: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastSeen: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
      bandwidth: `${Math.floor(Math.random() * 100)} Mbps`,
    });
  }

  return devices;
};

const devices = generateDeviceData();

// Define column definitions for the table
const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: Device) => item.deviceName,
    sortingField: 'deviceName',
    isRowHeader: true,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: Device) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: Device) => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: Device) => item.deviceType,
    sortingField: 'deviceType',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: Device) => (
      <Box
        color={
          item.status === 'Online' 
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
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: Device) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: Device) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    devices,
    {
      filtering: {
        empty: (
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No devices
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              No devices to display.
            </Box>
            <Button>Add device</Button>
          </Box>
        ),
        noMatch: (
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No matches
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              We can't find a match.
            </Box>
            <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
          </Box>
        ),
      },
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  return (
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      items={items}
      loadingText="Loading devices"
      selectionType="multi"
      trackBy="id"
      empty={
        <Box textAlign="center" color="inherit">
          <Box variant="strong" textAlign="center" color="inherit">
            No devices
          </Box>
          <Box variant="p" padding={{ bottom: 's' }} color="inherit">
            No devices to display.
          </Box>
          <Button>Add device</Button>
        </Box>
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter devices"
          filteringPlaceholder="Find devices"
          countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
        />
      }
      header={
        <Header
          counter={
            selectedItems.length ? `(${selectedItems.length}/${devices.length})` : `(${devices.length})`
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={selectedItems.length === 0}>Remove</Button>
              <Button disabled={selectedItems.length === 0}>Edit</Button>
              <Button variant="primary">Add device</Button>
            </SpaceBetween>
          }
        >
          Devices
        </Header>
      }
      pagination={<Pagination {...paginationProps} />}
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${
            selectedItems.length === 1 ? 'item' : 'items'
          } selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.deviceName} is ${isItemSelected ? '' : 'not'} selected`;
        },
      }}
    />
  );
}
