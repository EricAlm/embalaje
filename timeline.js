(() => {
  'use strict';
  const bar = document.getElementById('tl-progress');
  let frame = 0;

  function update() {
    frame = 0;
    const range = document.documentElement.scrollHeight - innerHeight;
    const progress = range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
    bar.style.width = `${progress * 100}%`;
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  update();
})();
