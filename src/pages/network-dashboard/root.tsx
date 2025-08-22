import React from 'react';
import { AppLayout } from '@cloudscape-design/components';
import { useAppLayoutFocus } from '@cloudscape-design/component-toolkit/use-app-layout-focus';
import { ExternalLinkGroup } from '../commons/external-link-group';
import { Breadcrumbs } from '../commons/breadcrumbs';
import NetworkDashboard from './index';

export default function NetworkDashboardRoot() {
  const appLayoutFocusRef = useAppLayoutFocus();

  return (
    <AppLayout
      ref={appLayoutFocusRef}
      breadcrumbs={<Breadcrumbs />}
      navigationHide={true}
      toolsHide={true}
      content={<NetworkDashboard />}
      contentType="default"
      disableContentPaddings={false}
    />
  );
}
