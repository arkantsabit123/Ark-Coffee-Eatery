export {};

const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const navElement = document.querySelector<HTMLElement>('[data-nav-links]');

if (toggle && navElement) {
  const closeMenu = () => {
    navElement.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    navElement.classList.toggle('is-open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  });

  navElement.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !toggle.contains(event.target) && !navElement.contains(event.target)) {
      closeMenu();
    }
  });
}
