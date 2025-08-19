// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Select from '@cloudscape-design/components/select';
import Button from '@cloudscape-design/components/button';
import Spinner from '@cloudscape-design/components/spinner';
import Flashbar from '@cloudscape-design/components/flashbar';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import { Breadcrumbs } from '../commons';
import { 
  WeatherLocation, 
  WeatherResponse, 
  SAMPLE_LOCATIONS, 
  fetchWeatherData,
  getWeatherDescription 
} from './weather-service';

export function App() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(SAMPLE_LOCATIONS[0]);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadWeatherData = async (location: WeatherLocation) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData(selectedLocation);
  }, [selectedLocation]);

  const handleLocationChange = ({ detail }: { detail: { selectedOption: { value: string } } }) => {
    const location = SAMPLE_LOCATIONS.find(loc => loc.name === detail.selectedOption.value);
    if (location) {
      setSelectedLocation(location);
    }
  };

  const handleRefresh = () => {
    loadWeatherData(selectedLocation);
  };

  // Prepare chart data
  const prepareHourlyTemperatureData = () => {
    if (!weatherData) return [];
    
    return [{
      title: 'Temperature (°C)',
      type: 'area',
      data: weatherData.hourly.time.slice(0, 24).map((time, index) => ({
        x: new Date(time),
        y: weatherData.hourly.temperature_2m[index]
      }))
    }];
  };

  const prepareDailyData = () => {
    if (!weatherData) return [];
    
    return weatherData.daily.time.map((date, index) => ({
      name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      max: weatherData.daily.temperature_2m_max[index],
      min: weatherData.daily.temperature_2m_min[index],
      precipitation: weatherData.daily.precipitation_sum[index]
    }));
  };

  const getCurrentCondition = () => {
    if (!weatherData) return null;
    return getWeatherDescription(weatherData.current.weather_code);
  };

  return (
    <AppLayout
      navigation={null}
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Select
                      selectedOption={{ value: selectedLocation.name, label: selectedLocation.name }}
                      onChange={handleLocationChange}
                      options={SAMPLE_LOCATIONS.map(loc => ({ value: loc.name, label: loc.name }))}
                      placeholder="Select location"
                    />
                    <Button
                      iconName="refresh"
                      onClick={handleRefresh}
                      loading={loading}
                    >
                      Refresh
                    </Button>
                  </SpaceBetween>
                }
              >
                Weather Dashboard
              </Header>
              
              {error && (
                <Flashbar
                  items={[{
                    type: 'error',
                    content: error,
                    dismissible: true,
                    onDismiss: () => setError(null)
                  }]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {loading && (
              <Container>
                <Box textAlign="center" padding="l">
                  <Spinner size="large" />
                  <Box variant="p" margin={{ top: 's' }}>Loading weather data...</Box>
                </Box>
              </Container>
            )}

            {weatherData && !loading && (
              <>
                {/* Current Weather */}
                <Container
                  header={
                    <Header
                      variant="h2"
                      description={`Current weather in ${selectedLocation.name}`}
                      info={lastUpdated && (
                        <Box variant="small">
                          Last updated: {lastUpdated.toLocaleTimeString()}
                        </Box>
                      )}
                    >
                      Current Conditions
                    </Header>
                  }
                >
                  <Grid
                    gridDefinition={[
                      { colspan: { default: 12, xs: 6, s: 3 } },
                      { colspan: { default: 12, xs: 6, s: 3 } },
                      { colspan: { default: 12, xs: 6, s: 3 } },
                      { colspan: { default: 12, xs: 6, s: 3 } }
                    ]}
                  >
                    <Container>
                      <Box variant="h3">{Math.round(weatherData.current.temperature_2m)}°C</Box>
                      <Box variant="p">Temperature</Box>
                      <StatusIndicator type="success">
                        {getCurrentCondition()?.description}
                      </StatusIndicator>
                    </Container>
                    
                    <Container>
                      <Box variant="h3">{weatherData.current.relative_humidity_2m}%</Box>
                      <Box variant="p">Humidity</Box>
                    </Container>
                    
                    <Container>
                      <Box variant="h3">{Math.round(weatherData.current.wind_speed_10m)} km/h</Box>
                      <Box variant="p">Wind Speed</Box>
                    </Container>
                    
                    <Container>
                      <Box variant="h3">{Math.round(weatherData.current.pressure_msl)} hPa</Box>
                      <Box variant="p">Pressure</Box>
                    </Container>
                  </Grid>
                </Container>

                {/* Hourly Temperature Chart */}
                <Container
                  header={
                    <Header variant="h2">
                      24-Hour Temperature Trend
                    </Header>
                  }
                >
                  <AreaChart
                    series={prepareHourlyTemperatureData()}
                    xDomain={weatherData.hourly.time.slice(0, 24).map(time => new Date(time))}
                    yDomain={[
                      Math.min(...weatherData.hourly.temperature_2m.slice(0, 24)) - 2,
                      Math.max(...weatherData.hourly.temperature_2m.slice(0, 24)) + 2
                    ]}
                    height={300}
                    xTitle="Time"
                    yTitle="Temperature (°C)"
                    hideFilter
                    hideLegend
                    statusType="finished"
                  />
                </Container>

                {/* 7-Day Forecast */}
                <Container
                  header={
                    <Header variant="h2">
                      7-Day Forecast
                    </Header>
                  }
                >
                  <BarChart
                    series={[
                      {
                        title: 'Max Temperature (°C)',
                        type: 'bar',
                        data: prepareDailyData().map(day => ({ x: day.name, y: day.max }))
                      },
                      {
                        title: 'Min Temperature (°C)',
                        type: 'bar',
                        data: prepareDailyData().map(day => ({ x: day.name, y: day.min }))
                      }
                    ]}
                    xDomain={prepareDailyData().map(day => day.name)}
                    yTitle="Temperature (°C)"
                    height={300}
                    hideFilter
                    statusType="finished"
                  />
                </Container>

                {/* Precipitation Forecast */}
                <Container
                  header={
                    <Header variant="h2">
                      7-Day Precipitation Forecast
                    </Header>
                  }
                >
                  <BarChart
                    series={[{
                      title: 'Precipitation (mm)',
                      type: 'bar',
                      data: prepareDailyData().map(day => ({ x: day.name, y: day.precipitation }))
                    }]}
                    xDomain={prepareDailyData().map(day => day.name)}
                    yTitle="Precipitation (mm)"
                    height={300}
                    hideFilter
                    hideLegend
                    statusType="finished"
                  />
                </Container>
              </>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <Breadcrumbs 
          items={[
            { text: 'Home', href: '/' },
            { text: 'Weather Dashboard', href: '#' }
          ]} 
        />
      }
    />
  );
}
