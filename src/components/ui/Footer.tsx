'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight, Scale, Shield } from 'lucide-react';
import { PRACTICE_PILLARS, SERVICES, CONTACT_INFO } from '@/data/services';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface FooterProps {
  onOpenService: (serviceId: string) => void;
  onOpenPillar: (pillarId: string) => void;
}

export default function Footer({ onOpenService, onOpenPillar }: FooterProps) {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer
      className="w-full bg-[#040A15] text-primary-light pt-20 pb-12 px-6 md:px-12 border-t border-accent-ice/10"
      aria-label="Pie de página editorial de TORRES & TORRES"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Upper Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-accent-ice/10">
          {/* Brand Presentation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full border border-accent-gold/50 flex items-center justify-center text-accent-gold font-display font-medium text-xl bg-secondary-dark/50">
                T&amp;T
              </div>
              <div>
                <span className="font-sans font-medium text-sm tracking-monumental text-primary-light block">
                  TORRES &amp; TORRES
                </span>
                <span className="font-display text-xs text-accent-gold italic tracking-editorial">
                  Abogados Asociados
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-accent-ice/70 max-w-md leading-relaxed">
              Firma jurídica corporativa especializada en blindaje societario, resolución de litigios de alta complejidad, estructuración patrimonial y asesoramiento preventivo institucional.
            </p>

            <div className="text-xs font-mono text-accent-ice/60 space-y-1.5 pt-2">
              <p className="text-primary-light font-sans font-medium">{CONTACT_INFO.address}</p>
              <p>{CONTACT_INFO.city}</p>
              <p>Teléfono Fijo: <a href="tel:+5717156975" className="hover:text-accent-gold transition-colors">{CONTACT_INFO.phone}</a></p>
              <p>Celular / WhatsApp: <a href="https://wa.me/573222915599" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">{CONTACT_INFO.mobile}</a></p>
              <p>Email: <a href={`mailto:${CONTACT_INFO.email}`} target="_blank" className="hover:text-accent-ice transition-colors">{CONTACT_INFO.email}</a></p>
            </div>
          </div>

          {/* Pillars & 10 Services Sitemap */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-xs font-sans">
            {/* Column 1: Pilares */}
            <div>
              <h4 className="font-mono text-accent-gold uppercase tracking-widest text-[11px] mb-4">
                / Pilares de Práctica
              </h4>
              <ul className="space-y-2.5">
                {PRACTICE_PILLARS.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => onOpenPillar(p.id)}
                      className="text-accent-ice/70 hover:text-accent-gold text-left transition-colors flex items-center space-x-1.5"
                    >
                      <span className="font-mono text-accent-gold/60 text-[10px]">{p.number}.</span>
                      <span className="line-clamp-1">{p.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Servicios Corporativo & Litigios */}
            <div>
              <h4 className="font-mono text-accent-gold uppercase tracking-widest text-[11px] mb-4">
                / Corp &amp; Contencioso
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => onOpenService(s.id)}
                      className="text-accent-ice/70 hover:text-accent-ice text-left transition-colors flex items-center space-x-1 group"
                    >
                      <span className="line-clamp-1">{s.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-accent-ice/30 group-hover:text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Servicios Patrimonio & Laboral */}
            <div>
              <h4 className="font-mono text-accent-gold uppercase tracking-widest text-[11px] mb-4">
                / Patrimonio &amp; Laboral
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => onOpenService(s.id)}
                      className="text-accent-ice/70 hover:text-accent-ice text-left transition-colors flex items-center space-x-1 group"
                    >
                      <span className="line-clamp-1">{s.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-accent-ice/30 group-hover:text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Legal Disclaimers & Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] font-sans text-accent-ice/50">
          <div className="max-w-2xl leading-relaxed">
            <p>
              Aviso Legal: La información expuesta en este sitio web tiene propósitos exclusivamente informativos e institucionales y no constituye consulta, dictamen ni relación formal abogado-cliente. Para asesoramiento profesional formal, solicite una consulta confidencial directa con nuestros socios.
            </p>
          </div>

          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-accent-ice/15 hover:border-accent-gold text-accent-ice hover:text-accent-gold transition-colors font-mono uppercase text-[10px] tracking-widest shrink-0"
          >
            <span>Volver al inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 mt-6 border-t border-accent-ice/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-accent-ice/40">
          <span>© {new Date().getFullYear()} TORRES &amp; TORRES Abogados Asociados S.A.S. — Todos los derechos reservados.</span>
          <span className="mt-2 sm:mt-0">Diseñado con inspiración en la arquitectura editorial europea de alto nivel.</span>
        </div>
      </div>
    </footer>
  );
}
