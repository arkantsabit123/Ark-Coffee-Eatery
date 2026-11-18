const button = document.querySelector<HTMLButtonElement>('[data-back-to-top]');

if (button) {
  const updateVisibility = () => {
    button.classList.toggle('is-visible', window.scrollY > 600);
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  });
}
