// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Alert from '@cloudscape-design/components/alert';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { NetworkContent } from './components/content';
import { NetworkHeader } from './components/header';
import { generateMockData } from './data/mock-data';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => (
    <div>Network administration help and information will appear here</div>
  ));
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [showAlert, setShowAlert] = useState(true);
  const [networkData] = useState(generateMockData());
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const headerActions = (
    <SpaceBetween direction="horizontal" size="s">
      <Button iconName="external" iconAlign="right" variant="primary" loading={loading} onClick={handleRefresh}>
        Refresh Data
      </Button>
      {lastUpdated && <StatusIndicator type="success">Updated {lastUpdated.toLocaleTimeString()}</StatusIndicator>}
    </SpaceBetween>
  );

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="m">
            <NetworkHeader actions={headerActions} />

            {showAlert && (
              <Alert
                type="error"
                header=""
                dismissible
                onDismiss={() => setShowAlert(false)}
                dismissAriaLabel="Dismiss error"
              >
                This is a warning message
              </Alert>
            )}

            <NetworkContent networkData={networkData} loading={loading} />
          </SpaceBetween>
        }
        breadcrumbs={
          <Breadcrumbs
            items={[
              { text: 'Service', href: '#/' },
              { text: 'Administrative Dashboard', href: '#/' },
            ]}
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
      />
    </HelpPanelProvider>
  );
}
