import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/portfolio';
import { Reveal, SectionHeader } from './ui';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-4xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="FAQ" title="Got Questions? Everything You Need to Know." align="center" />

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <Reveal key={item.q} delay={idx * 50}>
              <div
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen ? 'border-cyan-500/30 bg-slate-900/80' : 'border-white/10 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <button
                  id={`faq-toggle-${idx}`}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${isOpen ? 'text-cyan-400' : 'text-slate-600'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-white sm:text-base">{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'
                    }`}
                  />
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-toggle-${idx}`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-white/5 px-6 pb-5 pl-[3.25rem] pt-3 text-sm leading-relaxed text-slate-300">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
