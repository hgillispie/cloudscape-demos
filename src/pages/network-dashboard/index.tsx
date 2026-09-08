// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Alert from '@cloudscape-design/components/alert';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';

import '../../styles/network-dashboard.scss';

const trafficDays = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];
const site1Traffic = [2.6, 3, 3.2, 4.1, 3.9, 4, 4.3, 4.8, 4.8, 4.8, 3.9, 3.3];
const site2Traffic = [2.7, 3.3, 3.6, 4.9, 4.8, 4.6, 4.5, 5.3, 5.5, 5.3, 4.7, 3.5];

const creditDays = ['x1', 'x2', 'x3', 'x4', 'x5'];
const creditUsage = [4.5, 5.7, 4.9, 3.2, 4.9];

const deviceColumns = Array.from({ length: 7 }, (_, i) => ({
  id: `column-${i}`,
  header: 'Column header',
  cell: () => 'Cell Value',
}));

const deviceItems = Array.from({ length: 12 }, (_, i) => ({ id: `device-${i}` }));

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [warningVisible, setWarningVisible] = useState(true);

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
                Network Adminstration Dashboard
              </Header>

              <div className="network-dashboard-toolbar">
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={5}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                />
                <Button variant="icon" iconName="settings" ariaLabel="Settings" />
              </div>

              {warningVisible && (
                <Alert
                  type="warning"
                  action={
                    <Button variant="inline-link" onClick={() => setWarningVisible(false)}>
                      Dismiss
                    </Button>
                  }
                >
                  This is a warning message
                </Alert>
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <div className="network-dashboard-charts">
              <div className="network-dashboard-chart-card">
                <AreaChart
                  series={[
                    {
                      type: 'area',
                      title: 'Site 1',
                      data: trafficDays.map((x, i) => ({ x, y: site1Traffic[i] })),
                      color: '#688AE8',
                    },
                    {
                      type: 'area',
                      title: 'Site 2',
                      data: trafficDays.map((x, i) => ({ x, y: site2Traffic[i] })),
                      color: '#C33D69',
                    },
                    {
                      type: 'threshold',
                      title: 'Performance goal',
                      y: 3.5,
                      color: '#5F6B7A',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  height={300}
                  ariaLabel="Network traffic"
                  hideFilter
                  i18nStrings={{ legendAriaLabel: 'Legend' }}
                />
              </div>
              <div className="network-dashboard-chart-card">
                <BarChart
                  series={[
                    {
                      type: 'bar',
                      title: 'Site 1',
                      data: creditDays.map((x, i) => ({ x, y: creditUsage[i] })),
                      color: '#688AE8',
                    },
                  ]}
                  xScaleType="categorical"
                  xTitle="Day"
                  height={300}
                  ariaLabel="Credit Usage"
                  hideFilter
                  i18nStrings={{ legendAriaLabel: 'Legend' }}
                />
              </div>
            </div>

            <Table
              header={
                <Header
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
              variant="full-page"
              selectionType="multi"
              columnDefinitions={deviceColumns}
              items={deviceItems}
              trackBy="id"
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                itemSelectionLabel: (_, item) => item.id,
              }}
              empty={
                <Box textAlign="center" color="inherit">
                  No devices found
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
