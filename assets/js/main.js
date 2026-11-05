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

  const preview = (button) => {
    if (!button) return;
    const src = bigImage(button.dataset.img);
    $$('button.mi.is-active').forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');
    previewName.textContent = $('.mi__name', button).textContent;
    previewImg.classList.toggle('is-whole', 'whole' in button.dataset); // broşür görseli kırpılmadan gösterilir
    if (previewImg.getAttribute('src') === src) return;
    previewImg.src = src;
    previewImg.classList.remove('is-swap');
    void previewImg.offsetWidth; // animasyonu yeniden başlatır
    previewImg.classList.add('is-swap');
  };

  const selectTab = (tab, { focus = false } = {}) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'center' });
    preview($(`#${tab.getAttribute('aria-controls')} button.mi`));
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
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
  preview($('#panel-doner button.mi'));

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
  const prev = $('.lightbox__nav--prev');
  const next = $('.lightbox__nav--next');
  let items = [];
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const { slug, title, alt } = items[index];
    boxImg.src = bigImage(slug);
    boxImg.alt = alt || title;
    boxCap.textContent = title;
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

  // Menüdeki fotoğraflı tabaklar, açık sekme içinde gezilebilir.
  $$('button.mi').forEach((button) => {
    button.addEventListener('click', () => {
      const siblings = $$('button.mi', button.closest('.panel'));
      const list = siblings.map((b) => ({ slug: b.dataset.img, title: $('.mi__name', b).textContent }));
      open(list, siblings.indexOf(button));
    });
  });

  $('.lightbox__close').addEventListener('click', () => box.close());
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
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
