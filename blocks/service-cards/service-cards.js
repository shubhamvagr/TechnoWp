
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

  const grid = document.createElement('div');
  grid.className = 'service-cards-grid';

  cards.forEach((card) => {
    const item = document.createElement('article');
    item.className = 'service-card';

    const imageLink = document.createElement('a');
    imageLink.className = 'service-card-image';
    imageLink.href = card.link;

    const image = document.createElement('img');
    image.src = card.image;
    image.alt = card.alt || card.title;
    image.loading = 'lazy';

    imageLink.append(image);

    const content = document.createElement('div');
    content.className = 'service-card-content';

    const title = document.createElement('h3');
    title.textContent = card.title;

    const category = document.createElement('p');
    category.className = 'service-card-category';
    category.textContent = card.category;

    content.append(title, category);
    item.append(imageLink, content);
    grid.append(item);
  });

  block.append(grid);
}
