document.addEventListener('DOMContentLoaded', () => {
  const copyButton = document.querySelector('[data-copy-target]');
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
    copyButton.textContent = 'Copied';
    copyButton.classList.add('copied');
    window.setTimeout(() => {
      copyButton.textContent = originalLabel;
      copyButton.classList.remove('copied');
    }, 1800);
  });
});
