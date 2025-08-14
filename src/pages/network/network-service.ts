// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Mock service to simulate network data updates
export class NetworkService {
  private static instance: NetworkService;
  private refreshInterval?: NodeJS.Timeout;

  static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  // Simulate refreshing network traffic data
  async refreshNetworkTrafficData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return updated data with slight variations
    return [
      {
        title: 'Site 1',
        type: 'area' as const,
        data: Array.from({ length: 12 }, (_, i) => ({
          x: `x${i + 1}`,
          y: Math.max(20, Math.min(80, 45 + (Math.random() - 0.5) * 20)),
        })),
        color: '#688AE8',
      },
      {
        title: 'Site 2',
        type: 'area' as const,
        data: Array.from({ length: 12 }, (_, i) => ({
          x: `x${i + 1}`,
          y: Math.max(15, Math.min(60, 35 + (Math.random() - 0.5) * 15)),
        })),
        color: '#C33D69',
      },
      {
        title: 'Performance goal',
        type: 'threshold' as const,
        data: Array.from({ length: 12 }, (_, i) => ({
          x: `x${i + 1}`,
          y: 50,
        })),
        color: '#5F6B7A',
      },
    ];
  }

  // Simulate refreshing credit usage data
  async refreshCreditUsageData() {
    await new Promise(resolve => setTimeout(resolve, 800));

    return [
      {
        title: 'Site 1',
        type: 'bar' as const,
        data: Array.from({ length: 5 }, (_, i) => ({
          x: `x${i + 1}`,
          y: Math.max(30, Math.min(120, 75 + (Math.random() - 0.5) * 40)),
        })),
        color: '#688AE8',
      },
    ];
  }

  // Simulate device status updates
  async refreshDeviceData(currentDevices: any[]) {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Randomly update some device statuses and last seen times
    return currentDevices.map(device => {
      const shouldUpdate = Math.random() < 0.3; // 30% chance to update

      if (shouldUpdate) {
        const now = new Date();
        const secondsAgo = Math.floor(Math.random() * 300); // 0-5 minutes ago
        now.setSeconds(now.getSeconds() - secondsAgo);

        let lastSeen;
        if (secondsAgo < 60) {
          lastSeen = `${secondsAgo} seconds ago`;
        } else {
          const minutesAgo = Math.floor(secondsAgo / 60);
          lastSeen = `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
        }

        return {
          ...device,
          lastSeen,
          // Occasionally change status (rarely)
          status: Math.random() < 0.05 ? (device.status === 'Online' ? 'Offline' : 'Online') : device.status,
        };
      }

      return device;
    });
  }

  // Start auto-refresh (for demo purposes)
  startAutoRefresh(callback: () => void, interval: number = 30000) {
    this.stopAutoRefresh();
    this.refreshInterval = setInterval(callback, interval);
  }

  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = undefined;
    }
  }
}
