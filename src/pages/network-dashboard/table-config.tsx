// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { TableProps } from '@cloudscape-design/components/table';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Badge from '@cloudscape-design/components/badge';

export interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  type: string;
  lastSeen: string;
  bandwidth: string;
}

export const DEVICES_COLUMN_DEFINITIONS: TableProps<Device>['columnDefinitions'] = [
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
    id: 'status',
    header: 'Status',
    cell: (item: Device) => (
      <StatusIndicator type={item.status === 'Active' ? 'success' : 'stopped'}>{item.status}</StatusIndicator>
    ),
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: Device) => <Badge color="blue">{item.type}</Badge>,
    sortingField: 'type',
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

export const DEFAULT_DEVICES_PREFERENCES = {
  pageSize: 10,
  contentDisplay: [
    { id: 'deviceName', visible: true },
    { id: 'ipAddress', visible: true },
    { id: 'macAddress', visible: true },
    { id: 'status', visible: true },
    { id: 'type', visible: true },
    { id: 'lastSeen', visible: true },
    { id: 'bandwidth', visible: true },
  ],
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable' as const,
};
