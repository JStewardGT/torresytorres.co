import React from 'react';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import HomePage from '@/components/HomePage';

export default function App() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <HomePage />
    </SmoothScrollProvider>
  );
}
