// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface NetworkTrafficData {
  day: string;
  site1: number;
  site2: number;
}

export interface CreditUsageData {
  day: string;
  usage: number;
}

export interface DeviceData {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
}

export interface NetworkData {
  networkTraffic: NetworkTrafficData[];
  creditUsage: CreditUsageData[];
  devices: DeviceData[];
}

export function generateMockData(): NetworkData {
  const days = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];

  const networkTraffic: NetworkTrafficData[] = days.map(day => ({
    day,
    site1: Math.floor(Math.random() * 50) + 20,
    site2: Math.floor(Math.random() * 40) + 30,
  }));

  const creditUsage: CreditUsageData[] = ['x1', 'x2', 'x3', 'x4', 'x5'].map(day => ({
    day,
    usage: Math.floor(Math.random() * 100) + 50,
  }));

  const devices: DeviceData[] = Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`,
    deviceName: `Device ${i + 1}`,
    ipAddress: `192.168.1.${10 + i}`,
    macAddress: `00:1B:44:11:3A:${(10 + i).toString(16).padStart(2, '0').toUpperCase()}`,
    deviceType: ['Desktop', 'Laptop', 'Mobile', 'Tablet', 'Server'][Math.floor(Math.random() * 5)],
    status: Math.random() > 0.2 ? 'Online' : 'Offline',
    lastSeen: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    bandwidth: `${Math.floor(Math.random() * 100) + 10} Mbps`,
  }));

  return {
    networkTraffic,
    creditUsage,
    devices,
  };
}
