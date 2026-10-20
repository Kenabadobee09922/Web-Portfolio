import React from 'react';
import { ArrowUp, GitBranch, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-600 font-display text-sm font-black text-white">
              {PROFILE.initials}
            </div>
            <div>
              <p className="font-display font-bold text-white">{PROFILE.name}</p>
              <p className="font-mono text-[11px] text-cyan-400">{PROFILE.title}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-400">
            {PROFILE.degree} • {PROFILE.school}. Building mobile, municipal, and cloud systems that hold up in the real world.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">Navigate</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-slate-400 transition hover:text-cyan-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">Connect</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a id="footer-email" href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 text-slate-400 transition hover:text-cyan-300">
                <Mail className="h-4 w-4" /> {PROFILE.email}
              </a>
            </li>
            <li>
              <a
                id="footer-github"
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-400 transition hover:text-cyan-300"
              >
                <GitBranch className="h-4 w-4" /> github.com/Kenabadobee09922
              </a>
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <MapPin className="h-4 w-4" /> {PROFILE.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind CSS &amp; Lucide.</p>
          <a id="footer-back-to-top" href="#home" className="flex items-center gap-1 transition hover:text-white">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
