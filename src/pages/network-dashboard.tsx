// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Alert from '@cloudscape-design/components/alert';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import { AreaChartProps, BarChartProps } from '@cloudscape-design/components';
import './network-dashboard.css';

/**
 * Network Administration Dashboard Component
 * 
 * This component provides a comprehensive network monitoring dashboard that displays:
 * - Real-time network traffic visualization using area charts
 * - Credit usage monitoring with bar charts
 * - Device management table with multi-select capabilities
 * - Search and pagination controls for data filtering
 * - Alert notifications for system warnings
 * 
 * The dashboard uses AWS Cloudscape Design System components to ensure
 * consistency with AWS console patterns and accessibility standards.
 */
export default function NetworkDashboard() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  /**
   * Manages the text filter input for searching/filtering dashboard data
   * Used by the TextFilter component to provide real-time search functionality
   */
  const [filteringText, setFilteringText] = useState('');
  
  /**
   * Tracks the current page index for pagination controls
   * 1-based index (starts at 1, not 0) to match user-facing pagination
   */
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  
  /**
   * Stores the currently selected items in the devices table
   * Supports multi-select functionality for bulk operations
   */
  const [selectedItems, setSelectedItems] = useState([]);
  
  /**
   * Controls the visibility of the warning alert banner
   * When true, displays a dismissible warning message at the top of the dashboard
   * Custom CSS wrapper applies custom red background color (rgba(230, 28, 28, 1))
   */
  const [alertVisible, setAlertVisible] = useState(true);

  // ============================================================================
  // CHART DATA CONFIGURATION
  // ============================================================================
  
  /**
   * Network Traffic Area Chart Data
   * 
   * Visualizes network traffic patterns across two sites with a performance threshold.
   * - Site 1 (blue): Primary network traffic data points
   * - Site 2 (pink): Secondary network traffic data points
   * - Performance goal: Horizontal threshold line at y=3.3
   * 
   * X-axis represents days (1-12), Y-axis represents traffic volume
   * Color scheme matches AWS Cloudscape data visualization palette
   */
  const networkTrafficSeries: AreaChartProps.Series<number>[] = [
    {
      type: 'area',
      title: 'Site 1',
      data: [
        { x: 1, y: 3 },
        { x: 2, y: 3.2 },
        { x: 3, y: 3.5 },
        { x: 4, y: 3.8 },
        { x: 5, y: 4.0 },
        { x: 6, y: 4.2 },
        { x: 7, y: 4.5 },
        { x: 8, y: 4.8 },
        { x: 9, y: 5.0 },
        { x: 10, y: 5.2 },
        { x: 11, y: 5.0 },
        { x: 12, y: 4.5 },
      ],
      color: '#688AE8', // Cloudscape blue for primary data series
    },
    {
      type: 'area',
      title: 'Site 2',
      data: [
        { x: 1, y: 2.5 },
        { x: 2, y: 2.8 },
        { x: 3, y: 3.0 },
        { x: 4, y: 3.5 },
        { x: 5, y: 4.2 },
        { x: 6, y: 4.5 },
        { x: 7, y: 4.8 },
        { x: 8, y: 5.0 },
        { x: 9, y: 5.2 },
        { x: 10, y: 4.8 },
        { x: 11, y: 4.2 },
        { x: 12, y: 3.5 },
      ],
      color: '#C33D69', // Cloudscape pink for secondary data series
    },
    {
      type: 'threshold',
      title: 'Performance goal',
      y: 3.3, // Horizontal line indicating target performance level
    },
  ];

  /**
   * Credit Usage Bar Chart Data
   * 
   * Displays credit consumption patterns over 5 days with a performance threshold.
   * Bar chart format is ideal for discrete, category-based comparisons.
   * - Site 1: Daily credit usage values
   * - Performance goal: Threshold line at y=3.3 for reference
   * 
   * X-axis represents days (1-5), Y-axis represents credit units consumed
   */
  const creditUsageSeries: BarChartProps.Series<number>[] = [
    {
      type: 'bar',
      title: 'Site 1',
      data: [
        { x: 1, y: 4 },
        { x: 2, y: 6 },
        { x: 3, y: 5 },
        { x: 4, y: 3 },
        { x: 5, y: 5 },
      ],
    },
    {
      type: 'threshold',
      title: 'Performance goal',
      y: 3.3, // Reference line for target credit usage
    },
  ];

  // ============================================================================
  // TABLE DATA AND CONFIGURATION
  // ============================================================================
  
  /**
   * Device Table Data
   * 
   * Generates mock data for 12 network devices.
   * In a production environment, this would be replaced with API data fetch.
   * Each device has a unique ID and 7 data columns for various properties.
   */
  const tableItems = Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`, // Unique identifier for each device
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  }));

  /**
   * Table Column Definitions
   * 
   * Defines the structure and behavior of each column in the devices table.
   * Each column includes:
   * - id: Unique column identifier for React keys and tracking
   * - header: Display text shown in column header
   * - cell: Render function to extract and display data from each row item
   * - sortingField: Property name used for column sorting functionality
   * 
   * These definitions enable sorting, filtering, and proper data display
   */
  const columnDefinitions = [
    {
      id: 'column1',
      header: 'Column header',
      cell: (item: any) => item.column1,
      sortingField: 'column1',
    },
    {
      id: 'column2',
      header: 'Column header',
      cell: (item: any) => item.column2,
      sortingField: 'column2',
    },
    {
      id: 'column3',
      header: 'Column header',
      cell: (item: any) => item.column3,
      sortingField: 'column3',
    },
    {
      id: 'column4',
      header: 'Column header',
      cell: (item: any) => item.column4,
      sortingField: 'column4',
    },
    {
      id: 'column5',
      header: 'Column header',
      cell: (item: any) => item.column5,
      sortingField: 'column5',
    },
    {
      id: 'column6',
      header: 'Column header',
      cell: (item: any) => item.column6,
      sortingField: 'column6',
    },
    {
      id: 'column7',
      header: 'Column header',
      cell: (item: any) => item.column7,
      sortingField: 'column7',
    },
  ];

  // ============================================================================
  // COMPONENT RENDER
  // ============================================================================
  
  return (
    <AppLayout
      navigationHide // Hides the side navigation panel for a focused dashboard view
      toolsHide // Hides the tools panel on the right side
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              {/* 
                Breadcrumb Navigation
                Provides hierarchical navigation path: Service > Administrative Dashboard
                Helps users understand their location in the application hierarchy
              */}
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '/' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
                ariaLabel="Breadcrumbs"
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* 
              ================================================================
              PAGE HEADER SECTION
              ================================================================
              Main page title with description and primary action button
            */}
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconAlign="right" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              {/* 
                Custom styled heading using Box component for precise typography control
                Matches Figma design specifications with Arial font and heavy weight
              */}
              <Box
                fontSize="heading-xl"
                fontWeight="heavy"
                display="inline"
                color="inherit"
              >
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 800, marginLeft: '1px' }}>
                  Network Adminstration Dashboard
                </span>
              </Box>
            </Header>

            {/* 
              ================================================================
              SEARCH AND PAGINATION CONTROLS
              ================================================================
              Responsive grid layout with search filter and page navigation
              - Left column (8/12): Search/filter input
              - Right column (4/12): Pagination controls
            */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
              ]}
            >
              {/* 
                Text Filter Component
                Enables real-time filtering/searching of dashboard data
                Updates filteringText state on user input
              */}
              <TextFilter
                filteringText={filteringText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter items"
                onChange={({ detail }) => setFilteringText(detail.filteringText)}
              />
              
              {/* 
                Pagination Component
                Provides navigation between pages of data
                Currently configured for 5 pages with accessible labels
              */}
              <Box float="right">
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={5}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              </Box>
            </Grid>

            {/* 
              ================================================================
              WARNING ALERT BANNER
              ================================================================
              Dismissible error alert with custom styling applied via CSS wrapper
              Custom CSS (network-dashboard.css) overrides background color to
              rgba(230, 28, 28, 1) for visual prominence
            */}
            {alertVisible && (
              <Alert type="error" dismissible onDismiss={() => setAlertVisible(false)}>
                This is a warning message
              </Alert>
            )}

            {/* 
              ================================================================
              DATA VISUALIZATION CHARTS
              ================================================================
              Two-column responsive grid displaying network metrics
              - Left: Area chart for network traffic trends over time
              - Right: Bar chart for credit usage comparison
              Both charts include interactive features and accessibility support
            */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              {/* 
                Network Traffic Area Chart
                Visualizes network traffic patterns across two sites with threshold
                - Fixed height of 300px for consistent layout
                - Custom tick formatters for x/y axes (x1-x12, y0-y6)
                - Interactive legend for toggling data series visibility
                - Custom CSS wrapper applies black text color to filter labels
              */}
              <Container>
                <div className="custom-chart-wrapper">
                  <AreaChart
                    series={networkTrafficSeries}
                    xTitle="Day"
                    yTitle="Network traffic"
                    height={300}
                    ariaLabel="Network traffic area chart"
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                    xDomain={[1, 12]} // Explicit domain ensures consistent axis range
                    xTickFormatter={value => `x${value}`}
                    yTickFormatter={value => `y${value}`}
                  />
                </div>
              </Container>

              {/* 
                Credit Usage Bar Chart
                Displays daily credit consumption with performance threshold
                - Categorical x-axis for discrete day values (1-5)
                - Threshold line provides visual reference for target usage
                - Responsive sizing matches network traffic chart
              */}
              <Container>
                <BarChart
                  series={creditUsageSeries}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  height={300}
                  ariaLabel="Credit usage bar chart"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  xDomain={[1, 5]} // 5-day range for credit usage tracking
                  xTickFormatter={value => `x${value}`}
                  yTickFormatter={value => `y${value}`}
                />
              </Container>
            </Grid>

            {/* 
              ================================================================
              DEVICES TABLE
              ================================================================
              Interactive table displaying network devices with multi-select capability
              Features:
              - Multi-row selection with checkboxes
              - Sortable columns for data organization
              - Sticky header for improved scrolling UX
              - Container variant for visual containment
              - Action button for adding new devices
              - Empty state messaging when no devices present
              
              The table uses trackBy="id" to ensure proper React key management
              and efficient re-rendering when data changes
            */}
            <Table
              columnDefinitions={columnDefinitions}
              items={tableItems}
              selectionType="multi" // Enables checkbox-based multi-selection
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems as any)}
              variant="container" // Wraps table in a styled container
              stickyHeader // Keeps header visible during vertical scrolling
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
              empty={
                // Empty state displayed when tableItems array is empty
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices
                  </Box>
                </Box>
              }
              trackBy="id" // Uses device ID for stable React keys and selection tracking
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
