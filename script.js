// ===== SSQ Estates interactions =====
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), {passive:true});

const burger = document.getElementById('hamburger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, target = +el.dataset.count, t0 = performance.now(), dur = 1500;
  const tick = t => {
    const p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * ease).toLocaleString() + (target === 98 ? '%' : '+');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  io.unobserve(el);
}), {threshold:.5});
counters.forEach(c => io.observe(c));

// Lead form
document.getElementById('leadForm').addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('formNote');
  n.textContent = '✓ Thank you! Our consultant will call you shortly to schedule your viewing.';
  n.style.color = '#fff'; n.style.fontWeight = '600';
  e.target.reset();
});
