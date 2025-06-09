// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  timezone: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  visibility: number;
  pressure: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weatherCode: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  precipitationSum: number[];
  windSpeedMax: number[];
  windDirectionDominant: number[];
}

export interface HourlyForecast {
  time: string[];
  temperature: number[];
  weatherCode: number[];
  windSpeed: number[];
  humidity: number[];
  precipitation: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast;
  hourly: HourlyForecast;
  timezone: string;
  timezoneAbbreviation: string;
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: Record<string, string>;
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    visibility: number;
  };
  daily_units: Record<string, string>;
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
  hourly_units: Record<string, string>;
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    precipitation: number[];
  };
}

export interface GeocodingResponse {
  results: WeatherLocation[];
  generationtime_ms: number;
}
