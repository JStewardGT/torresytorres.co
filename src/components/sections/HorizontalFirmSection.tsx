'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Shield, Compass, Award, ArrowRight } from 'lucide-react';
import { FIRM_METHODOLOGY } from '@/data/services';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface HorizontalFirmSectionProps {
  onOpenConsultation: () => void;
}

export default function HorizontalFirmSection({ onOpenConsultation }: HorizontalFirmSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const panels = panelsRef.current;
      const progressBar = progressBarRef.current;
      if (!section || !pinWrapper || !panels) return;

      const getScrollAmount = () => {
        const container = containerRef.current;
        if (!panels || !container) return 0;
        // Ensure the last card is fully visible with comfortable right margin
        return Math.max(0, panels.scrollWidth - container.clientWidth + 48);
      };

      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        ScrollTrigger.refresh();

        const scrollDistance = getScrollAmount();
        // Generous reading pause so the final card stays in view before unpinning
        const pauseDistance = 500;
        const totalPinDistance = scrollDistance + pauseDistance;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pinWrapper, // PIN THE INNER WRAPPER, NEVER THE REACT ROOT SECTION ELEMENT!
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${totalPinDistance}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) {
                // Progress bar tracks horizontal scroll progress
                const horizontalProgress = Math.min(1, (self.progress * totalPinDistance) / scrollDistance);
                gsap.to(progressBar, {
                  scaleX: horizontalProgress,
                  transformOrigin: 'left center',
                  duration: 0.05,
                  ease: 'none',
                });
              }
            },
          },
        });

        // 1. Horizontal slide
        tl.to(panels, {
          x: () => -scrollDistance,
          ease: 'none',
          duration: scrollDistance,
        });

        // 2. Reading pause at the end so the user can comfortably view Card 4 before unpinning
        tl.to({}, { duration: pauseDistance });

        return () => {
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="la-firma"
      ref={sectionRef}
      className="relative w-full bg-[#E4E3E3] text-[#081225]"
      aria-label="Metodología y Filosofía de TORRES & TORRES"
    >
      {/* Inner Pin Target: GSAP pins this div inside the section so the section itself is never reparented */}
      <div
        ref={pinWrapperRef}
        className="w-full md:h-screen md:min-h-screen md:max-h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Top Banner on Stone Background */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-[#081225]/15 shrink-0">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#081225]/70 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-[#081225]" />
              <span>03 / La Firma &amp; Metodología</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#081225] tracking-tight">
              La Arquitectura de la <span className="italic font-normal">Certeza Jurídica</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#081225]/70 max-w-md mt-3 md:mt-0 leading-relaxed">
            Tres pilares metodológicos que diferencian nuestra práctica y garantizan resultados predecibles y sostenibles en el tiempo.
          </p>
        </div>

        {/* Horizontal Panels Wrapper */}
        <div
          ref={containerRef}
          className="relative max-w-7xl mx-auto w-full px-6 md:px-12 flex-1 flex items-center overflow-hidden py-6 md:py-8"
        >
          <div
            ref={panelsRef}
            className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8 w-full md:w-max md:min-h-[clamp(360px,50vh,460px)] will-change-transform md:pr-16"
          >
            {FIRM_METHODOLOGY.map((method, idx) => (
              <div
                key={idx}
                className="firm-card w-full md:w-[460px] lg:w-[500px] shrink-0 rounded-3xl bg-[#F4F4F2] border border-[#081225]/12 p-6 md:p-8 lg:p-10 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#081225]/30 transition-all duration-300"
              >
                <div>
                  {/* Header of panel */}
                  <div className="flex items-center justify-between border-b border-[#081225]/10 pb-3 mb-4">
                    <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded bg-[#081225] text-white uppercase tracking-widest">
                      Fase {method.step}
                    </span>
                    <span className="text-[11px] font-mono text-[#081225]/60 uppercase tracking-wider">
                      {method.stats}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-[#081225] font-light mb-1.5">
                    {method.title}
                  </h3>
                  <h4 className="font-sans text-xs uppercase tracking-widest text-[#081225]/75 font-semibold mb-4">
                    {method.subtitle}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-[#081225]/80 leading-relaxed mb-4">
                    {method.description}
                  </p>

                  {/* Editorial Quote block */}
                  <div className="p-4 rounded-xl bg-[#E4E3E3]/80 border-l-4 border-[#081225]">
                    <p className="font-display italic text-xs sm:text-sm text-[#081225] leading-snug">
                      &ldquo;{method.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom interactive action */}
                <div className="pt-4 border-t border-[#081225]/10 flex items-center justify-between mt-4">
                  <span className="text-[11px] font-mono text-[#081225]/60">
                    Estándar de Excelencia TORRES &amp; TORRES
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="inline-flex items-center space-x-1.5 text-xs font-sans uppercase tracking-widest font-bold text-[#081225] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Iniciar Diagnóstico</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Additional Institutional Callout Panel */}
            <div className="firm-card w-full md:w-[420px] shrink-0 rounded-3xl bg-[#081225] text-primary-light p-6 md:p-8 lg:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div>
                <span className="text-[11px] font-mono text-accent-gold uppercase tracking-widest block mb-2">
                  / Compromiso Institucional
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-primary-light mb-3">
                  Atención directa con socios principales.
                </h3>
                <p className="font-sans text-xs sm:text-sm text-accent-ice/80 leading-relaxed mb-4">
                  Sin intermediarios anónimos. Cada expediente es liderado con rigor técnico y confidencialidad absoluta desde el primer día.
                </p>

                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2.5 text-xs text-accent-ice/90">
                    <Shield className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Secreto profesional y protocolo de confidencialidad estricto.</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-accent-ice/90">
                    <Compass className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Claridad en honorarios y estimación transparente de tiempos.</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-accent-ice/90">
                    <Award className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Capacidad probada en controversias de alto calibre.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollTo('#contacto')}
                className="w-full py-3.5 rounded-xl bg-accent-gold text-primary-dark font-sans text-xs uppercase tracking-widest font-semibold hover:bg-accent-ice transition-colors flex items-center justify-center space-x-2 shadow-glow-gold mt-4"
              >
                <span>Agendar Reunión con un Socio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar & Indicator on Desktop */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-5 border-t border-[#081225]/10 hidden md:flex items-center justify-between text-[11px] font-mono text-[#081225]/60 shrink-0">
          <span>Desplazamiento Horizontal / Metodología</span>
          <div className="w-48 h-1 bg-[#081225]/10 rounded-full overflow-hidden mx-4">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-[#081225] scale-x-0 origin-left"
            />
          </div>
          <span>Fase 01 a 03</span>
        </div>
      </div>
    </section>
  );
}
