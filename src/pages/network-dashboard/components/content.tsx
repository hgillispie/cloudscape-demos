// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';

import Flashbar from '@cloudscape-design/components/flashbar';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

import { NetworkTrafficChart } from './network-traffic-chart';
import { CreditUsageChart } from './credit-usage-chart';
import { DevicesTable } from './devices-table';

export function Content() {
  const [showAlert, setShowAlert] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <SpaceBetween size="l">
      {/* Warning Alert Banner */}
      <Flashbar
        items={
          showAlert
            ? [
                {
                  type: 'warning',
                  content: 'This is a warning message',
                  dismissible: true,
                  dismissLabel: 'Dismiss',
                  onDismiss: () => setShowAlert(false),
                  buttonText: 'Dismiss',
                  onButtonClick: () => setShowAlert(false),
                },
              ]
            : []
        }
      />

      {/* Search Bar */}
      <Container>
        <SpaceBetween size="m" direction="vertical">
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } },
              { colspan: { default: 12, xs: 12, s: 12, m: 4, l: 4, xl: 4 } },
            ]}
          >
            <TextFilter
              filteringText={filterText}
              filteringPlaceholder="Placeholder"
              filteringAriaLabel="Filter devices"
              onChange={({ detail }) => setFilterText(detail.filteringText)}
            />
            <Box textAlign={{ default: 'left', m: 'right' }}>
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
            </Box>
          </Grid>
        </SpaceBetween>
      </Container>

      {/* Charts Section */}
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
        ]}
      >
        <NetworkTrafficChart />
        <CreditUsageChart />
      </Grid>

      {/* My Devices Section */}
      <Container
        header={
          <Header
            variant="h2"
            description="Devices on your local network"
            actions={
              <Button variant="primary" iconAlign="right" iconName="external">
                Add Device
              </Button>
            }
          >
            My Devices
          </Header>
        }
      >
        <DevicesTable />
      </Container>
    </SpaceBetween>
  );
}
