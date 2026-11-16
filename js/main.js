/**
 * LIBAS THAQWA - LUXURY ISLAMIC MENSWEAR
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    cart: JSON.parse(localStorage.getItem('libas_cart')) || [
      {
        id: "LT-01",
        name: "Al-Malaki Emirati Kandura",
        price: 420,
        size: "56",
        color: "Alabaster White",
        quantity: 1,
        image: "assets/images/product-emirati-kandura.jpg"
      }
    ],
    wishlist: JSON.parse(localStorage.getItem('libas_wishlist')) || ["LT-01"],
    currentCategory: 'all',
    currentSlide: 0,
    isRtl: false,
    selectedSize: "56",
    currentQuickViewProduct: null
  };

  // Slides Data for Hero Carousel (Keeps the same authentic hero model image at all times)
  const HERO_SLIDES = [
    {
      brandLine: "LIBAS THAQWA",
      arabicTitle: "لباس تقوى",
      englishTitle: "LIBAS THAQWA",
      subtitle: "JUBBAH & KAMEES",
      triad: ["Tradition", "Elegance", "Quality"],
      ctaText: "Explore Collection"
    },
    {
      brandLine: "ROYAL EMIRATI COLLECTION",
      arabicTitle: "لباس تقوى",
      englishTitle: "AL-MALAKI KANDURA",
      subtitle: "JUBBAH & KAMEES",
      triad: ["Tradition", "Elegance", "Quality"],
      ctaText: "Explore Collection"
    },
    {
      brandLine: "BESPOKE SARTORIAL EXCELLENCE",
      arabicTitle: "لباس تقوى",
      englishTitle: "OMANI & SAUDI CUTS",
      subtitle: "JUBBAH & KAMEES",
      triad: ["Tradition", "Elegance", "Quality"],
      ctaText: "View Bespoke Styles"
    }
  ];

  // DOM Elements
  const header = document.querySelector('.site-header');
  const cartBadge = document.querySelector('.cart-badge');
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartShippingBar = document.getElementById('cartShippingBar');
  const cartShippingNotice = document.getElementById('cartShippingNotice');
  const productsGrid = document.getElementById('productsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Search Elements
  const searchModalOverlay = document.getElementById('searchModalOverlay');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchMainInput = document.getElementById('searchMainInput');
  const searchLiveResults = document.getElementById('searchLiveResults');

  // Quick View Elements
  const quickviewModalOverlay = document.getElementById('quickviewModalOverlay');
  const quickviewCloseBtn = document.getElementById('quickviewCloseBtn');
  const qvMainImg = document.getElementById('qvMainImg');
  const qvBadge = document.getElementById('qvBadge');
  const qvTitle = document.getElementById('qvTitle');
  const qvArabicTitle = document.getElementById('qvArabicTitle');
  const qvPrice = document.getElementById('qvPrice');
  const qvOriginalPrice = document.getElementById('qvOriginalPrice');
  const qvDesc = document.getElementById('qvDesc');
  const qvFabric = document.getElementById('qvFabric');
  const qvSizeGroup = document.getElementById('qvSizeGroup');
  const qvQtyMinus = document.getElementById('qvQtyMinus');
  const qvQtyPlus = document.getElementById('qvQtyPlus');
  const qvQtyVal = document.getElementById('qvQtyVal');
  const qvBtnAdd = document.getElementById('qvBtnAdd');
  const qvInquireBtn = document.getElementById('qvInquireBtn');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // Language & RTL Switcher
  const langSwitchBtn = document.getElementById('langSwitchBtn');

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  // Parse query params for category filter (e.g. from Home category cards)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) {
    if (['emirati', 'omani', 'saudi', 'thobes', 'moroccan'].includes(catParam)) {
      state.currentCategory = 'thobes';
    } else {
      state.currentCategory = catParam;
    }
    const targetBtn = document.querySelector(`.filter-btn[data-category="${state.currentCategory}"]`);
    if (targetBtn) {
      filterBtns.forEach(b => b.classList.remove('active'));
      targetBtn.classList.add('active');
    }
  }

  initHeaderScroll();
  initAOS();
  renderProducts();
  initEventListeners();
  initGalleryAutoScroll();

  // ==========================================================================
  // AOS (Animate On Scroll) INITIALIZATION & RESILIENT FALLBACK (Fast & Snappy)
  // ==========================================================================
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 450,
        easing: 'ease-out',
        once: true,
        offset: 30
      });
    } else {
      // Resilient IntersectionObserver fallback if CDN is offline or delayed
      const aosElements = document.querySelectorAll('[data-aos]');
      if ('IntersectionObserver' in window && aosElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const delay = entry.target.getAttribute('data-aos-delay') || 0;
              setTimeout(() => {
                entry.target.classList.add('aos-animate');
              }, parseInt(delay, 10));
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05 });

        aosElements.forEach(el => observer.observe(el));
      } else {
        aosElements.forEach(el => el.classList.add('aos-animate'));
      }
    }
  }

  // ==========================================================================
  // HEADER SCROLL EFFECT (Always visible on Home, auto-hide on scroll down, reveal on scroll up)
  // Matches Reference Architecture
  // ==========================================================================
  function initHeaderScroll() {
    if (!header) return;

    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
      const currentScrollY = window.scrollY;

      // 1. At the top / Home area (<= 40px): keep header fully visible and normal
      if (currentScrollY <= 40) {
        header.classList.remove('scrolled');
        header.classList.remove('header-hidden');
        lastScrollY = currentScrollY;
        return;
      }

      // 2. Keep header visible if search modal or cart drawer is open
      const isOverlayOpen = (searchModalOverlay && searchModalOverlay.classList.contains('active')) ||
                            (cartDrawerOverlay && cartDrawerOverlay.classList.contains('active'));
      if (isOverlayOpen) {
        header.classList.remove('header-hidden');
        header.classList.add('scrolled');
        lastScrollY = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY;

      // Ignore micro-scrolls to prevent jitter
      if (Math.abs(delta) < 4) return;

      if (delta > 0 && currentScrollY > 40) {
        // Scrolling DOWN -> hide navbar
        header.classList.add('header-hidden');
      } else if (delta < 0) {
        // Scrolling UP -> reveal navbar with elegant background
        header.classList.add('scrolled');
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // ==========================================================================
  // CONTINUOUS INFINITE GALLERY AUTO-SCROLL (Unique Cards, Zero Duplicates)
  // ==========================================================================
  function initGalleryAutoScroll() {
    const wrap = document.getElementById('galleryMarqueeWrap');
    const track = document.getElementById('galleryMarqueeTrack');
    if (!wrap || !track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let speed = 0.95; // Elegant luxury speed (~55px/sec)
    let isPaused = false;
    let scrollPos = 0;

    // Pause on hover or touch
    wrap.addEventListener('mouseenter', () => { isPaused = true; });
    wrap.addEventListener('mouseleave', () => { isPaused = false; });
    wrap.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    wrap.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

    function step() {
      if (!isPaused) {
        scrollPos += speed;

        const firstCard = track.firstElementChild;
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth;
          const gap = parseFloat(window.getComputedStyle(track).gap) || 30;
          const totalCardShift = cardWidth + gap;

          if (scrollPos >= totalCardShift) {
            track.appendChild(firstCard);
            scrollPos -= totalCardShift;
          }
        }
        track.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
      }
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // ==========================================================================
  // PRODUCTS RENDERING & FILTERING
  // ==========================================================================
  function renderProducts() {
    if (!productsGrid) return;

    let filtered;
    if (state.currentCategory === 'all') {
      filtered = PRODUCTS_DATA;
    } else if (state.currentCategory === 'thobes') {
      filtered = PRODUCTS_DATA.filter(p => ['emirati', 'omani', 'saudi', 'thobes', 'moroccan'].includes(p.category));
    } else if (state.currentCategory === 'accessories') {
      filtered = PRODUCTS_DATA.filter(p => ['accessories', 'footwear'].includes(p.category));
    } else {
      filtered = PRODUCTS_DATA.filter(p => p.category === state.currentCategory);
    }

    const limit = productsGrid.getAttribute('data-limit');
    const items = limit ? filtered.slice(0, parseInt(limit, 10)) : filtered;

    productsGrid.innerHTML = items.map(product => {
      const fitClass = product.imageFit === 'contain' ? 'thumb-contain' : 'thumb-cover';
      return `
        <div class="product-card" data-id="${product.id}">
          <div class="product-thumb-wrapper">
            <span class="product-badge">${product.badge}</span>
            <img class="product-thumb ${fitClass}" src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="quick-view-overlay-btn" data-id="${product.id}">View Specifications</button>
          </div>
          <div class="product-details">
            <h3 class="product-name">${product.name}</h3>
            <span class="product-arabic-name">${product.arabicName}</span>
            <div class="product-rating">
              <span>★ ★ ★ ★ ★</span>
              <span class="rating-count">(${product.reviewsCount})</span>
            </div>
            <button class="btn-view-details" data-id="${product.id}">
              <span>View Specifications</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    attachProductCardEvents();
  }

  function attachProductCardEvents() {
    // View Details buttons
    document.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        openQuickView(id);
      });
    });

    // Quick View overlay buttons
    document.querySelectorAll('.quick-view-overlay-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        openQuickView(id);
      });
    });

    // Wishlist buttons
    document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleWishlist(id, btn);
      });
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // ==========================================================================
  // CART OPERATIONS
  // ==========================================================================
  function addToCart(product, size = "56", color = "White", quantity = 1) {
    const existingIndex = state.cart.findIndex(
      item => item.id === product.id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: size,
        color: color,
        quantity: quantity,
        image: product.image
      });
    }

    saveCart();
    updateCartUI();
    openCart();
    showToast(`Added to Bag`, `${product.name} (Size: ${size})`);
  }

  function removeFromCart(index) {
    const removedItem = state.cart[index];
    state.cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast(`Item Removed`, `${removedItem.name}`);
  }

  function updateQuantity(index, delta) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      removeFromCart(index);
    } else {
      saveCart();
      updateCartUI();
    }
  }

  function saveCart() {
    localStorage.setItem('libas_cart', JSON.stringify(state.cart));
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Badges
    if (cartBadge) {
      cartBadge.textContent = totalCount;
    }

    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `AED ${subtotal}`;
    }

    // Delivery Notice
    if (cartShippingBar && cartShippingNotice) {
      cartShippingBar.style.width = '100%';
      cartShippingNotice.innerHTML = `<span>âœ“ Fast Delivery <strong>Available in India</strong>!</span>`;
    }

    // Render Items
    if (!cartItemsList) return;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">ðŸ›ï¸</div>
          <h4 class="cart-empty-title">Your shopping bag is empty</h4>
          <p style="font-size:0.9rem; color:#78867e; margin-bottom:18px;">Discover our handcrafted Emirati Kanduras & Jubbahs.</p>
          <button class="btn-pill-gold" onclick="document.getElementById('cartDrawerOverlay').classList.remove('open');">Start Shopping</button>
        </div>
      `;
    } else {
      cartItemsList.innerHTML = state.cart.map((item, index) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <span class="cart-item-variant">Size: ${item.size} â€¢ ${item.color}</span>
            <div class="cart-item-qty-row">
              <div class="cart-qty-ctrl">
                <button class="cart-qty-btn btn-cart-dec" data-index="${index}">-</button>
                <span class="cart-qty-val">${item.quantity}</span>
                <button class="cart-qty-btn btn-cart-inc" data-index="${index}">+</button>
              </div>
              <span class="cart-item-price">AED ${item.price * item.quantity}</span>
              <button class="cart-item-remove" data-index="${index}">Remove</button>
            </div>
          </div>
        </div>
      `).join('');

      // Attach cart item control events
      cartItemsList.querySelectorAll('.btn-cart-dec').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          updateQuantity(idx, -1);
        });
      });

      cartItemsList.querySelectorAll('.btn-cart-inc').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          updateQuantity(idx, 1);
        });
      });

      cartItemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          removeFromCart(idx);
        });
      });
    }
  }

  function openCart() {
    cartDrawerOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawerOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // QUICK VIEW MODAL
  // ==========================================================================
  function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    state.currentQuickViewProduct = product;
    state.selectedSize = product.sizes[0] || "56";

    if (qvMainImg) {
      qvMainImg.src = product.image;
      if (product.imageFit === 'contain') {
        qvMainImg.style.objectFit = 'contain';
        qvMainImg.style.padding = '18px';
      } else {
        qvMainImg.style.objectFit = 'cover';
        qvMainImg.style.padding = '0';
      }
    }
    if (qvBadge) qvBadge.textContent = product.badge;
    if (qvTitle) qvTitle.textContent = product.name;
    if (qvArabicTitle) qvArabicTitle.textContent = product.arabicName;
    if (qvPrice) qvPrice.textContent = `AED ${product.price}`;
    if (qvOriginalPrice) qvOriginalPrice.textContent = product.originalPrice ? `AED ${product.originalPrice}` : '';
    if (qvDesc) qvDesc.textContent = product.description;
    if (qvFabric) qvFabric.innerHTML = `<strong>Fabric:</strong> ${product.fabric}<br><strong>Cut:</strong> ${product.cut}`;
    if (qvQtyVal) qvQtyVal.textContent = "1";

    // Dynamic WhatsApp Inquiry Link
    function updateWhatsAppLink() {
      if (!product || !qvInquireBtn) return;
      const sizeText = state.selectedSize ? ` (Size: ${state.selectedSize})` : '';
      const msg = `Hello Libas Thaqwa, I would like to inquire about "${product.name}" (${product.arabicName})${sizeText}. Please share tailoring details and availability.`;
      qvInquireBtn.href = `https://wa.me/919207907618?text=${encodeURIComponent(msg)}`;
    }

    updateWhatsAppLink();

    // Size Pills
    if (qvSizeGroup) {
      qvSizeGroup.innerHTML = product.sizes.map((s, idx) => `
          <div class="size-pill ${idx === 0 ? 'selected' : ''}" data-size="${s}">${s}</div>
        `).join('');

      qvSizeGroup.querySelectorAll('.size-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          qvSizeGroup.querySelectorAll('.size-pill').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          state.selectedSize = pill.getAttribute('data-size');
          updateWhatsAppLink();
        });
      });
    }

    quickviewModalOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    quickviewModalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Quick View Qty Controls
  qvQtyMinus?.addEventListener('click', () => {
    let val = parseInt(qvQtyVal.textContent, 10);
    if (val > 1) qvQtyVal.textContent = (val - 1).toString();
  });

  qvQtyPlus?.addEventListener('click', () => {
    let val = parseInt(qvQtyVal.textContent, 10);
    qvQtyVal.textContent = (val + 1).toString();
  });

  qvBtnAdd?.addEventListener('click', () => {
    if (state.currentQuickViewProduct) {
      const qty = parseInt(qvQtyVal.textContent, 10) || 1;
      addToCart(state.currentQuickViewProduct, state.selectedSize, "Pure White", qty);
      closeQuickView();
    }
  });

  // ==========================================================================
  // LIVE SEARCH
  // ==========================================================================
  function openSearch() {
    searchModalOverlay?.classList.add('open');
    searchMainInput?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    searchModalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  searchMainInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchLiveResults.innerHTML = '';
      searchLiveResults.classList.remove('has-results');
      return;
    }

    const matches = PRODUCTS_DATA.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.arabicName.includes(query) ||
      p.fabric.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      searchLiveResults.classList.add('has-results');
      searchLiveResults.innerHTML = matches.map(m => `
        <div class="search-result-row" data-id="${m.id}">
          <img src="${m.image}" class="search-result-thumb" alt="${m.name}">
          <div>
            <div class="search-result-title">${m.name}</div>
            <div style="font-size:0.8rem; color:#78867e;">${m.arabicName} â€¢ ${m.fabric.split('(')[0]}</div>
          </div>
          <div class="search-result-badge">${m.badge}</div>
        </div>
      `).join('');

      searchLiveResults.querySelectorAll('.search-result-row').forEach(row => {
        row.addEventListener('click', () => {
          const id = row.getAttribute('data-id');
          closeSearch();
          openQuickView(id);
        });
      });
    } else {
      searchLiveResults.classList.add('has-results');
      searchLiveResults.innerHTML = `<div style="padding:20px; text-align:center; color:#77857c;">No luxury items found for "${query}"</div>`;
    }
  });

  // Search quick tags click
  document.querySelectorAll('.search-tag-pill').forEach(tag => {
    tag.addEventListener('click', () => {
      const term = tag.textContent.trim();
      searchMainInput.value = term;
      searchMainInput.dispatchEvent(new Event('input'));
    });
  });

  // ==========================================================================
  // WISHLIST TOGGLE
  // ==========================================================================
  function toggleWishlist(id, btn) {
    const index = state.wishlist.indexOf(id);
    const prod = PRODUCTS_DATA.find(p => p.id === id);

    if (index > -1) {
      state.wishlist.splice(index, 1);
      btn.classList.remove('active');
      btn.querySelector('svg').setAttribute('fill', 'none');
      showToast(`Removed from Wishlist`, prod ? prod.name : '');
    } else {
      state.wishlist.push(id);
      btn.classList.add('active');
      btn.querySelector('svg').setAttribute('fill', '#d63031');
      showToast(`Saved to Wishlist`, prod ? prod.name : '');
    }

    localStorage.setItem('libas_wishlist', JSON.stringify(state.wishlist));
  }

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(title, msg) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">âšœ</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${msg}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.9)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================================================
  // LANGUAGE & RTL SWITCHER
  // ==========================================================================
  langSwitchBtn?.addEventListener('click', () => {
    state.isRtl = !state.isRtl;
    document.body.classList.toggle('rtl-mode', state.isRtl);
    if (langSwitchBtn) langSwitchBtn.textContent = state.isRtl ? 'EN | Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠ' : 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© | AR';
    goToSlide(state.currentSlide);
    showToast(
      state.isRtl ? 'ØªÙ… ØªØºÙŠÙŠØ± Ø§Ù„Ù„ØºØ©' : 'Language Changed',
      state.isRtl ? 'ØªÙ… ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø§ØªØ¬Ø§Ù‡ Ù…Ù† Ø§Ù„ÙŠÙ…ÙŠÙ† Ø¥Ù„Ù‰ Ø§Ù„ÙŠØ³Ø§Ø±' : 'Switched to English Layout'
    );
  });

  // ==========================================================================
  // EVENT LISTENERS & MODAL TRIGGERS
  // ==========================================================================
  function initEventListeners() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    mobileMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu?.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu?.classList.contains('open') && !navMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });

    // Close mobile menu when clicking any nav link & set active
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navMenu?.classList.remove('open');
      });
    });

    // Cart open / close
    cartTriggerBtn?.addEventListener('click', openCart);
    cartCloseBtn?.addEventListener('click', closeCart);
    cartDrawerOverlay?.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCart();
    });

    // Search open / close
    searchTriggerBtn?.addEventListener('click', openSearch);
    searchCloseBtn?.addEventListener('click', closeSearch);
    searchModalOverlay?.addEventListener('click', (e) => {
      if (e.target === searchModalOverlay) closeSearch();
    });

    // Quickview close
    quickviewCloseBtn?.addEventListener('click', closeQuickView);
    quickviewModalOverlay?.addEventListener('click', (e) => {
      if (e.target === quickviewModalOverlay) closeQuickView();
    });

    // Size Guide modal
    const sizeGuideTriggers = document.querySelectorAll('.size-guide-trigger');
    const sizeModalOverlay = document.getElementById('sizeModalOverlay');
    const sizeModalCloseBtn = document.getElementById('sizeModalCloseBtn');

    sizeGuideTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        sizeModalOverlay?.classList.add('open');
      });
    });

    sizeModalCloseBtn?.addEventListener('click', () => {
      sizeModalOverlay?.classList.remove('open');
    });

    sizeModalOverlay?.addEventListener('click', (e) => {
      if (e.target === sizeModalOverlay) sizeModalOverlay.classList.remove('open');
    });

    // Checkout Modal
    const btnCheckout = document.getElementById('btnCheckout');
    const checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
    const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
    const checkoutForm = document.getElementById('checkoutForm');

    btnCheckout?.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast("Cart is Empty", "Add items to your bag before proceeding.");
        return;
      }
      closeCart();
      checkoutModalOverlay?.classList.add('open');
    });

    checkoutCloseBtn?.addEventListener('click', () => {
      checkoutModalOverlay?.classList.remove('open');
    });

    checkoutForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      checkoutModalOverlay?.classList.remove('open');
      showToast("Order Confirmed! ⚜", "Thank you! Your Libas Thaqwa bespoke order is being tailored.");
      state.cart = [];
      saveCart();
      updateCartUI();
    });

    // Bespoke Appointment Form
    const bespokeForm = document.getElementById('bespokeForm');
    bespokeForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("VIP Consultation Booked", "Our master tailor will contact you via WhatsApp shortly.");
      bespokeForm.reset();
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Welcome to Libas Thaqwa VIP", "Use code 'TAQWA15' for 15% off your first bespoke order.");
      newsletterForm.reset();
    });

    // Keyboard ESC to close all open modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
        closeSearch();
        closeQuickView();
        sizeModalOverlay?.classList.remove('open');
        checkoutModalOverlay?.classList.remove('open');
      }
    });
  }
});