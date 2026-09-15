(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.getElementById('inicio');
  const stage = document.getElementById('hero-stage');
  const hud = document.getElementById('hud');
  const header = document.getElementById('site-header');
  const motionToggle = document.getElementById('motion-toggle');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let userReduced = false;
  try { userReduced = localStorage.getItem('linea-reduced-motion') === 'true'; } catch { /* Preferencia solo para esta sesión. */ }
  const setMotion = () => {
    const reduced = preference.matches || userReduced;
    root.classList.toggle('reduce-motion', reduced);
    motionToggle.setAttribute('aria-pressed', String(reduced));
    motionToggle.textContent = reduced ? 'Movimiento reducido' : 'Reducir movimiento';
    document.dispatchEvent(new Event('pagemotionchange'));
    schedule();
  };
  function setExplore(value, focus = true) {
    stage.classList.toggle('is-exploring', value);
    hud.hidden = !value;
    document.getElementById('sim-explore').hidden = value;
    document.getElementById('sim-explore').setAttribute('aria-expanded', String(value));
    document.getElementById('sim-exit').hidden = !value;
    document.getElementById('c').tabIndex = value ? 0 : -1;
    document.dispatchEvent(new Event('simulatorviewchange'));
    if (focus) (value ? document.getElementById('hud-close') : document.getElementById('sim-explore')).focus({ preventScroll: true });
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
  motionToggle.addEventListener('click', () => {
    userReduced = !root.classList.contains('reduce-motion');
    try { localStorage.setItem('linea-reduced-motion', String(userReduced)); } catch { /* Sin almacenamiento disponible. */ }
    setMotion();
  });
  preference.addEventListener('change', setMotion);

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: .08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  root.classList.add('motion-ready');

  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  const drift = document.querySelector('[data-drift]');
  const steps = [...document.querySelectorAll('[data-process-step]')];
  const processImages = [...document.querySelectorAll('[data-process-image]')];
  const captions = ['Identificación del equipo', 'Impresión y aplicación de etiquetas', 'Control óptico de etiquetas', 'Manipulación y etiquetado de caja', 'Descarga y retorno'];
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const navSections = navLinks.map(link => document.querySelector(link.hash));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let framePending = false;
  let activeStep = -1;
  function schedule() {
    if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); }
  }
  function updateScroll() {
    framePending = false;
    const y = window.scrollY, height = window.innerHeight;
    const reduced = root.classList.contains('reduce-motion');
    header.classList.toggle('is-scrolled', y > 40);
    const range = document.documentElement.scrollHeight - height;
    document.getElementById('reading-progress').style.transform = `scaleX(${range > 0 ? y / range : 0})`;
    const progress = clamp(y / Math.max(1, hero.offsetHeight), 0, 1);
    document.getElementById('hero-copy').style.setProperty('--hero-copy-y', `${reduced ? 0 : -progress * 65}px`);
    document.getElementById('hero-copy').style.setProperty('--hero-copy-opacity', String(reduced ? 1 : 1 - progress * .8));
    for (const element of parallaxItems) {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > height + 100) continue;
      const amount = reduced || innerWidth <= 600 ? 0 : Number(element.dataset.parallax);
      const position = clamp((rect.top + rect.height / 2 - height / 2) / height, -1, 1);
      element.style.setProperty('--parallax-y', `${position * amount}px`);
    }
    if (drift) {
      // La frase siempre cabe completa. El parallax solo añade un leve movimiento vertical.
      const rect = drift.parentElement.getBoundingClientRect();
      const offset = reduced ? 0 : clamp((rect.top + rect.height / 2 - height / 2) / height, -1, 1) * 8;
      drift.style.setProperty('--drift-y', `${offset}px`);
    }
    let nextStep = 0;
    for (let index = 0; index < steps.length; index++) if (steps[index].getBoundingClientRect().top < height * .53) nextStep = index;
    if (nextStep !== activeStep) {
      activeStep = nextStep;
      steps.forEach((step, index) => step.classList.toggle('is-active', index === activeStep));
      processImages.forEach((image, index) => image.classList.toggle('is-active', index === activeStep));
      document.getElementById('process-counter').textContent = `${String(activeStep + 1).padStart(2, '0')} / 05`;
      document.getElementById('process-caption').textContent = captions[activeStep];
      document.getElementById('step-progress').style.width = `${(activeStep + 1) * 20}%`;
      const enlarge = document.getElementById('process-enlarge');
      enlarge.href = processImages[activeStep].src;
      enlarge.dataset.caption = `${captions[activeStep]} · Esquema del sistema`;
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
  setMotion();
})();
