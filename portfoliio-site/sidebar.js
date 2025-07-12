let sidebarHTML = sessionStorage.getItem('sidebarHTML');

if (!sidebarHTML) {
    fetch('/sidebar.html')
        .then(response => response.text())
        .then(html => {
            sidebarHTML = html;
            sessionStorage.setItem('sidebarHTML', sidebarHTML);
            renderSidebar();
        })
        .catch(error => console.error('Error loading sidebar:', error));
} else {
    renderSidebar();
}

function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (container && sidebarHTML) {
        container.innerHTML = sidebarHTML;
        updateActiveLink();
    }
}

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#sidebar-container .sidebar ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active link when the page changes (e.g., via navigation)
window.addEventListener('popstate', updateActiveLink);