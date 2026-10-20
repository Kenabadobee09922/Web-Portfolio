import React, { useEffect, useState } from 'react';
import { Plus, Trash2, RotateCcw, ExternalLink, Calendar, Building } from 'lucide-react';
import { INITIAL_MILESTONES, MILESTONE_CATEGORIES } from '../data/portfolio';
import { Icon, Modal, Reveal, SectionHeader } from './ui';

const STORAGE_KEY = 'jkb-portfolio-milestones-v1';

const CATEGORY_ICON = {
  'Leadership & Capstone': 'Flame',
  'Government IT Practicum (OJT)': 'Building2',
  Education: 'GraduationCap',
  'UI/UX & Digital Media': 'PenTool',
  'Certification & Award': 'Award',
  'Hackathon & Competition': 'Trophy',
  'Open Source & Community': 'Users'
};

const EMPTY_FORM = {
  category: 'Certification & Award',
  title: '',
  organization: '',
  period: '',
  badge: '',
  url: '',
  highlights: ''
};

function loadMilestones() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* ignore corrupted storage */
  }
  return INITIAL_MILESTONES;
}

const inputCls =
  'w-full rounded-xl border border-white/15 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 transition focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';

export default function Milestones() {
  const [milestones, setMilestones] = useState(loadMilestones);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
    } catch {
      /* storage unavailable */
    }
  }, [milestones]);

  const isCustomized = JSON.stringify(milestones) !== JSON.stringify(INITIAL_MILESTONES);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const closeModal = () => {
    setShowModal(false);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.organization.trim()) {
      setError('Title and organization / issuer are required.');
      return;
    }
    const highlights = form.highlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);
    const created = {
      id: `ms-${Date.now()}`,
      category: form.category,
      title: form.title.trim(),
      organization: form.organization.trim(),
      period: form.period.trim() || String(new Date().getFullYear()),
      badge: form.badge.trim() || 'New Milestone',
      url: form.url.trim(),
      icon: CATEGORY_ICON[form.category] || 'Award',
      highlights: highlights.length ? highlights : ['Newly added credential.']
    };
    setMilestones((list) => [created, ...list]);
    setForm(EMPTY_FORM);
    closeModal();
  };

  const handleDelete = (id) => setMilestones((list) => list.filter((m) => m.id !== id));

  const handleReset = () => {
    if (window.confirm('Reset milestones to the original four entries? Custom entries will be removed.')) {
      setMilestones(INITIAL_MILESTONES);
    }
  };

  return (
    <section id="milestones" className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Milestones & Achievements"
        title="Editable Milestones & Track Record"
        action={
          <div className="flex flex-wrap gap-2">
            {isCustomized && (
              <button
                id="milestone-reset-btn"
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-slate-400 transition hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
            <button
              id="milestone-add-btn"
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/25"
            >
              <Plus className="h-4 w-4" /> Add Milestone
            </button>
          </div>
        }
      >
        Leadership, government IT practicum, education, and design work. New certifications can be added live and are saved
        in this browser.
      </SectionHeader>

      {/* Timeline */}
      <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:via-indigo-500/30 before:to-transparent md:before:left-1/2">
        {milestones.map((m, i) => {
          const left = i % 2 === 0;
          return (
            <li key={m.id} className="relative md:grid md:grid-cols-2 md:gap-10">
              {/* node */}
              <span className="absolute left-0 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-slate-950 shadow-lg shadow-cyan-500/20 md:left-1/2 md:-translate-x-1/2">
                <Icon name={m.icon || CATEGORY_ICON[m.category]} className="h-4 w-4 text-cyan-300" />
              </span>
              <Reveal delay={Math.min(i, 4) * 70} className={`pl-14 md:pl-0 ${left ? 'md:col-start-1 md:pr-10' : 'md:col-start-2 md:pl-10'}`}>
                <article className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-cyan-500/30">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">{m.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                        {m.badge}
                      </span>
                      <button
                        id={`milestone-delete-${m.id}`}
                        type="button"
                        onClick={() => handleDelete(m.id)}
                        aria-label={`Remove milestone: ${m.title}`}
                        title="Remove milestone"
                        className="text-slate-600 opacity-0 transition hover:text-rose-400 focus:opacity-100 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-white">{m.title}</h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" /> {m.organization}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-slate-300">
                      <Calendar className="h-3 w-3" /> {m.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {m.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  {m.url && (
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                      View credential <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {milestones.length === 0 && (
        <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
          No milestones yet — click “Add Milestone” to add one.
        </p>
      )}

      {/* Add Milestone modal */}
      <Modal open={showModal} onClose={closeModal} labelledBy="add-milestone-title" maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8" noValidate>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-400">Milestones Manager</span>
            <h3 id="add-milestone-title" className="mt-1 font-display text-xl font-bold text-white">
              + Add Milestone
            </h3>
            <p className="mt-1 text-xs text-slate-400">Add a new certification, award, or engineering achievement.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs text-slate-400">Category</span>
              <select id="milestone-input-category" value={form.category} onChange={update('category')} className={inputCls}>
                {MILESTONE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs text-slate-400">Title *</span>
              <input
                id="milestone-input-title"
                type="text"
                value={form.title}
                onChange={update('title')}
                placeholder="e.g., Google Cloud Associate Cloud Engineer"
                className={inputCls}
                autoFocus
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-400">Organization / Issuer *</span>
              <input
                id="milestone-input-organization"
                type="text"
                value={form.organization}
                onChange={update('organization')}
                placeholder="e.g., Google Cloud"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-400">Period</span>
              <input
                id="milestone-input-period"
                type="text"
                value={form.period}
                onChange={update('period')}
                placeholder="e.g., Oct 2026"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-400">Badge</span>
              <input
                id="milestone-input-badge"
                type="text"
                value={form.badge}
                onChange={update('badge')}
                placeholder="e.g., Verified Credential"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-400">Credential URL</span>
              <input
                id="milestone-input-url"
                type="url"
                value={form.url}
                onChange={update('url')}
                placeholder="https://…"
                className={inputCls}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs text-slate-400">Highlights (one per line)</span>
              <textarea
                id="milestone-input-highlights"
                rows={3}
                value={form.highlights}
                onChange={update('highlights')}
                placeholder="Key impact, scope, or skills validated…"
                className={inputCls}
              />
            </label>
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-slate-300 transition hover:text-white"
            >
              Cancel
            </button>
            <button
              id="milestone-save-btn"
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25"
            >
              Save Milestone
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
