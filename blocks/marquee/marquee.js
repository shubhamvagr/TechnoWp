
export default function decorate(block) {
  const text = block.textContent.trim().replace(/\s+/g, ' ');
  block.textContent = '';

  const track = document.createElement('div');
  track.className = 'marquee-track';

  // Duplicate the text to create a seamless loop.
  for (let i = 0; i < 2; i += 1) {
    const content = document.createElement('div');
    content.className = 'marquee-content';
    content.setAttribute('aria-hidden', i === 1 ? 'true' : 'false');
    content.textContent = `${text}   **   `;
    track.append(content);
  }

  block.append(track);
}
