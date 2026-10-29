'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import FullscreenMenu from '@/components/ui/FullscreenMenu';
import HeroSection from '@/components/sections/HeroSection';
import PracticeCarouselSection from '@/components/sections/PracticeCarouselSection';
import ServicesFilterDrawer from '@/components/sections/ServicesFilterDrawer';
import HorizontalFirmSection from '@/components/sections/HorizontalFirmSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activePillarFilter, setActivePillarFilter] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [preselectedContactService, setPreselectedContactService] = useState<string | undefined>(undefined);

  const { scrollTo } = useSmoothScroll();

  const handleOpenPillarInCatalog = (pillarId: string) => {
    setActivePillarFilter(pillarId);
    setSelectedServiceId(null);
    scrollTo('#catalogo-servicios');
  };

  const handleOpenSpecificService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsDrawerOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('torres-open-service', { detail: serviceId }));
    }
    scrollTo('#catalogo-servicios');
  };

  const handleOpenConsultation = () => {
    scrollTo('#contacto');
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPreselectedContactService(serviceTitle);
  };

  return (
    <main className="relative w-full bg-[#081225] text-primary-light">
      {/* Immersive Fullscreen Menu Overlay */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenService={(serviceId) => {
          setIsMenuOpen(false);
          handleOpenSpecificService(serviceId);
        }}
      />

      {/* Persistent Minimalist Top Navigation Header */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 1. Hero Section (Monumental typography, clip-path reveal, R3F subtle background) */}
      <HeroSection
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 2. Practice Carousel Section (3D Perspective Spatial Carousel of 4 Pillars) */}
      <PracticeCarouselSection
        onSelectPillar={handleOpenPillarInCatalog}
        onOpenService={handleOpenSpecificService}
      />

      {/* 3. Immersive Filter Panel & 10 Services Interactive Catalog */}
      <ServicesFilterDrawer
        isDrawerOpen={isDrawerOpen}
        initialPillarFilter={activePillarFilter}
        selectedServiceId={selectedServiceId}
        onCloseDrawer={() => setIsDrawerOpen(false)}
        onSelectServiceForContact={handleSelectServiceForContact}
      />

      {/* 4. Horizontal Scroll Section (Pinned GSAP Section on Stone #E4E3E3 Background) */}
      <HorizontalFirmSection
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 5. Contact Section (Direct inquiry, WhatsApp integration & Bogota Office) */}
      <ContactSection
        preselectedService={preselectedContactService}
      />

      {/* 6. Editorial Footer */}
      <Footer
        onOpenService={handleOpenSpecificService}
        onOpenPillar={handleOpenPillarInCatalog}
      />
    </main>
  );
}
