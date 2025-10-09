// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import SpaceBetween from '@cloudscape-design/components/space-between';

export function WeatherDashboardHeader() {
  return (
    <Header variant="h1" description="Real-time weather data from Open-Meteo">
      Weather Dashboard
    </Header>
  );
}

export function WeatherDashboardMainInfo() {
  return (
    <HelpPanel header={<h2>Weather Dashboard</h2>}>
      <SpaceBetween size="m">
        <Box>
          This dashboard displays real-time weather data from the Open-Meteo API. Monitor current conditions, hourly
          forecasts, and extended weather predictions.
        </Box>
        <Box variant="h4">Features</Box>
        <ul>
          <li>Current weather conditions</li>
          <li>Hourly temperature forecast</li>
          <li>7-day weather outlook</li>
          <li>Precipitation data</li>
        </ul>
        <Box variant="h4">Data Source</Box>
        <Box>Weather data is provided by Open-Meteo, a free weather forecast API.</Box>
      </SpaceBetween>
    </HelpPanel>
  );
}
