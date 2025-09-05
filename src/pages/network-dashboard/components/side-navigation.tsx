// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function NetworkDashboardSideNavigation() {
  return (
    <SideNavigation
      activeHref="#/network-dashboard"
      header={{ href: '#/', text: 'Service' }}
      items={[
        { type: 'link', text: 'Overview', href: '#/dashboard' },
        { type: 'link', text: 'Network Dashboard', href: '#/network-dashboard' },
        { type: 'divider' },
        {
          type: 'section',
          text: 'Monitoring',
          items: [
            { type: 'link', text: 'Network Traffic', href: '#/network-dashboard' },
            { type: 'link', text: 'Credit Usage', href: '#/network-dashboard' },
            { type: 'link', text: 'Performance Metrics', href: '#/network-dashboard' },
          ],
        },
        {
          type: 'section',
          text: 'Management',
          items: [
            { type: 'link', text: 'Device Management', href: '#/network-dashboard' },
            { type: 'link', text: 'User Access', href: '#/network-dashboard' },
            { type: 'link', text: 'Settings', href: '#/network-dashboard' },
          ],
        },
      ]}
    />
  );
}
