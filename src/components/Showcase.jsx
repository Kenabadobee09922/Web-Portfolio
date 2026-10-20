import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Smartphone, ArrowUpRight } from 'lucide-react';
import { MOBILE_SHOWCASE_SCREENS, DESKTOP_SHOWCASE_SCREENS, SHOWCASE_FILTERS, ACCENTS } from '../data/portfolio';
import { MobileScreenVisual, DesktopScreenVisual } from './ScreenVisuals';
import { Reveal, SectionHeader } from './ui';

function EmptyTrack({ label }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-8 text-center text-xs text-slate-500">
      No {label} screens in this hub yet.
    </div>
  );
}

export default function Showcase({ onOpenScreen }) {
  const [filter, setFilter] = useState('all');
  const trackRef = useRef(null);

  const mobile = filter === 'all' ? MOBILE_SHOWCASE_SCREENS : MOBILE_SHOWCASE_SCREENS.filter((s) => s.hub === filter);
  const desktop = filter === 'all' ? DESKTOP_SHOWCASE_SCREENS : DESKTOP_SHOWCASE_SCREENS.filter((s) => s.hub === filter);

  const scrollTrack = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  return (
    <section id="showcase" className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Dual-Track Multi-Screen Showcase"
        title="Crafting Digital Experiences That Run Seamlessly."
        action={
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter showcase by hub">
            {SHOWCASE_FILTERS.map((f) => (
              <button
                key={f.id}
                id={`showcase-filter-${f.id}`}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition ${
                  filter === f.id
                    ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                    : 'border-white/10 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        Mobile flows and desktop dashboards from across the ecosystem. Click any screen to open its architecture &amp; case
        study.
      </SectionHeader>

      {/* ---------- Mobile row ---------- */}
      <div className="mb-14">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-300 sm:text-sm">
            <Smartphone className="h-4 w-4 text-cyan-400" /> Mobile Row • Flutter • Dart • Material 3
          </h3>
          <div className="flex gap-2">
            <button
              id="showcase-mobile-prev"
              type="button"
              aria-label="Scroll mobile screens left"
              onClick={() => scrollTrack(-1)}
              className="rounded-lg border border-white/10 bg-slate-900 p-1.5 text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              id="showcase-mobile-next"
              type="button"
              aria-label="Scroll mobile screens right"
              onClick={() => scrollTrack(1)}
              className="rounded-lg border border-white/10 bg-slate-900 p-1.5 text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {mobile.length === 0 ? (
          <EmptyTrack label="mobile" />
        ) : (
          <div
            ref={trackRef}
            className="scrollbar-thin -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0"
          >
            {mobile.map((s, i) => {
              const a = ACCENTS[s.accent];
              return (
                <Reveal key={s.id} delay={i * 60} className="w-[250px] shrink-0 snap-start">
                  <button
                    id={`showcase-screen-${s.id}`}
                    type="button"
                    onClick={() => onOpenScreen(s)}
                    className={`group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition duration-300 hover:-translate-y-1 ${a.hoverBorder} hover:shadow-2xl ${a.glow}`}
                  >
                    <div className="transition duration-500 group-hover:scale-[1.02]">
                      <MobileScreenVisual uiType={s.uiType} accentRing={a.ring} />
                    </div>
                    <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span>{s.project}</span>
                      <span className={a.text}>{s.tag}</span>
                    </div>
                    <h4 className="mt-1 font-display text-sm font-bold text-white">{s.screenTitle}</h4>
                    <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">{s.description}</p>
                    <span className={`mt-auto flex items-center gap-1 pt-3 text-[11px] font-semibold ${a.textSoft}`}>
                      Open case study <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {/* ---------- Desktop row ---------- */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-300 sm:text-sm">
            <Monitor className="h-4 w-4 text-indigo-400" /> Desktop Row • Dashboards, Municipal Systems &amp; Cloud
          </h3>
        </div>
        {desktop.length === 0 ? (
          <EmptyTrack label="desktop" />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {desktop.map((s, i) => {
              const a = ACCENTS[s.accent];
              // 3 cards on the first row, 2 wider cards on the second (lg).
              const span = desktop.length === 5 ? (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3') : 'lg:col-span-2';
              return (
                <Reveal key={s.id} delay={i * 70} className={span}>
                  <button
                    id={`showcase-screen-${s.id}`}
                    type="button"
                    onClick={() => onOpenScreen(s)}
                    className={`group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition duration-300 hover:-translate-y-1 ${a.hoverBorder} hover:shadow-2xl ${a.glow}`}
                  >
                    <DesktopScreenVisual uiType={s.uiType} accentBorder={a.border} />
                    <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span>{s.project}</span>
                      <span className={a.text}>{s.tag}</span>
                    </div>
                    <h4 className="mt-1 font-display text-base font-bold text-white">{s.screenTitle}</h4>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-400">{s.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-3 text-[11px]">
                      <span className="font-mono text-emerald-400">{s.metrics}</span>
                      <span className={`flex items-center gap-1 font-semibold ${a.textSoft}`}>
                        Inspect <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
