// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { Location, getLocations } from '../weather-service';

interface WeatherSideNavigationProps {
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
}

export function WeatherSideNavigation({ selectedLocation, onLocationChange }: WeatherSideNavigationProps) {
  const locations = getLocations();
  
  const navigationItems = [
    {
      type: 'section' as const,
      text: 'Locations',
      items: locations.map(location => ({
        type: 'link' as const,
        text: location.name,
        href: '#',
        external: false,
        onClick: (event: React.SyntheticEvent) => {
          event.preventDefault();
          onLocationChange(location);
        }
      }))
    },
    { type: 'divider' as const },
    {
      type: 'section' as const,
      text: 'Views',
      items: [
        {
          type: 'link' as const,
          text: 'Current conditions',
          href: '#current',
          external: false
        },
        {
          type: 'link' as const,
          text: 'Hourly forecast',
          href: '#hourly',
          external: false
        },
        {
          type: 'link' as const,
          text: '7-day forecast',
          href: '#daily',
          external: false
        }
      ]
    }
  ];

  return (
    <SideNavigation
      activeHref={`#${selectedLocation.name.toLowerCase().replace(' ', '-')}`}
      header={{ href: '#/', text: 'Weather Dashboard' }}
      items={navigationItems}
    />
  );
}
