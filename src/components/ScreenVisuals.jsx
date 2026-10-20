import React from 'react';
import {
  Flame,
  ShieldAlert,
  CheckCircle2,
  Navigation,
  Lock,
  Fingerprint,
  Building2,
  Database,
  GitBranch,
  Cloud,
  Terminal,
  Globe,
  Wifi,
  BatteryFull,
  Signal,
  QrCode,
  Camera,
  Phone,
  Bell,
  CalendarDays,
  MapPin,
  Radio,
  Activity
} from 'lucide-react';

// ==========================================================================
// DEVICE FRAMES
// ==========================================================================

export function PhoneFrame({ children, accentRing = 'ring-white/10', className = '' }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[230px] rounded-[2.2rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[6px] shadow-2xl shadow-black/60 ring-1 ${accentRing} ${className}`}
    >
      <div className="relative h-[400px] overflow-hidden rounded-[1.9rem] bg-slate-950">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2 z-20 h-[18px] w-20 -translate-x-1/2 rounded-full bg-black" />
        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-2.5 text-[9px] font-semibold text-slate-300">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal className="h-2.5 w-2.5" />
            <Wifi className="h-2.5 w-2.5" />
            <BatteryFull className="h-3 w-3" />
          </span>
        </div>
        <div className="relative h-[calc(100%-26px)]">{children}</div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 z-20 h-1 w-20 -translate-x-1/2 rounded-full bg-white/40" />
      </div>
    </div>
  );
}

export function BrowserFrame({ children, url = 'localhost:5173', accentBorder = 'border-white/10' }) {
  return (
    <div className={`w-full overflow-hidden rounded-xl border ${accentBorder} bg-slate-950 shadow-2xl shadow-black/50`}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/90 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
        <div className="ml-2 flex-1 truncate rounded-md bg-slate-950/80 px-2.5 py-0.5 font-mono text-[9px] text-slate-400">
          https://{url}
        </div>
      </div>
      <div className="h-[220px] p-3">{children}</div>
    </div>
  );
}

// ==========================================================================
// MOBILE SCREENS
// ==========================================================================

function SosScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-rose-950/90 via-slate-950 to-slate-950 px-4 pb-6 pt-4">
      <div className="flex items-center justify-between font-mono text-[9px] text-rose-300">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-rose-500" /> GPS LOCKED
        </span>
        <span>14.6507°N 120.9664°E</span>
      </div>
      <p className="mt-3 font-display text-sm font-bold text-white">Need help now?</p>
      <p className="text-[10px] text-slate-400">Press and hold for 1 second</p>
      <div className="my-auto flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-36 w-36 animate-ping rounded-full bg-rose-500/10" />
          <span className="absolute h-28 w-28 rounded-full bg-rose-500/20" />
          <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-rose-300/60 bg-gradient-to-br from-rose-500 to-red-700 shadow-xl shadow-rose-600/50">
            <Flame className="h-8 w-8 text-white" />
            <span className="text-[10px] font-black tracking-widest text-white">SOS</span>
          </div>
        </div>
        <span className="mt-6 text-[10px] font-medium text-slate-300">Caloocan Emergency Dispatch</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-center text-[9px]">
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/20 py-1.5 text-rose-200">Fire</div>
        <div className="rounded-lg bg-slate-800/80 py-1.5 text-slate-300">Medical</div>
        <div className="rounded-lg bg-slate-800/80 py-1.5 text-slate-300">Rescue</div>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="relative flex h-full flex-col bg-slate-950 px-3 pb-6 pt-3">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34,211,238,0.45) 1px, transparent 0)',
          backgroundSize: '14px 14px'
        }}
      />
      <div className="relative z-10 flex items-center justify-between text-[9px]">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-2 py-0.5 font-mono text-cyan-300">
          LIVE RADAR • 1.2KM
        </span>
        <span className="font-mono text-slate-400">3 units</span>
      </div>
      <div className="relative z-10 my-auto">
        <svg className="h-56 w-full" viewBox="0 0 200 220" aria-hidden="true">
          {/* streets */}
          <path d="M0 60 H200 M0 150 H200 M60 0 V220 M140 0 V220" stroke="rgba(148,163,184,0.15)" strokeWidth="6" />
          {/* radar */}
          <circle cx="100" cy="110" r="70" fill="none" stroke="rgba(34,211,238,0.15)" />
          <circle cx="100" cy="110" r="40" fill="none" stroke="rgba(34,211,238,0.25)" />
          <circle cx="100" cy="110" r="70" fill="rgba(34,211,238,0.05)" />
          {/* route */}
          <path
            d="M 30 190 Q 60 120, 100 110 T 170 40"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-dash-flow"
          />
          <circle cx="30" cy="190" r="6" fill="#38bdf8" />
          <circle cx="100" cy="110" r="5" fill="#fbbf24" />
          <circle cx="170" cy="40" r="12" fill="rgba(244,63,94,0.25)" />
          <circle cx="170" cy="40" r="6" fill="#f43f5e" />
          <circle cx="50" cy="60" r="4" fill="#34d399" />
        </svg>
      </div>
      <div className="relative z-10 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/90 p-2 text-[10px] backdrop-blur">
        <div>
          <p className="font-semibold text-slate-100">Grace Park Fire Alert</p>
          <p className="text-[9px] text-slate-400">Responder BFP-04 approaching</p>
        </div>
        <span className="font-mono text-cyan-400">3m 40s</span>
      </div>
    </div>
  );
}

function RoutingScreen() {
  return (
    <div className="flex h-full flex-col bg-slate-950 px-3 pb-6 pt-3">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/15 p-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-300">
            <Navigation className="h-3 w-3" /> Turn right
          </span>
          <span className="font-mono text-[10px] text-amber-200">450 m</span>
        </div>
        <p className="mt-0.5 text-[11px] font-bold text-white">Rizal Ave Extension</p>
      </div>
      <div className="relative my-3 flex-1 overflow-hidden rounded-xl border border-white/5 bg-slate-900/70">
        <svg className="h-full w-full" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 150 L20 90 L110 90 L110 30 L180 30" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="12" strokeLinejoin="round" />
          <path d="M20 150 L20 90 L110 90 L110 30 L180 30" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinejoin="round" strokeDasharray="6 6" className="animate-dash-flow" />
          <circle cx="20" cy="150" r="6" fill="#38bdf8" />
          <circle cx="180" cy="30" r="7" fill="#f43f5e" />
        </svg>
        <span className="absolute right-2 top-2 rounded bg-slate-950/90 px-1.5 py-0.5 font-mono text-[9px] text-amber-300">ETA 2m 10s</span>
      </div>
      <div className="space-y-1.5 text-[10px]">
        <div className="flex justify-between rounded-lg border border-white/5 bg-slate-900/90 p-1.5">
          <span className="text-slate-400">Caller</span>
          <span className="font-medium text-emerald-400">Verified • Photo</span>
        </div>
        <div className="flex justify-between rounded-lg border border-white/5 bg-slate-900/90 p-1.5">
          <span className="text-slate-400">Unit</span>
          <span className="font-mono text-cyan-300">BFP-CAL-04</span>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/20 py-1.5 text-center font-semibold text-emerald-300">On-Scene</div>
        <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-1.5 text-slate-300">
          <Phone className="h-3 w-3" /> Call
        </div>
      </div>
    </div>
  );
}

function CampusScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950 px-3 pb-6 pt-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[9px] text-indigo-300">SPCC CALOOCAN</p>
          <p className="font-display text-sm font-bold text-white">Good morning!</p>
        </div>
        <Bell className="h-4 w-4 text-indigo-300" />
      </div>
      {/* Digital ID */}
      <div className="mt-3 rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-slate-900 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-indigo-200">Digital Student ID</p>
            <p className="text-xs font-bold text-white">BSIT • 4th Year</p>
            <p className="mt-1 font-mono text-[9px] text-indigo-200">ID ACTIVE • SY 2025–26</p>
          </div>
          <div className="rounded-lg bg-white p-1">
            <QrCode className="h-8 w-8 text-slate-900" />
          </div>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-slate-300">
        <CalendarDays className="h-3 w-3 text-indigo-300" /> Today
      </p>
      <div className="mt-1.5 space-y-1.5">
        {[
          ['Mobile Dev Lab (Flutter)', 'Rm 402 • 10:00', 'text-indigo-300'],
          ['Systems Integration', 'Rm 305 • 1:00', 'text-cyan-300'],
          ['Capstone Consultation', 'Cleared', 'text-emerald-400']
        ].map(([t, s, c]) => (
          <div key={t} className="flex justify-between rounded-lg border border-white/10 bg-slate-900/90 p-1.5 text-[10px]">
            <span className="text-slate-200">{t}</span>
            <span className={`font-mono ${c}`}>{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-4 gap-1 border-t border-white/5 pt-2 text-center text-[8px] text-slate-400">
        <span className="text-indigo-300">Home</span>
        <span>Classes</span>
        <span>Feed</span>
        <span>Profile</span>
      </div>
    </div>
  );
}

function TriageScreen() {
  return (
    <div className="flex h-full flex-col bg-slate-950 px-3 pb-6 pt-3">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-emerald-300">Incident Triage</span>
        <span className="font-mono text-slate-500">Step 2 of 3</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">Select emergency type</p>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[10px]">
        {[
          ['Fire', 'border-rose-500/60 bg-rose-500/20 text-rose-200'],
          ['Medical', 'border-white/10 bg-slate-900 text-slate-300'],
          ['Flood', 'border-white/10 bg-slate-900 text-slate-300'],
          ['Rescue', 'border-white/10 bg-slate-900 text-slate-300']
        ].map(([l, c]) => (
          <div key={l} className={`rounded-lg border py-2 text-center font-semibold ${c}`}>
            {l}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-slate-400">Photo proof</p>
      <div className="mt-1.5 flex flex-1 items-center justify-center rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5">
        <div className="text-center">
          <Camera className="mx-auto h-6 w-6 text-emerald-400" />
          <p className="mt-1 text-[9px] text-emerald-200">IMG_0421.jpg • 240 KB</p>
          <p className="text-[8px] text-slate-500">Compressed from 3.1 MB</p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-1.5 text-[9px] text-amber-200">
        <ShieldAlert className="h-3.5 w-3.5" /> Severity: HIGH • Multi-unit alert
      </div>
      <div className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 py-2 text-[10px] font-bold text-slate-950">
        <CheckCircle2 className="h-3.5 w-3.5" /> Send to Nearest Unit
      </div>
    </div>
  );
}

function AuthScreen() {
  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-b from-purple-950/80 via-slate-950 to-slate-950 px-4 pb-6 pt-5 text-center">
      <span className="flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/15 px-2 py-0.5 font-mono text-[9px] text-purple-300">
        <Lock className="h-2.5 w-2.5" /> RBAC AUTH GUARD
      </span>
      <div className="relative mt-6">
        <span className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/15">
          <Fingerprint className="h-10 w-10 text-purple-300" />
        </div>
      </div>
      <p className="mt-4 font-display text-sm font-bold text-white">Verify it's you</p>
      <p className="text-[10px] text-slate-400">Enter the 6-digit code sent to •••• 4921</p>
      <div className="mt-3 flex gap-1.5">
        {['4', '8', '1', '9', '', ''].map((d, i) => (
          <div
            key={i}
            className={`flex h-8 w-6 items-center justify-center rounded-md border font-mono text-xs ${
              d ? 'border-purple-400/60 bg-purple-500/15 text-white' : 'border-white/10 bg-slate-900 text-slate-600'
            }`}
          >
            {d || '•'}
          </div>
        ))}
      </div>
      <div className="mt-auto w-full space-y-1.5 text-[9px]">
        <div className="flex justify-between rounded-lg border border-purple-500/20 bg-slate-900 p-1.5">
          <span className="text-slate-400">Role claim</span>
          <span className="font-mono text-purple-300">responder</span>
        </div>
        <div className="flex justify-between rounded-lg border border-cyan-500/20 bg-slate-900 p-1.5">
          <span className="text-slate-400">Device binding</span>
          <span className="font-mono text-emerald-400">VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

const MOBILE_SCREENS = {
  sos: SosScreen,
  map: MapScreen,
  routing: RoutingScreen,
  campus: CampusScreen,
  triage: TriageScreen,
  auth: AuthScreen
};

export function MobileScreenVisual({ uiType, accentRing }) {
  const Screen = MOBILE_SCREENS[uiType] || SosScreen;
  return (
    <PhoneFrame accentRing={accentRing}>
      <Screen />
    </PhoneFrame>
  );
}

// ==========================================================================
// DESKTOP SCREENS
// ==========================================================================

function CommandScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
          <Radio className="h-3 w-3" /> FLARE ALERT // COMMAND CENTER
        </span>
        <span className="rounded border border-rose-500/30 bg-rose-500/20 px-2 py-0.5 font-mono text-[9px] text-rose-300">2 ACTIVE SOS</span>
      </div>
      <div className="mt-2 grid flex-1 grid-cols-12 gap-2">
        <div className="col-span-5 space-y-1.5">
          <div className="rounded-lg border border-rose-500/40 bg-slate-900 p-1.5 text-[10px]">
            <div className="flex justify-between font-semibold text-rose-300">
              <span>#SOS-904 • Fire</span>
              <span>42s</span>
            </div>
            <p className="text-[9px] text-slate-400">Grace Park, South Caloocan</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900 p-1.5 text-[10px]">
            <div className="flex justify-between font-semibold text-cyan-300">
              <span>#SOS-903 • Medical</span>
              <span>EN ROUTE</span>
            </div>
            <p className="text-[9px] text-slate-400">Medic-02 • ETA 2m</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900 p-1.5 text-[10px]">
            <div className="flex justify-between font-semibold text-emerald-300">
              <span>#SOS-901 • Flood</span>
              <span>RESOLVED</span>
            </div>
            <p className="text-[9px] text-slate-400">Bagong Barrio</p>
          </div>
        </div>
        <div className="relative col-span-7 overflow-hidden rounded-lg border border-cyan-500/20 bg-slate-900/80">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
              backgroundSize: '18px 18px'
            }}
          />
          <div className="absolute inset-x-0 h-8 animate-scan bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent" />
          <svg className="relative h-full w-full" viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M20 100 Q 80 40, 120 70 T 180 20" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5 5" className="animate-dash-flow" />
            <circle cx="20" cy="100" r="4" fill="#38bdf8" />
            <circle cx="180" cy="20" r="5" fill="#f43f5e" />
            <circle cx="120" cy="70" r="3" fill="#fbbf24" />
          </svg>
          <span className="absolute bottom-1.5 left-2 font-mono text-[8px] text-emerald-400">FIRESTORE SYNC: OK</span>
          <span className="absolute bottom-1.5 right-2 font-mono text-[8px] text-cyan-300">Shortest path locked →</span>
        </div>
      </div>
    </div>
  );
}

function TreasuryScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px]">
        <span className="flex items-center gap-1 font-mono text-amber-300">
          <Building2 className="h-3.5 w-3.5" /> BUSINESS TAX & OR LEDGER
        </span>
        <span className="font-mono text-slate-400">Laravel • MySQL</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[
          ['Daily OR Batch', 'OR #2026-8841', 'Verified & Posted', 'text-white', 'text-emerald-400'],
          ['Permit Assessment', 'Q4 Renewal', 'Auto-Computed', 'text-amber-300', 'text-slate-300'],
          ['Records Check', '100% Matched', 'Batch Ready', 'text-cyan-300', 'text-slate-300']
        ].map(([l, v, s, vc, sc]) => (
          <div key={l} className="rounded-lg border border-white/10 bg-slate-900 p-2">
            <p className="text-[9px] text-slate-400">{l}</p>
            <p className={`mt-0.5 text-[11px] font-bold ${vc}`}>{v}</p>
            <span className={`text-[8px] ${sc}`}>{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex-1 overflow-hidden rounded-lg border border-white/10 bg-slate-900/70 font-mono text-[9px]">
        <div className="grid grid-cols-4 border-b border-white/10 px-2 py-1 text-slate-500">
          <span>PERMIT ID</span>
          <span>BARANGAY</span>
          <span>OR NO.</span>
          <span className="text-right">STATUS</span>
        </div>
        {[
          ['BP-24-0912', 'Brgy 176', '8841', 'POSTED', 'text-emerald-400'],
          ['BP-24-0913', 'Brgy 12', '8842', 'VERIFY', 'text-amber-300'],
          ['BP-24-0914', 'Brgy 88', '—', 'ASSESS', 'text-cyan-300']
        ].map(([a, b, c, d, cls]) => (
          <div key={a} className="grid grid-cols-4 px-2 py-1 text-slate-300">
            <span>{a}</span>
            <span>{b}</span>
            <span>{c}</span>
            <span className={`text-right ${cls}`}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupabaseScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px]">
        <span className="flex items-center gap-1 font-mono text-emerald-300">
          <Database className="h-3.5 w-3.5" /> SUPABASE REALTIME & RLS
        </span>
        <span className="font-mono text-emerald-400">PostgreSQL 15</span>
      </div>
      <div className="mt-2 grid flex-1 grid-cols-5 gap-2">
        <div className="col-span-3 space-y-1.5 font-mono text-[9px]">
          {[
            ['allow_verified_responders', 'ENABLED', 'text-emerald-400'],
            ['tenant_isolation_select', 'ENABLED', 'text-emerald-400'],
            ['admin_full_access', 'ROLE: admin', 'text-purple-300'],
            ['anon_insert_reports', 'DISABLED', 'text-rose-300']
          ].map(([p, s, c]) => (
            <div key={p} className="flex justify-between rounded border border-white/10 bg-slate-900 px-1.5 py-1">
              <span className="truncate text-slate-300">{p}</span>
              <span className={c}>{s}</span>
            </div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col justify-between rounded-lg border border-emerald-500/20 bg-slate-900/80 p-2">
          <p className="font-mono text-[8px] text-slate-400">WS LATENCY</p>
          <svg viewBox="0 0 100 40" className="h-12 w-full" aria-hidden="true">
            <polyline
              points="0,30 12,26 24,28 36,18 48,22 60,12 72,16 84,8 100,12"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
            />
          </svg>
          <p className="font-display text-base font-bold text-white">
            24<span className="text-[10px] text-emerald-400">ms</span>
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-between border-t border-white/5 pt-1.5 text-[9px] text-slate-400">
        <span>channel: public:incidents</span>
        <span className="font-mono text-emerald-300">React + Flutter</span>
      </div>
    </div>
  );
}

function PipelineScreen() {
  const nodes = [
    { icon: Cloud, label: 'Codespaces', sub: 'Cloud drafts', c: 'text-indigo-400', b: 'border-indigo-500/40' },
    { icon: GitBranch, label: 'ui-drafts', sub: 'Feature branch', c: 'text-purple-400', b: 'border-purple-500/40' },
    { icon: Terminal, label: 'Antigravity IDE', sub: 'Local agent QA', c: 'text-cyan-400', b: 'border-cyan-500/40' },
    { icon: Globe, label: 'Production', sub: 'Pages / Vercel', c: 'text-emerald-400', b: 'border-emerald-500/40' }
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px]">
        <span className="flex items-center gap-1 font-mono text-indigo-300">
          <GitBranch className="h-3.5 w-3.5" /> CODESPACES ⇄ ANTIGRAVITY IDE
        </span>
        <span className="font-mono text-indigo-400">branch: main</span>
      </div>
      <div className="my-auto flex items-center justify-between gap-1">
        {nodes.map((n, i) => {
          const Icon = n.icon;
          return (
            <React.Fragment key={n.label}>
              <div className={`flex-1 rounded-lg border ${n.b} bg-slate-900 p-1.5 text-center`}>
                <Icon className={`mx-auto mb-1 h-4 w-4 ${n.c}`} />
                <p className="text-[9px] font-semibold leading-tight text-white">{n.label}</p>
                <p className="text-[8px] text-slate-400">{n.sub}</p>
              </div>
              {i < nodes.length - 1 && <span className="text-[10px] text-slate-500">→</span>}
            </React.Fragment>
          );
        })}
      </div>
      <div className="space-y-0.5 rounded-lg border border-white/5 bg-slate-900/80 p-1.5 font-mono text-[9px]">
        <p className="text-slate-400">
          <span className="text-emerald-400">✓</span> agent review passed • 14 files
        </p>
        <p className="text-slate-400">
          <span className="text-emerald-400">✓</span> vite build • 1.8s
        </p>
        <p className="text-slate-400">
          <span className="text-cyan-400">→</span> deploying to production…
        </p>
      </div>
    </div>
  );
}

function BackendScreen() {
  return (
    <div className="flex h-full flex-col font-mono text-[10px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <span className="text-rose-300">functions/src/dispatchAlert.js</span>
        <span className="text-emerald-400">Node 20 • Deployed</span>
      </div>
      <div className="my-auto space-y-0.5 rounded-lg border border-white/5 bg-slate-900/90 p-2 text-[9px] leading-relaxed">
        <p>
          <span className="text-purple-300">exports</span>.<span className="text-cyan-300">onIncidentCreated</span> ={' '}
          <span className="text-cyan-300">onDocumentCreated</span>(
        </p>
        <p className="pl-3 text-amber-200">
          'incidents/{'{id}'}', <span className="text-purple-300">async</span> (event) =&gt; {'{'}
        </p>
        <p className="pl-6 text-slate-300">
          <span className="text-purple-300">const</span> unit = <span className="text-purple-300">await</span>{' '}
          <span className="text-cyan-300">findNearestResponder</span>(coords);
        </p>
        <p className="pl-6 text-slate-300">
          <span className="text-purple-300">await</span> <span className="text-emerald-300">sendHighPriorityFCM</span>(unit.token, payload);
        </p>
        <p className="pl-3 text-amber-200">{'}'});</p>
      </div>
      <div className="flex items-center justify-between text-[9px] text-slate-400">
        <span className="flex items-center gap-1">
          <Activity className="h-3 w-3 text-rose-300" /> Trigger latency ~180ms
        </span>
        <span className="flex items-center gap-1 text-rose-300">
          <MapPin className="h-3 w-3" /> Geodesic dispatch
        </span>
      </div>
    </div>
  );
}

const DESKTOP_SCREENS = {
  command: { C: CommandScreen, url: 'command.flarealert.app/dispatch' },
  treasury: { C: TreasuryScreen, url: 'treasury.local/business-tax/ledger' },
  supabase: { C: SupabaseScreen, url: 'console.portal.app/rbac' },
  pipeline: { C: PipelineScreen, url: 'github.com/Kenabadobee09922/actions' },
  backend: { C: BackendScreen, url: 'console.firebase.google.com/functions' }
};

export function DesktopScreenVisual({ uiType, accentBorder }) {
  const { C, url } = DESKTOP_SCREENS[uiType] || DESKTOP_SCREENS.command;
  return (
    <BrowserFrame url={url} accentBorder={accentBorder}>
      <C />
    </BrowserFrame>
  );
}
