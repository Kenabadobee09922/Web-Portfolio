import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Smartphone,
  Server,
  Cloud,
  Sparkles,
  Flame,
  Building2,
  GraduationCap,
  PenTool,
  Award,
  Trophy,
  Briefcase,
  Code,
  Users
} from 'lucide-react';

// Icon registry so data files can reference icons by name.
export const ICONS = {
  Smartphone,
  Server,
  Cloud,
  Sparkles,
  Flame,
  Building2,
  GraduationCap,
  PenTool,
  Award,
  Trophy,
  Briefcase,
  Code,
  Users
};

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Award;
  return <Cmp {...props} />;
}

/** Fades children up once they scroll into view. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${visible ? 'animate-fade-up' : 'opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({ eyebrow, title, children, align = 'left', action }) {
  const centered = align === 'center';
  return (
    <Reveal
      className={`mb-10 flex flex-col gap-4 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
          <span className="h-px w-6 bg-gradient-to-r from-cyan-400 to-transparent" />
          {eyebrow}
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        {children && <p className="mt-3 text-sm leading-relaxed text-slate-400">{children}</p>}
      </div>
      {action}
    </Reveal>
  );
}

/** Accessible modal: ESC to close, backdrop click, body scroll lock. */
export function Modal({ open, onClose, children, labelledBy, maxWidth = 'max-w-3xl' }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative max-h-[90vh] w-full ${maxWidth} animate-modal-in overflow-y-auto rounded-2xl border border-white/15 bg-slate-900/95 shadow-2xl shadow-black/60 scrollbar-thin`}
      >
        <button
          id="modal-close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-10 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function TechChip({ children }) {
  return (
    <span className="rounded-md border border-white/10 bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] text-slate-300">
      {children}
    </span>
  );
}
