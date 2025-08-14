// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

export function NetworkDashboardHeader() {
  return (
    <Header
      variant="h1"
      description="Network Traffic, Credit Usage, and Your Devices"
      actions={
        <Button variant="primary" iconAlign="right" iconName="external">
          Refresh Data
        </Button>
      }
    >
      Network Administration Dashboard
    </Header>
  );
}

export function NetworkDashboardControls() {
  return (
    <SpaceBetween direction="horizontal" size="m">
      <TextFilter
        filteringText=""
        filteringPlaceholder="Placeholder"
        filteringAriaLabel="Filter network items"
        countText=""
        onChange={() => {}}
      />
      <SpaceBetween direction="horizontal" size="xs">
        <Pagination
          currentPageIndex={1}
          pagesCount={5}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
          }}
          onChange={() => {}}
        />
        <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
        <Button variant="icon" iconName="settings" ariaLabel="Settings" />
      </SpaceBetween>
    </SpaceBetween>
  );
}
