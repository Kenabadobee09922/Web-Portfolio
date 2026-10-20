import React from 'react';
import { PILLARS, ACCENTS } from '../data/portfolio';
import { Icon, Reveal, SectionHeader, TechChip } from './ui';

export default function Expertise() {
  return (
    <section id="expertise" className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Expertise • 4 Core Engineering Pillars" title="Engineered for Speed, Reliability & Scale.">
        Four pillars that cover the full lifecycle, from the mobile device in a citizen&apos;s hand to the database policy
        guarding the record.
      </SectionHeader>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => {
          const a = ACCENTS[p.accent];
          return (
            <Reveal key={p.id} delay={i * 80}>
              <article
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 ${a.hoverBorder} hover:shadow-2xl ${a.glow}`}
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${a.gradient} opacity-0 blur-2xl transition duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${a.border} ${a.bg}`}>
                      <Icon name={p.icon} className={`h-5 w-5 ${a.text}`} />
                    </div>
                    <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                  </div>
                  <p className={`font-mono text-[10px] uppercase tracking-wider ${a.text}`}>{p.title}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{p.headline}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{p.desc}</p>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                  {p.tags.map((t) => (
                    <TechChip key={t}>{t}</TechChip>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
