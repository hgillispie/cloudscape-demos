// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  weather_code: number[];
  wind_speed_10m: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
  timezone: string;
}

const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: 'sunny' },
  1: { description: 'Mainly clear', icon: 'sunny' },
  2: { description: 'Partly cloudy', icon: 'cloudy' },
  3: { description: 'Overcast', icon: 'cloudy' },
  45: { description: 'Fog', icon: 'cloudy' },
  48: { description: 'Depositing rime fog', icon: 'cloudy' },
  51: { description: 'Light drizzle', icon: 'rainy' },
  53: { description: 'Moderate drizzle', icon: 'rainy' },
  55: { description: 'Dense drizzle', icon: 'rainy' },
  61: { description: 'Slight rain', icon: 'rainy' },
  63: { description: 'Moderate rain', icon: 'rainy' },
  65: { description: 'Heavy rain', icon: 'rainy' },
  71: { description: 'Slight snow', icon: 'snowy' },
  73: { description: 'Moderate snow', icon: 'snowy' },
  75: { description: 'Heavy snow', icon: 'snowy' },
  95: { description: 'Thunderstorm', icon: 'thunderstorm' },
};

export function getWeatherDescription(code: number): { description: string; icon: string } {
  return WEATHER_CODES[code] || { description: 'Unknown', icon: 'cloudy' };
}

export const SAMPLE_LOCATIONS: WeatherLocation[] = [
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'San Francisco', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles' },
];

export async function fetchWeatherData(location: WeatherLocation): Promise<WeatherResponse> {
  const currentParams = [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation',
    'weather_code',
    'cloud_cover',
    'pressure_msl',
    'wind_speed_10m',
    'wind_direction_10m'
  ].join(',');

  const hourlyParams = [
    'temperature_2m',
    'relative_humidity_2m',
    'precipitation',
    'weather_code',
    'wind_speed_10m'
  ].join(',');

  const dailyParams = [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'precipitation_sum',
    'wind_speed_10m_max',
    'wind_gusts_10m_max'
  ].join(',');

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.append('latitude', location.latitude.toString());
  url.searchParams.append('longitude', location.longitude.toString());
  url.searchParams.append('current', currentParams);
  url.searchParams.append('hourly', hourlyParams);
  url.searchParams.append('daily', dailyParams);
  url.searchParams.append('timezone', location.timezone);
  url.searchParams.append('forecast_days', '7');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
}
