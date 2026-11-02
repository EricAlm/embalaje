(() => {
  'use strict';

  const rail = document.getElementById('tl-rail');
  if (!rail) return;

  const cards = [...rail.querySelectorAll('.tl-card')];
  const yearButtons = [...document.querySelectorAll('.tl-year-nav button')];
  const prev = document.getElementById('tl-prev');
  const next = document.getElementById('tl-next');
  const progress = document.getElementById('tl-rail-progress');
  const pageProgress = document.getElementById('tl-progress');
  let frame = 0;

  const gap = () => parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap || 0) || 0;
  const step = () => (cards[0]?.getBoundingClientRect().width || 340) + gap();

  function update() {
    frame = 0;
    const max = rail.scrollWidth - rail.clientWidth;
    const ratio = max > 0 ? rail.scrollLeft / max : 0;
    progress.style.width = `${ratio * 100}%`;

    const pageMax = document.documentElement.scrollHeight - innerHeight;
    pageProgress.style.width = `${pageMax > 0 ? Math.min(1, Math.max(0, scrollY / pageMax)) * 100 : 0}%`;

    const index = cards.reduce((best, card, position) => (
      Math.abs(card.offsetLeft - rail.scrollLeft) < Math.abs(cards[best].offsetLeft - rail.scrollLeft) ? position : best
    ), 0);
    const atEnd = rail.scrollLeft >= max - 2;
    const active = (atEnd ? cards[cards.length - 1] : cards[index]).dataset.year;
    yearButtons.forEach(button => button.classList.toggle('is-active', button.dataset.year === active));

    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max - 2;
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function scrollToCard(card) {
    rail.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }

  prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));

  yearButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = cards.find(item => item.dataset.year === button.dataset.year);
      if (card) scrollToCard(card);
    });
  });

  rail.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      rail.scrollBy({ left: step(), behavior: 'smooth' });
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      rail.scrollBy({ left: -step(), behavior: 'smooth' });
    }
    if (event.key === 'Home') {
      event.preventDefault();
      rail.scrollTo({ left: 0, behavior: 'smooth' });
    }
    if (event.key === 'End') {
      event.preventDefault();
      rail.scrollTo({ left: rail.scrollWidth, behavior: 'smooth' });
    }
  });

  rail.addEventListener('scroll', schedule, { passive: true });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });

  update();
})();
