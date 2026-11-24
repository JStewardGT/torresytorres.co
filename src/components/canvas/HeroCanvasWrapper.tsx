import React, { useState, useEffect, Suspense, lazy } from 'react';
import CanvasFallback from './CanvasFallback';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

export function DynamicHeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CanvasFallback />;
  }

  return (
    <Suspense fallback={<CanvasFallback />}>
      <HeroCanvas />
    </Suspense>
  );
}

export default DynamicHeroCanvas;
