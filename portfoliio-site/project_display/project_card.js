
const projectCardTemplate = `
    <img src="{image}" alt="Image Name" class="project-pic">
    <div class="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p class="category">{category}</p>
    </div>
`;

// Function to load the modal HTML
function loadModal() {
    fetch('modal.html')
        .then(response => response.text())
        .then(data => {
            // Append modal HTML to the body
            document.body.insertAdjacentHTML('beforeend', data);

            // Add event listeners for modal functionality
            document.querySelectorAll('.project-card').forEach(card => {
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-description');
                const category = card.getAttribute('data-category');
                const image = card.getAttribute('data-image') || 'project_display/placeholder.jpg';

                // Populate project card
                let content = projectCardTemplate
                    .replace('{title}', title)
                    .replace('{description}', description)
                    .replace('{category}', category)
                    .replace('{image}', image);
                card.innerHTML = content;

                // Add click event to open modal
                card.addEventListener('click', () => {
                    const modal = document.getElementById('project-modal');
                    const modalImage = document.getElementById('modal-image');
                    const modalTitle = document.getElementById('modal-title');
                    const modalDescription = document.getElementById('modal-description');
                    const modalCategory = document.getElementById('modal-category');

                    modalImage.src = image;
                    modalImage.alt = title;
                    modalTitle.textContent = title;
                    modalDescription.textContent = description;
                    modalCategory.textContent = category;

                    modal.style.display = 'flex';
                });
            });

            // Close modal when clicking the close button
            document.querySelector('.modal-close').addEventListener('click', () => {
                document.getElementById('project-modal').style.display = 'none';
            });

            // Close modal when clicking outside the modal content
            document.getElementById('project-modal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('project-modal')) {
                    document.getElementById('project-modal').style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error loading modal:', error));
}

// Populate project cards and load modal
document.addEventListener('DOMContentLoaded', () => {
    loadModal();
});
