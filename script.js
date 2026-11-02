/**
 * RAFLI AINUN PRASETYA - PORTFOLIO INTERACTION ENGINE
 * Features: Dark/Light Mode, Interactive Category Filter,
 * Architecture Modals, Copy-to-Clipboard Toast, Mobile Nav, Scrollspy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  
  // Check persisted or system preference
  const savedTheme = localStorage.getItem('rp_portfolio_theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('rp_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const isExpanded = navLinks.classList.contains('mobile-active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

  // 2b. Hero Visual Tabs (Photo vs Code Specimen)
  const tabPhotoBtn = document.getElementById('tabPhotoBtn');
  const tabCodeBtn = document.getElementById('tabCodeBtn');
  const photoView = document.getElementById('photoView');
  const codeView = document.getElementById('codeView');

  if (tabPhotoBtn && tabCodeBtn && photoView && codeView) {
    tabPhotoBtn.addEventListener('click', () => {
      tabPhotoBtn.classList.add('active');
      tabCodeBtn.classList.remove('active');
      photoView.style.display = 'block';
      codeView.style.display = 'none';
    });

    tabCodeBtn.addEventListener('click', () => {
      tabCodeBtn.classList.add('active');
      tabPhotoBtn.classList.remove('active');
      photoView.style.display = 'none';
      codeView.style.display = 'block';
    });
  }

  // 2c. Hero Photo Slideshow Controller (5 Dynamic Presentation Photos)
  const slideItems = document.querySelectorAll('.slide-item');
  const slideDots = document.querySelectorAll('.slide-dot');
  const slideIndexLabel = document.getElementById('slideIndexLabel');
  const slidePrevBtn = document.getElementById('slidePrevBtn');
  const slideNextBtn = document.getElementById('slideNextBtn');
  const photoSlideshow = document.getElementById('photoSlideshow');
  
  let currentSlide = 0;
  const totalSlides = slideItems.length;
  let slideInterval = null;

  function showSlide(index) {
    if (totalSlides === 0) return;
    currentSlide = (index + totalSlides) % totalSlides;

    slideItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === currentSlide);
    });

    slideDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });

    if (slideIndexLabel) {
      slideIndexLabel.textContent = String(currentSlide + 1).padStart(2, '0');
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3500);
  }

  function stopSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (slidePrevBtn && slideNextBtn) {
    slidePrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startSlideShow();
    });

    slideNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startSlideShow();
    });
  }

  slideDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(idx);
      startSlideShow();
    });
  });

  if (photoSlideshow) {
    photoSlideshow.addEventListener('mouseenter', stopSlideShow);
    photoSlideshow.addEventListener('mouseleave', startSlideShow);
    startSlideShow();
  }

  // 2d. Realistic Typewriter Effect for Hero Headline
  const dynamicRole = document.getElementById('dynamicRole');
  if (dynamicRole) {
    const roles = [
      'Web & IoT',
      'Laravel & APIs',
      'Smart Telemetry',
      'Full-Stack Systems',
      'Clean Architecture'
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;
    let typingDelay = 2200; // Initial delay to admire the starting text

    function typeEffect() {
      const currentWord = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        dynamicRole.textContent = currentWord.substring(0, charIndex);
        typingDelay = 45; // Smooth deleting speed
      } else {
        charIndex++;
        dynamicRole.textContent = currentWord.substring(0, charIndex);
        typingDelay = 85; // Natural human typing speed
      }

      if (!isDeleting && charIndex === currentWord.length) {
        // Word completed: pause to let visitors read
        isDeleting = true;
        typingDelay = 2000;
      } else if (isDeleting && charIndex === 0) {
        // Word cleared: switch to next word with brief pause
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 450;
      }

      setTimeout(typeEffect, typingDelay);
    }

    setTimeout(typeEffect, typingDelay);
  }

  // 2e. Animated Stat Counters (CountUp Effect)
  const counters = document.querySelectorAll('.count-up');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1600; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
        const currentVal = easeProgress * target;

        counter.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  setTimeout(runCounters, 400);

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Project Modal Data, Gallery & Lightbox Handler
  const projectDetails = {
    'atm-beras': {
      title: 'ATM Beras — E-KTP RFID Rice Distribution System',
      category: 'Final Year Project · IoT & Web Architecture',
      period: 'Maret 2026 – Agustus 2026',
      summary: 'An automated smart rice dispensing and monitoring ecosystem engineered for LAZISMU Rogojampi. Integrates electronic KTP (E-KTP) RFID identification with Raspberry Pi hardware to ensure transparent, quota-regulated social aid distribution to registered mustahik.',
      images: [
        'Asset/projek/atm%20beras/Screenshot%202026-07-15%20235116.png',
        'Asset/projek/atm%20beras/Screenshot%202026-07-08%20044344.png',
        'Asset/projek/atm%20beras/Screenshot%202026-07-10%20202259.png',
        'Asset/projek/atm%20beras/Screenshot%202026-07-07%20071839.png',
        'Asset/projek/atm%20beras/Screenshot%202026-07-07%20074829.png',
        'Asset/projek/atm%20beras/Screenshot%202026-07-07%20031248.png',
        'Asset/projek/atm%20beras/Screenshot%202026-07-15%20235318.png'
      ],
      features: [
        'Developed full web ecosystem using Laravel and MySQL covering public informational landing page and administrator management dashboard.',
        'Engineered secure RESTful API communication between cloud Laravel web server and local Raspberry Pi kiosk controller.',
        'Real-time RFID UID verification against mustahik database with automated allocation quota validation and fraud prevention.',
        'Integrated automated WhatsApp notifications to alert beneficiaries whenever their distribution batch is ready for pickup.',
        'Structured administrative telemetry: machine status monitoring, rice inventory low-stock alerts, and auditable distribution records.'
      ],
      stack: ['PHP / Laravel', 'Raspberry Pi', 'RFID E-KTP (MFRC522)', 'MySQL', 'RESTful API', 'WhatsApp API', 'Kiosk UI']
    },
    'flood-monitoring': {
      title: 'Flood Information & Disaster Early Warning Website',
      category: 'CV. Jayla Tech.ID · IoT Telemetry Platform',
      period: 'Juli 2025 – Agustus 2025',
      summary: 'Centralized flood monitoring platform that collects IoT sensor readings from river dams and subdistrict waterways to provide early hazard mitigation and data-driven disaster administration.',
      images: [
        'Asset/projek/banjir/Screenshot%202025-08-02%20130501.png',
        'Asset/projek/banjir/Screenshot%202025-08-04%20142533.png',
        'Asset/projek/banjir/Screenshot%202025-07-31%20153054.png',
        'Asset/projek/banjir/Screenshot%202025-08-02%20115638.png',
        'Asset/projek/banjir/Screenshot%202025-08-02%20212036.png',
        'Asset/projek/banjir/Screenshot%202025-12-09%20194951.png',
        'Asset/projek/banjir/Screenshot%202025-12-10%20001823.png'
      ],
      features: [
        'Developed centralized web portal using PHP, Laravel, Blade, MySQL, and JavaScript.',
        'Engineered administrative dashboard with sensor monitoring, dam management, subdistrict zoning, and complaint tracking modules.',
        'Integrated REST API endpoints to capture water levels, humidity, and temperature data from field sensors.',
        'Implemented automatic data refresh with Chart.js time-series visuals, eliminating the need for manual page reloading during critical flood events.',
        'Created high-contrast risk badges (Safe, Alert, Danger) for rapid emergency evaluation.'
      ],
      stack: ['Laravel', 'PHP', 'MySQL', 'IoT Sensors', 'Chart.js', 'Bootstrap 5', 'REST APIs', 'JavaScript']
    },
    'jayla-travel': {
      title: 'Jayla Travel — Travel Agent Web Platform',
      category: 'CV. Jayla Tech.ID · Full-Stack Web Development',
      period: 'Juli 2025',
      summary: 'Production travel agency website engineered to showcase destinations, promote exclusive vacation packages, and convert organic website visitors into direct customer inquiries.',
      images: [
        'Asset/projek/travel/Screenshot%202026-10-23%20222326.png',
        'Asset/projek/travel/Screenshot%202026-10-23%20222253.png',
        'Asset/projek/travel/Screenshot%202026-10-23%20222314.png'
      ],
      features: [
        'Customized dynamic landing page layout aligning visual elements with travel brand guidelines.',
        'Engineered dynamic destination and itinerary CMS modules utilizing Laravel Blade and MySQL.',
        'Redesigned the hero section with high-resolution destination backdrops, elevating visual engagement.',
        'Refactored call-to-action funnels, sidebar layouts, and instant WhatsApp booking links.',
        'Resolved CSS styling edge cases and asset persistence inconsistencies across mobile and desktop.'
      ],
      stack: ['PHP', 'Laravel Blade', 'MySQL', 'CSS3', 'WhatsApp Gateway', 'UI/UX']
    },
    'fish-cbr': {
      title: 'Fish CBR — Case-Based Reasoning Fish Diagnosis System',
      category: 'Web Deployment & Technical Support',
      period: 'September 2025',
      summary: 'Intelligent expert system utilizing Case-Based Reasoning (CBR) to diagnose fish diseases through similarity calculations against historical veterinary cases.',
      images: [
        'Asset/projek/fish%20cbr/Screenshot%202025-10-01%20150720.png',
        'Asset/projek/fish%20cbr/Screenshot%202025-10-01%20154644.png',
        'Asset/projek/fish%20cbr/Screenshot%202025-10-09%20173249.png'
      ],
      features: [
        'Configured complete live hosting environment on cPanel shared hosting (DNS, nameservers, PHP extension compatibility, MySQL).',
        'Investigated and verified historical diagnosis relationships against master records via CSV data pipelines.',
        'Resolved critical production obstacles including routing rewrites, database collation, and dependency package compatibility.',
        'Ensured data consistency and uninterrupted live access for aquaculture practitioners.'
      ],
      stack: ['Laravel', 'cPanel Shared Hosting', 'MySQL', 'CBR Algorithm', 'CSV Import', 'Troubleshooting']
    },
    'remind-u': {
      title: 'Remind U — Activity & Task Reminder Application',
      category: 'Mobile Application · Front-End Development',
      period: 'Oktober 2025',
      summary: 'Cross-platform mobile application focused on habit tracking, task scheduling, and reminder routines designed for intuitive single-handed operation.',
      images: [
        'Asset/projek/remind%20u/SCHEDULE-PHASE%202.png',
        'Asset/projek/remind%20u/Contents.png',
        'Asset/projek/remind%20u/ANIMASI%20TAKEN.png',
        'Asset/projek/remind%20u/ANIMASI%20SKIPPED.png',
        'Asset/projek/remind%20u/JOURNEY.png',
        'Asset/projek/remind%20u/JOURNEY%20NO%20DATA.png',
        'Asset/projek/remind%20u/SCHEDULE-INFO.png',
        'Asset/projek/remind%20u/TAKEN.png'
      ],
      features: [
        'Developed clean mobile layouts using Flutter and Dart from UI specification blueprints.',
        'Structured front-end navigation routers and interactive component states.',
        'Built accessible form controls, date/time pickers, and organized list views.',
        'Maintained clean code separation between presentation-layer widgets and application logic.'
      ],
      stack: ['Flutter', 'Dart', 'Mobile UI/UX', 'State Management', 'Android/iOS UI']
    },
    'smk-sudirman': {
      title: 'SMK NU Sudirman Rogojampi — Official Web Portal',
      category: 'Community Service Project · WordPress Development',
      period: 'Februari 2025',
      summary: 'School company profile website developed as part of a lecturer-led community service initiative to expand institutional digital visibility and academic transparency.',
      images: [
        'Asset/projek/smk%20nu%20sudirman/1722841695440.jpg',
        'Asset/projek/smk%20nu%20sudirman/1722841695469.jpg',
        'Asset/projek/smk%20nu%20sudirman/1722841695489.jpg',
        'Asset/projek/smk%20nu%20sudirman/1722841695580.jpg',
        'Asset/projek/smk%20nu%20sudirman/1722841695627.jpg',
        'Asset/projek/smk%20nu%20sudirman/1722841695689.jpg'
      ],
      features: [
        'Architected WordPress profile portal to showcase curriculum, faculty, extracurriculars, and admissions.',
        'Crafted responsive page layouts with Elementor matching school branding guidelines.',
        'Configured caching, security, and content management plugins to ensure high performance.',
        'Executed complete cPanel hosting migration and conducted handover documentation for staff.'
      ],
      stack: ['WordPress', 'Elementor', 'cPanel Hosting', 'SEO Optimization', 'Community Outreach']
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Lightbox elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  let currentGalleryImages = [];
  let currentActiveIndex = 0;

  function openLightbox(src) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = '';
      lightboxModal.classList.add('active');
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target === lightboxClose) closeLightbox();
    });
  }

  function renderGallery(images) {
    if (!images || images.length === 0) return '';
    currentGalleryImages = images.map(img => typeof img === 'string' ? img : img.src);
    currentActiveIndex = 0;

    return `
      <div class="modal-gallery-section">
        <div class="modal-gallery-main" id="modalGalleryMain">
          <button class="gallery-fullscreen-btn" id="galleryFullscreenBtn" title="Perbesar Layar Penuh">
            <span>⛶</span> <span>Perbesar</span>
          </button>
          <div class="gallery-counter-badge" id="galleryCounter">
            Foto 1 dari ${currentGalleryImages.length}
          </div>
          ${currentGalleryImages.length > 1 ? `
            <button class="gallery-nav-btn gallery-prev" id="galleryPrevBtn" aria-label="Foto Sebelumnya">&#10094;</button>
            <button class="gallery-nav-btn gallery-next" id="galleryNextBtn" aria-label="Foto Selanjutnya">&#10095;</button>
          ` : ''}
          <img id="galleryMainImg" class="modal-main-img" src="${currentGalleryImages[0]}" alt="Screenshot Dokumentasi Proyek">
        </div>

        ${currentGalleryImages.length > 1 ? `
          <div class="modal-thumbnails-strip" id="modalThumbnailsStrip">
            ${currentGalleryImages.map((src, idx) => `
              <div class="thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <img src="${src}" alt="Screenshot ${idx + 1}">
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  function setupGalleryEvents() {
    const mainImg = document.getElementById('galleryMainImg');
    const counter = document.getElementById('galleryCounter');
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');
    const galleryMain = document.getElementById('modalGalleryMain');
    const fullscreenBtn = document.getElementById('galleryFullscreenBtn');
    const thumbs = document.querySelectorAll('.thumb-item');

    function updateActiveImage(idx) {
      if (!currentGalleryImages[idx]) return;
      currentActiveIndex = idx;
      const src = currentGalleryImages[idx];

      if (mainImg) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 120);
      }

      if (counter) counter.textContent = `Foto ${idx + 1} dari ${currentGalleryImages.length}`;

      thumbs.forEach((t, i) => {
        if (i === idx) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          t.classList.remove('active');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIdx = (currentActiveIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateActiveImage(nextIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIdx = (currentActiveIndex + 1) % currentGalleryImages.length;
        updateActiveImage(nextIdx);
      });
    }

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.getAttribute('data-index'), 10);
        updateActiveImage(idx);
      });
    });

    if (galleryMain) {
      galleryMain.addEventListener('click', () => {
        const activeSrc = currentGalleryImages[currentActiveIndex];
        if (activeSrc) openLightbox(activeSrc);
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeSrc = currentGalleryImages[currentActiveIndex];
        if (activeSrc) openLightbox(activeSrc);
      });
    }
  }

  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (data && modalContent) {
        modalContent.innerHTML = `
          <span class="modal-tag">${data.category}</span>
          <h2 class="modal-title">${data.title}</h2>
          <p style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.5rem;">
            📅 Timeline: ${data.period}
          </p>

          ${renderGallery(data.images)}

          <div class="modal-body">
            <h4 style="color: var(--text-main); margin: 0.5rem 0 0.5rem; font-size: 1.05rem;">Ringkasan Solusi:</h4>
            <p>${data.summary}</p>
            <h4 style="color: var(--text-main); margin: 1.25rem 0 0.75rem; font-size: 1.05rem;">Key Engineering Contributions:</h4>
            <ul class="modal-feature-list">
              ${data.features.map(feat => `<li>${feat}</li>`).join('')}
            </ul>
            <h4 style="color: var(--text-main); margin: 1.25rem 0 0.75rem; font-size: 1.05rem;">Technologies & Methods:</h4>
            <div class="tech-tags-list">
              ${data.stack.map(s => `<span class="tech-tag" style="border-color: var(--accent-cyan); color: var(--accent-cyan);">${s}</span>`).join('')}
            </div>
          </div>
        `;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setupGalleryEvents();
      }
    });
  });

  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  // Keyboard navigation for modal & lightbox
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
      } else {
        closeModal();
      }
    } else if (projectModal && projectModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('galleryPrevBtn');
        if (prevBtn) prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('galleryNextBtn');
        if (nextBtn) nextBtn.click();
      }
    }
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    closeLightbox();
  }

  // 5. Copy to Clipboard with Toast
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard('rafliprasetya07@gmail.com', 'Email copied to clipboard!');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyToClipboard('+6287857172007', 'Phone number copied to clipboard!');
    });
  }

  function copyToClipboard(text, message) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(message);
      }).catch(() => {
        fallbackCopy(text, message);
      });
    } else {
      fallbackCopy(text, message);
    }
  }

  function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(message);
    } catch (err) {
      console.error('Unable to copy', err);
    }
    document.body.removeChild(textArea);
  }

  // 6. Toast Notification Helper
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 7. Navbar Scrollspy & Shadow
  const navbar = document.getElementById('navbar');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shadow on scroll
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.45)';
      navbar.style.borderColor = 'rgba(16, 185, 129, 0.25)';
    } else {
      navbar.style.boxShadow = 'var(--shadow-sm)';
      navbar.style.borderColor = 'var(--border-color)';
    }

    // Scrollspy
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.style.color = '';
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.style.color = 'var(--accent-emerald)';
      }
    });
  });
});
