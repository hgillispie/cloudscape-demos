// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState, useEffect } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Alert from '@cloudscape-design/components/alert';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { WeatherContent } from './components/content';
import { WeatherHeader } from './components/header';
import { WeatherSideNavigation } from './components/side-navigation';
import { WeatherData, Location, fetchWeatherData, getLocations } from './weather-service';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <div>Weather information will appear here</div>);
  const [selectedLocation, setSelectedLocation] = useState<Location>(getLocations()[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  const loadWeatherData = async (location: Location) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
      console.error('Error loading weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location);
    loadWeatherData(location);
  };

  const handleRefresh = () => {
    loadWeatherData(selectedLocation);
  };

  // Load initial weather data
  useEffect(() => {
    loadWeatherData(selectedLocation);
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        loadWeatherData(selectedLocation);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [selectedLocation, loading]);

  const headerActions = (
    <SpaceBetween direction="horizontal" size="s">
      <Button 
        iconName="refresh" 
        loading={loading}
        onClick={handleRefresh}
      >
        Refresh
      </Button>
      {lastUpdated && (
        <StatusIndicator type="success">
          Updated {lastUpdated.toLocaleTimeString()}
        </StatusIndicator>
      )}
    </SpaceBetween>
  );

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="m">
            <WeatherHeader 
              location={selectedLocation}
              weatherData={weatherData}
              actions={headerActions}
            />
            
            {error && (
              <Alert
                type="error"
                header="Weather data unavailable"
                dismissible
                onDismiss={() => setError(null)}
                action={
                  <Button onClick={handleRefresh}>
                    Try again
                  </Button>
                }
              >
                {error}
              </Alert>
            )}
            
            <WeatherContent 
              weatherData={weatherData} 
              location={selectedLocation}
              loading={loading}
            />
          </SpaceBetween>
        }
        breadcrumbs={
          <Breadcrumbs 
            items={[
              { text: 'Weather Dashboard', href: '#/' },
              { text: selectedLocation.name, href: '#/' }
            ]} 
          />
        }
        navigation={
          <WeatherSideNavigation 
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
      />
    </HelpPanelProvider>
  );
}
