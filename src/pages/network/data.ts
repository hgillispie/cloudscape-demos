// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { TableProps } from '@cloudscape-design/components/table';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

// Network Traffic Chart Data
export const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 45 },
      { x: 'x2', y: 42 },
      { x: 'x3', y: 47 },
      { x: 'x4', y: 52 },
      { x: 'x5', y: 48 },
      { x: 'x6', y: 50 },
      { x: 'x7', y: 55 },
      { x: 'x8', y: 52 },
      { x: 'x9', y: 60 },
      { x: 'x10', y: 58 },
      { x: 'x11', y: 62 },
      { x: 'x12', y: 65 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 35 },
      { x: 'x2', y: 38 },
      { x: 'x3', y: 32 },
      { x: 'x4', y: 45 },
      { x: 'x5', y: 42 },
      { x: 'x6', y: 48 },
      { x: 'x7', y: 50 },
      { x: 'x8', y: 45 },
      { x: 'x9', y: 40 },
      { x: 'x10', y: 38 },
      { x: 'x11', y: 35 },
      { x: 'x12', y: 32 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    data: [
      { x: 'x1', y: 50 },
      { x: 'x2', y: 50 },
      { x: 'x3', y: 50 },
      { x: 'x4', y: 50 },
      { x: 'x5', y: 50 },
      { x: 'x6', y: 50 },
      { x: 'x7', y: 50 },
      { x: 'x8', y: 50 },
      { x: 'x9', y: 50 },
      { x: 'x10', y: 50 },
      { x: 'x11', y: 50 },
      { x: 'x12', y: 50 },
    ],
    color: '#5F6B7A',
  },
];

// Credit Usage Chart Data
export const creditUsageData = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 75 },
      { x: 'x2', y: 100 },
      { x: 'x3', y: 85 },
      { x: 'x4', y: 50 },
      { x: 'x5', y: 90 },
    ],
    color: '#688AE8',
  },
];

// Device Interface
interface Device {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
}

// Mock Devices Data
export const devicesData: Device[] = [
  {
    id: '1',
    name: 'Router-Main',
    type: 'Router',
    ipAddress: '192.168.1.1',
    macAddress: '00:1B:44:11:3A:B7',
    status: 'Online',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    name: 'Switch-Floor1',
    type: 'Switch',
    ipAddress: '192.168.1.2',
    macAddress: '00:1B:44:11:3A:B8',
    status: 'Online',
    lastSeen: '5 minutes ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '3',
    name: 'AP-Conference',
    type: 'Access Point',
    ipAddress: '192.168.1.10',
    macAddress: '00:1B:44:11:3A:C1',
    status: 'Online',
    lastSeen: '1 minute ago',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    name: 'Printer-Office',
    type: 'Printer',
    ipAddress: '192.168.1.15',
    macAddress: '00:1B:44:11:3A:D5',
    status: 'Offline',
    lastSeen: '2 hours ago',
    bandwidth: '10 Mbps',
  },
  {
    id: '5',
    name: 'Camera-Entrance',
    type: 'Security Camera',
    ipAddress: '192.168.1.20',
    macAddress: '00:1B:44:11:3A:E2',
    status: 'Online',
    lastSeen: '30 seconds ago',
    bandwidth: '50 Mbps',
  },
  {
    id: '6',
    name: 'Server-Database',
    type: 'Server',
    ipAddress: '192.168.1.100',
    macAddress: '00:1B:44:11:3A:F1',
    status: 'Online',
    lastSeen: '1 minute ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '7',
    name: 'Laptop-HR-01',
    type: 'Laptop',
    ipAddress: '192.168.1.150',
    macAddress: '00:1B:44:11:3B:01',
    status: 'Online',
    lastSeen: '10 minutes ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '8',
    name: 'Phone-Reception',
    type: 'VoIP Phone',
    ipAddress: '192.168.1.200',
    macAddress: '00:1B:44:11:3B:10',
    status: 'Online',
    lastSeen: '3 minutes ago',
    bandwidth: '10 Mbps',
  },
  {
    id: '9',
    name: 'Tablet-Meeting',
    type: 'Tablet',
    ipAddress: '192.168.1.220',
    macAddress: '00:1B:44:11:3B:20',
    status: 'Offline',
    lastSeen: '1 hour ago',
    bandwidth: '50 Mbps',
  },
  {
    id: '10',
    name: 'Scanner-Office',
    type: 'Scanner',
    ipAddress: '192.168.1.25',
    macAddress: '00:1B:44:11:3B:30',
    status: 'Online',
    lastSeen: '15 minutes ago',
    bandwidth: '10 Mbps',
  },
  {
    id: '11',
    name: 'NAS-Storage',
    type: 'NAS',
    ipAddress: '192.168.1.110',
    macAddress: '00:1B:44:11:3B:40',
    status: 'Online',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '12',
    name: 'Desktop-IT-01',
    type: 'Desktop',
    ipAddress: '192.168.1.160',
    macAddress: '00:1B:44:11:3B:50',
    status: 'Online',
    lastSeen: '5 minutes ago',
    bandwidth: '100 Mbps',
  },
];

// Table Column Definitions
export const deviceColumns: TableProps.ColumnDefinition<Device>[] = [
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
    id: 'status',
    header: 'Status',
    cell: item =>
      React.createElement(
        StatusIndicator,
        {
          type: item.status === 'Online' ? 'success' : 'error',
        },
        item.status,
      ),
    sortingField: 'status',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: item => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: item => item.bandwidth,
    sortingField: 'bandwidth',
  },
];
