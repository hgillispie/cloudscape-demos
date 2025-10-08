// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Select from '@cloudscape-design/components/select';
import { SelectProps } from '@cloudscape-design/components/select';

import { WeatherContent } from './components/weather-content';
import { Breadcrumbs, Notifications } from '../commons';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

interface LocationOption {
  label: string;
  value: string;
  latitude: number;
  longitude: number;
}

const LOCATIONS: LocationOption[] = [
  { label: 'Seattle, WA', value: 'seattle', latitude: 47.6062, longitude: -122.3321 },
  { label: 'New York, NY', value: 'newyork', latitude: 40.7128, longitude: -74.006 },
  { label: 'Los Angeles, CA', value: 'losangeles', latitude: 34.0522, longitude: -118.2437 },
  { label: 'Chicago, IL', value: 'chicago', latitude: 41.8781, longitude: -87.6298 },
  { label: 'Miami, FL', value: 'miami', latitude: 25.7617, longitude: -80.1918 },
  { label: 'London, UK', value: 'london', latitude: 51.5074, longitude: -0.1278 },
  { label: 'Tokyo, Japan', value: 'tokyo', latitude: 35.6762, longitude: 139.6503 },
  { label: 'Sydney, Australia', value: 'sydney', latitude: -33.8688, longitude: 151.2093 },
];

export function App() {
  const [selectedLocation, setSelectedLocation] = useState<SelectProps.Option>(LOCATIONS[0]);
  const [refreshKey, setRefreshKey] = useState(0);

  const currentLocation = LOCATIONS.find(loc => loc.value === selectedLocation.value) || LOCATIONS[0];

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Select
                    selectedOption={selectedLocation}
                    onChange={({ detail }) => setSelectedLocation(detail.selectedOption)}
                    options={LOCATIONS}
                    selectedAriaLabel="Selected"
                  />
                  <Button iconName="refresh" onClick={() => setRefreshKey(prev => prev + 1)}>
                    Refresh
                  </Button>
                </SpaceBetween>
              }
            >
              Weather Dashboard
            </Header>
          }
        >
          <WeatherContent
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
            locationName={currentLocation.label}
            refreshKey={refreshKey}
          />
        </ContentLayout>
      }
      breadcrumbs={<Breadcrumbs items={[{ text: 'Weather Dashboard', href: '#/weather-dashboard' }]} />}
      notifications={<Notifications />}
    />
  );
}
