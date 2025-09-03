// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Alert from '@cloudscape-design/components/alert';
import Button from '@cloudscape-design/components/button';

interface AlertBannerProps {
  onDismiss: () => void;
}

export function AlertBanner({ onDismiss }: AlertBannerProps) {
  return (
    <div
      style={{
        '--alert-background-color': 'rgba(249, 80, 55, 1)'
      } as React.CSSProperties}
    >
      <style>{`
        div[style*="background-color"] {
          background-color: rgba(249, 80, 55, 1) !important;
        }
      `}</style>
      <Alert
        statusIconAriaLabel="Warning"
        type="warning"
        dismissible
        onDismiss={onDismiss}
        dismissAriaLabel="Close alert"
        action={
          <Button onClick={onDismiss} variant="link">
            Dismiss
          </Button>
        }
      >
        This is a warning message
      </Alert>
    </div>
  );
}
