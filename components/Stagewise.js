'use client';

import { StagewiseToolbar } from '@stagewise/toolbar-next';

export default function Stagewise() {
  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <StagewiseToolbar
      config={{
        plugins: [] // Add your custom plugins here if needed
      }}
    />
  );
}
