const cursor = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX-r.left}px`);
    card.style.setProperty('--my', `${e.clientY-r.top}px`);
  });
});

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-button)');
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});

sections.forEach(s => activeObserver.observe(s));
