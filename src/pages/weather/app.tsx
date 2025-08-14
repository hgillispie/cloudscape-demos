// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useEffect } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Select from '@cloudscape-design/components/select';
import Cards from '@cloudscape-design/components/cards';
import Badge from '@cloudscape-design/components/badge';
import Icon from '@cloudscape-design/components/icon';

import { fetchWeatherData, WeatherData, ForecastData, POPULAR_LOCATIONS, getCurrentLocation } from './weather-service';

export function WeatherApp() {
  const [location, setLocation] = useState({ lat: '40.7128', lon: '-74.0060' }); // Default to NYC
  const [locationName, setLocationName] = useState('New York City');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const loadWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(parseFloat(location.lat), parseFloat(location.lon));
      setWeatherData(data.current);
      setForecastData(data.forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const handleLocationSubmit = () => {
    if (location.lat && location.lon) {
      loadWeatherData();
    }
  };

  const handlePopularLocationSelect = (selectedOption: any) => {
    if (selectedOption) {
      const popularLocation = POPULAR_LOCATIONS.find(loc => loc.name === selectedOption.value);
      if (popularLocation) {
        setLocation({ lat: popularLocation.lat.toString(), lon: popularLocation.lon.toString() });
        setLocationName(popularLocation.name);
        setSelectedLocation(selectedOption);
      }
    }
  };

  const handleGetCurrentLocation = async () => {
    setGettingLocation(true);
    try {
      const coords = await getCurrentLocation();
      setLocation({ lat: coords.latitude.toString(), lon: coords.longitude.toString() });
      setLocationName(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
      setSelectedLocation(null);

      // Automatically fetch weather data for current location
      setLoading(true);
      const data = await fetchWeatherData(coords.latitude, coords.longitude);
      setWeatherData(data.current);
      setForecastData(data.forecast);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get current location');
    } finally {
      setGettingLocation(false);
    }
  };

  const getTemperatureChartData = () => {
    if (!forecastData?.hourly) return [];

    return [
      {
        title: 'Temperature (°C)',
        type: 'area' as const,
        data: forecastData.hourly.time.slice(0, 48).map((time, index) => ({
          x: new Date(time),
          y: forecastData.hourly.temperature_2m[index],
        })),
        color: '#FF6B6B',
      },
    ];
  };

  const getWeatherOverviewData = () => {
    if (!forecastData?.hourly) return [];

    return [
      {
        title: 'Temperature (°C)',
        type: 'area' as const,
        data: forecastData.hourly.time.slice(0, 48).map((time, index) => ({
          x: new Date(time),
          y: forecastData.hourly.temperature_2m[index],
        })),
        color: '#FF6B6B',
      },
      {
        title: 'Humidity (%)',
        type: 'line' as const,
        data: forecastData.hourly.time.slice(0, 48).map((time, index) => ({
          x: new Date(time),
          y: forecastData.hourly.relative_humidity_2m[index],
        })),
        color: '#4ECDC4',
      },
    ];
  };

  const getPrecipitationChartData = () => {
    if (!forecastData?.hourly) return [];

    return [
      {
        title: 'Precipitation (mm)',
        type: 'area' as const,
        data: forecastData.hourly.time.slice(0, 48).map((time, index) => ({
          x: new Date(time),
          y: forecastData.hourly.precipitation[index] || 0,
        })),
        color: '#4ECDC4',
      },
    ];
  };

  const getDailyForecastData = () => {
    if (!forecastData?.daily) return [];

    return [
      {
        title: 'Max Temperature',
        type: 'bar' as const,
        data: forecastData.daily.time.slice(0, 7).map((date, index) => ({
          x: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          y: forecastData.daily.temperature_2m_max[index],
        })),
        color: '#FF6B6B',
      },
      {
        title: 'Min Temperature',
        type: 'bar' as const,
        data: forecastData.daily.time.slice(0, 7).map((date, index) => ({
          x: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          y: forecastData.daily.temperature_2m_min[index],
        })),
        color: '#74B9FF',
      },
    ];
  };

  const getWindSpeedData = () => {
    if (!forecastData?.hourly) return [];

    return [
      {
        title: 'Wind Speed (km/h)',
        type: 'area' as const,
        data: forecastData.hourly.time.slice(0, 48).map((time, index) => ({
          x: new Date(time),
          y: forecastData.hourly.wind_speed_10m[index],
        })),
        color: '#A29BFE',
      },
    ];
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Real-time weather data and forecasts powered by Open-Meteo API"
            >
              Weather Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Location Input */}
            <Container header={<Header variant="h2">Location Settings</Header>}>
              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6 } }, { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6 } }]}>
                <SpaceBetween size="m">
                  <FormField label="Popular Locations">
                    <Select
                      selectedOption={selectedLocation}
                      onChange={({ detail }) => handlePopularLocationSelect(detail.selectedOption)}
                      options={POPULAR_LOCATIONS.map(loc => ({ label: loc.name, value: loc.name }))}
                      placeholder="Choose a popular location"
                      empty="No locations available"
                    />
                  </FormField>
                  <Button
                    variant="normal"
                    iconName="location"
                    onClick={handleGetCurrentLocation}
                    loading={gettingLocation}
                  >
                    Use Current Location
                  </Button>
                </SpaceBetween>

                <SpaceBetween size="m">
                  <FormField label="Location Name">
                    <Input
                      value={locationName}
                      onChange={({ detail }) => setLocationName(detail.value)}
                      placeholder="Enter location name"
                    />
                  </FormField>
                  <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                    <FormField label="Latitude">
                      <Input
                        type="number"
                        value={location.lat}
                        onChange={({ detail }) => setLocation(prev => ({ ...prev, lat: detail.value }))}
                        placeholder="40.7128"
                      />
                    </FormField>
                    <FormField label="Longitude">
                      <Input
                        type="number"
                        value={location.lon}
                        onChange={({ detail }) => setLocation(prev => ({ ...prev, lon: detail.value }))}
                        placeholder="-74.0060"
                      />
                    </FormField>
                  </Grid>
                </SpaceBetween>
              </Grid>

              <Box margin={{ top: 'm' }}>
                <Button variant="primary" onClick={handleLocationSubmit} loading={loading}>
                  Update Weather Data
                </Button>
              </Box>
            </Container>

            {/* Error Display */}
            {error && (
              <Alert type="error" dismissible onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <Container>
                <Box textAlign="center" padding="xl">
                  <Spinner size="large" />
                  <Box variant="p" margin={{ top: 's' }}>
                    Loading weather data...
                  </Box>
                </Box>
              </Container>
            )}

            {/* Current Weather */}
            {weatherData && !loading && (
              <Container header={<Header variant="h2">Current Weather - {locationName}</Header>}>
                <ColumnLayout columns={4} variant="text-grid">
                  <div>
                    <Box variant="awsui-key-label">Temperature</Box>
                    <Box variant="h3">{weatherData.temperature_2m}°C</Box>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Wind Speed</Box>
                    <Box variant="h3">{weatherData.wind_speed_10m} km/h</Box>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Humidity</Box>
                    <Box variant="h3">{weatherData.relative_humidity_2m}%</Box>
                  </div>
                  <div>
                    <Box variant="awsui-key-label">Precipitation</Box>
                    <Box variant="h3">{weatherData.precipitation} mm</Box>
                  </div>
                </ColumnLayout>
              </Container>
            )}

            {/* Temperature Forecast Chart */}
            {forecastData && !loading && (
              <Container header={<Header variant="h2">48-Hour Temperature Forecast</Header>}>
                <AreaChart
                  series={getTemperatureChartData()}
                  xScaleType="time"
                  xTitle="Time"
                  yTitle="Temperature (°C)"
                  height={300}
                  hideFilter
                  ariaLabel="48-hour temperature forecast chart"
                  i18nStrings={{
                    xTickFormatter: (date) =>
                      new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                      }),
                    yTickFormatter: (value) => `${value}°C`,
                  }}
                />
              </Container>
            )}

            {/* Precipitation Forecast Chart */}
            {forecastData && !loading && (
              <Container header={<Header variant="h2">48-Hour Precipitation Forecast</Header>}>
                <AreaChart
                  series={getPrecipitationChartData()}
                  xScaleType="time"
                  xTitle="Time"
                  yTitle="Precipitation (mm)"
                  height={300}
                  hideFilter
                  ariaLabel="48-hour precipitation forecast chart"
                  i18nStrings={{
                    xTickFormatter: (date) =>
                      new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                      }),
                    yTickFormatter: (value) => `${value}mm`,
                  }}
                />
              </Container>
            )}

            {/* 7-Day Forecast */}
            {forecastData && !loading && (
              <Container header={<Header variant="h2">7-Day Temperature Forecast</Header>}>
                <BarChart
                  series={[
                    {
                      title: 'Max Temperature (°C)',
                      type: 'bar',
                      data: getDailyForecastData(),
                    },
                  ]}
                  xTitle="Day"
                  yTitle="Temperature (°C)"
                  height={300}
                  hideFilter
                  hideLegend
                  ariaLabel="7-day maximum temperature forecast bar chart"
                  i18nStrings={{
                    yTickFormatter: (value) => `${value}°C`,
                  }}
                />
              </Container>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
