import React, { useState } from 'react';
import { CheckCircle2, Eye, Layers, Star } from 'lucide-react';
import { HUBS_DATA, ACCENTS } from '../data/portfolio';
import { Reveal, SectionHeader, TechChip } from './ui';

export default function HubExplorer({ onOpenProject }) {
  const [activeHub, setActiveHub] = useState('smartservices');
  const hub = HUBS_DATA[activeHub];
  const a = ACCENTS[hub.accent];

  return (
    <section id="hubs" className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="3-Hub Portfolio Ecosystem" title="Explore the 3 Project Hubs">
        Instead of a flat list of links, my engineering work is organized into three specialized ecosystems. Select a hub to
        inspect its projects, then open any card for the full architecture case study.
      </SectionHeader>

      {/* Hub tabs */}
      <div className="mb-8 grid gap-4 md:grid-cols-3" role="tablist" aria-label="Project hubs">
        {Object.values(HUBS_DATA).map((h, i) => {
          const ha = ACCENTS[h.accent];
          const selected = h.id === activeHub;
          return (
            <Reveal key={h.id} delay={i * 80}>
              <button
                id={`hub-tab-${h.id}`}
                role="tab"
                aria-selected={selected}
                type="button"
                onClick={() => setActiveHub(h.id)}
                className={`group relative h-full w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                  selected
                    ? `bg-gradient-to-br ${ha.gradient} ${ha.border} shadow-xl ${ha.glow}`
                    : 'border-white/10 bg-slate-900/60 hover:-translate-y-0.5 hover:border-white/25'
                }`}
              >
                <span
                  className={`pointer-events-none absolute -right-2 -top-6 font-display text-8xl font-bold transition ${
                    selected ? 'text-white/10' : 'text-white/[0.04] group-hover:text-white/[0.07]'
                  }`}
                >
                  {h.number}
                </span>
                <div className="relative flex items-center justify-between">
                  <span className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${ha.text}`}>{h.badge}</span>
                </div>
                <h3 className="relative mt-3 font-display text-xl font-bold text-white">{h.title}</h3>
                <p className="relative mt-1 text-xs text-slate-400">{h.subtitle}</p>
                <div className="relative mt-4 flex items-center gap-2 text-[11px] text-slate-400">
                  <Layers className={`h-3.5 w-3.5 ${ha.text}`} /> {h.projects.length} projects
                  {selected && (
                    <span className={`ml-auto flex items-center gap-1.5 font-mono text-[10px] ${ha.textSoft}`}>
                      <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${ha.dot}`} /> ACTIVE
                    </span>
                  )}
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Active hub panel */}
      <div
        key={hub.id}
        role="tabpanel"
        aria-labelledby={`hub-tab-${hub.id}`}
        className={`animate-fade-up rounded-3xl border ${a.border} bg-gradient-to-b ${a.gradient} p-[1px]`}
      >
        <div className="rounded-3xl bg-slate-950/90 p-6 sm:p-8">
          <div className="mb-8 max-w-3xl">
            <span className={`font-mono text-xs uppercase tracking-wider ${a.text}`}>{hub.badge}</span>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">{hub.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{hub.description}</p>
          </div>

          <div className={`grid gap-6 ${hub.projects.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
            {hub.projects.map((proj, i) => (
              <article
                key={proj.id}
                style={{ animationDelay: `${i * 90}ms` }}
                className={`group flex animate-fade-up flex-col justify-between rounded-2xl border bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  proj.featured ? `${a.border} ring-1 ${a.ring}` : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-slate-300">
                      {proj.status}
                    </span>
                    {proj.featured && (
                      <span className={`flex items-center gap-1 font-mono text-[10px] ${a.textSoft}`}>
                        <Star className="h-3 w-3 fill-current" /> Featured
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold leading-snug text-white">{proj.title}</h4>
                  <p className={`mt-1 text-xs font-medium ${a.text}`}>
                    {proj.role} <span className="text-slate-500">• {proj.period}</span>
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">{proj.summary}</p>
                  <ul className="mt-4 space-y-1.5">
                    {proj.metrics.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {proj.techStack.map((t) => (
                      <TechChip key={t}>{t}</TechChip>
                    ))}
                  </div>
                  <button
                    id={`hub-project-open-${proj.id}`}
                    type="button"
                    onClick={() => onOpenProject(proj.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition ${a.hoverBorder} hover:bg-white/10`}
                  >
                    <Eye className={`h-3.5 w-3.5 ${a.text}`} /> Inspect Architecture &amp; Case Study
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
