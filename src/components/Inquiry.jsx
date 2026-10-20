import React, { useMemo, useState } from 'react';
import { Check, Copy, Mail, FileText, Sparkles } from 'lucide-react';
import { INQUIRY_CATEGORIES, TIMELINE_OPTIONS, PROFILE, ACCENTS } from '../data/portfolio';
import { Icon, Reveal, SectionHeader } from './ui';

const inputCls =
  'w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 transition focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';

const initialExtras = () =>
  Object.fromEntries(
    INQUIRY_CATEGORIES.map((c) => [
      c.id,
      Object.fromEntries(c.fields.map((f) => [f.key, f.type === 'select' ? f.options[0] : '']))
    ])
  );

function buildBrief(category, base, extras) {
  const lines = [
    `Hi John Kenneth,`,
    ``,
    `I'm reaching out about: ${category.number}. ${category.title}`,
    ``,
    `— ${category.briefTitle.toUpperCase()} —`,
    `Name: ${base.name || '[your name]'}`,
    `Contact: ${base.email || '[email or handle]'}`
  ];
  category.fields.forEach((f) => {
    lines.push(`${f.label}: ${extras[f.key] || '—'}`);
  });
  lines.push(`Timeline: ${base.timeline}`);
  lines.push(``);
  lines.push(category.id === 'recruitment' ? 'Role details:' : 'Project details:');
  lines.push(base.details || "Let's schedule a quick call to discuss scope and next steps.");
  lines.push(``);
  lines.push(`Sent from your portfolio inquiry funnel.`);
  return lines.join('\n');
}

export default function Inquiry() {
  const [categoryId, setCategoryId] = useState('capstone');
  const [base, setBase] = useState({ name: '', email: '', timeline: TIMELINE_OPTIONS[2], details: '' });
  const [extras, setExtras] = useState(initialExtras);
  const [copied, setCopied] = useState(false);

  const category = INQUIRY_CATEGORIES.find((c) => c.id === categoryId);
  const a = ACCENTS[category.accent];
  const brief = useMemo(() => buildBrief(category, base, extras[categoryId]), [category, base, extras, categoryId]);

  const setBaseField = (key) => (e) => setBase((b) => ({ ...b, [key]: e.target.value }));
  const setExtraField = (key) => (e) =>
    setExtras((x) => ({ ...x, [categoryId]: { ...x[categoryId], [key]: e.target.value } }));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = brief;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${category.title}${base.name ? ` — ${base.name}` : ''}`
  )}&body=${encodeURIComponent(brief)}`;

  return (
    <section id="inquire" className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative">
          <SectionHeader eyebrow="Inquire & Collaborate" title="Ready to Bring Your Next System to Life?">
            Pick a category on the left. The brief on the right updates as you type, then copy it or send it straight to my
            inbox.
          </SectionHeader>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Category selector */}
            <div className="space-y-3 lg:col-span-4" role="radiogroup" aria-label="Inquiry category">
              {INQUIRY_CATEGORIES.map((c, i) => {
                const ca = ACCENTS[c.accent];
                const selected = c.id === categoryId;
                return (
                  <Reveal key={c.id} delay={i * 70}>
                    <button
                      id={`inquiry-category-${c.id}`}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setCategoryId(c.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition duration-300 ${
                        selected
                          ? `bg-gradient-to-br ${ca.gradient} ${ca.border} shadow-lg ${ca.glow}`
                          : 'border-white/10 bg-slate-950/70 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                            selected ? `${ca.border} ${ca.bg}` : 'border-white/10 bg-white/5'
                          }`}
                        >
                          <Icon name={c.icon} className={`h-4 w-4 ${selected ? ca.text : 'text-slate-400'}`} />
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-white">
                              {c.number}. {c.title}
                            </span>
                            <span
                              className={`h-4 w-4 shrink-0 rounded-full border-2 transition ${
                                selected ? `${ca.border} ${ca.dot}` : 'border-white/20'
                              }`}
                            />
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">{c.desc}</p>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* Dynamic form + brief */}
            <div key={categoryId} className="grid animate-fade-up gap-5 lg:col-span-8 xl:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/80 p-5">
                <p className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${a.text}`}>
                  <Sparkles className="h-3.5 w-3.5" /> {category.briefTitle}
                </p>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <label className="block">
                    <span className="mb-1 block text-xs text-slate-400">Your Name</span>
                    <input
                      id="inquiry-input-name"
                      type="text"
                      value={base.name}
                      onChange={setBaseField('name')}
                      placeholder="e.g., Maria Santos"
                      className={inputCls}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-slate-400">Email or Contact Handle</span>
                    <input
                      id="inquiry-input-email"
                      type="text"
                      value={base.email}
                      onChange={setBaseField('email')}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  {category.fields.map((f) => (
                    <label key={f.key} className="block">
                      <span className="mb-1 block text-xs text-slate-400">{f.label}</span>
                      {f.type === 'select' ? (
                        <select
                          id={`inquiry-input-${categoryId}-${f.key}`}
                          value={extras[categoryId][f.key]}
                          onChange={setExtraField(f.key)}
                          className={inputCls}
                        >
                          {f.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={`inquiry-input-${categoryId}-${f.key}`}
                          type="text"
                          value={extras[categoryId][f.key]}
                          onChange={setExtraField(f.key)}
                          placeholder={f.placeholder}
                          className={inputCls}
                        />
                      )}
                    </label>
                  ))}
                  <label className="block">
                    <span className="mb-1 block text-xs text-slate-400">Target Timeline</span>
                    <select id="inquiry-input-timeline" value={base.timeline} onChange={setBaseField('timeline')} className={inputCls}>
                      {TIMELINE_OPTIONS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1 block text-xs text-slate-400">
                    {categoryId === 'recruitment' ? 'Role Details' : 'System Requirements'}
                  </span>
                  <textarea
                    id="inquiry-input-details"
                    rows={4}
                    value={base.details}
                    onChange={setBaseField('details')}
                    placeholder={category.detailsPlaceholder}
                    className={inputCls}
                  />
                </label>
              </div>

              {/* Live brief preview */}
              <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-950/80">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                    <FileText className="h-3.5 w-3.5" /> generated-brief.txt
                  </span>
                  <span className={`flex items-center gap-1.5 font-mono text-[10px] ${a.textSoft}`}>
                    <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${a.dot}`} /> live
                  </span>
                </div>
                <pre
                  id="inquiry-brief-preview"
                  className="scrollbar-thin max-h-[420px] flex-1 overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[11.5px] leading-relaxed text-slate-300"
                >
                  {brief}
                </pre>
                <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2">
                  <button
                    id="inquiry-copy-btn"
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy Brief
                      </>
                    )}
                  </button>
                  <a
                    id="inquiry-email-btn"
                    href={mailto}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
                  >
                    <Mail className="h-4 w-4" /> Send via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
