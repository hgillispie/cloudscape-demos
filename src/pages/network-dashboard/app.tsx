// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Network Administration Dashboard Application
 *
 * This is the main application component for the Network Administration Dashboard.
 * It provides a comprehensive view of network traffic, credit usage, and device management
 * capabilities in a single unified interface.
 */

import React, { useState } from 'react';

// Cloudscape Design System layout components
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';

// Custom dashboard components
import { DashboardHeader } from './components/dashboard-header'; // Header with breadcrumbs, title, and controls
import { AlertBanner } from './components/alert-banner'; // Dismissible warning notification banner
import { NetworkCharts } from './components/network-charts'; // Network traffic and credit usage visualizations
import { DeviceManagement } from './components/device-management'; // Device table with management actions

/**
 * Main Network Dashboard Application Component
 *
 * Features:
 * - Network traffic monitoring with area charts
 * - Credit usage tracking with bar charts
 * - Device management table with CRUD operations
 * - Dismissible alert/notification system
 * - Responsive layout for all screen sizes
 *
 * @returns {JSX.Element} The complete network dashboard interface
 */
export function App() {
  // State to control the visibility of the alert banner
  // Allows users to dismiss the warning notification
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <AppLayout
      navigationHide // Hide side navigation for full-width dashboard view
      toolsHide // Hide tools panel to maximize content area
      content={
        <ContentLayout header={<DashboardHeader />}>
          {' '}
          {/* Dashboard header with breadcrumbs and actions */}
          {/* Main dashboard content with consistent spacing */}
          <SpaceBetween size="l">
            {/* Conditional rendering of alert banner - only show if not dismissed */}
            {alertVisible && <AlertBanner onDismiss={() => setAlertVisible(false)} />}

            {/* Network monitoring charts section */}
            <NetworkCharts />

            {/* Device management table section */}
            <DeviceManagement />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
