'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ArrowUpRight, Scale, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { PRACTICE_PILLARS, SERVICES, CONTACT_INFO } from '@/data/services';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenService: (serviceId: string) => void;
}

export default function FullscreenMenu({
  isOpen,
  onClose,
  onOpenService,
}: FullscreenMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { scrollTo, stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpen) {
      stop();
      // Animation in
      const ctx = gsap.context(() => {
        gsap.to(containerRef.current, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.5,
          ease: 'power3.out',
        });

        gsap.fromTo(
          '.menu-stagger-item',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      }, containerRef);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        ctx.revert();
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      start();
      gsap.to(containerRef.current, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isOpen, stop, start, onClose]);

  const handleNavClick = (selector: string) => {
    onClose();
    setTimeout(() => {
      scrollTo(selector);
    }, 400);
  };

  const handleSelectService = (serviceId: string) => {
    onClose();
    setTimeout(() => {
      onOpenService(serviceId);
    }, 350);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#081225]/95 backdrop-blur-2xl opacity-0 invisible flex flex-col justify-between overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de navegación"
    >
      {/* Top Bar inside Menu */}
      <div className="w-full px-6 md:px-16 py-8 flex items-center justify-between border-b border-accent-ice/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full border border-accent-gold/40 flex items-center justify-center text-accent-gold font-display font-medium text-lg">
            T&T
          </div>
          <div>
            <span className="text-xs uppercase tracking-monumental text-accent-ice/70 block">
              TORRES & TORRES
            </span>
            <span className="text-[11px] text-accent-gold tracking-editorial font-display italic">
              Abogados Asociados
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="group flex items-center space-x-2 px-4 py-2 rounded-full border border-accent-ice/20 hover:border-accent-gold text-accent-ice hover:text-accent-gold transition-all duration-300"
          aria-label="Cerrar menú"
        >
          <span className="text-xs uppercase tracking-widest font-sans font-medium">Cerrar</span>
          <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </div>

      {/* Main Content Grid */}
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto w-full px-6 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 flex-grow items-start"
      >
        {/* Left Column: Firm Coordinates & Philosophy */}
        <div ref={infoRef} className="lg:col-span-4 space-y-10 border-b lg:border-b-0 lg:border-r border-accent-ice/10 pb-8 lg:pb-0 lg:pr-12">
          <div className="menu-stagger-item">
            <span className="text-xs font-mono text-accent-gold uppercase tracking-widest block mb-2">
              / Posicionamiento Institucional
            </span>
            <p className="font-display text-2xl md:text-3xl font-light text-primary-light leading-snug">
              Rigor técnico implacable y <span className="italic text-accent-gold">visión estratégica</span> para la protección de sus decisiones críticas.
            </p>
          </div>

          <div className="menu-stagger-item space-y-4 text-xs font-sans text-accent-ice/70">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <span>{CONTACT_INFO.address}, {CONTACT_INFO.city}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-accent-gold shrink-0" />
              <span>Tel: {CONTACT_INFO.phone} | Cel: {CONTACT_INFO.mobile}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-accent-gold shrink-0" />
              <span>{CONTACT_INFO.email}</span>
            </div>
          </div>

          <div className="menu-stagger-item pt-4">
            <button
              onClick={() => handleNavClick('#contacto')}
              className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-accent-gold/10 border border-accent-gold/40 hover:bg-accent-gold hover:text-primary-dark text-accent-gold font-sans text-xs uppercase tracking-widest transition-all duration-300 group"
            >
              <span>Agendar Consulta Directa</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Navigation Links & 10 Services */}
        <div ref={linksRef} className="lg:col-span-8 space-y-10">
          <div>
            <span className="text-xs font-mono text-accent-gold uppercase tracking-widest block mb-4">
              / Navegación Principal
            </span>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleNavClick('#areas-practica')}
                className="menu-stagger-item text-left p-4 rounded-lg bg-secondary-dark/60 hover:bg-secondary-dark border border-accent-ice/5 hover:border-accent-ice/30 transition-all duration-200 group"
              >
                <span className="text-xs text-accent-ice/50 font-mono block mb-1">01</span>
                <span className="font-display text-xl text-primary-light group-hover:text-accent-ice transition-colors">
                  Áreas de Práctica (Pilares 3D)
                </span>
              </button>

              <button
                onClick={() => handleNavClick('#catalogo-servicios')}
                className="menu-stagger-item text-left p-4 rounded-lg bg-secondary-dark/60 hover:bg-secondary-dark border border-accent-ice/5 hover:border-accent-ice/30 transition-all duration-200 group"
              >
                <span className="text-xs text-accent-ice/50 font-mono block mb-1">02</span>
                <span className="font-display text-xl text-primary-light group-hover:text-accent-ice transition-colors">
                  Catálogo de 10 Servicios
                </span>
              </button>

              <button
                onClick={() => handleNavClick('#la-firma')}
                className="menu-stagger-item text-left p-4 rounded-lg bg-secondary-dark/60 hover:bg-secondary-dark border border-accent-ice/5 hover:border-accent-ice/30 transition-all duration-200 group"
              >
                <span className="text-xs text-accent-ice/50 font-mono block mb-1">03</span>
                <span className="font-display text-xl text-primary-light group-hover:text-accent-ice transition-colors">
                  La Firma & Metodología
                </span>
              </button>

              <button
                onClick={() => handleNavClick('#contacto')}
                className="menu-stagger-item text-left p-4 rounded-lg bg-secondary-dark/60 hover:bg-secondary-dark border border-accent-ice/5 hover:border-accent-ice/30 transition-all duration-200 group"
              >
                <span className="text-xs text-accent-ice/50 font-mono block mb-1">04</span>
                <span className="font-display text-xl text-primary-light group-hover:text-accent-ice transition-colors">
                  Contacto & Ubicación
                </span>
              </button>
            </nav>
          </div>

          {/* 10 Services Direct Quick Selection */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-accent-gold uppercase tracking-widest">
                / Desglose de los 10 Servicios Jurídicos
              </span>
              <span className="text-[11px] text-accent-ice/50 font-mono">10 Especialidades</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SERVICES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectService(s.id)}
                  className="menu-stagger-item flex items-center justify-between p-3 rounded-md bg-primary-dark/80 hover:bg-accent-ice/10 border border-accent-ice/10 hover:border-accent-ice/40 text-left transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="text-[10px] font-mono text-accent-ice/40 group-hover:text-accent-gold transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-sans text-primary-light/90 group-hover:text-accent-ice truncate">
                      {s.title}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent-ice/30 group-hover:text-accent-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Footer */}
      <div className="w-full px-6 md:px-16 py-6 border-t border-accent-ice/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-xs text-accent-ice/40 font-mono">
        <span>© {new Date().getFullYear()} TORRES & TORRES Abogados Asociados S.A.S.</span>
        <span className="mt-2 md:mt-0">Todos los derechos reservados — Bogotá D.C., Colombia</span>
      </div>
    </div>
  );
}
