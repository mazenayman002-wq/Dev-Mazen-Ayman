/**
 * ==============================================================================
 * MAZEN AYMAN - FLUTTER DEVELOPER PORTFOLIO
 * Vanilla JavaScript Modular Architecture
 * Zero external libraries • High-performance • Production-ready
 * ==============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. PROJECT DATA & STRICT IMAGE ASSETS MAPPING
     Strict numerical ordering verified directly from desktop disk inspection.
     ========================================================================== */
  const PROJECTS_DATA = {
    erp: {
      id: 'erp',
      title: 'Accounting & Inventory ERP System',
      badge: 'Desktop & Cross-Platform • Enterprise',
      total: 11,
      // Strict 1 to 11 numerical sequence
      images: [
        'images/erp/1.jpeg',
        'images/erp/2.jpeg',
        'images/erp/3.jpeg',
        'images/erp/4.jpeg',
        'images/erp/5.jpeg',
        'images/erp/6.jpeg',
        'images/erp/7.jpeg',
        'images/erp/8.jpeg',
        'images/erp/9.jpeg',
        'images/erp/10.jpeg',
        'images/erp/11.jpeg'
      ],
      fallbackPathPrefix: 'C:/Users/Mazen/Desktop/image/erp/'
    },
    metro: {
      id: 'metro',
      title: 'Cairo Metro Navigation & Ticketing Assistant',
      badge: 'Mobile Application • Transit & Geolocation',
      total: 1,
      images: [
        'images/metro/metro.jpeg'
      ],
      fallbackPathPrefix: 'C:/Users/Mazen/Desktop/image/metro/'
    },
    gourmet: {
      id: 'gourmet',
      title: 'Gourmet Survey & Feedback App',
      badge: 'Mobile Application • Hospitality & CX',
      total: 9,
      // Strict 1 to 9 numerical sequence
      images: [
        'images/gourmet/1.jpeg',
        'images/gourmet/2.jpeg',
        'images/gourmet/3.jpeg',
        'images/gourmet/4.jpeg',
        'images/gourmet/5.jpeg',
        'images/gourmet/6.jpeg',
        'images/gourmet/7.jpeg',
        'images/gourmet/8.jpeg',
        'images/gourmet/9.jpeg'
      ],
      fallbackPathPrefix: 'C:/Users/Mazen/Desktop/image/gourmet/'
    }
  };

  /* ==========================================================================
     2. TOAST NOTIFICATION MODULE
     Provides accessible, non-intrusive feedback for clipboard and form actions.
     ========================================================================== */
  const Toast = {
    container: document.getElementById('toast-container'),

    show(message, type = 'success') {
      if (!this.container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.setAttribute('role', 'status');

      const iconSvg = type === 'success'
        ? `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
        : `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

      toast.innerHTML = `
        ${iconSvg}
        <span class="toast-text">${message}</span>
      `;

      this.container.appendChild(toast);

      // Auto-remove after 3.2 seconds
      setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => {
          if (toast.parentElement) toast.remove();
        });
      }, 3000);
    }
  };

  /* ==========================================================================
     3. NAVIGATION & SCROLL MODULE
     Sticky header shadow, mobile menu toggle, active link tracking, back-to-top.
     ========================================================================== */
  const Navigation = {
    header: document.getElementById('header'),
    mobileToggle: document.getElementById('mobile-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    backToTopBtn: document.getElementById('back-to-top'),

    init() {
      this.bindEvents();
      this.initScrollSpy();
    },

    bindEvents() {
      // Sticky header elevation on scroll
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
      }, { passive: true });

      // Mobile menu toggle
      if (this.mobileToggle && this.navMenu) {
        this.mobileToggle.addEventListener('click', () => {
          const isOpen = this.navMenu.classList.toggle('open');
          this.mobileToggle.classList.toggle('active', isOpen);
          this.mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when clicking any nav link
        this.navLinks.forEach(link => {
          link.addEventListener('click', () => {
            this.navMenu.classList.remove('open');
            this.mobileToggle.classList.remove('active');
            this.mobileToggle.setAttribute('aria-expanded', 'false');
          });
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
          if (
            this.navMenu.classList.contains('open') &&
            !this.navMenu.contains(e.target) &&
            !this.mobileToggle.contains(e.target)
          ) {
            this.navMenu.classList.remove('open');
            this.mobileToggle.classList.remove('active');
            this.mobileToggle.setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Back to top button
      if (this.backToTopBtn) {
        this.backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    },

    initScrollSpy() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = this.navLinks;

      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -70% 0px'
      });

      sections.forEach(section => observer.observe(section));
    }
  };

  /* ==========================================================================
     4. SCROLL REVEAL (INTERSECTION OBSERVER)
     Subtle, crisp entrance animations with zero layout jank.
     ========================================================================== */
  const ScrollReveal = {
    init() {
      const revealElements = document.querySelectorAll('[data-reveal]');
      if (!revealElements.length) return;

      if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    }
  };

  /* ==========================================================================
     5. IN-CARD PROJECT GALLERIES
     Handles the thumbnail clicks, next/prev slide navigation on individual cards.
     ========================================================================== */
  const CardGalleries = {
    state: {
      erp: 0,
      metro: 0,
      gourmet: 0
    },

    init() {
      this.setupGallery('erp');
      this.setupGallery('metro');
      this.setupGallery('gourmet');
    },

    setupGallery(projectId) {
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      const container = document.querySelector(`.gallery-container[data-gallery="${projectId}"]`);
      if (!container) return;

      const mainImg = container.querySelector('.gallery-main-img');
      const counter = container.querySelector('.stage-counter');
      const prevBtn = container.querySelector('.gallery-nav-btn[data-action="prev"]');
      const nextBtn = container.querySelector('.gallery-nav-btn[data-action="next"]');
      const thumbBtns = container.querySelectorAll('.thumb-btn');
      const fullscreenBtn = container.querySelector('.expand-btn');

      // Click on main image opens lightbox directly
      if (mainImg) {
        mainImg.addEventListener('click', () => {
          Lightbox.open(projectId, this.state[projectId]);
        });
      }

      // Fullscreen expand button
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Lightbox.open(projectId, this.state[projectId]);
        });
      }

      // Next / Prev buttons
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.navigate(projectId, -1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.navigate(projectId, 1);
        });
      }

      // Thumbnails click
      thumbBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetIndex = parseInt(btn.getAttribute('data-index'), 10);
          this.goToIndex(projectId, targetIndex);
        });
      });
    },

    navigate(projectId, direction) {
      const data = PROJECTS_DATA[projectId];
      const newIndex = (this.state[projectId] + direction + data.total) % data.total;
      this.goToIndex(projectId, newIndex);
    },

    goToIndex(projectId, index) {
      const data = PROJECTS_DATA[projectId];
      if (index < 0 || index >= data.total) return;

      this.state[projectId] = index;
      const container = document.querySelector(`.gallery-container[data-gallery="${projectId}"]`);
      if (!container) return;

      const mainImg = container.querySelector('.gallery-main-img');
      const counter = document.getElementById(`${projectId}-counter`);
      const thumbBtns = container.querySelectorAll('.thumb-btn');

      if (mainImg) {
        mainImg.style.opacity = '0.4';
        setTimeout(() => {
          mainImg.src = data.images[index];
          mainImg.setAttribute('data-index', index);
          mainImg.alt = `${data.title} - Screenshot ${index + 1}`;
          mainImg.style.opacity = '1';
        }, 120);
      }

      if (counter) {
        counter.textContent = `${index + 1} / ${data.total}`;
      }

      // Update thumbnails active state
      thumbBtns.forEach((btn, idx) => {
        const isActive = idx === index;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }
  };

  /* ==========================================================================
     6. GLOBAL LIGHTBOX MODAL
     Universal fullscreen interactive viewer supporting both single and multi-image
     projects with keyboard navigation (Esc, Left, Right) and touch gestures.
     ========================================================================== */
  const Lightbox = {
    modal: document.getElementById('lightbox-modal'),
    backdrop: document.getElementById('lightbox-backdrop'),
    closeBtn: document.getElementById('lightbox-close'),
    prevBtn: document.getElementById('lightbox-prev'),
    nextBtn: document.getElementById('lightbox-next'),
    titleEl: document.getElementById('lightbox-project-title'),
    counterEl: document.getElementById('lightbox-counter'),
    imgEl: document.getElementById('lightbox-img'),
    trayEl: document.getElementById('lightbox-tray'),

    currentProject: null,
    currentIndex: 0,
    isOpen: false,
    touchStartX: 0,
    touchEndX: 0,

    init() {
      this.bindEvents();
    },

    bindEvents() {
      // Close modal
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
      if (this.backdrop) {
        this.backdrop.addEventListener('click', () => this.close());
      }

      // Next / Previous buttons
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.prev());
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.next());
      }

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
        }
      });

      // External open buttons on project cards (e.g. "Inspect All Screenshots")
      const openModalBtns = document.querySelectorAll('.open-modal-btn');
      openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const projectId = btn.getAttribute('data-project');
          const startIndex = CardGalleries.state[projectId] || 0;
          this.open(projectId, startIndex);
        });
      });

      // Touch swipe gestures on mobile
      if (this.modal) {
        this.modal.addEventListener('touchstart', (e) => {
          this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.modal.addEventListener('touchend', (e) => {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe();
        }, { passive: true });
      }
    },

    handleSwipe() {
      const threshold = 50;
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swiped left -> Next
          this.next();
        } else {
          // Swiped right -> Prev
          this.prev();
        }
      }
    },

    open(projectId, index = 0) {
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      this.currentProject = data;
      this.currentIndex = index;
      this.isOpen = true;

      // Update Header Text
      this.titleEl.textContent = data.title;

      // Hide or show Next/Prev arrows for single images
      const isMulti = data.total > 1;
      this.prevBtn.classList.toggle('hidden', !isMulti);
      this.nextBtn.classList.toggle('hidden', !isMulti);

      // Build Thumbnail Tray
      this.renderTray();

      // Render Active Image
      this.renderImage();

      // Show Modal
      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    },

    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Sync card gallery to match lightbox current index
      if (this.currentProject) {
        CardGalleries.goToIndex(this.currentProject.id, this.currentIndex);
      }
    },

    next() {
      if (!this.currentProject || this.currentProject.total <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % this.currentProject.total;
      this.renderImage();
    },

    prev() {
      if (!this.currentProject || this.currentProject.total <= 1) return;
      this.currentIndex = (this.currentIndex - 1 + this.currentProject.total) % this.currentProject.total;
      this.renderImage();
    },

    renderImage() {
      if (!this.currentProject) return;

      const currentSrc = this.currentProject.images[this.currentIndex];

      // Fade transition
      this.imgEl.style.opacity = '0.3';
      setTimeout(() => {
        this.imgEl.src = currentSrc;
        this.imgEl.alt = `${this.currentProject.title} - Screenshot ${this.currentIndex + 1}`;
        this.imgEl.style.opacity = '1';
      }, 100);

      // Update Counter
      if (this.currentProject.total > 1) {
        this.counterEl.textContent = `Screenshot ${this.currentIndex + 1} of ${this.currentProject.total}`;
      } else {
        this.counterEl.textContent = `High-Resolution Screenshot`;
      }

      // Update Tray Active State
      this.updateTrayActive();
    },

    renderTray() {
      if (!this.trayEl) return;
      this.trayEl.innerHTML = '';

      if (this.currentProject.total <= 1) {
        this.trayEl.style.display = 'none';
        return;
      }

      this.trayEl.style.display = 'flex';

      this.currentProject.images.forEach((src, idx) => {
        const thumbBtn = document.createElement('button');
        thumbBtn.className = `lightbox-thumb ${idx === this.currentIndex ? 'active' : ''}`;
        thumbBtn.setAttribute('data-index', idx);
        thumbBtn.setAttribute('aria-label', `Go to screenshot ${idx + 1}`);

        thumbBtn.innerHTML = `
          <img src="${src}" alt="Screenshot ${idx + 1}" loading="lazy">
          <span class="lightbox-thumb-number">${idx + 1}</span>
        `;

        thumbBtn.addEventListener('click', () => {
          this.currentIndex = idx;
          this.renderImage();
        });

        this.trayEl.appendChild(thumbBtn);
      });
    },

    updateTrayActive() {
      if (!this.trayEl || this.currentProject.total <= 1) return;

      const thumbs = this.trayEl.querySelectorAll('.lightbox-thumb');
      thumbs.forEach((thumb, idx) => {
        const isActive = idx === this.currentIndex;
        thumb.classList.toggle('active', isActive);
        if (isActive) {
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }
  };

  /* ==========================================================================
     7. CLIPBOARD MODULE
     Fast, one-click copy with immediate visual feedback.
     ========================================================================== */
  const Clipboard = {
    init() {
      const copyBtns = document.querySelectorAll('[data-copy]');
      copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const text = btn.getAttribute('data-copy');
          this.copyText(text, btn);
        });
      });

      const emailBtn = document.getElementById('email-compose-btn');
      if (emailBtn) {
        emailBtn.addEventListener('click', () => {
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText('mazenayman002@gmail.com').catch(() => {});
          }
          Toast.show('Opening Gmail Compose with mazenayman002@gmail.com...', 'info');
        });
      }
    },

    copyText(text, buttonEl) {
      if (!text) return;

      // Modern Clipboard API with fallback
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(() => this.showSuccess(text, buttonEl))
          .catch(() => this.fallbackCopy(text, buttonEl));
      } else {
        this.fallbackCopy(text, buttonEl);
      }
    },

    fallbackCopy(text, buttonEl) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        this.showSuccess(text, buttonEl);
      } catch (err) {
        Toast.show('Failed to copy. Please copy manually: ' + text, 'error');
      }
      document.body.removeChild(textArea);
    },

    showSuccess(text, buttonEl) {
      Toast.show(`Copied "${text}" to clipboard!`, 'success');

      if (buttonEl) {
        const originalHtml = buttonEl.innerHTML;
        buttonEl.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Copied!</span>
        `;
        buttonEl.style.backgroundColor = '#10B981';
        buttonEl.style.color = '#FFFFFF';
        buttonEl.style.borderColor = '#10B981';

        setTimeout(() => {
          buttonEl.innerHTML = originalHtml;
          buttonEl.style.backgroundColor = '';
          buttonEl.style.color = '';
          buttonEl.style.borderColor = '';
        }, 2000);
      }
    }
  };

  /* ==========================================================================
     8. CONTACT FORM VALIDATION & MAILTO HANDLER
     Validates user inputs cleanly and prepares email dispatch.
     ========================================================================== */
  const ContactForm = {
    form: document.getElementById('contact-form'),
    nameInput: document.getElementById('form-name'),
    emailInput: document.getElementById('form-email'),
    subjectInput: document.getElementById('form-subject'),
    messageInput: document.getElementById('form-message'),
    statusEl: document.getElementById('form-status'),

    init() {
      if (!this.form) return;
      this.bindEvents();
    },

    bindEvents() {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });

      // Clear validation state on typing
      [this.nameInput, this.emailInput, this.messageInput].forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          const errorEl = document.getElementById(`${input.name}-error`);
          if (errorEl) errorEl.classList.remove('visible');
        });
      });
    },

    validate() {
      let isValid = true;

      // Name
      if (!this.nameInput.value.trim()) {
        this.showError(this.nameInput, 'name-error');
        isValid = false;
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.emailInput.value.trim() || !emailPattern.test(this.emailInput.value.trim())) {
        this.showError(this.emailInput, 'email-error');
        isValid = false;
      }

      // Message
      if (!this.messageInput.value.trim()) {
        this.showError(this.messageInput, 'message-error');
        isValid = false;
      }

      return isValid;
    },

    showError(inputEl, errorId) {
      inputEl.classList.add('invalid');
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.classList.add('visible');
    },

    handleSubmit() {
      if (!this.validate()) {
        Toast.show('Please fill in all required fields correctly.', 'error');
        return;
      }

      const name = encodeURIComponent(this.nameInput.value.trim());
      const email = encodeURIComponent(this.emailInput.value.trim());
      const subject = encodeURIComponent(this.subjectInput.value.trim() || 'Flutter Project Inquiry');
      const body = encodeURIComponent(
        `Hi Mazen,\n\nName: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\nMessage:\n${this.messageInput.value.trim()}\n`
      );

      // Open mailto link
      const mailtoUrl = `mailto:mazenayman002@gmail.com?subject=${subject}&body=${body}`;
      
      this.statusEl.className = 'form-status success';
      this.statusEl.innerHTML = `
        <strong>Thank you, ${this.nameInput.value.trim()}!</strong><br>
        Opening your default email client to send your message directly to <em>mazenayman002@gmail.com</em>.
      `;

      Toast.show('Message prepared! Launching email client...', 'success');

      // Slight timeout to let the user read the feedback before redirecting
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      this.form.reset();
    }
  };

  /* ==========================================================================
     9. IMAGE LOAD RESILIENCY & ERROR HANDLING
     Ensures that if relative path fails for any reason, it falls back seamlessly.
     ========================================================================== */
  const ImageResilience = {
    init() {
      const allImgs = document.querySelectorAll('img');
      allImgs.forEach(img => {
        img.addEventListener('error', () => {
          const src = img.getAttribute('src');
          if (src && !img.dataset.hasFailedOnce) {
            img.dataset.hasFailedOnce = 'true';
            // Attempt fallback to Desktop directory path or local path
            if (src.startsWith('images/')) {
              const fallback = 'C:/Users/Mazen/Desktop/image/' + src.replace('images/', '');
              img.src = fallback;
            }
          }
        });
      });
    }
  };

  /* ==========================================================================
     10. INITIALIZATION LIFECYCLE
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    ScrollReveal.init();
    CardGalleries.init();
    Lightbox.init();
    Clipboard.init();
    ContactForm.init();
    ImageResilience.init();

    // Log clean ready message
    console.info('%c Mazen Ayman Portfolio loaded successfully. Built with Clean Code standards.', 'color: #027DFD; font-weight: bold; font-size: 12px;');
  });

})();
