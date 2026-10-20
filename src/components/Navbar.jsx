import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? 'border-white/10 bg-slate-950/75' : 'border-transparent bg-slate-950/30'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" id="nav-brand" className="group flex items-center gap-3" aria-label="John Kenneth Buhay — home">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-600 font-display text-sm font-black text-white shadow-lg shadow-cyan-500/25 transition group-hover:rotate-6">
            {PROFILE.initials}
          </div>
          <div className="hidden sm:block">
            <span className="block font-display font-bold leading-none tracking-tight text-white">{PROFILE.name}</span>
            <span className="font-mono text-[11px] text-cyan-400">Full-Stack &amp; Mobile Dev</span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              id={`nav-link-${l.id}`}
              href={`#${l.id}`}
              className={`relative rounded-lg px-3 py-2 text-[13px] transition ${
                active === l.id ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#inquire"
            id="nav-cta-start-project"
            className="group hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40 sm:flex"
          >
            Start a Project <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </a>
          <button
            id="nav-mobile-toggle"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-up border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
          <div className="grid gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                id={`nav-mobile-link-${l.id}`}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  active === l.id ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#inquire"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Start a Project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
