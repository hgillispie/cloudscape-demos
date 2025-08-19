// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherData {
  current: {
    time: string;
    temperature: number;
    windSpeed: number;
    windDirection: number;
    weatherCode: number;
    humidity: number;
    pressure: number;
    apparentTemperature: number;
  };
  hourly: {
    time: string[];
    temperature: number[];
    humidity: number[];
    windSpeed: number[];
    precipitation: number[];
    weatherCode: number[];
  };
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    precipitationSum: number[];
    windSpeedMax: number[];
    weatherCode: number[];
  };
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

const defaultLocations: Location[] = [
  { name: 'New York', latitude: 40.7128, longitude: -74.006, timezone: 'America/New_York' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'San Francisco', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles' },
];

export const weatherCodeMap: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: 'sunny' },
  1: { description: 'Mainly clear', icon: 'partly-sunny' },
  2: { description: 'Partly cloudy', icon: 'cloudy' },
  3: { description: 'Overcast', icon: 'cloudy' },
  45: { description: 'Fog', icon: 'fog' },
  48: { description: 'Depositing rime fog', icon: 'fog' },
  51: { description: 'Light drizzle', icon: 'drizzle' },
  53: { description: 'Moderate drizzle', icon: 'drizzle' },
  55: { description: 'Dense drizzle', icon: 'drizzle' },
  61: { description: 'Slight rain', icon: 'rainy' },
  63: { description: 'Moderate rain', icon: 'rainy' },
  65: { description: 'Heavy rain', icon: 'rainy' },
  71: { description: 'Slight snow', icon: 'snowy' },
  73: { description: 'Moderate snow', icon: 'snowy' },
  75: { description: 'Heavy snow', icon: 'snowy' },
  77: { description: 'Snow grains', icon: 'snowy' },
  80: { description: 'Slight rain showers', icon: 'rainy' },
  81: { description: 'Moderate rain showers', icon: 'rainy' },
  82: { description: 'Violent rain showers', icon: 'rainy' },
  85: { description: 'Slight snow showers', icon: 'snowy' },
  86: { description: 'Heavy snow showers', icon: 'snowy' },
  95: { description: 'Thunderstorm', icon: 'thunderstorm' },
  96: { description: 'Thunderstorm with slight hail', icon: 'thunderstorm' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'thunderstorm' },
};

export async function fetchWeatherData(location: Location): Promise<WeatherData> {
  const baseUrl = 'https://api.open-meteo.com/v1/forecast';
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    timezone: location.timezone,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code',
    past_days: '1',
    forecast_days: '7',
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      current: {
        time: data.current.time,
        temperature: Math.round(data.current.temperature_2m),
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: Math.round(data.current.wind_direction_10m),
        weatherCode: data.current.weather_code,
        humidity: Math.round(data.current.relative_humidity_2m),
        pressure: Math.round(data.current.surface_pressure),
        apparentTemperature: Math.round(data.current.apparent_temperature),
      },
      hourly: {
        time: data.hourly.time.slice(0, 48), // Next 48 hours
        temperature: data.hourly.temperature_2m.slice(0, 48).map((temp: number) => Math.round(temp)),
        humidity: data.hourly.relative_humidity_2m.slice(0, 48).map((humidity: number) => Math.round(humidity)),
        windSpeed: data.hourly.wind_speed_10m.slice(0, 48).map((speed: number) => Math.round(speed)),
        precipitation: data.hourly.precipitation.slice(0, 48),
        weatherCode: data.hourly.weather_code.slice(0, 48),
      },
      daily: {
        time: data.daily.time,
        temperatureMax: data.daily.temperature_2m_max.map((temp: number) => Math.round(temp)),
        temperatureMin: data.daily.temperature_2m_min.map((temp: number) => Math.round(temp)),
        precipitationSum: data.daily.precipitation_sum,
        windSpeedMax: data.daily.wind_speed_10m_max.map((speed: number) => Math.round(speed)),
        weatherCode: data.daily.weather_code,
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export function getLocations(): Location[] {
  return defaultLocations;
}

export function getWeatherDescription(code: number): string {
  return weatherCodeMap[code]?.description || 'Unknown';
}

export function getWeatherIcon(code: number): string {
  return weatherCodeMap[code]?.icon || 'unknown';
}

export function formatTemperature(temp: number): string {
  return `${temp}°C`;
}

export function formatWindSpeed(speed: number): string {
  return `${speed} km/h`;
}

export function formatTime(timeString: string): string {
  return new Date(timeString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatDate(timeString: string): string {
  return new Date(timeString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
