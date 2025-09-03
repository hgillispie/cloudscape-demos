// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Alert from '@cloudscape-design/components/alert';

interface AlertBannerProps {
  onDismiss: () => void;
}

export function AlertBanner({ onDismiss }: AlertBannerProps) {
  return (
    <Alert
      statusIconAriaLabel="Warning"
      type="warning"
      dismissible
      onDismiss={onDismiss}
      dismissAriaLabel="Close alert"
      action={{
        children: 'Dismiss',
        onClick: onDismiss,
      }}
    >
      This is a warning message
    </Alert>
  );
}
