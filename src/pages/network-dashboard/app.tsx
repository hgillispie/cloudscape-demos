// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { DashboardHeader } from './components/dashboard-header';
import { AlertBanner } from './components/alert-banner';
import { NetworkCharts } from './components/network-charts';
import { DeviceManagement } from './components/device-management';

export function App() {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout header={<DashboardHeader />}>
          <SpaceBetween size="l">
            {alertVisible && <AlertBanner onDismiss={() => setAlertVisible(false)} />}
            <NetworkCharts />
            <DeviceManagement />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
