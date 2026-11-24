'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  Briefcase,
  AlertCircle,
  ArrowUpRight,
  X,
  Scale,
  Sparkles,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { SERVICES, PRACTICE_PILLARS, servicePath, type ServiceItem } from '@/data/services';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface ServicesFilterDrawerProps {
  initialPillarFilter?: string | null;
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export default function ServicesFilterDrawer({
  initialPillarFilter = null,
  onSelectServiceForContact,
}: ServicesFilterDrawerProps) {
  const [activePillar, setActivePillar] = useState<string>('todos');
  const [activeApproach, setActiveApproach] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);

  const { scrollTo, stop, start } = useSmoothScroll();

  // Sync initial pillar if passed
  useEffect(() => {
    if (initialPillarFilter) {
      setActivePillar(initialPillarFilter);
    }
  }, [initialPillarFilter]);

  useEffect(() => {
    const handleCustomPillarSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActivePillar(customEvent.detail);
        setActiveApproach('todos');
        setSearchQuery('');
      }
    };

    window.addEventListener('torres-select-pillar', handleCustomPillarSelect);

    return () => {
      window.removeEventListener('torres-select-pillar', handleCustomPillarSelect);
    };
  }, []);

  // Lock scroll when service detail modal is active
  useEffect(() => {
    if (activeServiceDetail) {
      stop();
    } else {
      start();
    }
    return () => {
      start();
    };
  }, [activeServiceDetail, stop, start]);

  // Filtered list calculation
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesPillar =
        activePillar === 'todos' || service.pillarId === activePillar;

      const matchesApproach =
        activeApproach === 'todos' ||
        (activeApproach === 'preventivo' && service.approach.toLowerCase().includes('preventivo')) ||
        (activeApproach === 'litigioso' && service.approach.toLowerCase().includes('litigioso'));

      const matchesSearch =
        searchQuery.trim() === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.keyDeliverables.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesPillar && matchesApproach && matchesSearch;
    });
  }, [activePillar, activeApproach, searchQuery]);

  const handleConsultService = (service: ServiceItem) => {
    setActiveServiceDetail(null);
    if (onSelectServiceForContact) {
      onSelectServiceForContact(service.title);
    }
    setTimeout(() => {
      scrollTo('#contacto');
    }, 350);
  };

  const contentMarkup = (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary-dark/70 border border-accent-ice/15 backdrop-blur-md shadow-luxury space-y-4">
        {/* Top Row: Search Input + Approach Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-ice/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por especialidad, alcance o materia jurídica..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-primary-dark/90 border border-accent-ice/15 text-primary-light placeholder-accent-ice/40 text-xs sm:text-sm font-sans focus:outline-none focus:border-accent-gold transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-ice/40 hover:text-accent-ice transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Approach Filter: Ambos vs Preventivo vs Litigioso */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-primary-dark/90 border border-accent-ice/15 shrink-0 self-start sm:self-auto">
            <span className="text-[11px] font-mono text-accent-ice/50 px-2 hidden md:inline">
              Enfoque:
            </span>
            <button
              type="button"
              onClick={() => setActiveApproach('todos')}
              className={`px-3 py-1.5 text-xs rounded-lg font-sans transition-all ${
                activeApproach === 'todos'
                  ? 'bg-accent-gold text-primary-dark font-semibold shadow-sm'
                  : 'text-accent-ice/60 hover:text-accent-ice'
              }`}
            >
              Ambos
            </button>
            <button
              type="button"
              onClick={() => setActiveApproach('preventivo')}
              className={`px-3 py-1.5 text-xs rounded-lg font-sans transition-all ${
                activeApproach === 'preventivo'
                  ? 'bg-accent-gold text-primary-dark font-semibold shadow-sm'
                  : 'text-accent-ice/60 hover:text-accent-ice'
              }`}
            >
              Preventivo
            </button>
            <button
              type="button"
              onClick={() => setActiveApproach('litigioso')}
              className={`px-3 py-1.5 text-xs rounded-lg font-sans transition-all ${
                activeApproach === 'litigioso'
                  ? 'bg-accent-gold text-primary-dark font-semibold shadow-sm'
                  : 'text-accent-ice/60 hover:text-accent-ice'
              }`}
            >
              Litigioso
            </button>
          </div>
        </div>

        {/* Bottom Row: Practice Pillars Filter Tabs */}
        <div className="pt-3 border-t border-accent-ice/10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActivePillar('todos')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all ${
              activePillar === 'todos'
                ? 'bg-accent-ice text-primary-dark font-semibold shadow-glow-ice'
                : 'bg-primary-dark/50 border border-accent-ice/10 text-accent-ice/70 hover:text-accent-ice hover:border-accent-ice/25'
            }`}
          >
            Todas las Especialidades ({SERVICES.length})
          </button>
          {PRACTICE_PILLARS.map((p) => {
            const count = SERVICES.filter((s) => s.pillarId === p.id).length;
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all whitespace-nowrap ${
                  activePillar === p.id
                    ? 'bg-accent-ice text-primary-dark font-semibold shadow-glow-ice'
                    : 'bg-primary-dark/50 border border-accent-ice/10 text-accent-ice/70 hover:text-accent-ice hover:border-accent-ice/25'
                }`}
              >
                {p.title.split('&')[0].trim()} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 10 Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative rounded-2xl bg-secondary-dark/70 hover:bg-secondary-dark border border-accent-ice/10 hover:border-accent-ice/30 p-7 transition-all duration-300 flex flex-col justify-between shadow-luxury hover:shadow-glow-ice hover:-translate-y-1"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/30">
                  {service.badge}
                </span>
                <span className="text-[11px] font-mono text-accent-ice/40">
                  {service.approach.split(' ')[0]}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl text-primary-light group-hover:text-accent-ice transition-colors font-light mb-2.5">
                <a href={servicePath(service)} className="hover:underline">{service.title}</a>
              </h3>

              {/* Pillar subtitle */}
              <p className="text-[11px] font-mono text-accent-ice/50 uppercase tracking-wider mb-4">
                {service.pillarTitle}
              </p>

              {/* Short description */}
              <p className="text-xs sm:text-sm font-sans text-accent-ice/75 leading-relaxed mb-6">
                {service.shortDescription}
              </p>

              {/* Deliverable Highlights */}
              <ul className="space-y-2 mb-6">
                {service.keyDeliverables.slice(0, 2).map((item, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-accent-ice/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-accent-ice/10 flex items-center justify-between">
              <a href={servicePath(service)} className="text-xs font-medium text-accent-gold hover:underline">
                Ver alcance y casos
              </a>
              <button type="button" onClick={() => setActiveServiceDetail(service)} aria-label={`Vista rápida de ${service.title}`} className="w-8 h-8 rounded-full border border-accent-ice/20 flex items-center justify-center text-accent-ice hover:border-accent-gold hover:text-accent-gold transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-secondary-dark/30 rounded-2xl border border-accent-ice/10">
          <AlertCircle className="w-10 h-10 text-accent-gold mx-auto mb-3 opacity-80" />
          <h4 className="font-display text-xl text-primary-light">No se encontraron servicios</h4>
          <p className="text-xs text-accent-ice/60 mt-1 max-w-sm mx-auto">
            Pruebe ajustando los filtros de pilar o eliminando el término de búsqueda.
          </p>
          <button
            onClick={() => {
              setActivePillar('todos');
              setActiveApproach('todos');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-accent-gold text-primary-dark text-xs font-sans font-medium"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Standalone Section inside page flow */}
      <section
        id="catalogo-servicios"
        className="relative w-full bg-[#081225] text-primary-light py-28 px-6 md:px-12 border-b border-accent-ice/10"
        aria-label="Catálogo completo de los 10 servicios jurídicos"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-gold uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                <span>02 / Catálogo Integral de Servicios</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-primary-light tracking-tight">
                10 Especialidades <span className="italic text-accent-gold">Estratégicas</span>
              </h2>
              <p className="font-sans text-sm md:text-base text-accent-ice/70 max-w-2xl mt-3">
                Consulte en detalle el alcance preventivo, contencioso y los entregables clave de cada una de nuestras áreas de intervención.
              </p>
            </div>

            <div className="text-right hidden md:block">
              <span className="text-xs font-mono text-accent-ice/50 block">Arquitectura Legal</span>
              <span className="text-xs font-mono text-accent-gold block font-semibold">100% Personalizada</span>
            </div>
          </div>

          {/* Catalog Filter & Grid */}
          {contentMarkup}
        </div>
      </section>

      {/* Detailed Modal for Individual Service View */}
      {activeServiceDetail && (
        <div
          className="fixed inset-0 z-[60] bg-[#040913]/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          <div data-lenis-prevent className="relative w-full max-w-3xl rounded-3xl bg-secondary-dark border border-accent-ice/25 p-8 md:p-12 max-h-[90vh] overflow-y-auto overscroll-y-contain shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveServiceDetail(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-accent-ice/20 hover:border-accent-gold text-accent-ice hover:text-accent-gold transition-colors"
              aria-label="Cerrar detalle de servicio"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-accent-gold/15 border border-accent-gold/40 text-[11px] font-mono text-accent-gold font-medium uppercase tracking-widest">
                  {activeServiceDetail.badge}
                </span>
                <span className="text-xs font-mono text-accent-ice/60">
                  Enfoque: {activeServiceDetail.approach}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl text-primary-light font-light mb-2">
                {activeServiceDetail.title}
              </h3>
              <p className="text-xs font-mono text-accent-gold/80 uppercase tracking-widest">
                {activeServiceDetail.pillarTitle}
              </p>
            </div>

            {/* Scope */}
            <div className="space-y-6 text-sm text-accent-ice/85 leading-relaxed mb-8">
              <div>
                <h4 className="text-xs font-mono text-accent-ice/50 uppercase tracking-widest mb-2">
                  Alcance Detallado &amp; Enfoque Estratégico:
                </h4>
                <p className="text-primary-light/90 text-sm md:text-base leading-relaxed">
                  {activeServiceDetail.detailedScope}
                </p>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-mono text-accent-ice/50 uppercase tracking-widest mb-3">
                  Entregables &amp; Soluciones Tangibles:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeServiceDetail.keyDeliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-primary-dark/60 border border-accent-ice/10 flex items-start space-x-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <span className="text-xs text-accent-ice/90 leading-snug">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Cases */}
              <div>
                <h4 className="text-xs font-mono text-accent-ice/50 uppercase tracking-widest mb-3">
                  Casos de Intervención Frecuentes:
                </h4>
                <ul className="space-y-2">
                  {activeServiceDetail.typicalCases.map((tc, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-accent-ice/80 flex items-start space-x-2"
                    >
                      <span className="text-accent-gold font-mono">•</span>
                      <span>{tc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Audience */}
              <div className="pt-2">
                <span className="text-xs font-mono text-accent-ice/50 uppercase tracking-widest block mb-1">
                  Público Objetivo &amp; Clientes Ideales:
                </span>
                <span className="text-xs font-sans text-accent-gold italic">
                  {activeServiceDetail.targetAudience}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-accent-ice/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-accent-ice/60">
                Atención directa con socios sénior especializados.
              </span>
              <button
                onClick={() => handleConsultService(activeServiceDetail)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-accent-gold text-primary-dark font-sans text-xs uppercase tracking-widest font-semibold hover:bg-accent-ice transition-all duration-300 shadow-glow-gold"
              >
                <span>{activeServiceDetail.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
