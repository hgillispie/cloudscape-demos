// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

// Network traffic data for area chart
const networkTrafficData = [
  { day: 1, site1: 40000, site2: 30000 },
  { day: 2, site1: 45000, site2: 35000 },
  { day: 3, site1: 38000, site2: 32000 },
  { day: 4, site1: 42000, site2: 28000 },
  { day: 5, site1: 48000, site2: 33000 },
  { day: 6, site1: 52000, site2: 37000 },
  { day: 7, site1: 46000, site2: 31000 },
  { day: 8, site1: 49000, site2: 34000 },
  { day: 9, site1: 51000, site2: 36000 },
  { day: 10, site1: 47000, site2: 32000 },
  { day: 11, site1: 44000, site2: 29000 },
  { day: 12, site1: 50000, site2: 35000 },
];

// Credit usage data for bar chart
const creditUsageData = [
  { day: 1, usage: 183 },
  { day: 2, usage: 257 },
  { day: 3, usage: 213 },
  { day: 4, usage: 122 },
  { day: 5, usage: 210 },
];

// Performance goal for charts
const performanceGoal = 45000;

export const networkTrafficSeries: AreaChartProps['series'] = [
  {
    title: 'Site 1',
    type: 'area',
    valueFormatter: value => value.toLocaleString('en-US'),
    data: networkTrafficData.map(datum => ({ x: datum.day, y: datum.site1 })),
  },
  {
    title: 'Site 2',
    type: 'area',
    valueFormatter: value => value.toLocaleString('en-US'),
    data: networkTrafficData.map(datum => ({ x: datum.day, y: datum.site2 })),
  },
];

export const creditUsageSeries: BarChartProps['series'] = [
  {
    title: 'Site 1',
    type: 'bar',
    valueFormatter: value => value.toLocaleString('en-US'),
    data: creditUsageData.map(datum => ({ x: `x${datum.day}`, y: datum.usage })),
  },
];

// Mock devices data
export const devicesData = [
  { id: '1', deviceName: 'Router-Main', ipAddress: '192.168.1.1', macAddress: '00:11:22:33:44:55', status: 'Active', type: 'Router', lastSeen: '2 minutes ago', bandwidth: '1 Gbps' },
  { id: '2', deviceName: 'Desktop-PC', ipAddress: '192.168.1.100', macAddress: '00:AA:BB:CC:DD:EE', status: 'Active', type: 'Computer', lastSeen: '5 minutes ago', bandwidth: '100 Mbps' },
  { id: '3', deviceName: 'Mobile-Phone', ipAddress: '192.168.1.105', macAddress: '00:FF:EE:DD:CC:BB', status: 'Active', type: 'Mobile', lastSeen: '1 minute ago', bandwidth: '50 Mbps' },
  { id: '4', deviceName: 'Smart-TV', ipAddress: '192.168.1.110', macAddress: '00:99:88:77:66:55', status: 'Inactive', type: 'Entertainment', lastSeen: '2 hours ago', bandwidth: '25 Mbps' },
  { id: '5', deviceName: 'Printer', ipAddress: '192.168.1.120', macAddress: '00:12:34:56:78:90', status: 'Active', type: 'Printer', lastSeen: '10 minutes ago', bandwidth: '10 Mbps' },
  { id: '6', deviceName: 'Smart-Camera', ipAddress: '192.168.1.130', macAddress: '00:AB:CD:EF:12:34', status: 'Active', type: 'Security', lastSeen: '3 minutes ago', bandwidth: '20 Mbps' },
  { id: '7', deviceName: 'Gaming-Console', ipAddress: '192.168.1.140', macAddress: '00:55:44:33:22:11', status: 'Active', type: 'Gaming', lastSeen: '8 minutes ago', bandwidth: '75 Mbps' },
  { id: '8', deviceName: 'Tablet', ipAddress: '192.168.1.150', macAddress: '00:66:77:88:99:AA', status: 'Active', type: 'Tablet', lastSeen: '4 minutes ago', bandwidth: '30 Mbps' },
  { id: '9', deviceName: 'Smart-Speaker', ipAddress: '192.168.1.160', macAddress: '00:BB:CC:DD:EE:FF', status: 'Inactive', type: 'Smart Home', lastSeen: '1 hour ago', bandwidth: '5 Mbps' },
  { id: '10', deviceName: 'Laptop', ipAddress: '192.168.1.170', macAddress: '00:CC:DD:EE:FF:AA', status: 'Active', type: 'Computer', lastSeen: '6 minutes ago', bandwidth: '80 Mbps' },
];

export { performanceGoal };
