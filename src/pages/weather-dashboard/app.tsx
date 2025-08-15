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
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Button from '@cloudscape-design/components/button';
import Select from '@cloudscape-design/components/select';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Icon from '@cloudscape-design/components/icon';
import Badge from '@cloudscape-design/components/badge';
import Alert from '@cloudscape-design/components/alert';

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature: number[];
    humidity: number[];
    precipitation: number[];
    windSpeed: number[];
  };
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    precipitation: number[];
    weatherCode: number[];
  };
}

interface LocationOption {
  label: string;
  value: string;
  latitude: number;
  longitude: number;
}

const locations: LocationOption[] = [
  { label: 'New York, NY', value: 'ny', latitude: 40.7128, longitude: -74.0060 },
  { label: 'Los Angeles, CA', value: 'la', latitude: 34.0522, longitude: -118.2437 },
  { label: 'Chicago, IL', value: 'chi', latitude: 41.8781, longitude: -87.6298 },
  { label: 'London, UK', value: 'lon', latitude: 51.5074, longitude: -0.1278 },
  { label: 'Tokyo, JP', value: 'tok', latitude: 35.6762, longitude: 139.6503 },
];

const weatherCodeMap: Record<number, { icon: string; label: string; color: string }> = {
  0: { icon: 'status-positive', label: 'Clear sky', color: 'blue' },
  1: { icon: 'status-positive', label: 'Mainly clear', color: 'blue' },
  2: { icon: 'status-warning', label: 'Partly cloudy', color: 'grey' },
  3: { icon: 'status-warning', label: 'Overcast', color: 'grey' },
  45: { icon: 'status-info', label: 'Fog', color: 'grey' },
  48: { icon: 'status-info', label: 'Depositing rime fog', color: 'grey' },
  51: { icon: 'status-info', label: 'Light drizzle', color: 'blue' },
  53: { icon: 'status-info', label: 'Moderate drizzle', color: 'blue' },
  55: { icon: 'status-info', label: 'Dense drizzle', color: 'blue' },
  61: { icon: 'status-info', label: 'Slight rain', color: 'blue' },
  63: { icon: 'status-info', label: 'Moderate rain', color: 'blue' },
  65: { icon: 'status-negative', label: 'Heavy rain', color: 'red' },
  71: { icon: 'status-info', label: 'Slight snow fall', color: 'blue' },
  73: { icon: 'status-info', label: 'Moderate snow fall', color: 'blue' },
  75: { icon: 'status-negative', label: 'Heavy snow fall', color: 'red' },
  95: { icon: 'status-negative', label: 'Thunderstorm', color: 'red' },
};

export function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>(locations[0]);
  const [viewMode, setViewMode] = useState<'hourly' | 'daily'>('hourly');

  const fetchWeatherData = async (location: LocationOption) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto&forecast_days=7`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      console.log('Weather API Response:', data); // Debug log

      setWeatherData({
        current: {
          temperature: Math.round(data.current.temperature_2m || 0),
          humidity: data.current.relative_humidity_2m || 0,
          windSpeed: data.current.wind_speed_10m || 0,
          weatherCode: data.current.weather_code || 0,
          time: data.current.time || new Date().toISOString(),
        },
        hourly: {
          time: (data.hourly?.time || []).slice(0, 24), // Next 24 hours
          temperature: (data.hourly?.temperature_2m || []).slice(0, 24),
          humidity: (data.hourly?.relative_humidity_2m || []).slice(0, 24),
          precipitation: (data.hourly?.precipitation || []).slice(0, 24),
          windSpeed: (data.hourly?.wind_speed_10m || []).slice(0, 24),
        },
        daily: {
          time: data.daily?.time || [],
          temperatureMax: data.daily?.temperature_2m_max || [],
          temperatureMin: data.daily?.temperature_2m_min || [],
          precipitation: data.daily?.precipitation_sum || [],
          weatherCode: data.daily?.weather_code || [],
        },
      });
    } catch (err) {
      console.error('Weather API Error:', err); // Debug log
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedLocation);
  }, [selectedLocation]);

  const formatHourlyTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  const formatDailyTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWeatherInfo = (code: number) => {
    return weatherCodeMap[code] || { icon: 'status-info', label: 'Unknown', color: 'grey' };
  };

  const temperatureChartData = React.useMemo(() => {
    if (!weatherData) {
      console.log('No weather data available for temperature chart');
      return [];
    }

    let data: { x: string; y: number }[] = [];

    if (viewMode === 'hourly') {
      if (weatherData.hourly.time.length > 0 && weatherData.hourly.temperature.length > 0) {
        data = weatherData.hourly.time.map((time, index) => ({
          x: formatHourlyTime(time),
          y: Number(weatherData.hourly.temperature[index]) || 0,
        }));
      }
    } else {
      if (weatherData.daily.time.length > 0 && weatherData.daily.temperatureMax.length > 0) {
        data = weatherData.daily.time.map((time, index) => ({
          x: formatDailyTime(time),
          y: Number(((weatherData.daily.temperatureMax[index] || 0) + (weatherData.daily.temperatureMin[index] || 0)) / 2) || 0,
        }));
      }
    }

    console.log('Temperature chart data:', { viewMode, dataLength: data.length, sampleData: data.slice(0, 3) });
    return data;
  }, [weatherData, viewMode]);

  const precipitationChartData = React.useMemo(() => {
    if (!weatherData) {
      console.log('No weather data available for precipitation chart');
      return [];
    }

    let data: { x: string; y: number }[] = [];

    if (viewMode === 'hourly') {
      if (weatherData.hourly.time.length > 0 && weatherData.hourly.precipitation.length > 0) {
        data = weatherData.hourly.time.map((time, index) => ({
          x: formatHourlyTime(time),
          y: Number(weatherData.hourly.precipitation[index]) || 0,
        }));
      }
    } else {
      if (weatherData.daily.time.length > 0 && weatherData.daily.precipitation.length > 0) {
        data = weatherData.daily.time.map((time, index) => ({
          x: formatDailyTime(time),
          y: Number(weatherData.daily.precipitation[index]) || 0,
        }));
      }
    }

    console.log('Precipitation chart data:', { viewMode, dataLength: data.length, sampleData: data.slice(0, 3) });
    return data;
  }, [weatherData, viewMode]);

  const currentWeather = weatherData?.current;
  const currentWeatherInfo = currentWeather ? getWeatherInfo(currentWeather.weatherCode) : null;

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
                    onChange={({ detail }) => setSelectedLocation(detail.selectedOption as LocationOption)}
                    options={locations}
                    placeholder="Select location"
                  />
                  <Button
                    iconName="refresh"
                    loading={loading}
                    onClick={() => fetchWeatherData(selectedLocation)}
                  >
                    Refresh
                  </Button>
                </SpaceBetween>
              }
            >
              Weather Dashboard - {selectedLocation.label}
            </Header>
          }
        >
          <SpaceBetween size="l">
            {error && (
              <Alert type="error" header="Weather data unavailable">
                {error}
              </Alert>
            )}

            {process.env.NODE_ENV === 'development' && weatherData && (
              <Container header={<Header variant="h3">Debug Info</Header>}>
                <SpaceBetween size="s">
                  <Box>
                    <strong>Chart Data Length:</strong> Temperature: {temperatureChartData.length}, Precipitation: {precipitationChartData.length}
                  </Box>
                  <Box>
                    <strong>View Mode:</strong> {viewMode}
                  </Box>
                  <Box>
                    <strong>Sample Temperature Data:</strong> {JSON.stringify(temperatureChartData.slice(0, 3), null, 2)}
                  </Box>
                  <Box>
                    <strong>Sample Precipitation Data:</strong> {JSON.stringify(precipitationChartData.slice(0, 3), null, 2)}
                  </Box>
                </SpaceBetween>
              </Container>
            )}

            {currentWeather && currentWeatherInfo && (
              <Container header={<Header variant="h2">Current Conditions</Header>}>
                <Grid gridDefinition={[
                  { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 3, xl: 3 } },
                  { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 3, xl: 3 } },
                  { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 3, xl: 3 } },
                  { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 3, xl: 3 } },
                ]}>
                  <Box textAlign="center">
                    <SpaceBetween size="xs">
                      <Icon name={currentWeatherInfo.icon} size="large" />
                      <Box variant="h3">{currentWeather.temperature}°C</Box>
                      <Badge color={currentWeatherInfo.color}>{currentWeatherInfo.label}</Badge>
                    </SpaceBetween>
                  </Box>
                  
                  <KeyValuePairs
                    columns={1}
                    items={[
                      { label: 'Humidity', value: `${currentWeather.humidity}%` },
                    ]}
                  />
                  
                  <KeyValuePairs
                    columns={1}
                    items={[
                      { label: 'Wind Speed', value: `${currentWeather.windSpeed} km/h` },
                    ]}
                  />
                  
                  <KeyValuePairs
                    columns={1}
                    items={[
                      { 
                        label: 'Last Updated', 
                        value: new Date(currentWeather.time).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })
                      },
                    ]}
                  />
                </Grid>
              </Container>
            )}

            <Grid gridDefinition={[{ colspan: 12 }]}>
              <Container 
                header={
                  <Header 
                    variant="h2"
                    actions={
                      <SpaceBetween direction="horizontal" size="xs">
                        <Button
                          variant={viewMode === 'hourly' ? 'primary' : 'normal'}
                          onClick={() => setViewMode('hourly')}
                        >
                          Hourly
                        </Button>
                        <Button
                          variant={viewMode === 'daily' ? 'primary' : 'normal'}
                          onClick={() => setViewMode('daily')}
                        >
                          Daily
                        </Button>
                      </SpaceBetween>
                    }
                  >
                    Temperature Trend ({viewMode === 'hourly' ? 'Next 24 Hours' : 'Next 7 Days'})
                  </Header>
                }
              >
                {loading ? (
                  <StatusIndicator type="loading">Loading temperature data...</StatusIndicator>
                ) : (
                  <AreaChart
                    series={[
                      {
                        title: 'Temperature',
                        type: 'area',
                        data: temperatureChartData,
                        valueFormatter: (value) => `${value}°C`,
                      },
                    ]}
                    yTitle="Temperature (°C)"
                    xTitle={viewMode === 'hourly' ? 'Hour' : 'Day'}
                    height={300}
                    hideFilter
                    hideLegend
                    statusType={loading ? 'loading' : temperatureChartData.length === 0 ? 'finished' : 'finished'}
                    empty={
                      <Box textAlign="center" color="inherit">
                        <Box variant="p" color="inherit">
                          No temperature data available
                        </Box>
                      </Box>
                    }
                  />
                )}
              </Container>
            </Grid>

            <Grid gridDefinition={[{ colspan: 12 }]}>
              <Container 
                header={
                  <Header variant="h2">
                    Precipitation ({viewMode === 'hourly' ? 'Next 24 Hours' : 'Next 7 Days'})
                  </Header>
                }
              >
                {loading ? (
                  <StatusIndicator type="loading">Loading precipitation data...</StatusIndicator>
                ) : (
                  <BarChart
                    series={[
                      {
                        title: 'Precipitation',
                        type: 'bar',
                        data: precipitationChartData,
                        valueFormatter: (value) => `${value} mm`,
                      },
                    ]}
                    yTitle="Precipitation (mm)"
                    xTitle={viewMode === 'hourly' ? 'Hour' : 'Day'}
                    height={300}
                    hideFilter
                    hideLegend
                    statusType={loading ? 'loading' : precipitationChartData.length === 0 ? 'finished' : 'finished'}
                    empty={
                      <Box textAlign="center" color="inherit">
                        <Box variant="p" color="inherit">
                          No precipitation data available
                        </Box>
                      </Box>
                    }
                  />
                )}
              </Container>
            </Grid>

            {weatherData && viewMode === 'daily' && (
              <Container header={<Header variant="h2">7-Day Forecast</Header>}>
                <Grid gridDefinition={weatherData.daily.time.map(() => ({ 
                  colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1.7 } 
                }))}>
                  {weatherData.daily.time.map((time, index) => {
                    const weatherInfo = getWeatherInfo(weatherData.daily.weatherCode[index]);
                    return (
                      <Box key={time} textAlign="center" padding="s">
                        <SpaceBetween size="xs">
                          <Box variant="small" color="text-body-secondary">
                            {formatDailyTime(time)}
                          </Box>
                          <Icon name={weatherInfo.icon} size="medium" />
                          <Badge color={weatherInfo.color}>{weatherInfo.label}</Badge>
                          <Box>
                            <Box variant="strong">{Math.round(weatherData.daily.temperatureMax[index])}°</Box>
                            <Box variant="small" color="text-body-secondary">
                              {Math.round(weatherData.daily.temperatureMin[index])}°
                            </Box>
                          </Box>
                        </SpaceBetween>
                      </Box>
                    );
                  })}
                </Grid>
              </Container>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
