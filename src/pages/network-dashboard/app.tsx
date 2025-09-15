// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { NetworkContent } from './content';

export function App() {
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <CustomAppLayout
      ref={appLayout}
      content={
        <SpaceBetween size="m">
          <NetworkContent />
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs items={[{ text: 'Administrative Dashboard', href: '#/' }]} />}
      toolsHide
      navigationHide
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      notifications={<Notifications />}
    />
  );
}
