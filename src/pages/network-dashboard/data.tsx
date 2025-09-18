// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';
import { TableProps } from '@cloudscape-design/components/table';
import Badge from '@cloudscape-design/components/badge';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

// Network Traffic Area Chart Data
export const networkTrafficSeries: AreaChartProps.Series<string>[] = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 120 },
      { x: 'x2', y: 110 },
      { x: 'x3', y: 105 },
      { x: 'x4', y: 90 },
      { x: 'x5', y: 85 },
      { x: 'x6', y: 95 },
      { x: 'x7', y: 100 },
      { x: 'x8', y: 108 },
      { x: 'x9', y: 115 },
      { x: 'x10', y: 125 },
      { x: 'x11', y: 130 },
      { x: 'x12', y: 135 },
    ],
    valueFormatter: value => `${value} MB/s`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 80 },
      { x: 'x2', y: 75 },
      { x: 'x3', y: 70 },
      { x: 'x4', y: 65 },
      { x: 'x5', y: 60 },
      { x: 'x6', y: 68 },
      { x: 'x7', y: 72 },
      { x: 'x8', y: 78 },
      { x: 'x9', y: 82 },
      { x: 'x10', y: 88 },
      { x: 'x11', y: 92 },
      { x: 'x12', y: 95 },
    ],
    valueFormatter: value => `${value} MB/s`,
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    data: [
      { x: 'x1', y: 150 },
      { x: 'x2', y: 150 },
      { x: 'x3', y: 150 },
      { x: 'x4', y: 150 },
      { x: 'x5', y: 150 },
      { x: 'x6', y: 150 },
      { x: 'x7', y: 150 },
      { x: 'x8', y: 150 },
      { x: 'x9', y: 150 },
      { x: 'x10', y: 150 },
      { x: 'x11', y: 150 },
      { x: 'x12', y: 150 },
    ],
    valueFormatter: value => `${value} MB/s`,
  },
];

// Credit Usage Bar Chart Data
export const creditUsageSeries: BarChartProps.Series<string>[] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 183 },
      { x: 'x2', y: 257 },
      { x: 'x3', y: 213 },
      { x: 'x4', y: 122 },
      { x: 'x5', y: 210 },
    ],
    valueFormatter: value => `$${value}`,
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    data: [
      { x: 'x1', y: 200 },
      { x: 'x2', y: 200 },
      { x: 'x3', y: 200 },
      { x: 'x4', y: 200 },
      { x: 'x5', y: 200 },
    ],
    valueFormatter: value => `$${value}`,
  },
];

// Device data
export const devicesData = [
  {
    id: '1',
    name: 'Router-Main-01',
    type: 'Router',
    status: 'Online',
    ipAddress: '192.168.1.1',
    macAddress: '00:1B:44:11:3A:B7',
    lastSeen: '2024-01-15T10:30:00Z',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    name: 'Switch-Floor-1',
    type: 'Switch',
    status: 'Online',
    ipAddress: '192.168.1.10',
    macAddress: '00:1B:44:11:3A:B8',
    lastSeen: '2024-01-15T10:25:00Z',
    bandwidth: '10 Gbps',
  },
  {
    id: '3',
    name: 'AP-Conference-Room',
    type: 'Access Point',
    status: 'Warning',
    ipAddress: '192.168.1.20',
    macAddress: '00:1B:44:11:3A:B9',
    lastSeen: '2024-01-15T10:15:00Z',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    name: 'Server-DB-01',
    type: 'Server',
    status: 'Online',
    ipAddress: '192.168.1.100',
    macAddress: '00:1B:44:11:3A:C0',
    lastSeen: '2024-01-15T10:32:00Z',
    bandwidth: '10 Gbps',
  },
  {
    id: '5',
    name: 'Firewall-Edge',
    type: 'Firewall',
    status: 'Online',
    ipAddress: '192.168.1.254',
    macAddress: '00:1B:44:11:3A:C1',
    lastSeen: '2024-01-15T10:28:00Z',
    bandwidth: '1 Gbps',
  },
  {
    id: '6',
    name: 'Printer-Office-01',
    type: 'Printer',
    status: 'Offline',
    ipAddress: '192.168.1.150',
    macAddress: '00:1B:44:11:3A:C2',
    lastSeen: '2024-01-15T08:45:00Z',
    bandwidth: '100 Mbps',
  },
  {
    id: '7',
    name: 'Camera-Security-01',
    type: 'Camera',
    status: 'Online',
    ipAddress: '192.168.1.200',
    macAddress: '00:1B:44:11:3A:C3',
    lastSeen: '2024-01-15T10:30:00Z',
    bandwidth: '50 Mbps',
  },
  {
    id: '8',
    name: 'NAS-Storage-01',
    type: 'Storage',
    status: 'Online',
    ipAddress: '192.168.1.110',
    macAddress: '00:1B:44:11:3A:C4',
    lastSeen: '2024-01-15T10:31:00Z',
    bandwidth: '1 Gbps',
  },
  {
    id: '9',
    name: 'UPS-Backup-01',
    type: 'UPS',
    status: 'Warning',
    ipAddress: '192.168.1.250',
    macAddress: '00:1B:44:11:3A:C5',
    lastSeen: '2024-01-15T10:20:00Z',
    bandwidth: 'N/A',
  },
  {
    id: '10',
    name: 'Monitor-Admin-01',
    type: 'Monitor',
    status: 'Online',
    ipAddress: '192.168.1.50',
    macAddress: '00:1B:44:11:3A:C6',
    lastSeen: '2024-01-15T10:29:00Z',
    bandwidth: '100 Mbps',
  },
  {
    id: '11',
    name: 'Phone-VoIP-01',
    type: 'VoIP Phone',
    status: 'Online',
    ipAddress: '192.168.1.75',
    macAddress: '00:1B:44:11:3A:C7',
    lastSeen: '2024-01-15T10:27:00Z',
    bandwidth: '10 Mbps',
  },
  {
    id: '12',
    name: 'Scanner-Doc-01',
    type: 'Scanner',
    status: 'Offline',
    ipAddress: '192.168.1.160',
    macAddress: '00:1B:44:11:3A:C8',
    lastSeen: '2024-01-15T07:30:00Z',
    bandwidth: '100 Mbps',
  },
];

// Table column definitions
export const deviceColumns: TableProps.ColumnDefinition<typeof devicesData[0]>[] = [
  {
    id: 'name',
    header: 'Device Name',
    cell: item => item.name,
    sortingField: 'name',
    isRowHeader: true,
  },
  {
    id: 'type',
    header: 'Type',
    cell: item => item.type,
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Status',
    cell: item => (
      <Badge
        color={
          item.status === 'Online' ? 'green' :
          item.status === 'Warning' ? 'red' : 'grey'
        }
      >
        {item.status}
      </Badge>
    ),
    sortingField: 'status',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: item => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: item => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: item => new Date(item.lastSeen).toLocaleString(),
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: item => item.bandwidth,
    sortingField: 'bandwidth',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: item => (
      <SpaceBetween direction="horizontal" size="xs">
        <Button variant="link">Edit</Button>
        <Button variant="link">Details</Button>
      </SpaceBetween>
    ),
  },
];
