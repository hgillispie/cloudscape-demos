// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ExternalLink, InfoLink, useHelpPanel } from '../../commons';

export function NetworkDashboardHeader({ actions }: { actions?: React.ReactNode }) {
  const loadHelpPanelContent = useHelpPanel();

  return (
    <Header
      variant="h1"
      description="Network Traffic, Credit Usage, and Your Devices"
      actions={actions}
      info={
        <InfoLink
          onFollow={() => loadHelpPanelContent(<NetworkMainInfo />)}
          ariaLabel="Information about network administration dashboard"
        />
      }
    >
      Network Administration Dashboard
    </Header>
  );
}

export function NetworkMainInfo() {
  return (
    <HelpPanel
      header={<h2>Network Administration Dashboard</h2>}
      footer={
        <div>
          <h3>Learn more</h3>
          <ul>
            <li>
              <ExternalLink href="https://docs.aws.amazon.com/cloudfront/">
                Amazon CloudFront Documentation
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://cloudscape.design/components/">
                Cloudscape Design System
              </ExternalLink>
            </li>
          </ul>
        </div>
      }
    >
      <SpaceBetween size="m">
        <div>
          <Box variant="p">
            The Network Administration Dashboard provides comprehensive monitoring and management capabilities including:
          </Box>
          <ul>
            <li><strong>Network Traffic</strong> - Real-time monitoring of traffic patterns across multiple sites</li>
            <li><strong>Credit Usage</strong> - Track and analyze credit consumption over time</li>
            <li><strong>Device Management</strong> - View and manage devices on your local network</li>
            <li><strong>Performance Metrics</strong> - Monitor performance against established goals</li>
          </ul>
        </div>

        <div>
          <Box variant="h3">Key Features</Box>
          <ul>
            <li>Interactive charts with filtering and legend controls</li>
            <li>Real-time data visualization with performance indicators</li>
            <li>Device inventory management with multi-select capabilities</li>
            <li>Responsive design optimized for various screen sizes</li>
            <li>Comprehensive search and filtering capabilities</li>
          </ul>
        </div>

        <div>
          <Box variant="h3">Monitoring Capabilities</Box>
          <Box variant="p">
            Monitor network performance in real-time with visual indicators for traffic patterns, 
            credit utilization trends, and device status. The dashboard provides actionable insights 
            to help optimize network performance and resource allocation.
          </Box>
        </div>
      </SpaceBetween>
    </HelpPanel>
  );
}
