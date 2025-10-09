// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import { BaseStaticWidget } from '../widgets/base-static-widget';
import { currentWeather, dailyForecast, hourlyTemperature, weatherSummary } from '../widgets';

export function Content() {
  const gridDefinition = [
    { colspan: { default: 12, xxs: 6 } },
    { colspan: { default: 12, xxs: 6 } },
    { colspan: { default: 12, xxs: 12 } },
    { colspan: { default: 12, xxs: 12 } },
  ];

  return (
    <Grid gridDefinition={gridDefinition}>
      <BaseStaticWidget config={currentWeather.data} />
      <BaseStaticWidget config={weatherSummary.data} />
      <BaseStaticWidget config={hourlyTemperature.data} />
      <BaseStaticWidget config={dailyForecast.data} />
    </Grid>
  );
}
