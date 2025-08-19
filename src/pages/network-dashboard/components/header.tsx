// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Header from '@cloudscape-design/components/header';

interface NetworkHeaderProps {
  actions?: React.ReactNode;
}

export function NetworkHeader({ actions }: NetworkHeaderProps) {
  return (
    <Header variant="h1" actions={actions} description="Network Traffic, Credit Usage, and Your Devices">
      Network Administration Dashboard
    </Header>
  );
}
