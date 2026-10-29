'use client';

import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight, Scale } from 'lucide-react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenConsultation: () => void;
}

export default function Header({ onOpenMenu, onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#081225]/85 backdrop-blur-xl border-b border-accent-ice/10 py-3.5 shadow-luxury'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center space-x-3.5 group text-left focus:outline-none"
          aria-label="Ir al inicio de TORRES & TORRES"
        >
          <div className="w-10 h-10 rounded-full border border-accent-gold/40 group-hover:border-accent-gold flex items-center justify-center transition-all duration-300 bg-secondary-dark/40 group-hover:shadow-glow-gold">
            <span className="font-display font-medium text-lg text-accent-gold tracking-tight">
              T&T
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-sans font-medium text-xs md:text-sm tracking-monumental text-primary-light group-hover:text-accent-ice transition-colors">
              TORRES &amp; TORRES
            </span>
            <span className="font-display text-[11px] md:text-xs text-accent-gold/90 italic tracking-editorial">
              Abogados Asociados
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-sans tracking-widest uppercase text-accent-ice/75">
          <button
            onClick={() => scrollTo('#areas-practica')}
            className="hover:text-accent-ice transition-colors relative py-1 group"
          >
            <span>01. Áreas de Práctica</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-ice transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('#catalogo-servicios')}
            className="hover:text-accent-ice transition-colors relative py-1 group"
          >
            <span>02. Servicios (10)</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-ice transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('#la-firma')}
            className="hover:text-accent-ice transition-colors relative py-1 group"
          >
            <span>03. Metodología</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-ice transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('#contacto')}
            className="hover:text-accent-ice transition-colors relative py-1 group"
          >
            <span>04. Contacto</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-ice transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3.5">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-accent-gold/50 bg-accent-gold/10 hover:bg-accent-gold text-accent-gold hover:text-primary-dark transition-all duration-300 text-xs uppercase tracking-widest font-sans font-medium group"
          >
            <span>Consulta Privada</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Menu Trigger Button */}
          <button
            onClick={onOpenMenu}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-accent-ice/20 hover:border-accent-ice/60 bg-secondary-dark/60 text-accent-ice hover:bg-secondary-dark transition-all duration-300 group focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            <span className="text-xs uppercase tracking-widest font-sans font-medium hidden md:inline">
              Menú
            </span>
            <Menu className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
    </header>
  );
}
