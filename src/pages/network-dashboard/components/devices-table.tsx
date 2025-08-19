// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import Checkbox from '@cloudscape-design/components/checkbox';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { TableProps } from '@cloudscape-design/components/table';

interface DeviceItem {
  id: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
  column8: string;
}

const generateSampleDevices = (): DeviceItem[] => {
  const devices: DeviceItem[] = [];
  for (let i = 1; i <= 14; i++) {
    devices.push({
      id: `device-${i}`,
      column1: 'Cell Value',
      column2: 'Cell Value',
      column3: 'Cell Value',
      column4: 'Cell Value',
      column5: 'Cell Value',
      column6: 'Cell Value',
      column7: 'Cell Value',
      column8: 'Cell Value',
    });
  }
  return devices;
};

const sampleDevices = generateSampleDevices();

const columnDefinitions: TableProps.ColumnDefinition<DeviceItem>[] = [
  {
    id: 'selection',
    header: '',
    cell: () => <Checkbox />,
    width: 50,
    minWidth: 50,
  },
  {
    id: 'column1',
    header: 'Column header',
    cell: item => item.column1,
    sortingField: 'column1',
  },
  {
    id: 'column2',
    header: 'Column header',
    cell: item => item.column2,
    sortingField: 'column2',
  },
  {
    id: 'column3',
    header: 'Column header',
    cell: item => item.column3,
    sortingField: 'column3',
  },
  {
    id: 'column4',
    header: 'Column header',
    cell: item => item.column4,
    sortingField: 'column4',
  },
  {
    id: 'column5',
    header: 'Column header',
    cell: item => item.column5,
    sortingField: 'column5',
  },
  {
    id: 'column6',
    header: 'Column header',
    cell: item => item.column6,
    sortingField: 'column6',
  },
  {
    id: 'column7',
    header: 'Column header',
    cell: item => item.column7,
    sortingField: 'column7',
  },
  {
    id: 'column8',
    header: 'Column header',
    cell: item => item.column8,
    sortingField: 'column8',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<DeviceItem[]>([]);
  const [sortingColumn, setSortingColumn] = useState<TableProps.SortingColumn<DeviceItem>>({
    sortingField: 'column1',
  });

  return (
    <Container
      header={
        <SpaceBetween direction="vertical" size="xs">
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
        </SpaceBetween>
      }
    >
      <Table
        columnDefinitions={columnDefinitions}
        items={sampleDevices}
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        selectionType="multi"
        ariaLabels={{
          selectionGroupLabel: 'Items selection',
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
            return `${item.id} is ${isItemSelected ? 'selected' : 'not selected'}`;
          },
        }}
        trackBy="id"
        empty="No devices found"
        sortingColumn={sortingColumn}
        onSortingChange={({ detail }) => setSortingColumn(detail.sortingColumn)}
        resizableColumns
        stickyHeader
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox />
          </div>
        }
      />
    </Container>
  );
}
