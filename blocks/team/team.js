
const socialIcons = {
  facebook: 'f',
  x: '𝕏',
  instagram: '◎',
  vimeo: 'v',
};

function getSocialName(link) {
  const text = `${link.textContent} ${link.href}`.toLowerCase();

  if (text.includes('facebook') || text.includes('fb.com')) {
    return 'facebook';
  }
  if (text.includes('instagram')) return 'instagram';
  if (text.includes('vimeo')) return 'vimeo';
  if (text.includes('twitter') || text.includes('x.com')) return 'x';

  return '';
}

export default function decorate(block) {
  const rows = [...block.children];
  const members = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 4) return;

    const image = cells[0].querySelector('img');
    const name = cells[1].textContent.trim();
    const role = cells[2].textContent.trim();
    const description = cells[3].textContent.trim();
    const socialCell = cells[4];

    members.push({
      image: image?.src || '',
      alt: image?.alt || name,
      name,
      role,
      description,
      links: socialCell
        ? [...socialCell.querySelectorAll('a')]
        : [],
    });
  });

  block.textContent = '';

  members.forEach((member) => {
    const card = document.createElement('article');
    card.className = 'team-card';

    const image = document.createElement('img');
    image.className = 'team-photo';
    image.src = member.image;
    image.alt = member.alt;
    image.loading = 'lazy';

    const details = document.createElement('div');
    details.className = 'team-details';

    const name = document.createElement('h3');
    name.textContent = member.name;

    const role = document.createElement('p');
    role.className = 'team-role';
    role.textContent = member.role;

    const description = document.createElement('p');
    description.className = 'team-description';
    description.textContent = member.description;

    const social = document.createElement('div');
    social.className = 'team-social';

    member.links.forEach((originalLink) => {
      const platform = getSocialName(originalLink);
      if (!platform) return;

      const link = document.createElement('a');
      link.className = `team-social-link team-${platform}`;
      link.href = originalLink.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', platform);

      if (originalLink.href.startsWith('http')) {
        link.append(document.createTextNode(socialIcons[platform]));
        social.append(link);
      }
    });

    details.append(name, role, description, social);
    card.append(image, details);
    block.append(card);
  });
}
