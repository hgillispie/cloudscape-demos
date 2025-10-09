// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CommonNavigation } from '../../commons/common-components';

const navItems = [
  {
    type: 'section',
    text: 'Weather',
    items: [
      { type: 'link', text: 'Dashboard', href: '#/weather-dashboard' },
      { type: 'link', text: 'Forecast', href: '#/weather-dashboard' },
    ],
  },
];

export function WeatherDashboardSideNavigation() {
  return <CommonNavigation activeHref="#/weather-dashboard" items={navItems} />;
}
