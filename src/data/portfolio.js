// ==========================================================================
// PORTFOLIO CONTENT CONFIGURATION — John Kenneth Buhay
// --------------------------------------------------------------------------
// Single source of truth for every section. Edit content here; components
// only render what is defined below.
//
// STRICT CONTENT RULE: keep this portfolio 100% focused on Software
// Engineering, Municipal/Enterprise IT Systems, Mobile Apps, Game Dev,
// UI/UX, and Cloud/AI workflows. No accounting-internship content.
// ==========================================================================

export const PROFILE = {
  name: 'John Kenneth Buhay',
  initials: 'JKB',
  title: 'Full-Stack & Mobile Developer',
  location: 'Caloocan, Metro Manila, Philippines',
  degree: 'BS in Information Technology',
  school: 'Systems Plus Computer College Caloocan',
  email: 'floreskenneth319@gmail.com',
  github: 'https://github.com/Kenabadobee09922',
  liveSite: 'https://kenabadobee09922.github.io/Web-Portfolio/'
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'hubs', label: '3 Project Hubs' },
  { id: 'showcase', label: 'Multi-Screen Showcase' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'faq', label: 'FAQ' },
  { id: 'inquire', label: 'Inquire' }
];

export const HERO_STATS = [
  { value: '4', label: 'Core Pillars', sub: 'Mobile • Systems • Cloud • AI' },
  { value: '3', label: 'Ecosystem Hubs', sub: 'SmartServices • Campus • AI' },
  { value: '450+', label: 'Hrs Municipal IT OJT', sub: 'Caloocan City Hall' },
  { value: 'Prod', label: 'Production-Ready Stack', sub: 'Flutter • React • Laravel' }
];

// Static Tailwind class maps (kept literal so Tailwind's JIT can see them).
export const ACCENTS = {
  cyan: {
    text: 'text-cyan-400',
    textSoft: 'text-cyan-300',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    ring: 'ring-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    dot: 'bg-cyan-400',
    hoverBorder: 'hover:border-cyan-500/50'
  },
  indigo: {
    text: 'text-indigo-400',
    textSoft: 'text-indigo-300',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/40',
    ring: 'ring-indigo-500/30',
    glow: 'shadow-indigo-500/20',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    dot: 'bg-indigo-400',
    hoverBorder: 'hover:border-indigo-500/50'
  },
  emerald: {
    text: 'text-emerald-400',
    textSoft: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    ring: 'ring-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    dot: 'bg-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50'
  },
  rose: {
    text: 'text-rose-400',
    textSoft: 'text-rose-300',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/40',
    ring: 'ring-rose-500/30',
    glow: 'shadow-rose-500/20',
    gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    dot: 'bg-rose-400',
    hoverBorder: 'hover:border-rose-500/50'
  },
  amber: {
    text: 'text-amber-400',
    textSoft: 'text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    ring: 'ring-amber-500/30',
    glow: 'shadow-amber-500/20',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    dot: 'bg-amber-400',
    hoverBorder: 'hover:border-amber-500/50'
  },
  purple: {
    text: 'text-purple-400',
    textSoft: 'text-purple-300',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/40',
    ring: 'ring-purple-500/30',
    glow: 'shadow-purple-500/20',
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    dot: 'bg-purple-400',
    hoverBorder: 'hover:border-purple-500/50'
  }
};

// ==========================================
// 3-HUB ECOSYSTEM
// ==========================================

export const HUBS_DATA = {
  smartservices: {
    id: 'smartservices',
    number: '01',
    badge: 'HUB 01 • FLAGSHIP & PRODUCTION SYSTEMS',
    title: 'SmartServices Hub',
    subtitle: 'Emergency response, municipal workflow & cloud backend systems',
    accent: 'cyan',
    description:
      'Engineered for real-world reliability. Features my flagship capstone Flare Alert, a municipal treasury & business tax workflow system inspired by my 450-hour IT practicum at Caloocan City Hall, and a scalable Supabase role-based cloud architecture.',
    projects: [
      {
        id: 'flare-alert',
        title: 'Flare Alert — Real-Time Emergency & Dispatch System',
        role: 'Lead Full-Stack & Mobile Developer',
        period: 'Sept 2025 – May 2026',
        status: 'Flagship Capstone • Production Ready',
        featured: true,
        summary:
          'End-to-end mobile emergency reporting and automated responder dispatch platform built with Flutter, Firebase Cloud Functions, Cloud Firestore, and the Google Maps API.',
        problem:
          'Traditional emergency hotlines suffer from vague caller location descriptions, delayed triage, and no real-time responder tracking during critical incidents.',
        solution:
          'Built a dual-interface ecosystem: a low-latency Flutter Citizen App with 1-tap GPS SOS and live incident media upload, paired with a Node.js / Firebase Cloud Functions dispatch backend that automatically routes alerts to the nearest responder unit.',
        metrics: [
          '< 1.8s real-time Firestore sync latency',
          'Automated GPS reverse-geocoding & route polyline calculation',
          'Role-based Auth & Cloud Functions security rules'
        ],
        techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'Node.js', 'Google Maps API'],
        architectureFlow: [
          { step: '01', title: 'Citizen Mobile App (Flutter)', detail: 'Captures live GPS coordinates, incident category, and photo proof with a 1-tap SOS trigger.' },
          { step: '02', title: 'Firebase Cloud Functions (Node.js)', detail: 'Validates the payload, computes geodesic distance to active units, and triggers FCM push alerts.' },
          { step: '03', title: 'Cloud Firestore Real-Time Stream', detail: 'Synchronizes incident state (Reported → Dispatched → En Route → Resolved) across all clients.' },
          { step: '04', title: 'Command & Responder View', detail: 'Renders shortest-path responder routing and live triage status updates.' }
        ]
      },
      {
        id: 'municipal-treasury',
        title: 'Municipal Treasury & Business Tax Workflow System',
        role: 'System Architect & IT Practicum Developer',
        period: 'Jan 2026 – Apr 2026',
        status: 'Municipal System Concept & Prototype',
        featured: false,
        summary:
          "Digitalization architecture inspired by 450+ hours at Caloocan City Hall — City Treasurer's Office, streamlining business permit assessment, official receipt (OR) encoding, and records verification.",
        problem:
          'High-volume municipal treasury desks handle thousands of quarterly business tax assessments and manual record cross-checks, creating bottlenecks during peak permit renewal periods.',
        solution:
          'Designed a structured relational web system using Laravel, CodeIgniter patterns, and MySQL with a REST API layer to index business records, automate regulatory fee computation, and generate daily collection summaries.',
        metrics: [
          'Modeled on 450+ hours of real municipal IT operations',
          'Multi-step permit clearance & official receipt tracking',
          'Role-segregated encoder, verifier & administrator views'
        ],
        techStack: ['Laravel', 'CodeIgniter', 'PHP', 'MySQL', 'REST API', 'Tailwind CSS'],
        architectureFlow: [
          { step: '01', title: 'Business Record Intake', detail: 'Fast lookup by Business Permit ID, reference number, or barangay clearance code.' },
          { step: '02', title: 'Automated Assessment Engine', detail: 'Computes regulatory fees and renewal schedules from configurable rate tables.' },
          { step: '03', title: 'Official Receipt (OR) Sync', detail: 'Logs serial OR numbers and binds each transaction to a daily batch report.' },
          { step: '04', title: 'Department Analytics', detail: 'Exports daily and monthly operational summaries for department review.' }
        ]
      },
      {
        id: 'supabase-cloud-portal',
        title: 'Supabase & Role-Based Cloud Sync Portal',
        role: 'Full-Stack Cloud Developer',
        period: '2025 – 2026',
        status: 'Cloud Backend Architecture',
        featured: false,
        summary:
          'Real-time multi-tenant database and RBAC admin dashboard powered by React, Supabase (PostgreSQL), Row-Level Security, and real-time WebSocket subscriptions.',
        problem:
          'Growing organizations struggle with insecure client-side queries, slow polling updates, and complex role permissions spread across web and mobile clients.',
        solution:
          'Engineered a unified Supabase + React admin portal enforcing strict PostgreSQL Row-Level Security policies, instant real-time table listeners, and edge-function webhooks.',
        metrics: [
          'PostgreSQL Row-Level Security (RLS) policy enforcement',
          'Sub-second live table sync via WebSockets',
          'Unified REST & Realtime API for Flutter + React clients'
        ],
        techStack: ['React', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'Tailwind CSS', 'Edge Functions'],
        architectureFlow: [
          { step: '01', title: 'JWT Auth & Role Verification', detail: 'Authenticates users via Supabase Auth and attaches custom role claims.' },
          { step: '02', title: 'PostgreSQL RLS Policy Guard', detail: 'Validates every SELECT, INSERT, and UPDATE directly at the database layer.' },
          { step: '03', title: 'Realtime Channel Broadcast', detail: 'Pushes instant state diffs to connected React dashboards and Flutter devices.' },
          { step: '04', title: 'Audit Logging & Storage Buckets', detail: 'Tracks system mutations and manages secure media uploads per tenant.' }
        ]
      }
    ]
  },
  campusconnect: {
    id: 'campusconnect',
    number: '02',
    badge: 'HUB 02 • ACADEMIC, GAME DEV & UI/UX BUILDS',
    title: 'CampusConnect Hub',
    subtitle: 'Academic mobile apps, Unity C# mechanics & high-fidelity Figma systems',
    accent: 'indigo',
    description:
      'The proving ground where computer science fundamentals meet interactive design. Houses my academic mobile apps at Systems Plus Computer College, Unity C# physics and puzzle builds, and pixel-perfect Figma UI/UX systems.',
    projects: [
      {
        id: 'spcc-campus-companion',
        title: 'CampusConnect — SPCC Student Portal & Academic Companion',
        role: 'Mobile Developer & UI/UX Designer',
        period: '2024 – 2025',
        status: 'Academic Mobile Prototype',
        featured: true,
        summary:
          'Cross-platform student companion app for Systems Plus Computer College — schedules, campus announcements, lab availability, and org events in one place.',
        problem:
          'Students rely on scattered social media pages and bulletin boards to check room assignments, enrollment steps, and department announcements.',
        solution:
          'Designed a mobile-first Figma design system and Flutter front-end with a digital student ID, real-time department feeds, and semester checklist trackers on Material 3.',
        metrics: [
          'Complete component library & interactive Figma prototype',
          'Adaptive dark / light Material 3 student dashboard',
          'Reusable Flutter widget architecture'
        ],
        techStack: ['Flutter', 'Dart', 'Figma', 'Material 3', 'Firebase'],
        architectureFlow: [
          { step: '01', title: 'Figma Design Token System', detail: 'Typography, spacing scales, and accessible color-contrast tokens.' },
          { step: '02', title: 'Flutter Stateful Widget Views', detail: 'Responsive timetables and announcement cards translated from the mockups.' },
          { step: '03', title: 'Real-Time Notification Feed', detail: 'Topic-based alerts by college department and year level.' }
        ]
      },
      {
        id: 'unity-puzzle-mechanics',
        title: '2D/3D Puzzle Mechanics & Collision Bounds Engine',
        role: 'Unity C# Gameplay Programmer',
        period: '2024 – 2025',
        status: 'Interactive Game Dev Build',
        featured: false,
        summary:
          'Unity C# prototype focused on deterministic puzzle state machines, collision-bounds validation, and responsive player controller scripting.',
        problem:
          'Physics-based puzzle games often suffer from edge-case clipping, inconsistent trigger detection, and frame-rate-dependent movement bugs.',
        solution:
          'Wrote clean C# systems using FixedUpdate physics raycasting, strict collider-boundary validation, and modular event listeners for puzzle completion states.',
        metrics: [
          'Zero-clipping collision boundary enforcement',
          'Decoupled C# observer pattern for level triggers',
          'Smooth 60 FPS physics interpolation'
        ],
        techStack: ['Unity Engine', 'C#', 'Physics Raycasting', 'State Machines', 'Collision Detection'],
        architectureFlow: [
          { step: '01', title: 'Input & Controller Layer (C#)', detail: 'Captures normalized directional input and applies velocity constraints.' },
          { step: '02', title: 'Collider & Raycast Validation', detail: 'Verifies boundary intersections before committing transform updates.' },
          { step: '03', title: 'Puzzle State Machine', detail: 'Evaluates win / reset conditions and triggers UI and audio feedback.' }
        ]
      },
      {
        id: 'uiux-brand-studio',
        title: 'Multi-Brand UI/UX & Commercial Media Suite',
        role: 'UI/UX Designer & Digital Media Creator',
        period: '2023 – Present',
        status: 'Creative & Conversion Systems',
        featured: false,
        summary:
          'High-converting landing page layouts, brand visual systems, and short-form commercial video crafted in Figma and Canva.',
        problem:
          'Great software and products often fail to convert users because of cluttered interfaces or low-retention promotional creatives.',
        solution:
          'Combined persuasive hooks with clean visual hierarchy — producing interactive mobile mockups, high-converting ad layouts, and short-form video.',
        metrics: [
          'Wireframe → high-fidelity developer handoff',
          'Conversion-focused visual hierarchy & copy',
          'Multi-platform asset systems (Web, Mobile, Reels)'
        ],
        techStack: ['Figma', 'Canva', 'Design Systems', 'Ad Layouts', 'Short-Form Video'],
        architectureFlow: [
          { step: '01', title: 'User Journey & Hook Mapping', detail: 'Identifies friction points and structures a persuasive visual flow.' },
          { step: '02', title: 'High-Fidelity Figma Prototyping', detail: 'Interactive clickable flows for desktop and mobile viewports.' },
          { step: '03', title: 'Developer Handoff & Asset Export', detail: 'CSS-ready specs, SVG icons, and responsive layout grids.' }
        ]
      }
    ]
  },
  aiworkspace: {
    id: 'aiworkspace',
    number: '03',
    badge: 'HUB 03 • AGENTIC DEV & CLOUD AUTOMATION',
    title: 'AI Workspace',
    subtitle: 'Cloud-to-local sync pipelines, Antigravity IDE workflows & Make.com automation',
    accent: 'emerald',
    description:
      'Engineering velocity powered by AI-assisted workflows. Showcases my hybrid cloud-to-local development architecture (GitHub Codespaces + Google Antigravity IDE / VS Code) alongside automated webhook pipelines.',
    projects: [
      {
        id: 'hybrid-cloud-dev-pipeline',
        title: 'Codespaces + Antigravity IDE Hybrid Sync Workflow',
        role: 'DevOps & Workflow Architect',
        period: '2025 – 2026',
        status: 'Active Engineering Pipeline',
        featured: true,
        summary:
          'A single-source-of-truth workflow for coding seamlessly across cloud GitHub Codespaces and local Google Antigravity IDE / VS Code environments.',
        problem:
          'Building large multi-hub projects across different machines often leads to environment drift and fragmented git branches.',
        solution:
          'Architected a branch-isolated GitHub workflow: rapid UI drafting in Codespaces, then local Antigravity IDE agentic verification, full-stack testing, and automated deployment.',
        metrics: [
          'Zero environment drift between cloud & local IDE',
          'Feature-branch isolation (ui-drafts → main)',
          'Agentic code review & automated build verification'
        ],
        techStack: ['Google Antigravity IDE', 'GitHub Codespaces', 'VS Code', 'Git Branch Isolation', 'React', 'Node.js'],
        architectureFlow: [
          { step: '01', title: 'Cloud Drafting (GitHub Codespaces)', detail: 'Containerized dev environments anywhere to draft UI components and schemas.' },
          { step: '02', title: 'Isolated Feature Branches', detail: 'Modular commits to dedicated branches keep production clean.' },
          { step: '03', title: 'Local Antigravity IDE Integration', detail: 'Deep agentic debugging, multi-file refactoring, and QA on pulled branches.' },
          { step: '04', title: 'Production Deployment', detail: 'Automated build and hosting on GitHub Pages / Vercel.' }
        ]
      },
      {
        id: 'make-business-automation',
        title: 'Make.com Lead Triage & Operations Automation',
        role: 'Automation Engineer',
        period: '2025 – 2026',
        status: 'Workflow Automation System',
        featured: false,
        summary:
          'Webhook automation pipelines connecting inquiry forms, Supabase databases, and instant notification channels.',
        problem:
          'Manual lead sorting, follow-up emails, and spreadsheet logging slow down response times for project and engineering inquiries.',
        solution:
          'Built multi-branch Make.com scenarios with custom JSON webhook parsers that categorize incoming leads by project scope and trigger structured notifications.',
        metrics: [
          'Instant webhook-to-database synchronization',
          'Automatic scope classification (Capstone / Business / Role)',
          'Eliminates manual copy-paste across tools'
        ],
        techStack: ['Make.com', 'Webhooks', 'JSON REST APIs', 'Supabase'],
        architectureFlow: [
          { step: '01', title: 'Webhook Payload Capture', detail: 'Receives structured JSON inquiry data from portfolio or landing-page forms.' },
          { step: '02', title: 'Make.com Router & Filters', detail: 'Evaluates timeline, scope, and hub category automatically.' },
          { step: '03', title: 'Database & Alert Dispatch', detail: 'Logs the record to Supabase and sends a formatted summary alert.' }
        ]
      }
    ]
  }
};

export const ALL_PROJECTS = Object.values(HUBS_DATA).flatMap((hub) =>
  hub.projects.map((p) => ({ ...p, hubId: hub.id, hubTitle: hub.title, accent: hub.accent }))
);

export const findProject = (id) => ALL_PROJECTS.find((p) => p.id === id) || null;

// ==========================================
// DUAL-TRACK MULTI-SCREEN SHOWCASE
// ==========================================

export const MOBILE_SHOWCASE_SCREENS = [
  {
    id: 'mob-sos',
    projectId: 'flare-alert',
    project: 'Flare Alert',
    screenTitle: 'One-Tap SOS',
    hub: 'smartservices',
    tag: 'Flutter • Haptics',
    accent: 'rose',
    metrics: '1.2s GPS lock • Haptic confirm',
    description:
      'High-contrast emergency trigger designed for high-stress situations. Attaches live latitude/longitude, battery level, and timestamp on tap.',
    uiType: 'sos'
  },
  {
    id: 'mob-map',
    projectId: 'flare-alert',
    project: 'Flare Alert',
    screenTitle: 'Live GPS Radar Map',
    hub: 'smartservices',
    tag: 'Google Maps API',
    accent: 'cyan',
    metrics: 'Live polylines • Hazard pins',
    description:
      'Dark-mode vector map showing active community emergency pins, safe evacuation zones, and real-time responder proximity.',
    uiType: 'map'
  },
  {
    id: 'mob-routing',
    projectId: 'flare-alert',
    project: 'Flare Alert',
    screenTitle: 'Responder Shortest-Path Routing',
    hub: 'smartservices',
    tag: 'Firestore Streams',
    accent: 'amber',
    metrics: 'Live ETA • Status toggles',
    description:
      'Field responder interface with dispatch instructions, caller triage notes, and live navigation to the incident site.',
    uiType: 'routing'
  },
  {
    id: 'mob-campus',
    projectId: 'spcc-campus-companion',
    project: 'CampusConnect',
    screenTitle: 'SPCC Student Portal',
    hub: 'campusconnect',
    tag: 'Flutter • Material 3',
    accent: 'indigo',
    metrics: 'QR ID • Schedule feed',
    description:
      'Mobile companion for Systems Plus Computer College students with schedule cards, a digital ID, and instant campus alerts.',
    uiType: 'campus'
  },
  {
    id: 'mob-triage',
    projectId: 'flare-alert',
    project: 'Flare Alert',
    screenTitle: 'Emergency Triage',
    hub: 'smartservices',
    tag: 'Firebase Storage',
    accent: 'emerald',
    metrics: 'Photo proof • Severity tags',
    description:
      'Citizens attach compressed on-scene photos and choose a severity (Fire, Medical, Flood, Rescue) so dispatchers deploy the right unit.',
    uiType: 'triage'
  },
  {
    id: 'mob-auth',
    projectId: 'flare-alert',
    project: 'SmartServices Auth',
    screenTitle: 'Role-Based Biometric & OTP Auth',
    hub: 'smartservices',
    tag: 'Firebase Auth',
    accent: 'purple',
    metrics: 'Citizen & responder roles',
    description:
      'Blocks prank reports with SMS OTP verification, biometric unlock, device binding, and strict role-based access between citizens and verified responders.',
    uiType: 'auth'
  }
];

export const DESKTOP_SHOWCASE_SCREENS = [
  {
    id: 'desk-command',
    projectId: 'flare-alert',
    project: 'Flare Alert',
    screenTitle: 'Flare Alert Command Center',
    hub: 'smartservices',
    tag: 'Web Admin • Firestore + Maps',
    accent: 'cyan',
    metrics: 'Multi-unit dispatch • Live telemetry',
    description:
      'Central command dashboard monitoring incoming SOS streams across barangays, with one-click unit assignment and live status tracking.',
    uiType: 'command'
  },
  {
    id: 'desk-treasury',
    projectId: 'municipal-treasury',
    project: 'Municipal Treasury System',
    screenTitle: 'Municipal Business Tax & OR Ledger',
    hub: 'smartservices',
    tag: 'Laravel • CodeIgniter • MySQL',
    accent: 'amber',
    metrics: 'Inspired by Caloocan City Hall OJT',
    description:
      'Municipal treasury interface for verifying business tax assessments, encoding official receipts, and generating daily collection reports.',
    uiType: 'treasury'
  },
  {
    id: 'desk-supabase',
    projectId: 'supabase-cloud-portal',
    project: 'Supabase Cloud Portal',
    screenTitle: 'Supabase Realtime & RBAC Console',
    hub: 'smartservices',
    tag: 'React • Supabase • RLS',
    accent: 'emerald',
    metrics: 'WebSocket sync • Role guard',
    description:
      'Multi-tenant administration console with live PostgreSQL table streams, Row-Level Security policy toggles, and API latency telemetry.',
    uiType: 'supabase'
  },
  {
    id: 'desk-pipeline',
    projectId: 'hybrid-cloud-dev-pipeline',
    project: 'AI Workspace',
    screenTitle: 'Antigravity IDE + Codespaces Cloud Sync',
    hub: 'aiworkspace',
    tag: 'Antigravity IDE • GitHub',
    accent: 'indigo',
    metrics: 'Cloud-to-local single source of truth',
    description:
      'Hybrid engineering pipeline combining cloud Codespaces drafting with local Antigravity IDE agentic review and automated deployment.',
    uiType: 'pipeline'
  },
  {
    id: 'desk-backend',
    projectId: 'flare-alert',
    project: 'Flare Alert Backend',
    screenTitle: 'Node.js Cloud Functions Trigger Engine',
    hub: 'smartservices',
    tag: 'Node.js • Cloud Functions',
    accent: 'rose',
    metrics: 'Serverless geodesic dispatch',
    description:
      'Event-driven backend that listens for new Firestore incident documents, computes the nearest responder unit, and dispatches push notifications.',
    uiType: 'backend'
  }
];

export const SHOWCASE_FILTERS = [
  { id: 'all', label: 'All Hubs' },
  { id: 'smartservices', label: 'SmartServices' },
  { id: 'campusconnect', label: 'CampusConnect' },
  { id: 'aiworkspace', label: 'AI Workspace' }
];

// ==========================================
// 4 CORE ENGINEERING PILLARS
// ==========================================

export const PILLARS = [
  {
    id: 'mobile',
    icon: 'Smartphone',
    accent: 'cyan',
    title: 'Mobile Development',
    headline: 'Mobile apps, built to perform.',
    desc: 'Cross-platform Android & iOS apps in Flutter and Dart — live GPS tracking, push notifications, biometric auth, and Material 3 interfaces.',
    tags: ['Flutter', 'Dart', 'Material 3', 'Google Maps API', 'FCM']
  },
  {
    id: 'systems',
    icon: 'Server',
    accent: 'amber',
    title: 'System Development',
    headline: 'Enterprise & municipal systems.',
    desc: 'Structured records, workflow, and permit systems with role-segregated access and clean audit trails, built on proven PHP stacks.',
    tags: ['Laravel', 'CodeIgniter', 'PHP', 'MySQL', 'REST API']
  },
  {
    id: 'cloud',
    icon: 'Cloud',
    accent: 'indigo',
    title: 'Full-Stack Cloud Engineering',
    headline: 'Real-time cloud backends.',
    desc: 'React dashboards on serverless backends — Firestore streams, Cloud Functions, Supabase Row-Level Security, and real-time sync for web and mobile clients.',
    tags: ['React', 'Node.js', 'Firebase', 'Supabase', 'PostgreSQL']
  },
  {
    id: 'ai',
    icon: 'Sparkles',
    accent: 'emerald',
    title: 'AI-Assisted Development',
    headline: 'Agentic, automated workflows.',
    desc: 'Cloud-to-local development with GitHub Codespaces and Google Antigravity IDE, plus Make.com webhook automation for operations.',
    tags: ['Antigravity IDE', 'GitHub Codespaces', 'Make.com', 'Webhooks']
  }
];

// ==========================================
// MILESTONES
// ==========================================

export const MILESTONE_CATEGORIES = [
  'Leadership & Capstone',
  'Government IT Practicum (OJT)',
  'Education',
  'UI/UX & Digital Media',
  'Certification & Award',
  'Hackathon & Competition',
  'Open Source & Community'
];

export const INITIAL_MILESTONES = [
  {
    id: 'ms-flare-alert',
    category: 'Leadership & Capstone',
    title: 'Lead Full-Stack Developer — Flare Alert Emergency System',
    organization: 'Systems Plus Computer College Caloocan',
    period: 'Sept 2025 – May 2026',
    badge: 'Flagship Engineering',
    icon: 'Flame',
    highlights: [
      'Led the end-to-end architecture and mobile/backend engineering of Flare Alert using Flutter, Dart, Firebase Auth, Cloud Firestore, and Cloud Functions (Node.js).',
      'Integrated real-time Google Maps geolocation, incident triage workflows, and automated responder dispatch.'
    ]
  },
  {
    id: 'ms-city-hall',
    category: 'Government IT Practicum (OJT)',
    title: "IT Practicum — City Treasurer's Office (450 Hours)",
    organization: 'Caloocan City Hall',
    period: 'Jan 2026 – Apr 2026',
    badge: '450 Hours Completed',
    icon: 'Building2',
    highlights: [
      'Completed a 450-hour IT practicum supporting high-volume municipal systems, digital records verification, and document workflow digitalization.',
      'Gained domain knowledge in local government IT operations, records integrity, and public-sector information systems.'
    ]
  },
  {
    id: 'ms-bsit',
    category: 'Education',
    title: 'Bachelor of Science in Information Technology (BSIT)',
    organization: 'Systems Plus Computer College (SPCC) — Caloocan',
    period: 'Graduated 2026',
    badge: 'BSIT Graduate',
    icon: 'GraduationCap',
    highlights: [
      'Focused on cross-platform mobile development (Flutter/Dart), full-stack web systems (Laravel/CodeIgniter/React), cloud databases, and UI/UX design.',
      'Built projects spanning Unity C# game mechanics, academic student portals, and cloud-backed mobile systems.'
    ]
  },
  {
    id: 'ms-uiux',
    category: 'UI/UX & Digital Media',
    title: 'UI/UX Prototype Designer & Digital Media Creator',
    organization: 'Independent Brand & Product Campaigns',
    period: '2023 – Present',
    badge: 'Figma • Canva',
    icon: 'PenTool',
    highlights: [
      'Designed interactive mobile and web interfaces in Figma and produced high-converting ad layouts and short-form video.',
      'Pairs user-centric design sensibility with full-stack engineering execution.'
    ]
  }
];

// ==========================================
// FAQ
// ==========================================

export const FAQ_ITEMS = [
  {
    q: 'How do you structure and build full-stack & mobile projects?',
    a: 'I use a hybrid cloud-to-local workflow. I draft UI components and feature branches in GitHub Codespaces, then pull them into Google Antigravity IDE and VS Code locally for full-stack integration, Firebase/Supabase backend binding, and QA before deployment.'
  },
  {
    q: 'Can you build both the mobile app (iOS/Android) and the web admin dashboard?',
    a: 'Yes. Like my flagship system Flare Alert, I specialize in dual-ecosystem builds: a cross-platform Flutter app for citizens or field staff, synced in real time with a React, Laravel, or Firebase/Supabase web dashboard for administrators.'
  },
  {
    q: 'What makes your municipal and enterprise system builds stand out?',
    a: "I completed a 450-hour IT practicum at Caloocan City Hall — City Treasurer's Office, so I design systems around real government workflows: fast record lookup, role-segregated access, official receipt tracking, and clean audit trails."
  },
  {
    q: 'Are you open to full-time roles as well as custom builds?',
    a: 'Yes. I am open to Full-Stack, Mobile (Flutter), and Systems Developer roles in Metro Manila or remote, as well as custom web and mobile system builds. Use the 3-category inquiry funnel below to get started.'
  },
  {
    q: 'How are custom project milestones structured?',
    a: 'Four transparent phases: (1) Figma UI/UX prototype & database schema approval, (2) core frontend & mobile MVP, (3) backend API / Firebase / Supabase integration, and (4) edge-case testing, deployment & documentation.'
  },
  {
    q: 'Do you build games or interactive experiences?',
    a: 'Yes. My CampusConnect Hub includes Unity C# builds with deterministic puzzle state machines, physics raycasting, and collision-bounds validation. I enjoy interactive mechanics as much as production systems.'
  }
];

// ==========================================
// 3-CATEGORY INQUIRY FUNNEL
// ==========================================

export const INQUIRY_CATEGORIES = [
  {
    id: 'capstone',
    number: '1',
    title: 'Capstone / Academic System',
    desc: 'End-to-end Flutter apps, GPS/maps integrations, Laravel or Firebase systems, and technical documentation.',
    icon: 'GraduationCap',
    accent: 'cyan',
    briefTitle: 'Capstone / Academic System Brief',
    detailsPlaceholder: 'Describe the system title, core modules, and what your panel expects…',
    fields: [
      { key: 'institution', label: 'School / Program', placeholder: 'e.g., BSIT — 4th Year' },
      {
        key: 'platform',
        label: 'Target Platform',
        type: 'select',
        options: ['Mobile App (Flutter)', 'Web System (Laravel / React)', 'Mobile + Web Admin', 'Not sure yet']
      },
      {
        key: 'stage',
        label: 'Current Stage',
        type: 'select',
        options: ['Title Proposal', 'Chapter 1–3 Approved', 'Prototype In Progress', 'Final Defense Prep']
      }
    ]
  },
  {
    id: 'business',
    number: '2',
    title: 'Business Web & Mobile App',
    desc: 'Operations dashboards, booking or inventory portals, customer mobile apps, and conversion landing pages.',
    icon: 'Briefcase',
    accent: 'indigo',
    briefTitle: 'Business Web & Mobile App Brief',
    detailsPlaceholder: 'Describe the business problem, key users, and must-have features…',
    fields: [
      { key: 'company', label: 'Business / Brand', placeholder: 'e.g., Local clinic, retail store' },
      {
        key: 'platform',
        label: 'Product Type',
        type: 'select',
        options: ['Web Dashboard / Portal', 'Mobile App (iOS + Android)', 'Mobile App + Web Admin', 'Landing Page / Website']
      },
      {
        key: 'budget',
        label: 'Budget Range',
        type: 'select',
        options: ['To be discussed', '₱20k – ₱50k', '₱50k – ₱150k', '₱150k+']
      }
    ]
  },
  {
    id: 'recruitment',
    number: '3',
    title: 'Full-Time / Contract Engineering Role',
    desc: 'Hiring for Full-Stack, Flutter Mobile, or Systems Developer roles in Metro Manila or remote.',
    icon: 'Code',
    accent: 'emerald',
    briefTitle: 'Engineering Role Recruitment Brief',
    detailsPlaceholder: 'Share the role scope, team, tech stack, and interview process…',
    fields: [
      { key: 'company', label: 'Company / Team', placeholder: 'e.g., Tech Corp — Platform Team' },
      {
        key: 'roleType',
        label: 'Role',
        type: 'select',
        options: ['Full-Stack Developer', 'Flutter Mobile Developer', 'Systems / Backend Developer', 'Junior Software Engineer']
      },
      {
        key: 'arrangement',
        label: 'Arrangement',
        type: 'select',
        options: ['Full-Time • Onsite (Metro Manila)', 'Full-Time • Hybrid', 'Full-Time • Remote', 'Contract / Project-Based']
      }
    ]
  }
];

export const TIMELINE_OPTIONS = ['Immediate / Urgent', '2–4 Weeks', '1–2 Months', '3+ Months', 'Flexible / Consultation'];
