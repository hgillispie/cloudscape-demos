// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ContentLayout from '@cloudscape-design/components/content-layout';

import { WeatherContent } from './components/weather-content';
import { LocationSearch } from './components/location-search';

export function App() {
  const [location, setLocation] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    name: 'New York, NY',
  });

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header variant="h1">Weather Dashboard</Header>
              <LocationSearch onLocationChange={setLocation} />
            </SpaceBetween>
          }
        >
          <WeatherContent location={location} />
        </ContentLayout>
      }
    />
  );
}
