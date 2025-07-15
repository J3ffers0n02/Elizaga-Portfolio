// sidebar_active.js
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar ul li a');
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  links.forEach(link => {
    const linkUrl = new URL(link.href);
    const linkPath = linkUrl.pathname;
    const linkHash = linkUrl.hash;

    // Exact match for href + hash
    if (linkPath === currentPath && linkHash === currentHash) {
      link.classList.add('active');
    }
    // If no hash in URL and it's the Projects main link
    if (currentPath === '/projects.html' && currentHash === '' && link.href.endsWith('projects.html')) {
      link.classList.add('active');
    }
  });
});

