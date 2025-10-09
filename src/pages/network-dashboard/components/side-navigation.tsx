// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { Navigation } from '../../commons';

const navItems = [
  {
    type: 'section',
    text: 'Network',
    items: [
      { type: 'link', text: 'Dashboard', href: '#/network-dashboard' },
      { type: 'link', text: 'Devices', href: '#/network-dashboard' },
      { type: 'link', text: 'Traffic', href: '#/network-dashboard' },
    ],
  },
];

export function NetworkDashboardSideNavigation() {
  return <Navigation items={navItems} activeHref="#/network-dashboard" />;
}
