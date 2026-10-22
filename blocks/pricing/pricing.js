
export default function decorate(block) {
  const rows = [...block.children];
  const plans = [];

  // Read the first row as plan names.
  const names = [...(rows[0]?.children || [])];

  names.forEach((cell, index) => {
    const plan = {
      name: cell.textContent.trim(),
      price: '',
      features: [],
      link: null,
    };

    rows.slice(1).forEach((row) => {
      const value = row.children[index];
      if (!value) return;

      const text = value.textContent.trim();
      if (!text) return;

      if (text.includes('Per Month')) {
        plan.price = text;
      } else {
        const link = value.querySelector('a');
        if (link) {
          plan.link = link.href;
        } else {
          plan.features.push(text);
        }
      }
    });

    plans.push(plan);
  });

  block.textContent = '';

  plans.forEach((plan) => {
    const card = document.createElement('article');
    card.className = 'pricing-card';

    const heading = document.createElement('h3');
    heading.textContent = plan.name;

    const price = document.createElement('div');
    price.className = 'pricing-card-price';
    price.textContent = plan.price;

    const list = document.createElement('ul');

    plan.features.forEach((feature) => {
      const item = document.createElement('li');
      item.textContent = feature;
      list.append(item);
    });

    const link = document.createElement('a');
    link.className = 'pricing-card-button';
    link.href = plan.link || '#';
    link.textContent = 'Read More';

    card.append(heading, price, list, link);
    block.append(card);
  });
}
