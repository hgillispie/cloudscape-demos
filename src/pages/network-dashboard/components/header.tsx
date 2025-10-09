// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';

export function NetworkDashboardHeader() {
  const [filteringText, setFilteringText] = React.useState('');

  return (
    <SpaceBetween size="m">
      <Header
        variant="h1"
        description="Network Traffic, Credit Usage, and Your Devices"
        actions={
          <Button variant="primary" iconName="external" iconAlign="right">
            Refresh Data
          </Button>
        }
      >
        Network Adminstration Dashboard
      </Header>

      <Alert type="error" dismissible dismissAriaLabel="Dismiss">
        This is a warning message
      </Alert>

      <TextFilter
        filteringText={filteringText}
        filteringPlaceholder="Placeholder"
        filteringAriaLabel="Filter devices"
        onChange={({ detail }) => setFilteringText(detail.filteringText)}
      />
    </SpaceBetween>
  );
}

export function NetworkDashboardMainInfo() {
  return (
    <HelpPanel header={<h2>Network Administration Dashboard</h2>}>
      <SpaceBetween size="m">
        <Box>
          Monitor your network traffic, credit usage, and manage devices connected to your network infrastructure.
        </Box>
        <Box variant="h4">Features</Box>
        <ul>
          <li>Network traffic monitoring</li>
          <li>Credit usage tracking</li>
          <li>Device management</li>
          <li>Real-time statistics</li>
        </ul>
      </SpaceBetween>
    </HelpPanel>
  );
}
