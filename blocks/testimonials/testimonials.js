
export default function decorate(block) {
  const rows = [...block.children];
  const testimonials = [];

  rows.forEach((row) => {
    const cells = [...row.children];

    if (cells.length < 5) return;

    const image = cells[0].querySelector('img');
    const name = cells[1].textContent.trim();
    const role = cells[2].textContent.trim();
    const rating = cells[3].textContent.trim();
    const review = cells[4].textContent.trim();

    testimonials.push({
      image: image?.src || '',
      alt: image?.alt || name,
      name,
      role,
      rating,
      review,
    });
  });

  block.textContent = '';

  testimonials.forEach((testimonial) => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';

    const header = document.createElement('div');
    header.className = 'testimonial-header';

    if (testimonial.image) {
      const img = document.createElement('img');
      img.className = 'testimonial-avatar';
      img.src = testimonial.image;
      img.alt = testimonial.alt;
      header.append(img);
    }

    const person = document.createElement('div');
    person.className = 'testimonial-person';

    const name = document.createElement('h3');
    name.textContent = testimonial.name;

    const role = document.createElement('p');
    role.className = 'testimonial-role';
    role.textContent = testimonial.role;

    person.append(name, role);
    header.append(person);

    const rating = document.createElement('div');
    rating.className = 'testimonial-rating';
    rating.setAttribute('aria-label', `${testimonial.rating} out of 5 stars`);
    rating.textContent = '☆'.repeat(
      Math.max(0, Math.min(5, Number(testimonial.rating) || 5)),
    );

    const review = document.createElement('p');
    review.className = 'testimonial-review';
    review.textContent = testimonial.review;

    card.append(header, rating, review);
    block.append(card);
  });
}
