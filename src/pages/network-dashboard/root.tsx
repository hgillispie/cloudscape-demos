// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';
import NetworkDashboard from './index';

import { applyMode, applyDensity } from '../../common/apply-mode';

applyMode();
applyDensity();

const root = createRoot(document.getElementById('app')!);
root.render(<NetworkDashboard />);
