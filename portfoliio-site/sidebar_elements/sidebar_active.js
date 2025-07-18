// sidebar_active.js
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar ul li a');
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  links.forEach(link => {
    const linkUrl = new URL(link.href, window.location.origin);
    const linkPath = linkUrl.pathname;
    const linkHash = linkUrl.hash;

    // ✅ If this is the Capstone link and we're on either capstone_web.html or capstone_mobile.html
    if (linkPath.endsWith('capstone_web.html') &&
      (currentPath.endsWith('capstone_web.html') || currentPath.endsWith('capstone_mobile.html'))) {
      link.classList.add('active');
    }
    // ✅ Exact match for href + hash (for other links)
    else if (linkPath === currentPath && linkHash === currentHash) {
      link.classList.add('active');
    }
    // ✅ Special case for Projects main link with no hash
    else if (currentPath.endsWith('projects.html') && currentHash === '' && link.href.endsWith('projects.html')) {
      link.classList.add('active');
    }
  });
});
