
export default function decorate(block) {
  const rows = [...block.children];

  const cards = rows.map((row) => {
    const cells = [...row.children];
    const image = cells[0]?.querySelector('img');

    return {
      image: image?.src || '',
      alt: image?.alt || '',
      title: cells[1]?.textContent.trim() || '',
      category: cells[2]?.textContent.trim() || '',
      link: cells[1]?.querySelector('a')?.href || '#',
    };
  }).filter((card) => card.image && card.title);

  block.textContent = '';

  const viewport = document.createElement('div');
  viewport.className = 'service-cards-viewport';

  const track = document.createElement('div');
  track.className = 'service-cards-track';

  cards.forEach((card) => {
    const item = document.createElement('article');
    item.className = 'service-card';

    const imageLink = document.createElement('a');
    imageLink.className = 'service-card-image';
    imageLink.href = card.link;

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.alt || card.title;
    img.loading = 'lazy';

    imageLink.append(img);

    const content = document.createElement('div');
    content.className = 'service-card-content';

    const title = document.createElement('h3');
    title.textContent = card.title;

    const category = document.createElement('p');
    category.className = 'service-card-category';
    category.textContent = card.category;

    content.append(title, category);
    item.append(imageLink, content);
    track.append(item);
  });

  viewport.append(track);

  const prev = document.createElement('button');
  prev.className = 'service-cards-arrow service-cards-prev';
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Previous services');
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'service-cards-arrow service-cards-next';
  next.type = 'button';
  next.setAttribute('aria-label', 'Next services');
  next.textContent = '›';

  const move = (direction) => {
    const card = track.querySelector('.service-card');
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;

    viewport.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  const controls = document.createElement('div');
  controls.className = 'service-cards-controls';
  controls.append(prev, next);

  block.append(controls, viewport);
}
