// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import NetworkDashboard from './index';

// Apply design mode
applyMode(Mode.Light);

export default function NetworkDashboardRoot() {
  return <NetworkDashboard />;
}
