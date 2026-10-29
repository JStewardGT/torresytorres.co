'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  useEffect(() => {
    // Only enable on desktop non-touch devices and if user does not prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouch) {
      return;
    }

    setIsEnabled(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use gsap.quickTo() for high performance 60fps tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' });

    const followerXTo = gsap.quickTo(follower, 'x', { duration: 0.45, ease: 'power3' });
    const followerYTo = gsap.quickTo(follower, 'y', { duration: 0.45, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      followerXTo(e.clientX);
      followerYTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-interactive]');
      const labelAttr = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');

      if (interactive) {
        setIsHovering(true);
        if (labelAttr) {
          setHoverLabel(labelAttr);
        } else {
          setHoverLabel(null);
        }
      } else {
        setIsHovering(false);
        setHoverLabel(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Central precise dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent-gold pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* Outer fluid follower ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-[width,height,background-color,border-color] duration-300 flex items-center justify-center text-[10px] tracking-widest uppercase font-sans text-primary-dark font-medium ${
          isHovering
            ? hoverLabel
              ? 'w-20 h-20 -ml-10 -mt-10 bg-accent-ice text-primary-dark border border-accent-ice/80 scale-100 shadow-glow-ice'
              : 'w-12 h-12 -ml-6 -mt-6 bg-accent-gold/20 border border-accent-gold scale-110'
            : 'w-8 h-8 -ml-4 -mt-4 border border-accent-ice/30 bg-transparent'
        }`}
      >
        {hoverLabel && <span>{hoverLabel}</span>}
      </div>
    </>
  );
}
