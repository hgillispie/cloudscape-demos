// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherData {
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  wind_speed_10m: number[];
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
}

export interface ForecastData {
  hourly: HourlyForecast;
  daily: DailyForecast;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastData;
}

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1';

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherResponse> {
  try {
    // Fetch current weather
    const currentParams = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m',
      timezone: 'auto',
    });

    const currentResponse = await fetch(`${OPEN_METEO_BASE_URL}/forecast?${currentParams}`);
    
    if (!currentResponse.ok) {
      throw new Error(`Failed to fetch current weather: ${currentResponse.statusText}`);
    }

    const currentData = await currentResponse.json();

    // Fetch forecast data
    const forecastParams = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone: 'auto',
      forecast_days: '7',
    });

    const forecastResponse = await fetch(`${OPEN_METEO_BASE_URL}/forecast?${forecastParams}`);
    
    if (!forecastResponse.ok) {
      throw new Error(`Failed to fetch forecast data: ${forecastResponse.statusText}`);
    }

    const forecastData = await forecastResponse.json();

    // Transform the data to match our interfaces
    const result: WeatherResponse = {
      current: {
        temperature_2m: currentData.current?.temperature_2m || 0,
        relative_humidity_2m: currentData.current?.relative_humidity_2m || 0,
        precipitation: currentData.current?.precipitation || 0,
        wind_speed_10m: currentData.current?.wind_speed_10m || 0,
        wind_direction_10m: currentData.current?.wind_direction_10m || 0,
      },
      forecast: {
        hourly: {
          time: forecastData.hourly?.time || [],
          temperature_2m: forecastData.hourly?.temperature_2m || [],
          relative_humidity_2m: forecastData.hourly?.relative_humidity_2m || [],
          precipitation: forecastData.hourly?.precipitation || [],
          wind_speed_10m: forecastData.hourly?.wind_speed_10m || [],
        },
        daily: {
          time: forecastData.daily?.time || [],
          temperature_2m_max: forecastData.daily?.temperature_2m_max || [],
          temperature_2m_min: forecastData.daily?.temperature_2m_min || [],
          precipitation_sum: forecastData.daily?.precipitation_sum || [],
        },
      },
    };

    return result;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(
      error instanceof Error 
        ? `Weather service error: ${error.message}` 
        : 'Unknown error occurred while fetching weather data'
    );
  }
}

export async function getLocationFromCoordinates(latitude: number, longitude: number): Promise<string> {
  try {
    // Using a simple geocoding service to get location name
    // In a real application, you might want to use a more robust geocoding service
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`
    );
    
    if (!response.ok) {
      return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    }

    // For now, just return coordinates formatted nicely
    // You could integrate with a proper geocoding service here
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  } catch (error) {
    console.error('Error getting location name:', error);
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  }
}

// Helper function to get user's current location
export function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000, // 10 minutes
      }
    );
  });
}

// Predefined locations for easy access
export const POPULAR_LOCATIONS = [
  { name: 'New York City', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
];
