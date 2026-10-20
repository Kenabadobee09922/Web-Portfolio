import React from 'react';
import { ArrowRight, Flame, MapPin } from 'lucide-react';
import { HERO_STATS, PILLARS, PROFILE, ACCENTS } from '../data/portfolio';
import { Icon, Reveal } from './ui';

export default function Hero({ onOpenFlareAlert }) {
  return (
    <section id="home" className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        {/* Left — conversion copy */}
        <div className="space-y-7 lg:col-span-7">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for Full-Stack Roles &amp; Custom Systems • Caloocan, Metro Manila
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Turning Complex Ideas into{' '}
              <span className="animate-gradient-x bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent">
                Scalable Mobile &amp; Web Systems.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Hi, I&apos;m <strong className="text-white">{PROFILE.name}</strong> — a {PROFILE.degree} graduate of{' '}
              {PROFILE.school} and a Full-Stack &amp; Mobile Developer. From real-time emergency dispatch with{' '}
              <strong className="text-cyan-300">Flare Alert</strong> in Flutter &amp; Firebase to municipal and cloud web
              platforms, I build software that performs under real-world pressure.
            </p>
          </Reveal>

          <Reveal delay={240} className="flex flex-wrap items-center gap-3.5">
            <a
              id="hero-cta-hubs"
              href="#hubs"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:shadow-cyan-500/40"
            >
              Explore the 3 Project Hubs <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <button
              id="hero-cta-flare-alert"
              type="button"
              onClick={onOpenFlareAlert}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-rose-400/50 hover:text-white"
            >
              <Flame className="h-4 w-4 text-rose-400" /> View Flare Alert Case Study
            </button>
          </Reveal>

          {/* 4-Stat Trust Bar */}
          <Reveal delay={320}>
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur sm:grid-cols-4">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`group p-4 transition hover:bg-white/[0.03] ${i > 0 ? 'sm:border-l' : ''} ${
                    i % 2 === 1 ? 'border-l' : ''
                  } ${i > 1 ? 'border-t sm:border-t-0' : ''} border-white/10`}
                >
                  <p className="bg-gradient-to-br from-white to-slate-400 bg-clip-text font-display text-2xl font-bold text-transparent">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-200">{s.label}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — 4 pillars architecture card */}
        <Reveal delay={200} className="lg:col-span-5">
          <div className="relative animate-float">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/40 via-indigo-500/20 to-emerald-500/30 blur-sm" />
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-xs text-slate-400">jkb-ecosystem.jsx</span>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
                  ● synced
                </span>
              </div>

              <button
                id="hero-card-flare-alert"
                type="button"
                onClick={onOpenFlareAlert}
                className="group w-full rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/15 via-slate-900 to-slate-900 p-4 text-left transition hover:border-rose-400/60"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-rose-300">Flagship Capstone</span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-rose-300">
                    <Flame className="h-3.5 w-3.5" /> Live GPS + FCM
                  </span>
                </div>
                <p className="mt-1.5 font-display font-bold text-white">Flare Alert Emergency System</p>
                <p className="mt-1 text-xs text-slate-400">
                  Flutter citizen app + Node.js Cloud Functions dispatch + Google Maps responder routing.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-300">
                  Open case study <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                </span>
              </button>

              <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-500">4 Core Engineering Pillars</p>
              <div className="grid grid-cols-2 gap-2.5">
                {PILLARS.map((p) => {
                  const a = ACCENTS[p.accent];
                  return (
                    <a
                      key={p.id}
                      href="#expertise"
                      className={`group rounded-xl border border-white/10 bg-slate-950/70 p-3 transition ${a.hoverBorder}`}
                    >
                      <Icon name={p.icon} className={`mb-1.5 h-4 w-4 ${a.text}`} />
                      <p className="text-xs font-bold text-white">{p.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500">{p.tags.slice(0, 3).join(' • ')}</p>
                    </a>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" /> {PROFILE.location}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
