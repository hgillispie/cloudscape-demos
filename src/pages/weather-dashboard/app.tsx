// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Button from '@cloudscape-design/components/button';
import Input from '@cloudscape-design/components/input';
import Select from '@cloudscape-design/components/select';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';
import Cards from '@cloudscape-design/components/cards';
import Badge from '@cloudscape-design/components/badge';
import AreaChart from '@cloudscape-design/components/area-chart';

interface WeatherData {
  current: {
    temperature: number;
    apparent_temperature: number;
    relative_humidity: number;
    weather_code: number;
    wind_speed: number;
    precipitation: number;
    weather_description: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
  };
  location: {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  };
}

const getWeatherDescription = (code: number): string => {
  const descriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] || 'Unknown';
};

const getWeatherIcon = (code: number): string => {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 86) return '❄️';
  if (code >= 95) return '⛈️';
  return '🌡️';
};

const getTemperatureColor = (temp: number): string => {
  if (temp < 0) return 'blue';
  if (temp < 10) return 'teal';
  if (temp < 20) return 'green';
  if (temp < 25) return 'orange';
  return 'red';
};

export function App() {
  const [location, setLocation] = useState('New York');
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPreset, setSelectedPreset] = useState({ label: 'New York', value: 'New York' });

  const presets = [
    { label: 'New York', value: 'New York' },
    { label: 'London', value: 'London' },
    { label: 'Tokyo', value: 'Tokyo' },
    { label: 'Sydney', value: 'Sydney' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Toronto', value: 'Toronto' },
  ];

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError(`City "${city}" not found. Please try another location.`);
        setWeatherData(null);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity,weather_code,wind_speed,precipitation&hourly=temperature_2m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`,
      );
      const weatherDataResponse = await weatherResponse.json();

      const hourlyData = weatherDataResponse.hourly || { time: [], temperature_2m: [], precipitation: [] };
      const current = weatherDataResponse.current || {};
      const hourlyTime = Array.isArray(hourlyData.time) ? hourlyData.time.slice(0, 24) : [];
      const hourlyTemps = Array.isArray(hourlyData.temperature_2m) ? hourlyData.temperature_2m.slice(0, 24) : [];
      const hourlyPrecip = Array.isArray(hourlyData.precipitation) ? hourlyData.precipitation.slice(0, 24) : [];

      setWeatherData({
        current: {
          temperature: current.temperature_2m || 0,
          apparent_temperature: current.apparent_temperature || 0,
          relative_humidity: current.relative_humidity || 0,
          weather_code: current.weather_code || 0,
          wind_speed: current.wind_speed || 0,
          precipitation: current.precipitation || 0,
          weather_description: getWeatherDescription(current.weather_code || 0),
        },
        hourly: {
          time: hourlyTime,
          temperature_2m: hourlyTemps,
          precipitation: hourlyPrecip,
        },
        location: {
          name,
          latitude,
          longitude,
          country,
        },
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setLocation(searchInput);
      fetchWeather(searchInput);
      setSearchInput('');
    }
  };

  const handlePresetSelect = (preset: typeof selectedPreset) => {
    setSelectedPreset(preset);
    setLocation(preset.value);
    fetchWeather(preset.value);
  };

  const chartData = weatherData
    ? weatherData.hourly.time.map((time, index) => ({
        x: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        y: Math.round(weatherData.hourly.temperature_2m[index] * 10) / 10,
      }))
    : [];

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout header={<Header variant="h1">Weather Dashboard</Header>}>
          <SpaceBetween size="l">
            <Container header={<Header variant="h2">Search Location</Header>}>
              <SpaceBetween size="m">
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6 } },
                    { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6 } },
                  ]}
                >
                  <Input
                    value={searchInput}
                    onChange={({ detail }) => setSearchInput(detail.value)}
                    placeholder="Enter a city name..."
                    onKeyDown={event => {
                      if (event.detail.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <Button onClick={handleSearch} variant="primary">
                    Search
                  </Button>
                </Grid>
                <Box>
                  <Box variant="small" color="text-status-inactive">
                    Quick access:
                  </Box>
                  <SpaceBetween size="xs" direction="horizontal">
                    {presets.map(preset => (
                      <Button
                        key={preset.value}
                        variant={selectedPreset.value === preset.value ? 'primary' : 'normal'}
                        onClick={() => handlePresetSelect(preset)}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </SpaceBetween>
                </Box>
              </SpaceBetween>
            </Container>

            {error && (
              <Alert type="error" header="Error">
                {error}
              </Alert>
            )}

            {loading && (
              <Container header={<Header variant="h2">Loading Weather Data</Header>}>
                <Box textAlign="center" padding={{ vertical: 'l' }}>
                  <Spinner />
                </Box>
              </Container>
            )}

            {weatherData && !loading && (
              <>
                <Container
                  header={
                    <Header variant="h2" description={`${weatherData.location.name}, ${weatherData.location.country}`}>
                      Current Weather
                    </Header>
                  }
                >
                  <Grid
                    gridDefinition={[
                      { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 4 } },
                      { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 4 } },
                      { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 4 } },
                      { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 4 } },
                      { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 4 } },
                      { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 4 } },
                    ]}
                  >
                    <Container>
                      <SpaceBetween size="s">
                        <Box variant="h3">{getWeatherIcon(weatherData.current.weather_code)}</Box>
                        <Box variant="p" color="text-status-inactive">
                          Condition
                        </Box>
                        <Box variant="p">{weatherData.current.weather_description}</Box>
                      </SpaceBetween>
                    </Container>

                    <Container>
                      <SpaceBetween size="s">
                        <Box variant="h3" color={getTemperatureColor(weatherData.current.temperature)}>
                          {Math.round(weatherData.current.temperature)}°F
                        </Box>
                        <Box variant="p" color="text-status-inactive">
                          Temperature
                        </Box>
                        <Badge content="Feels like" color="blue" />
                        <Box variant="p">{Math.round(weatherData.current.apparent_temperature)}°F</Box>
                      </SpaceBetween>
                    </Container>

                    <Container>
                      <SpaceBetween size="s">
                        <Box variant="h3">{weatherData.current.relative_humidity}%</Box>
                        <Box variant="p" color="text-status-inactive">
                          Humidity
                        </Box>
                      </SpaceBetween>
                    </Container>

                    <Container>
                      <SpaceBetween size="s">
                        <Box variant="h3">{Math.round(weatherData.current.wind_speed)} mph</Box>
                        <Box variant="p" color="text-status-inactive">
                          Wind Speed
                        </Box>
                      </SpaceBetween>
                    </Container>

                    <Container>
                      <SpaceBetween size="s">
                        <Box variant="h3">{weatherData.current.precipitation}</Box>
                        <Box variant="p" color="text-status-inactive">
                          Precipitation
                        </Box>
                      </SpaceBetween>
                    </Container>

                    <Container>
                      <SpaceBetween size="s">
                        <Box variant="h3">{weatherData.location.latitude.toFixed(2)}°</Box>
                        <Box variant="p" color="text-status-inactive">
                          Latitude
                        </Box>
                        <Box variant="p">{weatherData.location.longitude.toFixed(2)}°</Box>
                        <Box variant="p" color="text-status-inactive">
                          Longitude
                        </Box>
                      </SpaceBetween>
                    </Container>
                  </Grid>
                </Container>

                {chartData.length > 0 && (
                  <Container header={<Header variant="h2">24-Hour Temperature Forecast</Header>}>
                    <AreaChart
                      series={[
                        {
                          title: 'Temperature (°F)',
                          type: 'area',
                          data: chartData,
                        },
                      ]}
                      i18nStrings={{
                        yTickFormatter: e => `${Math.round(e)}°`,
                      }}
                      ariaLabel="24-hour temperature forecast"
                      height={300}
                      hideFilter
                      hideLegend={false}
                    />
                  </Container>
                )}

                <Container header={<Header variant="h2">Hourly Breakdown</Header>}>
                  <Cards
                    cardDefinition={{
                      sections: [
                        {
                          id: 'time',
                          header: item =>
                            new Date(item.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                          content: () => null,
                        },
                        {
                          id: 'temperature',
                          header: 'Temperature',
                          content: item => `${Math.round(item.temperature * 10) / 10}°F`,
                        },
                        {
                          id: 'precipitation',
                          header: 'Precipitation',
                          content: item => `${item.precipitation}"`,
                        },
                      ],
                    }}
                    items={weatherData.hourly.time.map((time, index) => ({
                      time,
                      temperature: weatherData.hourly.temperature_2m[index],
                      precipitation: weatherData.hourly.precipitation[index],
                    }))}
                    cardsPerRow={[
                      { cards: 1, minWidth: 0 },
                      { cards: 2, minWidth: 600 },
                      { cards: 4, minWidth: 1200 },
                    ]}
                    empty={
                      <Box textAlign="center" padding={{ vertical: 'l' }}>
                        No hourly data available
                      </Box>
                    }
                  />
                </Container>
              </>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
