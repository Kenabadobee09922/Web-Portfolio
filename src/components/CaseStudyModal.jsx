import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Lightbulb, Monitor, Smartphone, Workflow } from 'lucide-react';
import { ACCENTS, MOBILE_SHOWCASE_SCREENS, DESKTOP_SHOWCASE_SCREENS } from '../data/portfolio';
import { MobileScreenVisual, DesktopScreenVisual } from './ScreenVisuals';
import { Modal, TechChip } from './ui';

const ALL_SCREENS = [...MOBILE_SHOWCASE_SCREENS, ...DESKTOP_SHOWCASE_SCREENS];
const isMobile = (s) => MOBILE_SHOWCASE_SCREENS.includes(s);

/**
 * Architecture & Case Study modal.
 * Opened from hub project cards (project only) or showcase screens (project + screen).
 */
export default function CaseStudyModal({ project, screen, onClose, onSelectScreen }) {
  if (!project) return null;
  const a = ACCENTS[(screen && screen.accent) || project.accent] || ACCENTS.cyan;
  const related = ALL_SCREENS.filter((s) => s.projectId === project.id);

  return (
    <Modal open={!!project} onClose={onClose} labelledBy="case-study-title" maxWidth="max-w-4xl">
      {/* Header */}
      <div className={`border-b border-white/10 bg-gradient-to-br ${a.gradient} px-6 pb-6 pt-7 sm:px-8`}>
        <div className="flex flex-wrap items-center gap-2 pr-10">
          <span className={`rounded-full border ${a.border} ${a.bg} px-2.5 py-0.5 font-mono text-[10px] uppercase ${a.textSoft}`}>
            {project.hubTitle}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
            {project.status}
          </span>
        </div>
        {screen && (
          <p className={`mt-4 flex items-center gap-1.5 font-mono text-xs ${a.text}`}>
            {isMobile(screen) ? <Smartphone className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}
            Screen: {screen.screenTitle}
          </p>
        )}
        <h3 id="case-study-title" className="mt-2 pr-8 font-display text-2xl font-bold text-white sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          {project.role} • {project.period}
        </p>
      </div>

      <div className="space-y-7 px-6 py-7 sm:px-8">
        {/* Screen preview */}
        {screen && (
          <div
            key={screen.id}
            className={`grid animate-fade-up items-center gap-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5 ${
              isMobile(screen) ? 'md:grid-cols-[240px_1fr]' : ''
            }`}
          >
            {isMobile(screen) ? (
              <MobileScreenVisual uiType={screen.uiType} accentRing={a.ring} />
            ) : (
              <DesktopScreenVisual uiType={screen.uiType} accentBorder={a.border} />
            )}
            <div>
              <p className={`font-mono text-[11px] ${a.text}`}>{screen.tag}</p>
              <p className="mt-1 font-display text-lg font-bold text-white">{screen.screenTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{screen.description}</p>
              <p className="mt-3 inline-flex rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-mono text-[11px] text-emerald-300">
                {screen.metrics}
              </p>
            </div>
          </div>
        )}

        {/* Challenge / Solution */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-rose-500/20 bg-slate-950/70 p-5">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase text-rose-400">
              <AlertTriangle className="h-3.5 w-3.5" /> The Challenge
            </p>
            <p className="text-sm leading-relaxed text-slate-300">{project.problem}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/70 p-5">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase text-emerald-400">
              <Lightbulb className="h-3.5 w-3.5" /> Engineered Solution
            </p>
            <p className="text-sm leading-relaxed text-slate-300">{project.solution}</p>
          </div>
        </div>

        {/* Architecture flow */}
        <div>
          <h4 className={`mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider ${a.text}`}>
            <Workflow className="h-4 w-4" /> System Architecture Flow
          </h4>
          <ol className="relative space-y-3">
            <span className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" aria-hidden="true" />
            {project.architectureFlow.map((node, i) => (
              <li
                key={node.step}
                style={{ animationDelay: `${i * 80}ms` }}
                className="relative flex animate-fade-up items-start gap-4"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${a.border} bg-slate-900 font-mono text-xs font-bold ${a.textSoft}`}
                >
                  {node.step}
                </span>
                <div className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 p-3.5">
                  <p className="text-sm font-bold text-white">{node.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{node.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Outcomes + stack */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">Key Outcomes</h4>
            <ul className="space-y-2">
              {project.metrics.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <TechChip key={t}>{t}</TechChip>
              ))}
            </div>
          </div>
        </div>

        {/* Related screens */}
        {related.length > 0 && (
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">Screens from this project</h4>
            <div className="flex flex-wrap gap-2">
              {related.map((s) => (
                <button
                  key={s.id}
                  id={`case-study-screen-${s.id}`}
                  type="button"
                  onClick={() => onSelectScreen(s)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition ${
                    screen && screen.id === s.id
                      ? `${a.border} ${a.bg} text-white`
                      : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {isMobile(s) ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
                  {s.screenTitle}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">Need a system like this for your team, LGU, or capstone?</p>
          <a
            id="case-study-inquire"
            href="#inquire"
            onClick={onClose}
            className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25"
          >
            Discuss a similar build <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </Modal>
  );
}
