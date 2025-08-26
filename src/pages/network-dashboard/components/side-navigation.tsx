// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function NetworkSideNavigation() {
  return (
    <SideNavigation
      header={{
        href: '#/',
        text: 'Network Administration',
      }}
      items={[
        {
          type: 'section',
          text: 'Dashboard',
          items: [
            {
              type: 'link',
              text: 'Overview',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'Network Traffic',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'Credit Usage',
              href: '#/network-dashboard',
            },
          ],
        },
        {
          type: 'section',
          text: 'Device Management',
          items: [
            {
              type: 'link',
              text: 'All Devices',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'Add Device',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'Device Groups',
              href: '#/network-dashboard',
            },
          ],
        },
        {
          type: 'section',
          text: 'Network Monitoring',
          items: [
            {
              type: 'link',
              text: 'Performance Metrics',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'Alerts & Notifications',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'Historical Reports',
              href: '#/network-dashboard',
            },
          ],
        },
        {
          type: 'section',
          text: 'Settings',
          items: [
            {
              type: 'link',
              text: 'Network Configuration',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'User Management',
              href: '#/network-dashboard',
            },
            {
              type: 'link',
              text: 'System Preferences',
              href: '#/network-dashboard',
            },
          ],
        },
      ]}
    />
  );
}
