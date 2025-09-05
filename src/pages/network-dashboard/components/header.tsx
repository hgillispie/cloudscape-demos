// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

interface NetworkDashboardHeaderProps {
  actions?: React.ReactNode;
}

export function NetworkDashboardHeader({ actions }: NetworkDashboardHeaderProps) {
  return (
    <Header
      variant="h1"
      info={<div>Network Traffic, Credit Usage, and Your Devices</div>}
      description="Network Traffic, Credit Usage, and Your Devices"
      actions={actions}
    >
      Network Administration Dashboard
    </Header>
  );
}

export function NetworkDashboardMainInfo() {
  return (
    <SpaceBetween size="l">
      <div>
        <Box variant="h2">Network Administration Dashboard</Box>
        <Box variant="p">
          This dashboard provides insights into your network performance, credit usage patterns, and device management.
          Monitor real-time traffic flows, track resource consumption, and manage connected devices from a centralized
          view.
        </Box>
      </div>

      <div>
        <Box variant="h3">Key Features</Box>
        <ul>
          <li>
            <strong>Network Traffic Monitoring:</strong> Real-time visualization of traffic patterns across your
            infrastructure
          </li>
          <li>
            <strong>Credit Usage Tracking:</strong> Monitor resource consumption and costs
          </li>
          <li>
            <strong>Device Management:</strong> View and manage all connected devices
          </li>
          <li>
            <strong>Performance Analytics:</strong> Track performance against established goals
          </li>
        </ul>
      </div>

      <div>
        <Box variant="h3">Getting Started</Box>
        <Box variant="p">
          Use the "Refresh Data" button to update all metrics with the latest information. Filter devices using the
          search functionality or add new devices using the "Add Device" button.
        </Box>
      </div>
    </SpaceBetween>
  );
}
