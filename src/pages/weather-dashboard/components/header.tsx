// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ExternalLink, InfoLink, useHelpPanel } from '../../commons';

export function WeatherDashboardHeader({ actions }: { actions?: React.ReactNode }) {
  const loadHelpPanelContent = useHelpPanel();

  return (
    <Header
      variant="h1"
      actions={actions}
      info={
        <InfoLink
          onFollow={() => loadHelpPanelContent(<WeatherMainInfo />)}
          ariaLabel="Information about weather dashboard"
        />
      }
    >
      Weather Dashboard
    </Header>
  );
}

export function WeatherMainInfo() {
  return (
    <HelpPanel
      header={<h2>Weather Dashboard</h2>}
      footer={
        <div>
          <h3>Learn more</h3>
          <ul>
            <li>
              <ExternalLink href="https://open-meteo.com/">
                Open-Meteo Weather API
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://cloudscape.design/components/">
                Cloudscape Design System
              </ExternalLink>
            </li>
          </ul>
        </div>
      }
    >
      <SpaceBetween size="m">
        <div>
          <Box variant="p">
            The Weather Dashboard provides comprehensive weather forecasting data including:
          </Box>
          <ul>
            <li><strong>Current conditions</strong> - Real-time temperature, humidity, wind speed, and weather conditions</li>
            <li><strong>7-day forecast</strong> - Extended weather outlook with daily predictions</li>
            <li><strong>Temperature trends</strong> - Visual representation of temperature changes over time</li>
            <li><strong>Precipitation data</strong> - Rainfall and precipitation forecasts</li>
          </ul>
        </div>

        <div>
          <Box variant="h3">Data Source</Box>
          <Box variant="p">
            Weather data is provided by the Open-Meteo API, which offers free weather forecasts 
            without requiring API keys. The dashboard displays forecasts for major cities and 
            updates automatically.
          </Box>
        </div>

        <div>
          <Box variant="h3">Features</Box>
          <ul>
            <li>Interactive charts showing temperature and precipitation trends</li>
            <li>Current weather conditions with status indicators</li>
            <li>7-day weather outlook with daily summaries</li>
            <li>Responsive design that works on all device sizes</li>
            <li>Accessibility features for screen readers</li>
          </ul>
        </div>
      </SpaceBetween>
    </HelpPanel>
  );
}
