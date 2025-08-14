// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Alert from '@cloudscape-design/components/alert';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { networkTrafficData, creditUsageData, devicesData, deviceColumns } from './data';
import { NetworkService } from './network-service';
import styles from './styles.module.scss';

export function NetworkApp() {
  const [showAlert, setShowAlert] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [networkData, setNetworkData] = useState(networkTrafficData);
  const [creditData, setCreditData] = useState(creditUsageData);
  const [devices, setDevices] = useState(devicesData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 10;

  const networkService = NetworkService.getInstance();

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const [newNetworkData, newCreditData, newDeviceData] = await Promise.all([
        networkService.refreshNetworkTrafficData(),
        networkService.refreshCreditUsageData(),
        networkService.refreshDeviceData(devices),
      ]);

      setNetworkData(newNetworkData);
      setCreditData(newCreditData);
      setDevices(newDeviceData);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredItems = devices.filter(
    item =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.type.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
                ariaLabel="Breadcrumbs"
              />

              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="refresh" loading={isRefreshing} onClick={handleRefreshData}>
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              {showAlert && (
                <Alert
                  statusIconAriaLabel="Warning"
                  type="warning"
                  dismissible
                  onDismiss={() => setShowAlert(false)}
                  dismissAriaLabel="Close alert"
                >
                  This is a warning message
                </Alert>
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container header={<Header variant="h2">Network traffic</Header>} disableContentPaddings={false}>
                <Box padding="l">
                  <AreaChart
                    series={networkData}
                    xTitle="Day"
                    yTitle=""
                    height={300}
                    hideFilter
                    statusType={isRefreshing ? 'loading' : 'finished'}
                    loadingText="Refreshing network data..."
                    ariaLabel="Network traffic area chart showing Site 1 and Site 2 data with performance goal"
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                    }}
                  />
                </Box>
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>} disableContentPaddings={false}>
                <Box padding="l">
                  <BarChart
                    series={creditData}
                    xTitle="Day"
                    yTitle=""
                    height={300}
                    hideFilter
                    statusType={isRefreshing ? 'loading' : 'finished'}
                    loadingText="Refreshing credit data..."
                    ariaLabel="Credit usage bar chart showing daily usage"
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                    }}
                  />
                </Box>
              </Container>
            </Grid>

            {/* Devices Section */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="add-plus">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
            >
              <Table
                columnDefinitions={deviceColumns}
                items={paginatedItems}
                loadingText="Loading devices"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                selectionType="multi"
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) =>
                    `${item.name} is ${
                      selectedItems.filter(i => i.name === item.name).length ? 'selected' : 'not selected'
                    }`,
                }}
                header={
                  <Header
                    counter={
                      selectedItems.length
                        ? `(${selectedItems.length}/${filteredItems.length})`
                        : `(${filteredItems.length})`
                    }
                  >
                    Devices
                  </Header>
                }
                filter={
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Find devices"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                }
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.ceil(filteredItems.length / pageSize)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                }
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No devices
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      No devices to display.
                    </Box>
                  </Box>
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
