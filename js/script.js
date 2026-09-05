/* ==========================================================================
   ALLWIN JABARAJ — PORTFOLIO JAVASCRIPT
   Modular Client-Side Logic & Modern Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. DOM ELEMENT SELECTORS
       ---------------------------------------------------------------------- */
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const toastContainer = document.getElementById('toastContainer');
    const currentYearSpan = document.getElementById('currentYear');
    const emailCopyCard = document.getElementById('emailCopyCard');

    /* Resume Modal Selectors */
    const resumeNavBtn = document.getElementById('resumeNavBtn');
    const heroResumeBtn = document.getElementById('heroResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    /* Code Window Tab Selectors */
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeSnippetDisplay = document.getElementById('codeSnippetDisplay');

    /* Set current copyright year dynamically */
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------------
       2. STICKY NAVBAR SCROLL ELEVATION
       ---------------------------------------------------------------------- */
    const handleNavbarScroll = () => {
        if (window.scrollY > 30) {
            navbarWrapper.classList.add('scrolled');
        } else {
            navbarWrapper.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Initial check

    /* ----------------------------------------------------------------------
       3. MOBILE HAMBURGER MENU & DRAWER TOGGLE
       ---------------------------------------------------------------------- */
    const openMobileMenu = () => {
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    /* ----------------------------------------------------------------------
       4. RESUME MODAL HANDLERS
       ---------------------------------------------------------------------- */
    const openResumeModalHandler = () => {
        if (resumeModal) {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeResumeModalHandler = () => {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (resumeNavBtn) resumeNavBtn.addEventListener('click', openResumeModalHandler);
    if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModalHandler);
    if (closeResumeModal) closeResumeModal.addEventListener('click', closeResumeModalHandler);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeResumeModalHandler);

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModalHandler();
            }
        });
    }

    // Close overlays on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            if (resumeModal && resumeModal.classList.contains('active')) {
                closeResumeModalHandler();
            }
        }
    });

    /* ----------------------------------------------------------------------
       5. CODE WINDOW TAB SWITCHER
       ---------------------------------------------------------------------- */
    const codeSnippets = {
        server: `<code><span class="code-keyword">const</span> express = require(<span class="code-string">'express'</span>);
<span class="code-keyword">const</span> app = express();

<span class="code-comment">// Clean Architecture & Modular Middleware</span>
app.use(express.json());
app.use(<span class="code-string">'/api/v1/travel'</span>, travelRoutes);
app.use(<span class="code-string">'/api/v1/bookings'</span>, bookingController);

<span class="code-keyword">const</span> PORT = process.env.PORT || <span class="code-number">5000</span>;
app.listen(PORT, () => console.log(<span class="code-string">\`Server on \${PORT}\`</span>));</code>`,

        service: `<code><span class="code-comment">// Layered Service Architecture</span>
<span class="code-keyword">class</span> TravelService {
  <span class="code-keyword">constructor</span>(repository) {
    <span class="code-keyword">this</span>.repository = repository;
  }

  <span class="code-keyword">async</span> getAvailableRoutes(filter) {
    <span class="code-keyword">const</span> routes = <span class="code-keyword">await</span> <span class="code-keyword">this</span>.repository.find(filter);
    <span class="code-keyword">return</span> routes.map(r => <span class="code-keyword">this</span>.formatRouteData(r));
  }
}</code>`
    };

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabKey = tab.getAttribute('data-tab');
            if (codeSnippetDisplay && codeSnippets[tabKey]) {
                codeSnippetDisplay.innerHTML = codeSnippets[tabKey];
            }
        });
    });

    /* ----------------------------------------------------------------------
       6. SCROLL SPY ACTIVE SECTION HIGHLIGHTING
       ---------------------------------------------------------------------- */
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    /* ----------------------------------------------------------------------
       7. SCROLL REVEAL ANIMATIONS
       ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.fade-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ----------------------------------------------------------------------
       8. BACK TO TOP BUTTON
       ---------------------------------------------------------------------- */
    const handleBackToTopVisibility = () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ----------------------------------------------------------------------
       9. TOAST NOTIFICATION UTILITY
       ---------------------------------------------------------------------- */
    const showToast = (message, title = 'Notice') => {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
                <strong>${title}</strong>
                <div>${message}</div>
            </div>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };

    /* ----------------------------------------------------------------------
       10. EMAIL COPY QUICK ACTION
       ---------------------------------------------------------------------- */
    if (emailCopyCard) {
        emailCopyCard.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'allwinjabaraj4038@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email copied: allwinjabaraj4038@gmail.com', 'Copied to Clipboard');
            }).catch(() => {
                showToast('Email: allwinjabaraj4038@gmail.com', 'Contact Email');
            });
        });
    }

    /* ----------------------------------------------------------------------
       11. CONTACT FORM VALIDATION & SUBMISSION
       ---------------------------------------------------------------------- */
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        const setFieldError = (input, isError) => {
            const formGroup = input.closest('.form-group');
            if (isError) {
                formGroup.classList.add('error');
            } else {
                formGroup.classList.remove('error');
            }
        };

        // Real-time input clearing of errors
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                setFieldError(input, false);
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Name check
            if (!nameInput.value.trim()) {
                setFieldError(nameInput, true);
                isValid = false;
            } else {
                setFieldError(nameInput, false);
            }

            // Email check
            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                setFieldError(emailInput, true);
                isValid = false;
            } else {
                setFieldError(emailInput, false);
            }

            // Subject check
            if (!subjectInput.value.trim()) {
                setFieldError(subjectInput, true);
                isValid = false;
            } else {
                setFieldError(subjectInput, false);
            }

            // Message check (min 10 chars)
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                setFieldError(messageInput, true);
                isValid = false;
            } else {
                setFieldError(messageInput, false);
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                const originalBtnText = submitBtn.innerHTML;

                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span>`;

                setTimeout(() => {
                    showToast('Thank you! Your message has been sent successfully.', 'Message Sent');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 1000);
            }
        });
    }

});