(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.getElementById('inicio');
  const stage = document.getElementById('hero-stage');
  const hud = document.getElementById('hud');
  const header = document.getElementById('site-header');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const setMotion = () => {
    const reduced = preference.matches;
    root.classList.toggle('reduce-motion', reduced);
    document.dispatchEvent(new Event('pagemotionchange'));
    schedule();
  };
  function setExplore(value, focus = true) {
    stage.classList.toggle('is-exploring', value);
    // La ficha de control ya no se muestra; el simulador sigue funcionando.
    hud.hidden = true;
    document.getElementById('sim-explore').hidden = value;
    document.getElementById('sim-explore').setAttribute('aria-expanded', String(value));
    document.getElementById('sim-exit').hidden = !value;
    document.getElementById('c').tabIndex = value ? 0 : -1;
    document.dispatchEvent(new Event('simulatorviewchange'));
    if (focus) (value ? document.getElementById('sim-exit') : document.getElementById('sim-explore')).focus({ preventScroll: true });
  }
  document.querySelectorAll('[data-open-simulator]').forEach(button => button.addEventListener('click', () => {
    hero.scrollIntoView({ behavior: root.classList.contains('reduce-motion') ? 'instant' : 'smooth' });
    setExplore(true);
  }));
  document.querySelectorAll('[data-close-simulator]').forEach(button => button.addEventListener('click', () => setExplore(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !document.getElementById('diagram-dialog').open && stage.classList.contains('is-exploring')) setExplore(false);
  });
  document.getElementById('sim-pause').addEventListener('click', () => document.getElementById('btn-pause').click());
  preference.addEventListener('change', setMotion);

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: .01, rootMargin: '0px 0px 12% 0px' });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  root.classList.add('motion-ready');
  // Red de seguridad: si el observer no llega a dispararse, nada queda invisible.
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(element => {
      if (element.getBoundingClientRect().top < innerHeight * 1.2) element.classList.add('is-visible');
    });
  }, 2500);

  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  const navLinks = [...document.querySelectorAll('.site-nav a')].filter(link => link.hash);
  const navSections = navLinks.map(link => document.querySelector(link.hash));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let framePending = false;
  function schedule() {
    if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); }
  }
  function updateScroll() {
    framePending = false;
    const y = window.scrollY, height = window.innerHeight;
    const reduced = root.classList.contains('reduce-motion');
    header.classList.toggle('is-scrolled', y > 40);
    header.classList.toggle('is-light', y > hero.offsetHeight - header.offsetHeight);
    const range = document.documentElement.scrollHeight - height;
    document.getElementById('reading-progress').style.transform = `scaleX(${range > 0 ? y / range : 0})`;
    const progress = clamp(y / Math.max(1, hero.offsetHeight), 0, 1);
    const heroFade = clamp((progress - .35) / .28, 0, 1);
    document.getElementById('hero-copy').style.setProperty('--hero-copy-y', `${reduced ? 0 : -progress * 40}px`);
    document.getElementById('hero-copy').style.setProperty('--hero-copy-opacity', String(reduced ? 1 : 1 - heroFade));
    for (const element of parallaxItems) {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > height + 100) continue;
      const amount = reduced || innerWidth <= 600 ? 0 : Number(element.dataset.parallax);
      const position = clamp((rect.top + rect.height / 2 - height / 2) / height, -1, 1);
      element.style.setProperty('--parallax-y', `${position * amount}px`);
    }
    let navIndex = -1;
    navSections.forEach((section, index) => { if (section.getBoundingClientRect().top < height * .4) navIndex = index; });
    navLinks.forEach((link, index) => index === navIndex ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.querySelectorAll('.spec-detail').forEach(detail => detail.addEventListener('toggle', schedule));
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting && stage.classList.contains('is-exploring')) setExplore(false, false);
  }, { threshold: 0 }).observe(stage);

  const dialog = document.getElementById('diagram-dialog');
  let opener = null;
  document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    opener = link;
    const image = document.getElementById('dialog-image');
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || link.dataset.caption;
    document.getElementById('dialog-caption').textContent = link.dataset.caption;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  } });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); opener?.focus({ preventScroll: true }); });

  // El contenido editorial sigue disponible aunque no responda el CDN del 3D.
  const loadTimer = setTimeout(() => {
    if (!stage.classList.contains('is-ready')) document.getElementById('sim-load').textContent = 'La vista 3D tarda en iniciar. Revisá tu conexión; podés seguir recorriendo el proyecto.';
  }, 18000);
  document.addEventListener('simulatorready', () => {
    clearTimeout(loadTimer);
    document.getElementById('sim-pause').disabled = false;
  }, { once: true });
  if (stage.classList.contains('is-ready')) document.getElementById('sim-pause').disabled = false;

  // Las demostraciones se reproducen a pedido y de a una para facilitar su lectura.
  const panelDemos = [...document.querySelectorAll('.panel-demo-video')];
  panelDemos.forEach(video => {
    video.addEventListener('play', () => {
      panelDemos.forEach(other => { if (other !== video) other.pause(); });
    });
  });
  const panelDemoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (!entry.isIntersecting) entry.target.pause(); });
  });
  panelDemos.forEach(video => panelDemoObserver.observe(video));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) panelDemos.forEach(video => video.pause());
  });

  // Puestos: selector accesible, sin carrusel ni contenido fuera de pantalla.
  const stations = document.querySelector('[data-stations]');
  if (stations) {
    const tabs = [...stations.querySelectorAll('[role="tab"]')];
    const panels = [...stations.querySelectorAll('[role="tabpanel"]')];
    const activate = (index, focus = false) => {
      tabs.forEach((tab, position) => {
        const selected = position === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        tab.classList.toggle('is-active', selected);
        panels[position].hidden = !selected;
      });
      if (focus) tabs[index].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', event => {
        let next = null;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== null) {
          event.preventDefault();
          activate(next, true);
        }
      });
    });
    activate(0);
  }

  setMotion();
})();
