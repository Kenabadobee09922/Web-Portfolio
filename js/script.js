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

// --- 1. TOUCH-SAFE HIGH-PERFORMANCE CUSTOM CURSOR ---
function initCustomCursor() {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline) return;

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isMoving) {
            outlineX = mouseX;
            outlineY = mouseY;
            isMoving = true;
        }

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    // Smooth physics loop with requestAnimationFrame (avoids layout thrashing)
    function renderCursor() {
        if (isMoving) {
            const ease = 0.18;
            outlineX += (mouseX - outlineX) * ease;
            outlineY += (mouseY - outlineY) * ease;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Event delegation for hover states
    const interactiveSelector = 'a, button, input, textarea, select, .filter-btn, .project-card, .certificate-card-img, .btn, .hamburger';

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

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Message';

        // 1. Anti-spam honeypot verification
        const honeypot = document.getElementById('website_url');
        if (honeypot && honeypot.value.trim() !== '') {
            console.warn('Bot detected via honeypot.');
            if (submitBtn) submitBtn.disabled = true;
            statusEl.className = 'success';
            statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Message received. Thank you!';
            contactForm.reset();
            return;
        }

        // 2. Client-side rate limiting (60 second cooldown)
        const RATE_LIMIT_MS = 60 * 1000;
        const lastSent = localStorage.getItem('jkb_last_inquiry_ts');
        const now = Date.now();

        if (lastSent && now - parseInt(lastSent, 10) < RATE_LIMIT_MS) {
            const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - parseInt(lastSent, 10))) / 1000);
            statusEl.className = 'error';
            statusEl.innerHTML = `<i class="fas fa-hourglass-half"></i> Please wait ${waitSeconds} seconds before submitting another inquiry.`;
            return;
        }

        // 3. Extract & Validate form values
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const serviceSelect = document.getElementById('service');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const service = serviceSelect ? serviceSelect.value : 'General Inquiry';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Email regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !message) {
            statusEl.className = 'error';
            statusEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.';
            return;
        }

        if (!emailRegex.test(email)) {
            statusEl.className = 'error';
            statusEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.';
            emailInput.focus();
            return;
        }

        // Set Loading UI state
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
            submitBtn.disabled = true;
        }
        statusEl.className = '';
        statusEl.innerHTML = '';

        try {
            if (!supabaseClient) {
                // If Supabase credentials are not populated yet, offer graceful fallback
                console.info('Supabase URL/Key unconfigured. Opening fallback mail client...');
                const mailtoBody = encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
                );
                const mailtoUrl = `mailto:floreskenneth319@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry: ' + service)}&body=${mailtoBody}`;
                
                statusEl.className = 'success';
                statusEl.innerHTML = `
                    <i class="fas fa-info-circle"></i> Opening default mail app... If it didn't open, email me directly at 
                    <a href="mailto:floreskenneth319@gmail.com" style="color:var(--accent-indigo);text-decoration:underline;">floreskenneth319@gmail.com</a>.
                `;
                window.location.href = mailtoUrl;
                contactForm.reset();
                localStorage.setItem('jkb_last_inquiry_ts', Date.now().toString());
                return;
            }

            // Real Supabase insert
            const { data, error } = await supabaseClient
                .from('inquiries')
                .insert([
                    {
                        name: name,
                        email: email,
                        service: service,
                        subject: subject,
                        message: message
                    }
                ]);

            if (error) throw error;

            // Success state
            localStorage.setItem('jkb_last_inquiry_ts', Date.now().toString());
            statusEl.className = 'success';
            statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I will respond within 24 hours.';
            contactForm.reset();

            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = '#10b981';
            }
        } catch (err) {
            console.error('Contact Form Submission Error:', err);
            statusEl.className = 'error';
            statusEl.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i> Network submission error. Please email directly at 
                <a href="mailto:floreskenneth319@gmail.com" style="color:#ffffff;text-decoration:underline;">floreskenneth319@gmail.com</a>.
            `;
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-redo"></i> Try Again';
                submitBtn.style.background = '#ef4444';
            }
        } finally {
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }
            }, 4000);
        }
    });
}

// --- DOM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initMobileNav();
    initScrollEffects();
    initPortfolioFilter();
    initCertificateModal();
    initContactForm();
});