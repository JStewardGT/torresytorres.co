'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  ArrowUpRight,
  Loader2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '@/data/services';

const DEFAULT_ENDPOINT = 'https://torres-contact-api.johans-galeanot.workers.dev';

interface ContactSectionProps {
  preselectedService?: string;
}

export default function ContactSection({ preselectedService }: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clientType, setClientType] = useState<'empresa' | 'persona'>('empresa');
  const [selectedService, setSelectedService] = useState<string>(
    preselectedService || SERVICES[0].title
  );
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Silently ignore spam bots
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || DEFAULT_ENDPOINT;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          clientType,
          service: selectedService,
          message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        setStatus('success');
      } else {
        const errorMsg =
          typeof result.error === 'string'
            ? result.error
            : result.error?.message || 'Error en la respuesta del servidor de correo.';
        throw new Error(errorMsg);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de conexión';
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  const handleWhatsAppDirect = () => {
    const rawNumber = '573222915599';
    const text = encodeURIComponent(
      `Hola, me gustaría agendar una consulta con TORRES & TORRES Abogados Asociados.\n\nNombre: ${fullName || 'Interesado'}\nServicio requerido: ${selectedService}\nTipo de consulta: ${clientType === 'empresa' ? 'Empresarial' : 'Particular'}\n\nDetalle: ${message || 'Deseo recibir orientación jurídica.'}`
    );
    window.open(`https://wa.me/${rawNumber}?text=${text}`, '_blank');
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(
      `Consulta Legal: ${selectedService} - ${fullName} (${clientType === 'empresa' ? 'Corporativo' : 'Persona Natural'})`
    );
    const body = encodeURIComponent(
      `Nombre: ${fullName}\nCorreo: ${email}\nTeléfono: ${phone}\nTipo de Cliente: ${clientType}\nServicio de Interés: ${selectedService}\n\nDescripción del caso:\n${message}`
    );
    window.open(`mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section
      id="contacto"
      className="relative z-10 w-full bg-[#081225] text-primary-light py-28 px-6 md:px-12 border-b border-accent-ice/10 clear-both"
      aria-label="Contacto y Solicitud de Consulta Jurídica"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent-gold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
              <span>04 / Contacto Estratégico</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-primary-light tracking-tight">
              Inicie su <span className="italic text-accent-gold">Consulta Confidencial</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-accent-ice/70 max-w-xl mt-3">
              Evaluamos la viabilidad y contingencias de su caso con el más estricto secreto profesional y rapidez ejecutiva.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-accent-gold">
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
            <span>Protocolo de Secreto Profesional Garantizado</span>
          </div>
        </div>

        {/* Grid: Coordinates & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coordinates & Office Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-secondary-dark/70 border border-accent-ice/10 space-y-6">
              <h3 className="font-display text-2xl text-primary-light font-light border-b border-accent-ice/10 pb-4">
                Sede Principal &amp; Despachos
              </h3>

              <div className="space-y-5 text-xs sm:text-sm font-sans text-accent-ice/80">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary-light font-medium">Dirección Corporativa:</strong>
                    <span>{CONTACT_INFO.address}</span>
                    <span className="block text-accent-ice/50 font-mono text-xs">{CONTACT_INFO.city} — CP {CONTACT_INFO.postalCode}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary-light font-medium">Línea Telefónica Fija:</strong>
                    <span>{CONTACT_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MessageCircle className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary-light font-medium">Celular &amp; WhatsApp Oficial:</strong>
                    <a href="https://wa.me/573222915599" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
                      {CONTACT_INFO.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary-light font-medium">Correo Electrónico Oficial:</strong>
                    <span>{CONTACT_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary-light font-medium">Horario de Atención:</strong>
                    <span>{CONTACT_INFO.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-4 border-t border-accent-ice/10">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                  <span>Atención Inmediata por WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Reassurance note */}
            <div className="p-6 rounded-2xl bg-secondary-dark/30 border border-accent-ice/5 text-xs text-accent-ice/60 leading-relaxed font-sans">
              <strong className="text-accent-ice block font-medium mb-1">Compromiso de Respuesta Rápida:</strong>
              Nos comunicaremos en menos de 4 horas hábiles tras la recepción de su requerimiento para programar una reunión presencial o virtual.
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 rounded-3xl bg-secondary-dark/80 border border-accent-ice/15 p-8 md:p-12 shadow-2xl relative">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center mx-auto text-accent-gold shadow-glow-gold">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-primary-light">
                  Requerimiento Transmitido con Éxito
                </h3>
                <p className="text-sm text-accent-ice/85 max-w-md mx-auto leading-relaxed">
                  Hemos recibido su solicitud de manera formal y confidencial. Un socio sénior de <strong className="text-accent-gold">TORRES &amp; TORRES</strong> evaluará la información y se pondrá en contacto a la brevedad.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-accent-ice/30 text-xs font-sans uppercase tracking-widest text-accent-ice hover:text-accent-gold hover:border-accent-gold transition-colors"
                  >
                    Formular otra consulta
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-accent-gold text-primary-dark font-sans text-xs uppercase tracking-widest font-semibold hover:bg-accent-ice transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmar por WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot anti-spam field (hidden) */}
                <input
                  type="text"
                  name="_gotcha"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error Banner with Contingency Options */}
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 space-y-3 animate-in fade-in">
                    <div className="flex items-start space-x-2.5">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-red-100 font-medium">No se pudo entregar el correo en este momento</strong>
                        <span className="text-red-300/80">{errorMessage || 'Ocurrió un problema de conectividad temporal.'}</span>
                      </div>
                    </div>
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-100 text-[11px] font-sans transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reintentar</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-[11px] font-sans transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enviar por WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleMailtoFallback}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary-dark border border-accent-ice/20 text-accent-ice text-[11px] font-sans hover:text-accent-gold transition-colors cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Abrir Correo Tradicional</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Client Type Toggle */}
                <div>
                  <label className="block text-xs font-mono text-accent-ice/70 uppercase tracking-widest mb-2">
                    Tipo de Solicitante:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setClientType('empresa')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-sans tracking-wide transition-all ${
                        clientType === 'empresa'
                          ? 'bg-accent-ice text-primary-dark font-medium shadow-glow-ice'
                          : 'bg-primary-dark/80 text-accent-ice/60 border border-accent-ice/10 hover:border-accent-ice/30'
                      }`}
                    >
                      Persona Jurídica / Empresa
                    </button>
                    <button
                      type="button"
                      onClick={() => setClientType('persona')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-sans tracking-wide transition-all ${
                        clientType === 'persona'
                          ? 'bg-accent-ice text-primary-dark font-medium shadow-glow-ice'
                          : 'bg-primary-dark/80 text-accent-ice/60 border border-accent-ice/10 hover:border-accent-ice/30'
                      }`}
                    >
                      Persona Natural / Familia
                    </button>
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono text-accent-ice/70 uppercase tracking-widest mb-2"
                    >
                      Nombre y Apellidos *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Dr. Mauricio Gómez"
                      className="w-full px-4 py-3 rounded-xl bg-primary-dark/90 border border-accent-ice/15 text-primary-light placeholder-accent-ice/30 text-xs sm:text-sm focus:outline-none focus:border-accent-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-accent-ice/70 uppercase tracking-widest mb-2"
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contacto@suempresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-primary-dark/90 border border-accent-ice/15 text-primary-light placeholder-accent-ice/30 text-xs sm:text-sm focus:outline-none focus:border-accent-gold transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Service Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-mono text-accent-ice/70 uppercase tracking-widest mb-2"
                    >
                      Teléfono de Contacto *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+57 300 000 0000"
                      className="w-full px-4 py-3 rounded-xl bg-primary-dark/90 border border-accent-ice/15 text-primary-light placeholder-accent-ice/30 text-xs sm:text-sm focus:outline-none focus:border-accent-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="serviceSelect"
                      className="block text-xs font-mono text-accent-ice/70 uppercase tracking-widest mb-2"
                    >
                      Servicio Requerido *
                    </label>
                    <select
                      id="serviceSelect"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-primary-dark/90 border border-accent-ice/15 text-primary-light text-xs sm:text-sm focus:outline-none focus:border-accent-gold transition-colors cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="bg-primary-dark text-primary-light">
                          {s.title} ({s.badge})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-accent-ice/70 uppercase tracking-widest mb-2"
                  >
                    Breve Síntesis de la Consulta o Contingencia *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describa brevemente la situación, partes involucradas, plazos críticos o requerimientos específicos..."
                    className="w-full px-4 py-3 rounded-xl bg-primary-dark/90 border border-accent-ice/15 text-primary-light placeholder-accent-ice/30 text-xs sm:text-sm focus:outline-none focus:border-accent-gold transition-colors resize-none"
                  />
                </div>

                {/* Submit button with loader */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-accent-gold text-primary-dark font-sans text-xs uppercase tracking-widest font-semibold hover:bg-accent-ice transition-all duration-300 flex items-center justify-center space-x-2 shadow-glow-gold disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-primary-dark" />
                      <span>Transmitiendo Requerimiento Cifrado...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Requerimiento Confidencial</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
