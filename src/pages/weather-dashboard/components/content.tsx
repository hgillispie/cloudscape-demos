// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import { BaseStaticWidget, weatherForecast } from '../../dashboard/widgets';

export function WeatherContent() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 12, m: 12, default: 12 } },
      ]}
    >
      <BaseStaticWidget config={weatherForecast.data} />
    </Grid>
  );
}
