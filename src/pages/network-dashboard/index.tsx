import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Checkbox from '@cloudscape-design/components/checkbox';
import styles from './styles.module.scss';

// Mock data for charts
const networkTrafficData = [
  { x: 'Day 1', y1: 1250, y2: 900 },
  { x: 'Day 2', y1: 1400, y2: 1100 },
  { x: 'Day 3', y1: 1550, y2: 1300 },
  { x: 'Day 4', y1: 1650, y2: 1450 },
  { x: 'Day 5', y1: 1750, y2: 1600 },
  { x: 'Day 6', y1: 1600, y2: 1400 },
  { x: 'Day 7', y1: 1800, y2: 1550 },
  { x: 'Day 8', y1: 1950, y2: 1700 },
  { x: 'Day 9', y1: 2100, y2: 1850 },
  { x: 'Day 10', y1: 2200, y2: 1950 },
  { x: 'Day 11', y1: 2150, y2: 1900 },
  { x: 'Day 12', y1: 2300, y2: 2100 },
];

const creditUsageData = [
  { x: 'Day 1', y: 850 },
  { x: 'Day 2', y: 1200 },
  { x: 'Day 3', y: 1050 },
  { x: 'Day 4', y: 750 },
  { x: 'Day 5', y: 1100 },
];

// Mock device data
const deviceData = [
  { id: '1', name: 'Router-001', ip: '192.168.1.1', type: 'Router', status: 'Active', bandwidth: '1 Gbps', location: 'Building A' },
  { id: '2', name: 'Switch-001', ip: '192.168.1.2', type: 'Switch', status: 'Active', bandwidth: '100 Mbps', location: 'Building A' },
  { id: '3', name: 'AP-001', ip: '192.168.1.10', type: 'Access Point', status: 'Active', bandwidth: '300 Mbps', location: 'Floor 1' },
  { id: '4', name: 'Server-001', ip: '192.168.1.100', type: 'Server', status: 'Active', bandwidth: '10 Gbps', location: 'Data Center' },
  { id: '5', name: 'Firewall-001', ip: '192.168.1.254', type: 'Firewall', status: 'Active', bandwidth: '1 Gbps', location: 'DMZ' },
  { id: '6', name: 'Switch-002', ip: '192.168.1.3', type: 'Switch', status: 'Warning', bandwidth: '100 Mbps', location: 'Building B' },
  { id: '7', name: 'AP-002', ip: '192.168.1.11', type: 'Access Point', status: 'Active', bandwidth: '300 Mbps', location: 'Floor 2' },
  { id: '8', name: 'Router-002', ip: '192.168.2.1', type: 'Router', status: 'Active', bandwidth: '1 Gbps', location: 'Building B' },
];

const columnDefinitions = [
  {
    id: 'selection',
    header: '',
    cell: () => <Checkbox checked={false} />,
    width: 50,
    minWidth: 50,
  },
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'ip',
    header: 'IP Address',
    cell: (item: any) => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
];

export default function NetworkDashboard() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [warningVisible, setWarningVisible] = useState(true);

  const filteredDevices = deviceData.filter(device =>
    device.name.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ip.includes(filterText) ||
    device.type.toLowerCase().includes(filterText.toLowerCase())
  );

  const itemsPerPage = 10;
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

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
              />
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
              <div className={styles.searchControls}>
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices..."
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <div className="pagination-controls">
                  <Pagination
                    currentPageIndex={1}
                    pagesCount={5}
                    onChange={() => {}}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                </div>
              </div>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {warningVisible && (
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    onDismiss: () => setWarningVisible(false),
                  },
                ]}
              />
            )}

            <div className="charts-container">
              <Container>
                <SpaceBetween size="l">
                  <Header variant="h2">Network Traffic</Header>
                  <AreaChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'area',
                        data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                        color: '#688AE8',
                      },
                      {
                        title: 'Site 2',
                        type: 'area',
                        data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                        color: '#C33D69',
                      },
                    ]}
                    xDomain={networkTrafficData.map(d => d.x)}
                    yDomain={[0, 2500]}
                    height={300}
                    i18nStrings={{
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'Area chart',
                      xTickFormatter: (value) => value,
                      yTickFormatter: (value) => `${value}`,
                    }}
                    ariaLabel="Network traffic area chart"
                    xTitle="Day"
                    yTitle="Traffic"
                  />
                </SpaceBetween>
              </Container>

              <Container>
                <SpaceBetween size="l">
                  <Header variant="h2">Credit Usage</Header>
                  <BarChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: creditUsageData,
                        color: '#688AE8',
                      },
                    ]}
                    xDomain={creditUsageData.map(d => d.x)}
                    yDomain={[0, 1500]}
                    height={300}
                    i18nStrings={{
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'Bar chart',
                      xTickFormatter: (value) => value,
                      yTickFormatter: (value) => `${value}`,
                    }}
                    ariaLabel="Credit usage bar chart"
                    xTitle="Day"
                    yTitle="Usage"
                  />
                </SpaceBetween>
              </Container>
            </div>

            <Container>
              <SpaceBetween size="l">
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

                <Table
                  columnDefinitions={columnDefinitions}
                  items={paginatedDevices}
                  loadingText="Loading devices"
                  trackBy="id"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <Box variant="p" color="inherit">
                        No devices found
                      </Box>
                    </Box>
                  }
                  filter={
                    <TextFilter
                      filteringText={filterText}
                      filteringPlaceholder="Find devices"
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
                      pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                      }}
                    />
                  }
                  selectedItems={selectedItems}
                  onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                  selectionType="multi"
                  ariaLabels={{
                    selectionGroupLabel: 'Device selection',
                    allItemsSelectionLabel: 'Select all',
                    itemSelectionLabel: ({ selectedItems }, item) => {
                      const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                      return `${item.name} is ${isItemSelected ? 'selected' : 'not selected'}`;
                    },
                  }}
                />
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
