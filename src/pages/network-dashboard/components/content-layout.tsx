// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface ContentLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export function ContentLayout({ header, children }: ContentLayoutProps) {
  return (
    <div style={{ padding: '0 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SpaceBetween size="l">
          {header && <div>{header}</div>}
          {children}
        </SpaceBetween>
      </div>
    </div>
  );
}
