import React from 'react';
import { Typography } from '../components/ui';

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface">
      <Typography variant="headline-xl">Floyd Parfums</Typography>
      <Typography variant="body-lg" className="mt-4">
        Coming Soon
      </Typography>
    </div>
  );
};
