/**
 * ==========================================================================
 * JOHN KENNETH BUHAY (JKB) | MASTER PORTFOLIO CLIENT JAVASCRIPT
 * Full-Stack System Developer & Tech Virtual Assistant
 * ==========================================================================
 * 
 * RECOMMENDED SUPABASE SQL TABLE SETUP:
 * --------------------------------------------------------------------------
 * CREATE TABLE public.inquiries (
 *   id BIGSERIAL PRIMARY KEY,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   service TEXT,
 *   subject TEXT NOT NULL,
 *   message TEXT NOT NULL
 * );
 * ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Allow anonymous inserts" ON public.inquiries FOR INSERT TO anon WITH CHECK (true);
 * --------------------------------------------------------------------------
 */

// Supabase initialization (safely guarded with placeholder fallback)
let supabaseClient = null;
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL_HERE',
    anonKey: 'YOUR_SUPABASE_ANON_KEY_HERE'
};

if (typeof supabase !== 'undefined' && supabase.createClient) {
    if (SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL_HERE' && SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
        supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    }
}

// Global modal trigger focus store for accessibility restoration
let lastActiveModalTrigger = null;

// --- 1. TOUCH-SAFE HIGH-PERFORMANCE GLOBAL CUSTOM CURSOR ---
function initCustomCursor() {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    // Ensure elements exist globally across all pages and frames
    let cursorDot = document.querySelector('.cursor-dot');
    let cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
    }
    if (!cursorOutline) {
        cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorOutline);
    }

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;
    let isMoving = false;
    let isVisible = false;

    function showCursor() {
        if (!isVisible && isMoving) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            isVisible = true;
        }
    }

    function hideCursor() {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
        isVisible = false;
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isMoving) {
            outlineX = mouseX;
            outlineY = mouseY;
            isMoving = true;
        }

        showCursor();

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    window.addEventListener('blur', hideCursor);
    window.addEventListener('focus', showCursor);

    // Smooth physics loop with requestAnimationFrame (avoids layout thrashing)
    function renderCursor() {
        if (isMoving) {
            const ease = 0.2;
            outlineX += (mouseX - outlineX) * ease;
            outlineY += (mouseY - outlineY) * ease;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Tactile click feedback
    document.addEventListener('mousedown', () => {
        cursorOutline.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', () => {
        cursorOutline.classList.remove('cursor-click');
    });

    // Comprehensive event delegation for interactive hover states across all elements
    const interactiveSelector = [
        'a', 'button', 'input', 'textarea', 'select', 'label', 'summary',
        '[role="button"]', '[role="link"]', '[onclick]', '[tabindex="0"]',
        '.filter-btn', '.project-card', '.certificate-card-img', '.btn',
        '.hamburger', '.social-icon', '.social-link', '.nav-links a',
        '.contact-card', '.cv-card', '.case-nav-card', '.info-card-clickable',
        '.theme-toggle', '.theme-btn', '.carousel-nav-btn', '.tools-nav-btn',
        '[data-preview-project]'
    ].join(', ');

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorOutline.classList.add('hover-effect');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorOutline.classList.remove('hover-effect');
        }
    });
}

// --- 2. ACCESSIBLE MOBILE NAVIGATION ---
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    function toggleNav(open) {
        const isOpen = open !== undefined ? open : !navLinks.classList.contains('active');
        navLinks.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    hamburger.addEventListener('click', () => toggleNav());

    // Close on navigation click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleNav(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleNav(false);
            hamburger.focus();
        }
    });

    // Close on backdrop click
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            toggleNav(false);
        }
    });
}

// --- 3. SCROLL EFFECTS & REVEAL ANIMATIONS ---
function initScrollEffects() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Scroll Reveal with reduced-motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hiddenElements = document.querySelectorAll('.hidden');

    if (prefersReducedMotion) {
        hiddenElements.forEach(el => el.classList.add('show'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '20px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    hiddenElements.forEach(el => observer.observe(el));
}

// --- 4. MULTI-CATEGORY PORTFOLIO FILTER ENGINE ---
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter') || 'all';

            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            projectCards.forEach(card => {
                const rawCategory = card.getAttribute('data-category') || '';
                const categories = rawCategory.toLowerCase().trim().split(/\s+/);
                const matches = filterValue === 'all' || categories.includes(filterValue.toLowerCase());

                if (matches) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px)';
                    setTimeout(() => {
                        if (!card.style.opacity || card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// --- 5. ACCESSIBLE CERTIFICATE LIGHTBOX MODAL ---
function initCertificateModal() {
    let modal = document.getElementById('certModal');
    let modalImg = document.getElementById('certModalImg');
    let modalCaption = document.getElementById('certModalCaption');

    // Create modal DOM dynamically if missing on page
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'certModal';
        modal.className = 'cert-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'certModalCaption');
        modal.innerHTML = `
            <button type="button" class="cert-modal-close" aria-label="Close certificate preview">&times;</button>
            <img class="cert-modal-content" id="certModalImg" alt="Certificate Preview">
            <p class="cert-modal-caption" id="certModalCaption"></p>
        `;
        document.body.appendChild(modal);
        modalImg = document.getElementById('certModalImg');
        modalCaption = document.getElementById('certModalCaption');
    }

    const closeBtn = modal.querySelector('.cert-modal-close');

    function openModal(src, caption, triggerEl) {
        lastActiveModalTrigger = triggerEl || document.activeElement;
        modalImg.src = src;
        modalImg.alt = caption || 'Certificate Preview';
        if (modalCaption) {
            modalCaption.textContent = caption || '';
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (lastActiveModalTrigger && typeof lastActiveModalTrigger.focus === 'function') {
            lastActiveModalTrigger.focus();
        }
    }

    // Attach to any certificate preview elements or buttons
    document.addEventListener('click', (e) => {
        const certImg = e.target.closest('.certificate-card-img');
        const certBtn = e.target.closest('[data-cert-src]');

        if (certImg) {
            const caption = certImg.getAttribute('alt') || 'Official Credential';
            openModal(certImg.src, caption, certImg);
        } else if (certBtn) {
            const src = certBtn.getAttribute('data-cert-src');
            const caption = certBtn.getAttribute('data-cert-caption') || 'Official Credential';
            openModal(src, caption, certBtn);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Close when clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Expose helpers globally for inline onclick handlers if present
    window.openCertModal = (src, caption) => openModal(src, caption);
    window.closeCertModal = () => closeModal();
}

// (Old contact form merged into initBriefFunnel below)

// --- 7. ACCESSIBLE RESUME / CV MODAL ---
function initResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.resume-modal-close');
    const printBtn = modal.querySelector('.resume-print-btn');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.open('resume.html', '_blank');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Expose helpers globally
    window.openResumeModal = openModal;
    window.closeResumeModal = closeModal;
}

// --- 8. THEME TOGGLE (DARK / LIGHT MODE) ---
function initThemeToggle() {
    const savedTheme = localStorage.getItem('jkb_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.setAttribute('aria-label', `Switch to ${savedTheme === 'dark' ? 'Light' : 'Dark'} Mode`);
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('jkb_theme', nextTheme);
            btn.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'Light' : 'Dark'} Mode`);
        });
    });
}

// --- 9. INTERACTIVE PROJECT CAROUSEL & VIEW SWITCHER ---
function initProjectCarousel() {
    const track = document.getElementById('projectSliderTrack');
    const prevBtn = document.getElementById('projectPrevBtn');
    const nextBtn = document.getElementById('projectNextBtn');
    const dotsContainer = document.getElementById('projectDots');
    const viewBtns = document.querySelectorAll('.view-mode-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    if (!track) return;

    // View Mode Toggle (Slide View vs Grid View)
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.getAttribute('data-view');

            if (mode === 'grid') {
                track.classList.add('grid-mode');
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                if (dotsContainer) dotsContainer.style.display = 'none';
            } else {
                track.classList.remove('grid-mode');
                if (prevBtn) prevBtn.style.display = 'flex';
                if (nextBtn) nextBtn.style.display = 'flex';
                if (dotsContainer) dotsContainer.style.display = 'flex';
                updateDots();
            }
        });
    });

    function getCardWidth() {
        const firstVisible = track.querySelector('.project-card:not([style*="display: none"])');
        return firstVisible ? firstVisible.offsetWidth + 24 : 340;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        });
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
        visibleCards.forEach((card, idx) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
            dot.addEventListener('click', () => {
                card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            });
            dotsContainer.appendChild(dot);
        });
    }

    track.addEventListener('scroll', () => {
        if (track.classList.contains('grid-mode') || !dotsContainer) return;
        const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
        const scrollLeft = track.scrollLeft;
        const cardWidth = getCardWidth();
        const activeIdx = Math.round(scrollLeft / cardWidth);

        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIdx);
        });
    }, { passive: true });

    // Category Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter') || 'all';

            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            cards.forEach(card => {
                const rawCategory = card.getAttribute('data-category') || '';
                const categories = rawCategory.toLowerCase().trim().split(/\s+/);
                const matches = filterValue === 'all' || categories.includes(filterValue.toLowerCase());

                if (matches) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });

            track.scrollTo({ left: 0, behavior: 'smooth' });
            setTimeout(updateDots, 350);
        });
    });

    // 3D Perspective Card Tilt on Desktop
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const tiltX = (y / (rect.height / 2)) * -5;
                const tiltY = (x / (rect.width / 2)) * 5;
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    updateDots();
}

// --- 10. TOOLS & TECH STACK SLIDESHOW (SEAMLESS INFINITE LOOP) ---
function initToolsSlideshow() {
    const track = document.getElementById('toolsTrack');
    const trackWrapper = document.getElementById('toolsTrackWrapper');
    const prevBtn = document.getElementById('toolsPrevBtn');
    const nextBtn = document.getElementById('toolsNextBtn');
    const filterBtns = document.querySelectorAll('.tool-filter-btn');

    if (!track || !trackWrapper) return;

    // Cache original cards for dynamic filtering and seamless duplication
    const originalCards = Array.from(track.querySelectorAll('.tool-card')).map(card => card.cloneNode(true));
    let loopWidth = 0;
    let isPaused = false;
    let resumeTimeout = null;
    let animationFrameId = null;
    let lastTime = null;
    let currentFilter = 'all';
    let currentMatching = [];

    function updateMetrics() {
        const renderedCards = track.querySelectorAll('.tool-card');
        const count = currentMatching.length;
        if (renderedCards.length >= count * 2 && count > 0) {
            const card0 = renderedCards[0];
            const cardN = renderedCards[count];
            loopWidth = cardN.offsetLeft - card0.offsetLeft;
        } else {
            loopWidth = track.scrollWidth / 3;
        }
    }

    function buildTrack(filterValue) {
        currentFilter = filterValue;
        track.innerHTML = '';

        // Filter matching cards from cached templates
        currentMatching = originalCards.filter(card => {
            const cat = card.getAttribute('data-tool-category') || '';
            return filterValue === 'all' || cat.toLowerCase().includes(filterValue.toLowerCase());
        });

        if (currentMatching.length === 0) return;

        // Render 3 complete sets of cards for bidirectional seamless looping
        const copies = 3;
        for (let i = 0; i < copies; i++) {
            currentMatching.forEach(card => {
                const clone = card.cloneNode(true);
                clone.style.display = 'flex';
                track.appendChild(clone);
            });
        }

        // Measure metrics and set initial scroll position to the start of set 2
        requestAnimationFrame(() => {
            updateMetrics();
            if (loopWidth > 0) {
                trackWrapper.scrollLeft = loopWidth;
            }
        });
    }

    // Filter Button Handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-tool-filter') || 'all';
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            buildTrack(filterValue);
        });
    });

    // Arrow Button Handlers with smooth manual navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            isPaused = true;
            trackWrapper.scrollBy({ left: -280, behavior: 'smooth' });
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => { isPaused = false; }, 1800);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            isPaused = true;
            trackWrapper.scrollBy({ left: 280, behavior: 'smooth' });
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => { isPaused = false; }, 1800);
        });
    }

    // Mouse & Touch Pause / Resume
    trackWrapper.addEventListener('mouseenter', () => { isPaused = true; });
    trackWrapper.addEventListener('mouseleave', () => { isPaused = false; });
    trackWrapper.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    trackWrapper.addEventListener('touchend', () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => { isPaused = false; }, 1800);
    }, { passive: true });

    // Desktop Click-and-Drag Horizontal Scroll
    let isDragging = false;
    let startX = 0;
    let initialScrollLeft = 0;

    trackWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        isPaused = true;
        startX = e.pageX - trackWrapper.offsetLeft;
        initialScrollLeft = trackWrapper.scrollLeft;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - trackWrapper.offsetLeft;
        const walk = (x - startX) * 1.4;
        trackWrapper.scrollLeft = initialScrollLeft - walk;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => { isPaused = false; }, 1200);
        }
    });

    // Seamless Boundary Teleporting (Bidirectional)
    function checkWrapAround() {
        if (loopWidth <= 0) return;
        if (trackWrapper.scrollLeft >= loopWidth * 2) {
            trackWrapper.scrollLeft -= loopWidth;
        } else if (trackWrapper.scrollLeft <= 5) {
            trackWrapper.scrollLeft += loopWidth;
        }
    }

    trackWrapper.addEventListener('scroll', checkWrapAround, { passive: true });

    window.addEventListener('resize', () => {
        updateMetrics();
    });

    // Silky Continuous Animation Loop via requestAnimationFrame
    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const delta = Math.min(currentTime - lastTime, 50); // Cap delta to prevent jump on tab focus
        lastTime = currentTime;

        if (!isPaused && loopWidth > 0) {
            // Constant velocity gliding (~42px / second)
            trackWrapper.scrollLeft += 0.042 * delta;
            checkWrapAround();
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // Initialize initial track and start continuous loop
    buildTrack('all');
    animationFrameId = requestAnimationFrame(animate);
}

// --- 11. QUICK PREVIEW MODAL ---
function initQuickPreviewModal() {
    const modal = document.getElementById('quickPreviewModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.preview-modal-close');

    function openPreview(data) {
        const titleEl = modal.querySelector('#previewModalTitle');
        const roleEl = modal.querySelector('#previewModalRole');
        const badgeEl = modal.querySelector('#previewModalBadge');
        const descEl = modal.querySelector('#previewModalDesc');
        const stackEl = modal.querySelector('#previewModalStack');
        const linkEl = modal.querySelector('#previewModalLink');
        const imgEl = modal.querySelector('#previewModalImg');
        const videoEl = modal.querySelector('#previewModalVideo');

        if (titleEl) titleEl.textContent = data.title;
        if (roleEl) roleEl.textContent = data.role;
        if (badgeEl) badgeEl.textContent = data.badge;
        if (descEl) descEl.textContent = data.desc;
        if (linkEl) {
            linkEl.href = data.link;
            linkEl.textContent = data.linkText || 'Read Full Case Study →';
        }

        if (data.video && videoEl) {
            if (imgEl) imgEl.style.display = 'none';
            videoEl.style.display = 'block';
            videoEl.src = data.video;
            if (data.img) videoEl.poster = data.img;
            videoEl.load();
        } else {
            if (videoEl) {
                videoEl.pause();
                videoEl.removeAttribute('src');
                videoEl.style.display = 'none';
            }
            if (imgEl && data.img) {
                imgEl.src = data.img;
                imgEl.alt = data.title;
                imgEl.style.display = 'block';
            }
        }

        if (stackEl && data.stack) {
            stackEl.innerHTML = data.stack.map(s => `<span>${s}</span>`).join('');
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePreview() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        const videoEl = modal.querySelector('#previewModalVideo');
        if (videoEl) {
            videoEl.pause();
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closePreview);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePreview();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closePreview();
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-preview-project]');
        if (btn) {
            const projectKey = btn.getAttribute('data-preview-project');
            const previewData = {
                'flare-alert': {
                    title: 'Flare Alert — Emergency Response System',
                    role: 'Lead Developer & UI/UX Designer',
                    badge: '2x Capstone Award Winner',
                    img: 'assets/photo/flare-alert-logo.png',
                    video: 'assets/video/gemini_generated_video_f9a4b30f.mp4',
                    desc: 'Cross-platform mobile emergency reporting application engineered in Flutter, Firebase, and Node.js. Captures real-time GPS coordinates, broadcasts incident alerts to nearby responders, and tracks lifecycle status.',
                    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Node.js', 'Google APIs'],
                    link: 'project-flare-alert.html',
                    linkText: 'Explore Engineering Case Study →'
                },
                'ecofertile': {
                    title: 'Ecofertile — Sustainable Waste Filtration System',
                    role: 'UI/UX Designer & Prototype Developer',
                    badge: 'Rank 2 & 3 Awards',
                    img: 'assets/photo/ecofertile.jpg',
                    video: 'assets/video/10000000_6594936010524684_3972209154721685950_n.mp4',
                    desc: 'Award-winning AgriTech interface converting agricultural solid and liquid animal waste into organic fertilizer. Features intuitive stage telemetry, high-contrast monitors, and 3D simulation animation.',
                    stack: ['Figma', 'UI/UX Design', 'HTML5/CSS3', 'JavaScript', '3D Simulation'],
                    link: 'project-ecofertile.html',
                    linkText: 'Explore UI/UX Case Study →'
                },
                'treasury': {
                    title: 'Municipal Treasury Records & Operations',
                    role: 'IT Intern & Operations Specialist',
                    badge: '450-Hour Public Sector Practicum',
                    img: 'assets/photo/jkb-logo.jpg',
                    desc: 'High-volume administrative data verification, digital record indexing, taxpayer assistance, and document tracking executed at the Treasurer\'s Department, Caloocan City Hall.',
                    stack: ['Records Management', 'Data Verification', 'Spreadsheet Ops', 'Public Service QA'],
                    link: 'index.html#experience',
                    linkText: 'View Operations Timeline →'
                },
                'pipeline': {
                    title: 'Cloud Lead Capture & Operations Pipeline',
                    role: 'Full-Stack & Cloud Developer',
                    badge: 'Live Interactive Pipeline',
                    img: 'assets/photo/jkb-logo.jpg',
                    desc: 'Automated client inquiry triage, real-time Supabase cloud database logging, honeypot spam suppression, and CRM routing designed for zero-drop customer response.',
                    stack: ['Supabase', 'CRM Automation', 'Inbox/Calendar Ops', 'Client Success'],
                    link: 'index.html#contact',
                    linkText: 'Test Live Inquiry Pipeline →'
                }
            };

            if (previewData[projectKey]) {
                openPreview(previewData[projectKey]);
            }
        }
    });

    window.closeQuickPreview = closePreview;
}

// --- DIRECT EMAIL GMAIL COMPOSE INTEGRATION ---
function initDirectEmailCard() {
    const emailCard = document.getElementById('directEmailCard');
    if (!emailCard) return;

    function openGmailCompose(e) {
        if (e) e.preventDefault();
        const recipient = 'floreskenneth319@gmail.com';
        const subject = encodeURIComponent('Project Inquiry via Portfolio - John Kenneth Buhay');
        const body = encodeURIComponent(
            'Hi John Kenneth,\n\n' +
            'I reviewed your portfolio and would like to get in touch regarding a project or opportunity.\n\n' +
            'Project Scope / Inquiries:\n\n' +
            'Best regards,\n'
        );
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
        
        // Open Gmail compose in a new tab without passing 'noopener' to window.open (which causes null return)
        const win = window.open(gmailUrl, '_blank');
        if (win) {
            try { win.opener = null; } catch (err) { /* ignore */ }
        } else {
            // Fallback for pop-up blockers: standard mailto link
            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        }
    }

    emailCard.addEventListener('click', openGmailCompose);
    emailCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            openGmailCompose(e);
        }
    });
}

// --- PROJECT BRIEF FUNNEL (Unified inquiry generator) ---
function initBriefFunnel() {
    const funnel = document.getElementById('briefFunnel');
    if (!funnel) return;

    const RECIPIENT = 'floreskenneth319@gmail.com';
    const options = funnel.querySelectorAll('.inquiry-tab');
    const dynamicWrap = document.getElementById('briefDynamicFields');
    const badgeText = document.getElementById('briefBadgeText');
    const preview = document.getElementById('briefPreview');
    const nameInput = document.getElementById('briefName');
    const contactInput = document.getElementById('briefContact');
    const fieldWrapName = document.getElementById('fieldWrapName');
    const fieldWrapContact = document.getElementById('fieldWrapContact');
    const honeypot = document.getElementById('website_url');
    const copyBtn = document.getElementById('briefCopyBtn');
    const sendBtn = document.getElementById('briefSendBtn');
    const statusEl = document.getElementById('briefStatus');

    const TIMELINES = ['Flexible / Consultation', 'ASAP (within 2 weeks)', '1 month', '2–3 months', '3+ months'];

    const MODES = {
        capstone: {
            label: '1. Capstone / Academic System',
            short: 'Capstone / Academic',
            badge: 'CAPSTONE / ACADEMIC SYSTEM BRIEF',
            detailsHeading: 'System Requirements',
            fields: [
                { key: 'school', label: 'School / Program', type: 'text', placeholder: 'e.g., BSIT — 4th Year' },
                { key: 'platform', label: 'Target Platform', type: 'select', options: ['Mobile App (Flutter)', 'Web System (Laravel / PHP)', 'Web + Mobile (Full Stack)', 'Firebase Cloud System', 'Not sure yet'] },
                { key: 'stage', label: 'Current Stage', type: 'select', options: ['Title Proposal', 'Development', 'Defense Prep', 'Revisions / Final Polish'] },
                { key: 'timeline', label: 'Target Timeline', type: 'select', options: TIMELINES },
                { key: 'details', label: 'System Requirements', type: 'textarea', placeholder: 'Describe the system title, core modules, and what your panel expects...' }
            ]
        },
        business: {
            label: '2. Business Web & Mobile App',
            short: 'Business Web & App',
            badge: 'BUSINESS WEB & MOBILE APP BRIEF',
            detailsHeading: 'System Requirements',
            fields: [
                { key: 'brand', label: 'Business / Brand Name', type: 'text', placeholder: 'e.g., Santos Bakery Co.' },
                { key: 'product', label: 'Product Type', type: 'select', options: ['Web Dashboard / Portal', 'Customer Mobile App', 'Booking / Inventory System', 'Landing Page / Website', 'Web + Mobile Bundle'] },
                { key: 'budget', label: 'Budget Range', type: 'select', options: ['₱20k – ₱50k', '₱50k – ₱100k', '₱100k – ₱200k', '₱200k+', 'Let\u2019s discuss'] },
                { key: 'timeline', label: 'Target Timeline', type: 'select', options: TIMELINES },
                { key: 'details', label: 'System Requirements', type: 'textarea', placeholder: 'Describe the business problem, key users, and must-have features...' }
            ]
        },
        engineering: {
            label: '3. Full-Time / Contract Engineering Role',
            short: 'Engineering Role',
            badge: 'ENGINEERING ROLE RECRUITMENT BRIEF',
            detailsHeading: 'Role Details',
            fields: [
                { key: 'company', label: 'Company / Team', type: 'text', placeholder: 'e.g., Tech Corp — Platform Team' },
                { key: 'role', label: 'Role', type: 'select', options: ['Full-Stack Developer', 'Flutter Mobile Engineer', 'Systems Developer', 'Frontend Developer', 'Backend Developer'] },
                { key: 'arrangement', label: 'Arrangement', type: 'select', options: ['Full-Time • Onsite (Metro Manila)', 'Full-Time • Remote', 'Full-Time • Hybrid', 'Contract • Remote', 'Contract • Onsite / Hybrid'] },
                { key: 'timeline', label: 'Target Timeline', type: 'select', options: TIMELINES },
                { key: 'details', label: 'Role Details', type: 'textarea', placeholder: 'Share the role scope, team, tech stack, and interview process...' }
            ]
        }
    };

    // Per-mode values persist when switching tabs
    const state = { capstone: {}, business: {}, engineering: {} };
    let mode = funnel.getAttribute('data-brief-mode') || 'capstone';
    if (!MODES[mode]) mode = 'capstone';

    function createFieldElement(field, config, values) {
        const id = `brief_${mode}_${field.key}`;
        const wrap = document.createElement('div');
        wrap.className = 'brief-field';
        wrap.id = `fieldWrap_${mode}_${field.key}`;

        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = field.label;

        let control;
        if (field.type === 'select') {
            control = document.createElement('select');
            field.options.forEach(opt => {
                const o = document.createElement('option');
                o.value = opt;
                o.textContent = opt;
                control.appendChild(o);
            });
            if (values[field.key] === undefined) values[field.key] = field.options[0];
        } else if (field.type === 'textarea') {
            control = document.createElement('textarea');
            control.rows = 4;
            control.placeholder = field.placeholder || '';
        } else {
            control = document.createElement('input');
            control.type = 'text';
            control.placeholder = field.placeholder || '';
        }

        control.id = id;
        control.name = field.key;
        control.value = values[field.key] || '';

        const update = () => {
            values[field.key] = control.value;
            wrap.classList.remove('has-error');
            renderPreview();
        };
        control.addEventListener('input', update);
        control.addEventListener('change', update);

        wrap.appendChild(label);
        wrap.appendChild(control);
        return wrap;
    }

    function renderFields() {
        const config = MODES[mode];
        const values = state[mode];
        dynamicWrap.textContent = '';

        let currentRow = null;
        config.fields.forEach(field => {
            const wrap = createFieldElement(field, config, values);
            if (field.type === 'textarea') {
                currentRow = null;
                dynamicWrap.appendChild(wrap);
            } else {
                if (!currentRow || currentRow.children.length >= 2) {
                    currentRow = document.createElement('div');
                    currentRow.className = 'form-row-2col';
                    dynamicWrap.appendChild(currentRow);
                }
                currentRow.appendChild(wrap);
            }
        });

        // Restart fade-in transition on mode switch
        dynamicWrap.style.animation = 'none';
        void dynamicWrap.offsetWidth;
        dynamicWrap.style.animation = '';
    }

    function buildBrief() {
        const config = MODES[mode];
        const values = state[mode];
        const name = nameInput ? nameInput.value.trim() : '';
        const contact = contactInput ? contactInput.value.trim() : '';
        const lines = [
            'Hi John Kenneth,',
            '',
            `I'm reaching out about: ${config.label}`,
            '',
            `— ${config.badge} —`,
            `Name: ${name || '[your name]'}`,
            `Email: ${contact || '[your email]'}`
        ];

        config.fields.forEach(field => {
            if (field.type === 'textarea') return;
            const val = (values[field.key] || '').trim();
            lines.push(`${field.label}: ${val || '—'}`);
        });

        const details = (values.details || '').trim();
        lines.push('', `${config.detailsHeading}:`);
        lines.push(details || 'Let\u2019s schedule a quick call to discuss scope and next steps.');
        lines.push('', 'Sent from your portfolio inquiry funnel.');
        return lines.join('\n');
    }

    function renderPreview() {
        if (preview) {
            preview.textContent = buildBrief();
        }
    }

    function setStatus(message, type) {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.classList.toggle('is-error', type === 'error');
        statusEl.classList.toggle('is-success', type === 'success');
    }

    function setMode(next) {
        if (!MODES[next] || next === mode) return;
        mode = next;
        funnel.setAttribute('data-brief-mode', mode);
        options.forEach(opt => {
            const active = opt.getAttribute('data-brief-option') === mode;
            opt.classList.toggle('is-active', active);
            opt.setAttribute('aria-checked', active ? 'true' : 'false');
        });
        if (badgeText) badgeText.textContent = MODES[mode].badge;
        setStatus('', null);
        renderFields();
        renderPreview();
    }

    options.forEach(opt => {
        opt.addEventListener('click', () => setMode(opt.getAttribute('data-brief-option')));
        opt.addEventListener('keydown', (e) => {
            // Arrow-key navigation within the radiogroup
            if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
            e.preventDefault();
            const list = Array.from(options);
            const idx = list.indexOf(opt);
            const dir = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
            const target = list[(idx + dir + list.length) % list.length];
            target.focus();
            setMode(target.getAttribute('data-brief-option'));
        });
    });

    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (fieldWrapName) fieldWrapName.classList.remove('has-error');
            renderPreview();
        });
    }

    if (contactInput) {
        contactInput.addEventListener('input', () => {
            if (fieldWrapContact) fieldWrapContact.classList.remove('has-error');
            renderPreview();
        });
    }

    // Copy Brief
    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
        document.body.removeChild(ta);
        return ok;
    }

    let copyTimer = null;
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const text = buildBrief();
            let ok = false;
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    ok = true;
                } else {
                    ok = fallbackCopy(text);
                }
            } catch (err) {
                ok = fallbackCopy(text);
            }

            const labelEl = copyBtn.querySelector('span');
            if (ok) {
                copyBtn.classList.add('is-copied');
                if (labelEl) labelEl.textContent = 'Copied!';
                setStatus('Brief copied to clipboard.', 'success');
            } else {
                setStatus('Copy failed — please select the text manually.', 'error');
            }
            clearTimeout(copyTimer);
            copyTimer = setTimeout(() => {
                copyBtn.classList.remove('is-copied');
                if (labelEl) labelEl.textContent = 'Copy Brief';
            }, 2000);
        });
    }

    // Send via Email (Gmail compose with mailto fallback)
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            // Anti-spam honeypot detection
            if (honeypot && honeypot.value.trim() !== '') {
                setStatus('Inquiry sent successfully.', 'success');
                return;
            }

            const name = nameInput ? nameInput.value.trim() : '';
            const contact = contactInput ? contactInput.value.trim() : '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let firstInvalid = null;

            if (!name) {
                if (fieldWrapName) fieldWrapName.classList.add('has-error');
                firstInvalid = firstInvalid || nameInput;
            }
            if (!contact || !emailRegex.test(contact)) {
                if (fieldWrapContact) fieldWrapContact.classList.add('has-error');
                firstInvalid = firstInvalid || contactInput;
            }

            if (firstInvalid) {
                if (!name && !contact) {
                    setStatus('Please enter your name and a valid email address.', 'error');
                } else if (!name) {
                    setStatus('Please enter your name before sending.', 'error');
                } else {
                    setStatus('Please enter a valid email address (e.g. name@example.com).', 'error');
                }
                firstInvalid.focus();
                return;
            }

            const subject = encodeURIComponent(`[${MODES[mode].short}] Brief from ${name}`);
            const body = encodeURIComponent(buildBrief());
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT}&su=${subject}&body=${body}`;

            // Open Gmail compose in a new tab without passing 'noopener' in features (which causes null return)
            const win = window.open(gmailUrl, '_blank');
            if (win) {
                try { win.opener = null; } catch (err) { /* ignore */ }
                setStatus('Opening Gmail compose in a new tab…', 'success');
            } else {
                window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
                setStatus('Pop-up blocked — opening your default mail app instead.', 'success');
            }
        });
    }

    renderFields();
    renderPreview();
}

// --- DOM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCustomCursor();
    initMobileNav();
    initScrollEffects();
    initProjectCarousel();
    initToolsSlideshow();
    initQuickPreviewModal();
    initCertificateModal();
    initResumeModal();
    initDirectEmailCard();
    initBriefFunnel();
});