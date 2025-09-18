// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

createRoot(document.getElementById('app')!).render(<App />);
