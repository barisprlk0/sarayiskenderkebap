(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const bigImage = (slug) => `assets/img/${slug}-1024.webp`;

  $('#yil').textContent = new Date().getFullYear();

  /* --- Başlık: kaydırınca zemin kazanır --- */
  const header = $('.site-header');
  const syncHeader = () => header.classList.toggle('is-solid', window.scrollY > 40);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  /* --- Mobil menü --- */
  const toggle = $('.nav-toggle');
  const nav = $('.site-nav');
  const setNav = (open) => {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    $('.sr-only', toggle).textContent = open ? 'Menüyü kapat' : 'Menüyü aç';
  };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });

  /* --- Menü sekmeleri ve önizleme --- */
  const tabs = $$('[role="tab"]');
  const previewImg = $('#menu-preview-img');
  const previewName = $('#menu-preview-name');

  let wanted = null;
  const preview = (button) => {
    if (!button) return;
    const src = bigImage(button.dataset.img);
    $$('button.mi.is-active').forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');
    wanted = button;
    const apply = () => {
      if (wanted !== button) return; // bu arada başka ürüne geçildi
      previewName.textContent = $('.mi__name', button).textContent;
      if (previewImg.getAttribute('src') === src) return;
      previewImg.src = src;
      previewImg.classList.remove('is-swap');
      void previewImg.offsetWidth; // animasyonu yeniden başlatır
      previewImg.classList.add('is-swap');
    };
    // Ad ve görsel birlikte değişsin: önce yeni görsel yüklenir.
    const next = new Image();
    next.onload = next.onerror = apply;
    next.src = src;
  };

  const selectTab = (tab, { focus = false } = {}) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    preview($(`#${tab.getAttribute('aria-controls')} button.mi`));
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      selectTab(tab);
      // Telefonda kutucuk, bölümün ilk ürünüyle doğrudan büyük görseli açar.
      if (!tapToBrowse.matches) return;
      const first = menuItems.findIndex((item) => item.panel.id === tab.getAttribute('aria-controls'));
      if (first !== -1) open(menuItems, first);
    });
    tab.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      selectTab(tabs[next], { focus: true });
    });
  });

  // İlk yüklemede sadece paneller gizlenir; sayfa sekme şeridine kaydırılmaz.
  tabs.forEach((t, i) => {
    t.tabIndex = i === 0 ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = i !== 0;
  });
  preview($(`#${tabs[0].getAttribute('aria-controls')} button.mi`));

  $$('.mi[data-img]').forEach((button) => {
    ['pointerenter', 'focus'].forEach((type) => button.addEventListener(type, () => preview(button)));
  });

  // Kategori kartları ilgili menü sekmesini açar.
  $$('.cat[data-tab]').forEach((link) => {
    link.addEventListener('click', () => selectTab(document.getElementById(`tab-${link.dataset.tab}`)));
  });

  /* --- Büyük görsel --- */
  const box = $('#lightbox');
  const boxImg = $('#lightbox-img');
  const boxCap = $('#lightbox-cap');
  const boxSection = $('#lightbox-section');
  const boxProgress = $('#lightbox-progress');
  const prev = $('.lightbox__nav--prev');
  const next = $('.lightbox__nav--next');
  const tapToBrowse = window.matchMedia('(max-width: 900px), (pointer: coarse)');
  let items = [];
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const { slug, title, alt, section } = items[index];
    boxImg.src = bigImage(slug);
    boxImg.alt = alt || title;
    boxCap.textContent = title;
    boxSection.hidden = !section;
    boxSection.textContent = section || '';
    // Hikâye çubuğu: bölümdeki her ürün bir parça, buraya kadarkiler dolu.
    const group = items.filter((item) => item.section === section);
    const at = group.indexOf(items[index]);
    boxProgress.hidden = group.length < 2;
    boxProgress.replaceChildren(...group.map((_, k) => {
      const bar = document.createElement('span');
      if (k <= at) bar.className = 'is-done';
      return bar;
    }));
    new Image().src = bigImage(items[(index + 1) % items.length].slug); // sıradakini önceden yükler
  };
  const open = (list, i) => {
    items = list;
    prev.hidden = next.hidden = list.length < 2;
    show(i);
    box.showModal();
  };

  const galleryItems = $$('.gallery__item').map((b) => ({
    slug: b.dataset.img, title: b.dataset.title, alt: $('img', b).alt,
  }));
  $$('.gallery__item').forEach((b, i) => b.addEventListener('click', () => open(galleryItems, i)));

  // Menüdeki tabaklar tek sırada gezilir: bir bölüm bitince sonrakine geçilir.
  const menuButtons = $$('button.mi');
  const menuItems = menuButtons.map((b) => {
    const panel = b.closest('.panel');
    return { slug: b.dataset.img, title: $('.mi__name', b).textContent, section: $('.panel__title', panel).textContent, button: b, panel };
  });
  menuButtons.forEach((button, i) => button.addEventListener('click', () => open(menuItems, i)));

  // Kapanınca menü, en son bakılan ürünün bölümünde açık kalır.
  box.addEventListener('close', () => {
    const { button, panel } = items[index] || {};
    if (!button) return;
    if (panel.hidden) selectTab(document.getElementById(panel.getAttribute('aria-labelledby')));
    preview(button);
  });

  $('.lightbox__close').addEventListener('click', () => box.close());
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  box.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    // Dokunmatik ekranda sağ yarı ileri, sol yarı geri götürür.
    if (tapToBrowse.matches && items.length > 1) {
      show(index + (e.clientX > window.innerWidth / 2 ? 1 : -1));
      return;
    }
    if (e.target === box) box.close();
  });
  box.addEventListener('keydown', (e) => {
    if (items.length < 2) return;
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  /* --- Kaydırınca belirme --- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }
})();
