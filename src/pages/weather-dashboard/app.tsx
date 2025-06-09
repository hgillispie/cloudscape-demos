// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useEffect } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Alert from '@cloudscape-design/components/alert';
import Spinner from '@cloudscape-design/components/spinner';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Flashbar from '@cloudscape-design/components/flashbar';

import { WeatherLocation, WeatherData } from './types';
import { fetchWeatherData } from './utils/weather-api';
import { LocationSearch } from './components/location-search';
import { WeatherCard } from './components/weather-card';
import { ForecastTable } from './components/forecast-table';

export function App() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forecastView, setForecastView] = useState<'daily' | 'hourly'>('daily');

  // Load default location (London) on mount
  useEffect(() => {
    const defaultLocation: WeatherLocation = {
      id: 2643743,
      name: 'London',
      latitude: 51.5074,
      longitude: -0.1278,
      country: 'United Kingdom',
      timezone: 'Europe/London',
      admin1: 'England',
    };
    handleLocationSelect(defaultLocation);
  }, []);

  const handleLocationSelect = async (location: WeatherLocation) => {
    setSelectedLocation(location);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(location.latitude, location.longitude);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Home', href: '/' },
            { text: 'Weather Dashboard', href: '/weather-dashboard' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      notifications={
        error && (
          <Flashbar
            items={[
              {
                type: 'error',
                content: error,
                dismissible: true,
                onDismiss: () => setError(null),
              },
            ]}
          />
        )
      }
      content={
        <ContentLayout
          header={
            <Header variant="h1" description="Real-time weather information and forecasts powered by Open-Meteo API">
              Weather Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            <Container header={<Header variant="h2">Location</Header>}>
              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 8, m: 6, l: 4 } }]}>
                <LocationSearch onLocationSelect={handleLocationSelect} loading={loading} />
              </Grid>
            </Container>

            {loading && (
              <Container>
                <Box textAlign="center" padding="l">
                  <SpaceBetween size="m" alignItems="center">
                    <Spinner size="large" />
                    <Box variant="p">Loading weather data...</Box>
                  </SpaceBetween>
                </Box>
              </Container>
            )}

            {error && !loading && (
              <Alert type="error" header="Weather data unavailable">
                {error}
              </Alert>
            )}

            {selectedLocation && weatherData && !loading && !error && (
              <SpaceBetween size="l">
                <WeatherCard location={selectedLocation} weather={weatherData.current} />

                <ForecastTable
                  daily={weatherData.daily}
                  hourly={weatherData.hourly}
                  viewMode={forecastView}
                  onViewModeChange={setForecastView}
                />
              </SpaceBetween>
            )}

            {!selectedLocation && !loading && !error && (
              <Container>
                <Box textAlign="center" padding="l">
                  <Box variant="h3" padding={{ bottom: 'xs' }}>
                    Welcome to Weather Dashboard
                  </Box>
                  <Box variant="p" color="text-status-subdued">
                    Search for a city above to view current weather conditions and forecasts
                  </Box>
                </Box>
              </Container>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
