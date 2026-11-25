import React, { useState, useEffect, Suspense, lazy } from 'react';
import CanvasFallback from './CanvasFallback';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

export function DynamicHeroCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelScheduledLoad: (() => void) | undefined;
    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        const idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
        cancelScheduledLoad = () => window.cancelIdleCallback(idleId);
      } else {
        const timeoutId = window.setTimeout(() => setReady(true), 250);
        cancelScheduledLoad = () => window.clearTimeout(timeoutId);
      }
    };

    if (document.readyState === 'complete') scheduleLoad();
    else window.addEventListener('load', scheduleLoad, { once: true });

    return () => {
      window.removeEventListener('load', scheduleLoad);
      cancelScheduledLoad?.();
    };
  }, []);

  if (!ready) {
    return <CanvasFallback />;
  }

  return (
    <Suspense fallback={<CanvasFallback />}>
      <HeroCanvas />
    </Suspense>
  );
}

export default DynamicHeroCanvas;
