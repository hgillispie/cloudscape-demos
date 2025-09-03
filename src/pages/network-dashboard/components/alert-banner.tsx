// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Flashbar from '@cloudscape-design/components/flashbar';

interface AlertBannerProps {
  onDismiss: () => void;
}

export function AlertBanner({ onDismiss }: AlertBannerProps) {
  return (
    <>
      <style>{`
        .custom-red-alert div[style*="background-color"] {
          background-color: rgba(249, 80, 55, 1) !important;
        }
      `}</style>
      <div className="custom-red-alert">
        <Flashbar
          items={[
            {
              type: 'warning',
              content: 'This is a warning message',
              dismissible: true,
              onDismiss: onDismiss,
              buttonText: 'Dismiss',
              onButtonClick: onDismiss,
            },
          ]}
        />
      </div>
    </>
  );
}
