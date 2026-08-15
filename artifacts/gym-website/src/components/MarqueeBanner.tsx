import React from 'react';
import { assetUrl } from '@/lib/asset-url';

const ITEMS = Array(8).fill(null);

export default function MarqueeBanner() {
  return (
    <div className="top-marquee-banner fixed top-0 left-0 right-0 z-[60] h-8 bg-black/85 backdrop-blur-md border-b border-primary/70 overflow-hidden flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {ITEMS.map((_, i) => (
          <span key={i} className="flex items-center gap-3 px-8">
            <img src={assetUrl('/logo-bf-small.webp')} alt="Bolivia Fitness" width={20} height={20} decoding="async" className="top-marquee-logo h-5 w-5 opacity-95 object-contain" />
            <span className="text-white font-heading font-black text-[11px] tracking-[0.25em] uppercase [text-shadow:0_0_8px_rgba(255,255,255,0.6)]">
              Bolivia Fitness
            </span>
            <span className="relative font-heading font-black text-[11px] tracking-[0.22em] uppercase text-white top-marquee-online">
              ONLINE
            </span>
            <span className="text-primary text-[10px] tracking-[0.2em] font-medium [text-shadow:0_0_7px_rgba(255,40,40,0.95)]">
              · Suplementos Americanos ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
