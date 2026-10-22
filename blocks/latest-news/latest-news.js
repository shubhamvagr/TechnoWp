
export default function decorate(block) {
  const rows = [...block.children];

  const cards = rows.map((row) => {
    const cells = [...row.children];
    const img = cells[0]?.querySelector('img');
    const link = cells[1]?.querySelector('a');

    return {
      image: img?.src || '',
      alt: img?.alt || '',
      category: cells[1]?.textContent.trim() || '',
      title: cells[2]?.textContent.trim() || '',
      description: cells[3]?.textContent.trim() || '',
      link: link?.href || '#',
    };
  }).filter((card) => card.image && card.title);

  block.textContent = '';

  const grid = document.createElement('div');
  grid.className = 'latest-news-grid';

  cards.forEach((card) => {
    const article = document.createElement('article');
    article.className = 'latest-news-card';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'latest-news-image';

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.alt || card.title;
    img.loading = 'lazy';

    const badge = document.createElement('span');
    badge.className = 'latest-news-category';

    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '♙';

    badge.append(icon, document.createTextNode(` ${card.category}`));
    imageWrap.append(img, badge);

    const content = document.createElement('div');
    content.className = 'latest-news-content';

    const title = document.createElement('h3');
    title.textContent = card.title;

    const description = document.createElement('p');
    description.textContent = card.description;

    const link = document.createElement('a');
    link.href = card.link;
    link.className = 'latest-news-button';
    link.textContent = 'Read More';

    content.append(title, description, link);
    article.append(imageWrap, content);
    grid.append(article);
  });

  block.append(grid);
}
