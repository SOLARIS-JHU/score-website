document.addEventListener('DOMContentLoaded', () => {
  const copyButton = document.querySelector('[data-copy-target]');
  const scrollButton = document.querySelector('.scroll-to-top');

  if (scrollButton) {
    const updateScrollButton = () => {
      scrollButton.classList.toggle('visible', window.scrollY > 320);
    };

    window.addEventListener('scroll', updateScrollButton, { passive: true });
    scrollButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    updateScrollButton();
  }

  if (!copyButton) return;

  copyButton.addEventListener('click', async () => {
    const target = document.getElementById(copyButton.dataset.copyTarget);
    if (!target) return;
    const citation = target.textContent.trim();

    try {
      await navigator.clipboard.writeText(citation);
    } catch (_error) {
      const textarea = document.createElement('textarea');
      textarea.value = citation;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }

    const originalLabel = copyButton.textContent;
    const label = copyButton.querySelector('span');
    if (label) label.textContent = 'Copied';
    copyButton.classList.add('copied');
    window.setTimeout(() => {
      if (label) {
        label.textContent = 'Copy';
      } else {
        copyButton.textContent = originalLabel;
      }
      copyButton.classList.remove('copied');
    }, 1800);
  });
});
