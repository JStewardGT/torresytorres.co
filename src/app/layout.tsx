import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import MicrosoftClarity from '@/components/analytics/MicrosoftClarity';
import { SERVICES, CONTACT_INFO } from '@/data/services';

export const viewport: Viewport = {
  themeColor: '#081225',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://torresytorres.co'),
  title: 'TORRES & TORRES Abogados Asociados | Firma Jurídica Corporativa',
  description:
    'Firma jurídica de alto nivel en Colombia. Especialistas en Derecho Corporativo, Litigios Complejos, Protección Patrimonial y Relaciones Laborales Estratégicas.',
  keywords: [
    'TORRES & TORRES Abogados',
    'Abogados Corporativos Bogotá',
    'Derecho de Sociedades Colombia',
    'Derecho Empresarial',
    'Consultoría Empresarial',
    'Gestión de Proyectos Legales',
    'Derecho del Consumidor',
    'Derecho de Daños Personales',
    'Derecho de Sucesiones',
    'Derecho de Propiedad e Inmobiliario',
    'Derecho Laboral Patronal',
    'Consultoría Legal Estratégica',
    'Firma de Abogados Asociados',
  ],
  authors: [{ name: 'TORRES & TORRES Abogados Asociados' }],
  creator: 'TORRES & TORRES Abogados Asociados',
  publisher: 'TORRES & TORRES Abogados Asociados',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'TORRES & TORRES Abogados Asociados | Rigor Jurídico & Visión Estratégica',
    description:
      'Soluciones jurídicas de vanguardia para la alta dirección corporativa, transacciones complejas, controversias de alto calibre y perpetuación patrimonial.',
    url: 'https://torresytorres.co',
    siteName: 'TORRES & TORRES Abogados Asociados',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TORRES & TORRES Abogados Asociados',
    description: 'Rigor técnico, defensa inquebrantable y estrategia corporativa en Colombia.',
  },
  alternates: {
    canonical: 'https://torresytorres.co',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate comprehensive JSON-LD for Search Engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://torresytorres.co/#organization',
    name: CONTACT_INFO.firmName,
    legalName: 'TORRES & TORRES Abogados Asociados S.A.S.',
    url: 'https://torresytorres.co',
    description:
      'Firma jurídica de élite especializada en derecho societario, litigios complejos, estructuración patrimonial y consultoría laboral estratégica.',
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address,
      addressLocality: 'Bogotá',
      addressRegion: 'Cundinamarca',
      postalCode: CONTACT_INFO.postalCode,
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.6784,
      longitude: -74.0536,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo Oficial de Servicios Jurídicos',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          serviceType: service.pillarTitle,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
          },
        },
        position: index + 1,
      })),
    },
  };

  return (
    <html lang="es" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y64B1HGD7H"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y64B1HGD7H', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="bg-[#081225] text-primary-light min-h-screen selection:bg-accent-gold selection:text-primary-dark font-sans relative">
        <MicrosoftClarity />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
