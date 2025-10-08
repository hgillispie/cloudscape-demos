// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Icon from '@cloudscape-design/components/icon';

import { Breadcrumbs } from '../commons';
import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'error' as const,
      content: 'This is a warning message',
      dismissible: true,
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-1',
    },
  ]);

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
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
              {flashbarItems.length > 0 && <Flashbar items={flashbarItems} />}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, maxWidth: '400px' }}>
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={5}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                />
                <div
                  style={{
                    width: '2px',
                    height: '32px',
                    backgroundColor: '#414D5C',
                  }}
                />
                <Button iconName="settings" variant="icon" />
              </div>
            </div>

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <NetworkTrafficChart />
              <CreditUsageChart />
            </Grid>

            <DevicesTable filteringText={filteringText} />
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-dashboard' },
          ]}
        />
      }
    />
  );
}
