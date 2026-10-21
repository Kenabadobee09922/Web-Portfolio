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

// --- 6. HARDENED ANTI-SPAM SUPABASE CONTACT FORM ---
// --- 6. RESPONSIVE CONTACT FORM WITH GMAIL COMPOSE INTEGRATION ---
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const statusEl = document.getElementById('formStatus') || createStatusElement(contactForm);

    function createStatusElement(form) {
        const div = document.createElement('div');
        div.id = 'formStatus';
        div.setAttribute('role', 'status');
        div.setAttribute('aria-live', 'polite');
        form.appendChild(div);
        return div;
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const honeypot = document.getElementById('website_url');

    const inputs = [nameInput, emailInput, serviceSelect, subjectInput, messageInput];

    // Real-time floating label sync & error clearing
    inputs.forEach(input => {
        if (!input) return;
        const syncValue = () => {
            const hasVal = Boolean(input.value && input.value.trim() !== '');
            input.parentElement.classList.toggle('has-value', hasVal);
            if (hasVal) {
                input.parentElement.classList.remove('has-error');
            }
        };

        input.addEventListener('input', syncValue);
        input.addEventListener('change', syncValue);
        input.addEventListener('blur', syncValue);
        syncValue();
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Anti-spam honeypot verification
        if (honeypot && honeypot.value.trim() !== '') {
            console.warn('Bot submission blocked via honeypot.');
            statusEl.className = 'success';
            statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Message received. Thank you!';
            contactForm.reset();
            return;
        }

        // 2. Extract input values
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const service = serviceSelect ? serviceSelect.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // 3. Clear previous error indicators
        inputs.forEach(input => {
            if (input && input.parentElement) {
                input.parentElement.classList.remove('has-error');
            }
        });
        statusEl.className = '';
        statusEl.innerHTML = '';

        // 4. Form Validation for all required fields
        const errors = [];
        let firstInvalidField = null;

        if (!name) {
            errors.push('Please enter your name.');
            if (nameInput) {
                nameInput.parentElement.classList.add('has-error');
                if (!firstInvalidField) firstInvalidField = nameInput;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push('Please enter your email address.');
            if (emailInput) {
                emailInput.parentElement.classList.add('has-error');
                if (!firstInvalidField) firstInvalidField = emailInput;
            }
        } else if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address (e.g., name@example.com).');
            if (emailInput) {
                emailInput.parentElement.classList.add('has-error');
                if (!firstInvalidField) firstInvalidField = emailInput;
            }
        }

        if (!service) {
            errors.push('Please select a service category.');
            if (serviceSelect) {
                serviceSelect.parentElement.classList.add('has-error');
                if (!firstInvalidField) firstInvalidField = serviceSelect;
            }
        }

        if (!subject) {
            errors.push('Please enter a subject.');
            if (subjectInput) {
                subjectInput.parentElement.classList.add('has-error');
                if (!firstInvalidField) firstInvalidField = subjectInput;
            }
        }

        if (!message) {
            errors.push('Please write your message.');
            if (messageInput) {
                messageInput.parentElement.classList.add('has-error');
                if (!firstInvalidField) firstInvalidField = messageInput;
            }
        }

        if (errors.length > 0) {
            statusEl.className = 'error';
            statusEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errors[0]}`;
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }

        // 5. Structure Email Content according to specifications
        const recipient = 'floreskenneth319@gmail.com';
        const formattedSubject = `[${service}] - ${subject}`;
        const formattedBody = `Name: ${name}\nEmail: ${email}\nService Category: ${service}\n\nMessage:\n${message}`;

        // 6. Generate Gmail Web Intent & fallback mailto URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;
        const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;

        // 7. Visual Feedback & Trigger Action
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Transmit Message';

        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane fa-spin"></i> Launching Gmail...';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;
            }, 3000);
        }

        statusEl.className = 'success';
        statusEl.innerHTML = `
            <i class="fas fa-check-circle"></i> <strong>Opening Gmail compose...</strong><br>
            <span style="font-size:0.85rem; opacity:0.9;">If Gmail did not open automatically, <a href="${mailtoUrl}" style="color:inherit;text-decoration:underline;font-weight:600;">click here to open your default email app</a>.</span>
        `;

        // Direct action: open Gmail compose in new tab
        const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
            window.location.href = mailtoUrl;
        }
    });
}

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

// --- 10. TOOLS & TECH STACK SLIDESHOW ---
function initToolsSlideshow() {
    const track = document.getElementById('toolsTrack');
    const trackWrapper = document.getElementById('toolsTrackWrapper');
    const prevBtn = document.getElementById('toolsPrevBtn');
    const nextBtn = document.getElementById('toolsNextBtn');
    const filterBtns = document.querySelectorAll('.tool-filter-btn');
    const cards = document.querySelectorAll('.tool-card');

    if (!track || !trackWrapper) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-tool-filter') || 'all';

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const cat = card.getAttribute('data-tool-category') || '';
                const matches = filterValue === 'all' || cat.toLowerCase().includes(filterValue.toLowerCase());
                if (matches) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            trackWrapper.scrollTo({ left: 0, behavior: 'smooth' });
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            trackWrapper.scrollBy({ left: -280, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            trackWrapper.scrollBy({ left: 280, behavior: 'smooth' });
        });
    }

    let isPaused = false;
    let autoScrollInterval = setInterval(() => {
        if (isPaused) return;
        if (trackWrapper.scrollLeft + trackWrapper.clientWidth >= trackWrapper.scrollWidth - 10) {
            trackWrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            trackWrapper.scrollBy({ left: 1.2, behavior: 'auto' });
        }
    }, 35);

    trackWrapper.addEventListener('mouseenter', () => { isPaused = true; });
    trackWrapper.addEventListener('mouseleave', () => { isPaused = false; });
    trackWrapper.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    trackWrapper.addEventListener('touchend', () => {
        setTimeout(() => { isPaused = false; }, 1500);
    }, { passive: true });
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
        
        // Direct action: Open Gmail compose in a new tab
        const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
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
    initContactForm();
    initResumeModal();
    initDirectEmailCard();
});