// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface NetworkDevice {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  macAddress: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  dataUsage: string;
}

// Generate sample network traffic data for area chart
export const generateNetworkTrafficData = () => {
  const site1Data = [];
  const site2Data = [];
  const xAxisLabels = [];

  for (let i = 1; i <= 12; i++) {
    xAxisLabels.push(`x${i}`);
    site1Data.push({
      x: `x${i}`,
      y: Math.floor(Math.random() * 40) + 20,
    });
    site2Data.push({
      x: `x${i}`,
      y: Math.floor(Math.random() * 35) + 15,
    });
  }

  return {
    series: [
      {
        title: 'Site 1',
        type: 'area' as const,
        data: site1Data,
      },
      {
        title: 'Site 2',
        type: 'area' as const,
        data: site2Data,
      },
    ],
    xAxisLabels,
  };
};

// Generate sample credit usage data for bar chart
export const generateCreditUsageData = () => {
  const data = [];
  const xAxisLabels = [];

  for (let i = 1; i <= 5; i++) {
    const value = Math.floor(Math.random() * 60) + 20;
    xAxisLabels.push(`x${i}`);
    data.push({
      x: `x${i}`,
      y: value,
    });
  }

  return {
    series: [
      {
        title: 'Site 1',
        type: 'bar' as const,
        data,
      },
    ],
    xAxisLabels,
  };
};

// Generate sample device data
export const generateDeviceData = (): NetworkDevice[] => {
  const deviceTypes = ['Router', 'Switch', 'Access Point', 'Firewall', 'Server', 'Workstation'];
  const statuses: NetworkDevice['status'][] = ['online', 'offline', 'warning'];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `Device-${String(i + 1).padStart(3, '0')}`,
    type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
    ipAddress: `192.168.1.${10 + i}`,
    macAddress: `00:1B:63:${Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()}:${Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()}:${Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastSeen: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    dataUsage: `${(Math.random() * 1000).toFixed(1)} MB`,
  }));
};
