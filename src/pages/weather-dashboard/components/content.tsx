// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Spinner from '@cloudscape-design/components/spinner';
import Badge from '@cloudscape-design/components/badge';
import { WeatherData, Location, formatTemperature, formatWindSpeed, formatTime, formatDate, getWeatherDescription } from '../weather-service';

interface WeatherContentProps {
  weatherData: WeatherData | null;
  location: Location;
  loading: boolean;
}

interface CurrentWeatherCardProps {
  weatherData: WeatherData;
}

function CurrentWeatherCard({ weatherData }: CurrentWeatherCardProps) {
  const current = weatherData.current;
  
  return (
    <Container header={<Header variant="h2">Current Conditions</Header>}>
      <Grid 
        gridDefinition={[
          { colspan: { default: 12, xs: 6, s: 3 } },
          { colspan: { default: 12, xs: 6, s: 3 } },
          { colspan: { default: 12, xs: 6, s: 3 } },
          { colspan: { default: 12, xs: 6, s: 3 } }
        ]}
      >
        <Box textAlign="center">
          <Box variant="h3" margin="none">
            {formatTemperature(current.temperature)}
          </Box>
          <Box variant="small" color="text-body-secondary">
            Temperature
          </Box>
        </Box>
        
        <Box textAlign="center">
          <Box variant="h3" margin="none">
            {current.humidity}%
          </Box>
          <Box variant="small" color="text-body-secondary">
            Humidity
          </Box>
        </Box>
        
        <Box textAlign="center">
          <Box variant="h3" margin="none">
            {formatWindSpeed(current.windSpeed)}
          </Box>
          <Box variant="small" color="text-body-secondary">
            Wind Speed
          </Box>
        </Box>
        
        <Box textAlign="center">
          <Box variant="h3" margin="none">
            {current.pressure} hPa
          </Box>
          <Box variant="small" color="text-body-secondary">
            Pressure
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

interface TemperatureTrendChartProps {
  weatherData: WeatherData;
}

function TemperatureTrendChart({ weatherData }: TemperatureTrendChartProps) {
  const chartData = useMemo(() => {
    return weatherData.hourly.time.slice(0, 24).map((time, index) => ({
      x: new Date(time),
      y: weatherData.hourly.temperature[index]
    }));
  }, [weatherData]);

  return (
    <Container header={<Header variant="h2">24-Hour Temperature Trend</Header>}>
      <AreaChart
        series={[
          {
            title: 'Temperature',
            type: 'area',
            data: chartData,
            color: '#FF6B35'
          }
        ]}
        xScaleType="time"
        xTitle="Time"
        yTitle="Temperature (°C)"
        height={300}
        empty={<Box textAlign="center">No data available</Box>}
        loadingText="Loading chart data..."
        errorText="Error loading chart data"
        i18nStrings={{
          filterLabel: 'Filter',
          filterPlaceholder: 'Filter data',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: (value) => formatTime(value.toISOString()),
          yTickFormatter: (value) => `${value}°C`
        }}
      />
    </Container>
  );
}

interface DailyForecastChartProps {
  weatherData: WeatherData;
}

function DailyForecastChart({ weatherData }: DailyForecastChartProps) {
  const chartData = useMemo(() => {
    return weatherData.daily.time.map((time, index) => ({
      x: formatDate(time),
      y1: weatherData.daily.temperatureMax[index],
      y2: weatherData.daily.temperatureMin[index]
    }));
  }, [weatherData]);

  return (
    <Container header={<Header variant="h2">7-Day Temperature Forecast</Header>}>
      <BarChart
        series={[
          {
            title: 'High',
            type: 'bar',
            data: chartData.map(item => ({ x: item.x, y: item.y1 })),
            color: '#FF6B35'
          },
          {
            title: 'Low',
            type: 'bar', 
            data: chartData.map(item => ({ x: item.x, y: item.y2 })),
            color: '#4DABF7'
          }
        ]}
        xTitle="Day"
        yTitle="Temperature (°C)"
        height={300}
        empty={<Box textAlign="center">No data available</Box>}
        loadingText="Loading chart data..."
        errorText="Error loading chart data"
        i18nStrings={{
          filterLabel: 'Filter',
          filterPlaceholder: 'Filter data',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          yTickFormatter: (value) => `${value}°C`
        }}
      />
    </Container>
  );
}

interface HourlyForecastTableProps {
  weatherData: WeatherData;
}

function HourlyForecastTable({ weatherData }: HourlyForecastTableProps) {
  const tableData = useMemo(() => {
    return weatherData.hourly.time.slice(0, 24).map((time, index) => ({
      time,
      temperature: weatherData.hourly.temperature[index],
      humidity: weatherData.hourly.humidity[index],
      windSpeed: weatherData.hourly.windSpeed[index],
      precipitation: weatherData.hourly.precipitation[index],
      weatherCode: weatherData.hourly.weatherCode[index]
    }));
  }, [weatherData]);

  const columnDefinitions = [
    {
      id: 'time',
      header: 'Time',
      cell: (item: typeof tableData[0]) => formatTime(item.time),
      sortingField: 'time',
      width: 100
    },
    {
      id: 'temperature',
      header: 'Temperature',
      cell: (item: typeof tableData[0]) => formatTemperature(item.temperature),
      sortingField: 'temperature',
      width: 120
    },
    {
      id: 'conditions',
      header: 'Conditions',
      cell: (item: typeof tableData[0]) => (
        <Badge color="blue">
          {getWeatherDescription(item.weatherCode)}
        </Badge>
      ),
      width: 150
    },
    {
      id: 'humidity',
      header: 'Humidity',
      cell: (item: typeof tableData[0]) => `${item.humidity}%`,
      sortingField: 'humidity',
      width: 100
    },
    {
      id: 'windSpeed',
      header: 'Wind Speed', 
      cell: (item: typeof tableData[0]) => formatWindSpeed(item.windSpeed),
      sortingField: 'windSpeed',
      width: 120
    },
    {
      id: 'precipitation',
      header: 'Precipitation',
      cell: (item: typeof tableData[0]) => `${item.precipitation} mm`,
      sortingField: 'precipitation',
      width: 120
    }
  ];

  return (
    <Container header={<Header variant="h2">24-Hour Detailed Forecast</Header>}>
      <Table
        columnDefinitions={columnDefinitions}
        items={tableData}
        sortingDisabled={false}
        variant="borderless"
        trackBy="time"
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No forecast data
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              Forecast data is not available.
            </Box>
          </Box>
        }
        loadingText="Loading forecast data..."
      />
    </Container>
  );
}

export function WeatherContent({ weatherData, location, loading }: WeatherContentProps) {
  if (loading) {
    return (
      <Container>
        <Box textAlign="center" padding="xxl">
          <Spinner size="large" />
          <Box variant="p" padding={{ top: 's' }}>
            Loading weather data for {location.name}...
          </Box>
        </Box>
      </Container>
    );
  }

  if (!weatherData) {
    return (
      <Container>
        <Box textAlign="center" padding="xxl">
          <Box variant="h3">No weather data available</Box>
          <Box variant="p">
            Unable to load weather data for {location.name}. Please try refreshing the page.
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <SpaceBetween size="l">
      <CurrentWeatherCard weatherData={weatherData} />
      
      <Grid 
        gridDefinition={[
          { colspan: { default: 12, l: 6 } },
          { colspan: { default: 12, l: 6 } }
        ]}
      >
        <TemperatureTrendChart weatherData={weatherData} />
        <DailyForecastChart weatherData={weatherData} />
      </Grid>
      
      <HourlyForecastTable weatherData={weatherData} />
    </SpaceBetween>
  );
}
