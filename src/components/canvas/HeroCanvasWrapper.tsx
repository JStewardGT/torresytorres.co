'use client';

import dynamic from 'next/dynamic';
import CanvasFallback from './CanvasFallback';

export const DynamicHeroCanvas = dynamic(
  () => import('./HeroCanvas'),
  {
    ssr: false,
    loading: () => <CanvasFallback />,
  }
);
