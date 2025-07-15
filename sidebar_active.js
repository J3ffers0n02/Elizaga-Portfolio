// sidebar_active.js
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar ul li a');
  const currentPath = window.location.pathname;

  links.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath || (currentPath === '/' && linkPath.includes('index.html'))) {
      link.classList.add('active');
    }
  });
});
