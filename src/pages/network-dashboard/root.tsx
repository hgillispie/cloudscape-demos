// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import { applyMode, Mode } from '../../common/apply-mode';
import NetworkDashboard from './index';

applyMode(Mode.Light);

const root = createRoot(document.getElementById('app')!);
root.render(<NetworkDashboard />);
