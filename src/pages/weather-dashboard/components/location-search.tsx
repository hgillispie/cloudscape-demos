// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

import Autosuggest from '@cloudscape-design/components/autosuggest';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { WeatherLocation } from '../types';
import { searchLocations } from '../utils/weather-api';

interface LocationSearchProps {
  onLocationSelect: (location: WeatherLocation) => void;
  loading?: boolean;
}

export function LocationSearch({ onLocationSelect, loading = false }: LocationSearchProps) {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string; location: WeatherLocation }[]>([]);
  const [status, setStatus] = useState<'pending' | 'loading' | 'finished' | 'error'>('finished');

  const handleSearch = useCallback(
    debounce(async (searchValue: string) => {
      if (!searchValue.trim()) {
        setOptions([]);
        setStatus('finished');
        return;
      }

      setStatus('loading');
      try {
        const locations = await searchLocations(searchValue);
        const searchOptions = locations.map(location => ({
          value: `${location.name}, ${location.admin1 ? location.admin1 + ', ' : ''}${location.country}`,
          location,
        }));
        setOptions(searchOptions);
        setStatus('finished');
      } catch (error) {
        console.error('Search error:', error);
        setStatus('error');
        setOptions([]);
      }
    }, 300),
    [],
  );

  const handleChange = ({ detail }: { detail: { value: string } }) => {
    setValue(detail.value);
    handleSearch(detail.value);
  };

  const handleSelect = ({ detail }: { detail: { value: string } }) => {
    const selectedOption = options.find(option => option.value === detail.value);
    if (selectedOption) {
      setValue(selectedOption.value);
      onLocationSelect(selectedOption.location);
      setOptions([]);
    }
  };

  return (
    <SpaceBetween size="xs">
      <Autosuggest
        onChange={handleChange}
        onSelect={handleSelect}
        value={value}
        options={options}
        statusType={status}
        placeholder="Search for a city..."
        ariaLabel="Location search"
        enteredTextLabel={value => `Use "${value}"`}
        errorText={status === 'error' ? 'Failed to search locations' : undefined}
        loadingText="Searching locations..."
        finishedText={options.length === 0 && value ? 'No locations found' : undefined}
        disabled={loading}
      />
      {value && options.length === 0 && status === 'finished' && (
        <Box variant="small" color="text-status-info">
          Try searching for a city name like "London", "New York", or "Tokyo"
        </Box>
      )}
    </SpaceBetween>
  );
}
