'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRACTICE_PILLARS, SERVICES } from '@/data/services';

interface PracticeCarouselSectionProps {
  onSelectPillar: (pillarId: string) => void;
  onOpenService?: (serviceId: string) => void;
}

export default function PracticeCarouselSection({
  onSelectPillar,
  onOpenService,
}: PracticeCarouselSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isPointerDown = useRef(false);
  const dragStartX = useRef(0);
  const hasDragged = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pillarsCount = PRACTICE_PILLARS.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % pillarsCount);
  }, [pillarsCount]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + pillarsCount) % pillarsCount);
  }, [pillarsCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleNext, handlePrev]);

  // Modern HTML5 Pointer Events Drag & Swipe System
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag on left click (button 0) or touch
    if (e.button !== 0) return;

    isPointerDown.current = true;
    dragStartX.current = e.clientX;
    hasDragged.current = false;
    setDragOffset(0);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const delta = e.clientX - dragStartX.current;

    if (Math.abs(delta) > 8) {
      hasDragged.current = true;
    }

    // Dampen drag displacement for realistic physical resistance
    setDragOffset(delta * 0.7);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    const delta = e.clientX - dragStartX.current;
    setDragOffset(0);

    // If moved more than 40px, slide to next or previous
    if (delta < -40) {
      handleNext();
    } else if (delta > 40) {
      handlePrev();
    }

    // Reset drag flag after microtask to allow click filtering
    setTimeout(() => {
      hasDragged.current = false;
    }, 50);
  };

  const handleCardClick = (index: number) => {
    if (hasDragged.current) return;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="areas-practica"
      ref={containerRef}
      tabIndex={0}
      className="relative min-h-screen w-full bg-[#081225] text-primary-light py-28 px-6 md:px-12 flex flex-col justify-between overflow-hidden border-b border-accent-ice/10 focus:outline-none select-none"
      aria-label="Carrusel de Áreas de Práctica"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-secondary-dark/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-gold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
            <span>01 / Expertises Carousel</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-primary-light tracking-tight">
            Pilares de <span className="italic text-accent-gold">Práctica Jurídica</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-accent-ice/70 max-w-xl mt-3">
            Cuatro núcleos estratégicos estructurados para otorgar respuesta integral y blindaje operativo a corporaciones y familias.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center space-x-4 self-start md:self-end">
          <div className="flex items-center space-x-2 text-xs font-mono text-accent-ice/50 mr-4">
            <span className="text-accent-gold font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(pillarsCount).padStart(2, '0')}</span>
          </div>

          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-accent-ice/20 hover:border-accent-gold flex items-center justify-center text-accent-ice hover:text-accent-gold bg-secondary-dark/60 hover:bg-secondary-dark transition-all duration-300 focus:outline-none"
            aria-label="Pilar anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-accent-ice/20 hover:border-accent-gold flex items-center justify-center text-accent-ice hover:text-accent-gold bg-secondary-dark/60 hover:bg-secondary-dark transition-all duration-300 focus:outline-none"
            aria-label="Siguiente pilar"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Spatial Interactive Carousel Stage with Pointer Drag */}
      <div
        className="max-w-7xl mx-auto w-full relative z-10 perspective-container cursor-grab active:cursor-grabbing my-auto touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="relative w-full min-h-[480px] md:min-h-[520px] flex items-center justify-center">
          {PRACTICE_PILLARS.map((pillar, index) => {
            // Calculate relative offset from active card
            let offset = index - activeIndex;
            if (offset < -1 && offset < -pillarsCount / 2) offset += pillarsCount;
            if (offset > 1 && offset > pillarsCount / 2) offset -= pillarsCount;

            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = Math.abs(offset) > 1;

            let transform = 'translate3d(0, 0, -200px) scale(0.7) rotateY(0deg)';
            let opacity = 0;
            let zIndex = 0;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (isActive) {
              const liveX = dragOffset;
              const liveRot = dragOffset * 0.04;
              transform = `translate3d(${liveX}px, 0, 0) scale(1) rotateY(${liveRot}deg)`;
              opacity = 1;
              zIndex = 30;
              pointerEvents = 'auto';
            } else if (isLeft) {
              const liveX = -55 + (dragOffset / 20);
              transform = `translate3d(${liveX}%, 0, -140px) scale(0.85) rotateY(24deg)`;
              opacity = 0.45;
              zIndex = 10;
              pointerEvents = 'auto';
            } else if (isRight) {
              const liveX = 55 + (dragOffset / 20);
              transform = `translate3d(${liveX}%, 0, -140px) scale(0.85) rotateY(-24deg)`;
              opacity = 0.45;
              zIndex = 10;
              pointerEvents = 'auto';
            }

            return (
              <div
                key={pillar.id}
                onClick={() => handleCardClick(index)}
                className={`absolute w-full max-w-3xl rounded-2xl bg-secondary-dark/95 border transition-all duration-500 ease-out shadow-luxury preserve-3d overflow-hidden ${
                  isActive
                    ? 'border-accent-ice/30 shadow-glow-ice'
                    : 'border-accent-ice/10 hover:border-accent-ice/20 cursor-pointer'
                }`}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  pointerEvents,
                  visibility: isHidden ? 'hidden' : 'visible',
                  transition: isPointerDown.current && isActive ? 'none' : 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Background watermark number */}
                <div className="absolute top-4 right-6 font-display text-8xl md:text-9xl font-bold text-accent-ice/[0.04] select-none pointer-events-none">
                  {pillar.number}
                </div>

                <div className="p-8 md:p-12 relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Header line of card */}
                    <div className="flex items-center justify-between border-b border-accent-ice/10 pb-5 mb-6">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/40 flex items-center justify-center text-accent-gold font-mono text-xs font-bold">
                          {pillar.number}
                        </span>
                        <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
                          {pillar.code}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-accent-ice/50">
                        {pillar.serviceIds.length} Especialidades Incluidas
                      </span>
                    </div>

                    {/* Pillar Title & Tagline */}
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary-light font-light mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-accent-gold/90 font-medium tracking-wide uppercase mb-4">
                      {pillar.subtitle}
                    </p>
                    <p className="font-sans text-sm sm:text-base text-accent-ice/80 leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    {/* Included Services Tags */}
                    <div className="mb-8">
                      <span className="text-[11px] font-mono text-accent-ice/40 uppercase tracking-widest block mb-2.5">
                        Servicios dentro de este pilar:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES.filter((s) => pillar.serviceIds.includes(s.id)).map((s) => (
                          <span
                            key={s.id}
                            className="px-3 py-1.5 rounded-md bg-primary-dark/80 border border-accent-ice/15 text-xs font-sans text-accent-ice/85 select-none"
                          >
                            {s.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-6 border-t border-accent-ice/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs font-display italic text-accent-ice/60 max-w-sm">
                      &quot;{pillar.highlightText}&quot;
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!hasDragged.current) onSelectPillar(pillar.id);
                      }}
                      className="inline-flex items-center justify-center space-x-2.5 px-6 py-3 rounded-xl bg-accent-gold/20 hover:bg-accent-gold text-accent-gold hover:text-primary-dark border border-accent-gold/40 text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 group shrink-0 cursor-pointer"
                    >
                      <span>Desglosar Servicios del Pilar</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Pillars Indicator Pills */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-10 flex flex-wrap items-center justify-center gap-3">
        {PRACTICE_PILLARS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 flex items-center space-x-2 ${
              activeIndex === i
                ? 'bg-accent-ice text-primary-dark font-medium shadow-glow-ice'
                : 'bg-secondary-dark/60 text-accent-ice/60 hover:text-accent-ice border border-accent-ice/10'
            }`}
          >
            <span className="font-mono text-[10px]">{p.number}</span>
            <span className="truncate max-w-[140px] sm:max-w-none">{p.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
