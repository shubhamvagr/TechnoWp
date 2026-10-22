
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  const items = rows.map((row) => {
    const columns = [...row.querySelectorAll(':scope > div')];

    const picture = columns[0]?.querySelector('picture');
    const title = columns[1]?.textContent.trim() || '';
    const category = columns[2]?.textContent.trim() || '';

    return {
      picture: picture?.cloneNode(true),
      title,
      category,
    };
  }).filter((item) => item.picture);

  const filters = [
    'All Work',
    'Creative',
    'Design',
    'Web Development',
    'Management',
  ];

  const filterBar = document.createElement('div');
  filterBar.className = 'portfolio-filters';

  const gallery = document.createElement('div');
  gallery.className = 'portfolio-gallery';

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'portfolio-item';
    card.dataset.category = item.category.toLowerCase();

    const image = item.picture;
    image.querySelector('img')?.setAttribute('alt', item.title);
    card.append(image);

    if (item.title) {
      const heading = document.createElement('h3');
      heading.textContent = item.title;
      card.append(heading);
    }

    gallery.append(card);
  });

  filters.forEach((filter, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = filter;
    button.className = index === 0 ? 'active' : '';
    button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

    button.addEventListener('click', () => {
      filterBar.querySelectorAll('button').forEach((other) => {
        other.classList.remove('active');
        other.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      gallery.querySelectorAll('.portfolio-item').forEach((card) => {
        const matches = filter === 'All Work'
          || card.dataset.category === filter.toLowerCase();

        card.hidden = !matches;
      });
    });

    filterBar.append(button);
  });

  block.replaceChildren(filterBar, gallery);
}
