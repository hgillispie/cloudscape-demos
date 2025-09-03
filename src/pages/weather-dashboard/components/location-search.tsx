// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface LocationSearchProps {
  onLocationChange: (location: Location) => void;
}

// Predefined popular cities for demo purposes
const POPULAR_CITIES: Location[] = [
  { latitude: 40.7128, longitude: -74.0060, name: 'New York, NY' },
  { latitude: 34.0522, longitude: -118.2437, name: 'Los Angeles, CA' },
  { latitude: 41.8781, longitude: -87.6298, name: 'Chicago, IL' },
  { latitude: 29.7604, longitude: -95.3698, name: 'Houston, TX' },
  { latitude: 25.7617, longitude: -80.1918, name: 'Miami, FL' },
  { latitude: 37.7749, longitude: -122.4194, name: 'San Francisco, CA' },
  { latitude: 47.6062, longitude: -122.3321, name: 'Seattle, WA' },
  { latitude: 51.5074, longitude: -0.1278, name: 'London, UK' },
  { latitude: 48.8566, longitude: 2.3522, name: 'Paris, France' },
  { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo, Japan' },
];

export function LocationSearch({ onLocationChange }: LocationSearchProps) {
  const [customLocation, setCustomLocation] = useState({
    name: '',
    latitude: '',
    longitude: ''
  });

  const handleCitySelect = (city: Location) => {
    onLocationChange(city);
  };

  const handleCustomLocationSubmit = () => {
    const lat = parseFloat(customLocation.latitude);
    const lng = parseFloat(customLocation.longitude);
    
    if (!isNaN(lat) && !isNaN(lng) && customLocation.name.trim()) {
      onLocationChange({
        latitude: lat,
        longitude: lng,
        name: customLocation.name.trim()
      });
      setCustomLocation({ name: '', latitude: '', longitude: '' });
    }
  };

  return (
    <Container header={<Box variant="h3">Location</Box>}>
      <SpaceBetween size="m">
        <div>
          <Box variant="awsui-key-label" padding={{ bottom: 'xs' }}>
            Popular cities
          </Box>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {POPULAR_CITIES.map((city) => (
              <Button
                key={city.name}
                variant="normal"
                onClick={() => handleCitySelect(city)}
                {...(city.name === 'Paris, France' && {
                  style: { fontWeight: '900' }
                })}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Box variant="awsui-key-label" padding={{ bottom: 'xs' }}>
            Custom location
          </Box>
          <SpaceBetween size="s">
            <FormField label="Location name">
              <Input
                value={customLocation.name}
                onChange={({ detail }) =>
                  setCustomLocation({ ...customLocation, name: detail.value })
                }
                placeholder="e.g., Austin, TX"
              />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField label="Latitude">
                <Input
                  value={customLocation.latitude}
                  onChange={({ detail }) =>
                    setCustomLocation({ ...customLocation, latitude: detail.value })
                  }
                  placeholder="e.g., 30.2672"
                  type="number"
                />
              </FormField>
              <FormField label="Longitude">
                <Input
                  value={customLocation.longitude}
                  onChange={({ detail }) =>
                    setCustomLocation({ ...customLocation, longitude: detail.value })
                  }
                  placeholder="e.g., -97.7431"
                  type="number"
                />
              </FormField>
            </div>
            <Button
              variant="primary"
              onClick={handleCustomLocationSubmit}
              disabled={!customLocation.name || !customLocation.latitude || !customLocation.longitude}
            >
              Get weather for custom location
            </Button>
          </SpaceBetween>
        </div>
      </SpaceBetween>
    </Container>
  );
}
