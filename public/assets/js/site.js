document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const toolDeck = document.querySelector('[data-tool-deck]');

if (toolDeck) {
  const previewImage = toolDeck.querySelector('[data-tool-preview-image]');
  const previewDomain = toolDeck.querySelector('[data-tool-preview-domain]');
  const previewCategory = toolDeck.querySelector('[data-tool-preview-category]');
  const previewOptions = toolDeck.querySelectorAll('[data-tool-preview-option]');

  function activateToolPreview(option) {
    previewOptions.forEach((previewOption) => previewOption.classList.remove('is-active'));
    option.classList.add('is-active');
    previewImage.src = option.dataset.previewSrc;
    previewImage.alt = option.dataset.previewAlt;
    previewDomain.textContent = option.dataset.previewDomain;
    previewCategory.textContent = option.dataset.previewCategory;
  }

  previewOptions.forEach((option) => {
    option.addEventListener('pointerenter', () => activateToolPreview(option));
    option.addEventListener('focus', () => activateToolPreview(option));
  });
}

const reveals = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  reveals.forEach((node) => observer.observe(node));
} else {
  reveals.forEach((node) => node.classList.add('is-visible'));
}
