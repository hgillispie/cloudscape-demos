// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';

export function DashboardHeader() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <SpaceBetween size="m">
      <BreadcrumbGroup
        items={[
          { text: 'Service', href: '#' },
          { text: 'Administrative Dashboard', href: '#' }
        ]}
        ariaLabel="Breadcrumbs"
      />
      
      <Header
        variant="h1"
        description="Network Traffic, Credit Usage, and Your Devices"
        actions={
          <Button
            variant="primary"
            iconAlign="right"
            iconName="external"
          >
            Refresh Data
          </Button>
        }
      >
        Network Administration Dashboard
      </Header>

      <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } }, { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } }]}>
        <TextFilter
          filteringText={filterText}
          filteringPlaceholder="Placeholder"
          filteringAriaLabel="Filter items"
          onChange={({ detail }) => setFilterText(detail.filteringText)}
        />
        
        <Box textAlign="right">
          <SpaceBetween direction="horizontal" size="xs" alignItems="center">
            <Pagination
              currentPageIndex={currentPageIndex}
              onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
              pagesCount={5}
              ariaLabels={{
                nextPageLabel: 'Next page',
                previousPageLabel: 'Previous page',
                pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
              }}
            />
            <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
            <Button variant="icon" iconName="settings" />
          </SpaceBetween>
        </Box>
      </Grid>
    </SpaceBetween>
  );
}
