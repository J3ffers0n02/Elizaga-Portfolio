/* Loads and caches sidebar HTML, or renders it from cache */
let sidebarHTML = sessionStorage.getItem('sidebarHTML');

if (!sidebarHTML) {
    fetch('sidebar_elements/sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch sidebar.html: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            sidebarHTML = html;
            sessionStorage.setItem('sidebarHTML', sidebarHTML);
            renderSidebar();
        })
        .catch(error => {
            console.error('Error loading sidebar:', error);
            const container = document.getElementById('sidebar-container');
            if (container) {
                container.innerHTML = '<p>Error loading sidebar. Please check the console for details.</p>';
            }
        });
} else {
    renderSidebar();
}

/* Renders the sidebar HTML into the sidebar-container div */
function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (container && sidebarHTML) {
        container.innerHTML = sidebarHTML;
        updateActiveLink();
    }
}

/* Updates the active link based on the current page */
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