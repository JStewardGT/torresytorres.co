'use client';

import React from 'react';

export default function CanvasFallback() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Subtle radial ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-b from-[#162C5B]/30 via-[#0D1C39]/15 to-transparent blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 w-[500px] h-[400px] rounded-full bg-gradient-to-t from-[#C5A880]/10 via-[#0D1C39]/10 to-transparent blur-3xl" />

      {/* Architectural subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #D1E3FF 1px, transparent 1px), linear-gradient(to bottom, #D1E3FF 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Architectural diagonal ray */}
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D1E3FF]/20 to-transparent" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D1E3FF]/15 to-transparent" />
    </div>
  );
}
