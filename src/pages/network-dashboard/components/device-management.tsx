// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  ipAddress: string;
  macAddress: string;
  lastSeen: string;
  bandwidth: string;
}

// Mock device data
const generateDevices = (): Device[] => {
  const devices = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: `device-${i}`,
      name: 'Cell Value',
      type: 'Cell Value',
      status: 'Cell Value',
      ipAddress: 'Cell Value',
      macAddress: 'Cell Value',
      lastSeen: 'Cell Value',
      bandwidth: 'Cell Value',
    });
  }
  return devices;
};

const columnDefinitions = [
  {
    id: 'name',
    header: 'Column header',
    cell: (item: Device) => item.name,
    sortingField: 'name',
    minWidth: 140,
  },
  {
    id: 'type',
    header: 'Column header',
    cell: (item: Device) => item.type,
    sortingField: 'type',
    minWidth: 140,
  },
  {
    id: 'status',
    header: 'Column header',
    cell: (item: Device) => item.status,
    sortingField: 'status',
    minWidth: 140,
  },
  {
    id: 'ipAddress',
    header: 'Column header',
    cell: (item: Device) => item.ipAddress,
    sortingField: 'ipAddress',
    minWidth: 140,
  },
  {
    id: 'macAddress',
    header: 'Column header',
    cell: (item: Device) => item.macAddress,
    sortingField: 'macAddress',
    minWidth: 140,
  },
  {
    id: 'lastSeen',
    header: 'Column header',
    cell: (item: Device) => item.lastSeen,
    sortingField: 'lastSeen',
    minWidth: 140,
  },
  {
    id: 'bandwidth',
    header: 'Column header',
    cell: (item: Device) => item.bandwidth,
    sortingField: 'bandwidth',
    minWidth: 140,
  },
];

export function DeviceManagement() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [sortingColumn, setSortingColumn] = useState<any>(null);
  const [sortingDescending, setSortingDescending] = useState(false);

  const devices = generateDevices();

  const handleSortingChange = ({ detail }: any) => {
    setSortingColumn(detail.sortingColumn);
    setSortingDescending(detail.isDescending);
  };

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
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
        items={devices}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        sortingColumn={sortingColumn}
        sortingDescending={sortingDescending}
        onSortingChange={handleSortingChange}
        ariaLabels={{
          selectionGroupLabel: 'Device selection',
          itemSelectionLabel: ({ selectedItems }, item) =>
            `${item.name} is ${selectedItems.indexOf(item) < 0 ? 'not ' : ''}selected`,
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
        }}
        trackBy="id"
        variant="borderless"
        loadingText="Loading devices"
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
        footer={<Box textAlign="center">Showing {devices.length} devices</Box>}
      />
    </SpaceBetween>
  );
}
