// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { WeatherApiResponse, GeocodingResponse, WeatherData, WeatherLocation } from '../types';

const WEATHER_API_BASE = 'https://api.open-meteo.com/v1';
const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1';

// Weather code descriptions for Open-Meteo
export const weatherCodeDescriptions: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  56: { description: 'Light freezing drizzle', icon: '🌨️' },
  57: { description: 'Dense freezing drizzle', icon: '🌨️' },
  61: { description: 'Slight rain', icon: '🌦️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  66: { description: 'Light freezing rain', icon: '🌨️' },
  67: { description: 'Heavy freezing rain', icon: '🌨️' },
  71: { description: 'Slight snow fall', icon: '🌨️' },
  73: { description: 'Moderate snow fall', icon: '❄️' },
  75: { description: 'Heavy snow fall', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌧️' },
  82: { description: 'Violent rain showers', icon: '⛈️' },
  85: { description: 'Slight snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export function getWeatherDescription(code: number): { description: string; icon: string } {
  return weatherCodeDescriptions[code] || { description: 'Unknown', icon: '❓' };
}

export async function searchLocations(query: string): Promise<WeatherLocation[]> {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `${GEOCODING_API_BASE}/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`,
    );

    if (!response.ok) {
      throw new Error(`Failed to search locations: ${response.statusText}`);
    }

    const data: GeocodingResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
}

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'weather_code',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
        'visibility',
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'wind_speed_10m_max',
        'wind_direction_10m_dominant',
      ].join(','),
      hourly: ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m', 'precipitation'].join(','),
      timezone: 'auto',
      forecast_days: '7',
      forecast_hours: '24',
    });

    const response = await fetch(`${WEATHER_API_BASE}/forecast?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const apiData: WeatherApiResponse = await response.json();

    // Transform API response to internal format
    return {
      current: {
        temperature: apiData.current.temperature_2m,
        weatherCode: apiData.current.weather_code,
        windSpeed: apiData.current.wind_speed_10m,
        windDirection: apiData.current.wind_direction_10m,
        humidity: apiData.current.relative_humidity_2m,
        visibility: apiData.current.visibility,
        pressure: apiData.current.surface_pressure,
        time: apiData.current.time,
      },
      daily: {
        time: apiData.daily.time,
        weatherCode: apiData.daily.weather_code,
        temperatureMax: apiData.daily.temperature_2m_max,
        temperatureMin: apiData.daily.temperature_2m_min,
        precipitationSum: apiData.daily.precipitation_sum,
        windSpeedMax: apiData.daily.wind_speed_10m_max,
        windDirectionDominant: apiData.daily.wind_direction_10m_dominant,
      },
      hourly: {
        time: apiData.hourly.time.slice(0, 24), // Only next 24 hours
        temperature: apiData.hourly.temperature_2m.slice(0, 24),
        weatherCode: apiData.hourly.weather_code.slice(0, 24),
        windSpeed: apiData.hourly.wind_speed_10m.slice(0, 24),
        humidity: apiData.hourly.relative_humidity_2m.slice(0, 24),
        precipitation: apiData.hourly.precipitation.slice(0, 24),
      },
      timezone: apiData.timezone,
      timezoneAbbreviation: apiData.timezone_abbreviation,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function getWindDirection(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
