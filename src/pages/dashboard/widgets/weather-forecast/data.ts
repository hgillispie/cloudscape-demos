// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { LineChartProps } from '@cloudscape-design/components/line-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

// Mock weather data simulating Open-Meteo API response
const generateWeatherData = () => {
  const now = new Date();
  const data = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);

    // Generate realistic temperature variations
    const baseTemp = 20 + Math.sin(i * 0.5) * 8; // Temperature varies between 12-28°C
    const tempVariation = Math.random() * 4 - 2; // ±2°C variation
    const temperature = Math.round((baseTemp + tempVariation) * 10) / 10;

    // Generate precipitation (0-20mm with some days having no rain)
    const precipitation = Math.random() > 0.6 ? Math.round(Math.random() * 20 * 10) / 10 : 0;

    // Generate humidity (40-90%)
    const humidity = Math.round((40 + Math.random() * 50) * 10) / 10;

    // Generate wind speed (5-25 km/h)
    const windSpeed = Math.round((5 + Math.random() * 20) * 10) / 10;

    data.push({
      date,
      temperature,
      precipitation,
      humidity,
      windSpeed,
      condition: precipitation > 5 ? 'Rainy' : precipitation > 0 ? 'Drizzle' : 'Clear',
    });
  }

  return data;
};

const weatherData = generateWeatherData();

export const weatherDomain = weatherData.map(({ date }) => date);

export const temperatureSeries: LineChartProps<Date>['series'] = [
  {
    title: 'Temperature',
    type: 'line',
    data: weatherData.map(datum => ({ x: datum.date, y: datum.temperature })),
  },
];

export const precipitationSeries: BarChartProps<Date>['series'] = [
  {
    title: 'Precipitation',
    type: 'bar',
    data: weatherData.map(datum => ({ x: datum.date, y: datum.precipitation })),
  },
];

export const currentWeather = {
  temperature: weatherData[0].temperature,
  condition: weatherData[0].condition,
  humidity: weatherData[0].humidity,
  windSpeed: weatherData[0].windSpeed,
  precipitation: weatherData[0].precipitation,
};

export const weeklyForecast = weatherData.map(day => ({
  date: day.date,
  temperature: day.temperature,
  condition: day.condition,
  precipitation: day.precipitation,
}));

// API simulation function for fetching weather data
export const fetchWeatherData = async (latitude = 52.52, longitude = 13.41) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock data that matches Open-Meteo API structure
  return {
    latitude,
    longitude,
    generationtime_ms: 0.123,
    utc_offset_seconds: 0,
    timezone: 'GMT',
    timezone_abbreviation: 'GMT',
    elevation: 38.0,
    current_weather: currentWeather,
    daily: {
      time: weatherData.map(d => d.date.toISOString().split('T')[0]),
      temperature_2m_max: weatherData.map(d => d.temperature + 3),
      temperature_2m_min: weatherData.map(d => d.temperature - 3),
      precipitation_sum: weatherData.map(d => d.precipitation),
      weathercode: weatherData.map(d => (d.precipitation > 5 ? 61 : d.precipitation > 0 ? 51 : 0)),
    },
    hourly: {
      time: [],
      temperature_2m: [],
      precipitation: [],
      relativehumidity_2m: [],
      windspeed_10m: [],
    },
  };
};
