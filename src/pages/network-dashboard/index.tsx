// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Alert from '@cloudscape-design/components/alert';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';

interface Device {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

const devices: Device[] = Array.from({ length: 14 }, (_, index) => ({
  id: `device-${index}`,
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

const networkTrafficData = [
  { x: 'x1', site1: 2.6, site2: 2.6 },
  { x: 'x2', site1: 3.3, site2: 3.4 },
  { x: 'x3', site1: 3.4, site2: 3.6 },
  { x: 'x4', site1: 4.0, site2: 4.9 },
  { x: 'x5', site1: 4.1, site2: 4.9 },
  { x: 'x6', site1: 3.9, site2: 4.5 },
  { x: 'x7', site1: 4.0, site2: 4.4 },
  { x: 'x8', site1: 4.1, site2: 4.4 },
  { x: 'x9', site1: 4.3, site2: 5.6 },
  { x: 'x10', site1: 4.9, site2: 5.7 },
  { x: 'x11', site1: 4.9, site2: 5.6 },
  { x: 'x12', site1: 3.4, site2: 3.5 },
];

const creditUsageData = [
  { x: 'x1', y: 4.5 },
  { x: 'x2', y: 5.8 },
  { x: 'x3', y: 4.9 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 4.9 },
];

export default function NetworkDashboard() {
  const [warningVisible, setWarningVisible] = useState(true);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(2);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconAlign="right" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              Network Adminstration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: { default: 12, xs: 8 } }, { colspan: { default: 12, xs: 4 } }]}>
              <TextFilter
                filteringText={filteringText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter"
                onChange={({ detail }) => setFilteringText(detail.filteringText)}
              />
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  />
                  <Button variant="icon" iconName="settings" ariaLabel="Preferences" />
                </SpaceBetween>
              </Box>
            </Grid>

            {warningVisible && (
              <Alert type="warning" dismissible onDismiss={() => setWarningVisible(false)}>
                This is a warning message
              </Alert>
            )}

            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <Container>
                <AreaChart
                  height={300}
                  series={[
                    {
                      type: 'area',
                      title: 'Site 1',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.site1 })),
                      color: '#688AE8',
                    },
                    {
                      type: 'area',
                      title: 'Site 2',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.site2 })),
                      color: '#C33D69',
                    },
                    {
                      type: 'threshold',
                      title: 'Performance goal',
                      y: 3.6,
                      color: '#5F6B7A',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Network traffic"
                  ariaLabel="Network traffic"
                />
              </Container>

              <Container>
                <BarChart
                  height={300}
                  series={[
                    {
                      type: 'bar',
                      title: 'Site 1',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Credit Usage"
                  ariaLabel="Credit Usage"
                />
              </Container>
            </Grid>

            <Table
              header={
                <Header
                  variant="h1"
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
              selectionType="multi"
              columnDefinitions={[
                { id: 'col1', header: 'Column header', cell: item => item.col1 },
                { id: 'col2', header: 'Column header', cell: item => item.col2 },
                { id: 'col3', header: 'Column header', cell: item => item.col3 },
                { id: 'col4', header: 'Column header', cell: item => item.col4 },
                { id: 'col5', header: 'Column header', cell: item => item.col5 },
                { id: 'col6', header: 'Column header', cell: item => item.col6 },
                { id: 'col7', header: 'Column header', cell: item => item.col7 },
              ]}
              items={devices}
              trackBy="id"
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
