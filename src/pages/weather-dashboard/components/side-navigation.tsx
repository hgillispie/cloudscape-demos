// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function WeatherSideNavigation() {
  return (
    <SideNavigation
      header={{
        href: '#/',
        text: 'Weather Dashboard',
      }}
      items={[
        {
          type: 'section',
          text: 'Weather Data',
          items: [
            {
              type: 'link',
              text: 'Current Conditions',
              href: '#/weather-dashboard',
            },
            {
              type: 'link',
              text: 'Forecast',
              href: '#/weather-dashboard',
            },
            {
              type: 'link',
              text: 'Historical Data',
              href: '#/weather-dashboard',
            },
          ],
        },
        {
          type: 'section',
          text: 'Settings',
          items: [
            {
              type: 'link',
              text: 'Location Preferences',
              href: '#/weather-dashboard',
            },
            {
              type: 'link',
              text: 'Units & Display',
              href: '#/weather-dashboard',
            },
            {
              type: 'link',
              text: 'Alerts & Notifications',
              href: '#/weather-dashboard',
            },
          ],
        },
        {
          type: 'section',
          text: 'Resources',
          items: [
            {
              type: 'link',
              text: 'API Documentation',
              href: 'https://open-meteo.com/en/docs',
              external: true,
            },
            {
              type: 'link',
              text: 'Weather Reports',
              href: '#/weather-dashboard',
            },
          ],
        },
      ]}
    />
  );
}
