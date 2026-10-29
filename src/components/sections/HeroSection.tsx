'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowUpRight, Scale, ShieldCheck } from 'lucide-react';
import { DynamicHeroCanvas } from '@/components/canvas/HeroCanvasWrapper';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { FIRM_STATS } from '@/data/services';

interface HeroSectionProps {
  onOpenDrawer: () => void;
  onOpenConsultation: () => void;
}

export default function HeroSection({ onOpenDrawer, onOpenConsultation }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      // Line by line reveal with clip-path and gentle translation
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.1 } });

      tl.fromTo(
        '.hero-pill-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          '.hero-reveal-line',
          { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: 40, opacity: 0 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            y: 0,
            opacity: 1,
            stagger: 0.15,
          },
          '-=0.4'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          '.hero-action-btn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.hero-stat-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.8 },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#081225] text-primary-light flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 overflow-hidden border-b border-accent-ice/10"
    >
      {/* 3D WebGL Canvas Layer (Zero main-thread blocking, demand loop) */}
      <DynamicHeroCanvas />

      {/* Subtle Noise / Grid layer */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto py-8">
        {/* Institutional Pill Badge */}
        <div className="hero-pill-badge inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-secondary-dark/80 border border-accent-ice/20 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-accent-ice uppercase">
            Firma Jurídica de Alto Nivel — Bogotá, Colombia
          </span>
        </div>

        {/* Monumental Headline with line-by-line reveal */}
        <div className="space-y-1 md:space-y-2 mb-8">
          <div className="overflow-hidden">
            <h1 className="hero-reveal-line font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-primary-light leading-[1.05]">
              Rigor técnico,
            </h1>
          </div>
          <div className="overflow-hidden">
            <div className="hero-reveal-line font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-primary-light leading-[1.05] flex flex-wrap items-baseline gap-x-4">
              <span>defensa</span>
              <span className="italic font-normal text-accent-gold font-display">
                inquebrantable
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <h2 className="hero-reveal-line font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-accent-ice leading-[1.05]">
              &amp; estrategia corporativa.
            </h2>
          </div>
        </div>

        {/* Subtitle / Philosophy */}
        <p className="hero-subtext max-w-2xl font-sans text-base md:text-lg text-accent-ice/80 font-normal leading-relaxed mb-10">
          En <strong className="text-primary-light font-medium">TORRES &amp; TORRES Abogados Asociados</strong> conjugamos la pulcritud del derecho clásico con una visión empresarial audaz para blindar transacciones, resolver controversias complejas y preservar patrimonios decisivos.
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo('#areas-practica')}
            className="hero-action-btn inline-flex items-center space-x-3 px-7 py-4 rounded-xl bg-accent-gold text-primary-dark font-sans text-xs uppercase tracking-widest font-semibold hover:bg-accent-ice transition-all duration-300 shadow-glow-gold group"
          >
            <span>Explorar Áreas de Práctica</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <button
            onClick={onOpenDrawer}
            className="hero-action-btn inline-flex items-center space-x-3 px-7 py-4 rounded-xl bg-secondary-dark/80 hover:bg-secondary-dark border border-accent-ice/20 hover:border-accent-ice/60 text-primary-light font-sans text-xs uppercase tracking-widest font-medium transition-all duration-300 backdrop-blur-md group"
          >
            <span>Catálogo de 10 Servicios</span>
            <ArrowUpRight className="w-4 h-4 text-accent-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={onOpenConsultation}
            className="hero-action-btn inline-flex items-center space-x-2 px-5 py-4 text-accent-ice/70 hover:text-accent-gold transition-colors text-xs uppercase tracking-widest font-sans font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
            <span>Agendar Consulta Confidencial</span>
          </button>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-8 border-t border-accent-ice/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {FIRM_STATS.map((stat, i) => (
          <div key={i} className="hero-stat-card">
            <span className="font-display text-3xl md:text-4xl text-accent-gold block font-light">
              {stat.value}
            </span>
            <span className="text-xs font-sans text-accent-ice/60 uppercase tracking-widest block mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
