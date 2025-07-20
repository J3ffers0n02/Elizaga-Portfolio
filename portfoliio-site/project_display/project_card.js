const projectCardTemplate = `
    <img src="{image}" alt="Image Name" class="project-pic">
    <div class="project-content">
        <h3>{title}</h3>
        {skillsSection}
        <p>{description}</p>
        <p class="category">{category}</p>
    </div>
`;

// Function to load the modal HTML
function loadModal() {
    fetch('modal.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);

            document.querySelectorAll('.project-card').forEach(card => {
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-description');
                const category = card.getAttribute('data-category');
                const image = card.getAttribute('data-image') || 'project_display/placeholder.jpg';
                const skills = card.getAttribute('data-skills') || ''; // No default skills, empty if not provided

                // Generate skills HTML only if skills exist
                let skillsSection = '';
                if (skills && skills.trim().length > 0) {
                    const skillsHTML = skills.split(' ').map(skill => `<div class="custom-text">${skill}</div>`).join('');
                    skillsSection = `<div class="bubble-deets">${skillsHTML}</div>`;
                }

                // Populate project card
                let content = projectCardTemplate
                    .replace('{title}', title)
                    .replace('{description}', description)
                    .replace('{category}', category)
                    .replace('{image}', image)
                    .replace('{skillsSection}', skillsSection);
                card.innerHTML = content;

                // Modal logic (updated to include skills)
                card.addEventListener('click', () => {
                    const modal = document.getElementById('project-modal');
                    const modalImage = document.getElementById('modal-image');
                    const modalTitle = document.getElementById('modal-title');
                    const modalDescription = document.getElementById('modal-description');
                    const modalCategory = document.getElementById('modal-category');
                    const modalBubbleDeets = modal.querySelector('.modal-bubble-deets');

                    modalImage.src = image;
                    modalImage.alt = title;
                    modalTitle.textContent = title;
                    modalDescription.textContent = description;
                    modalCategory.textContent = category;

                    // Populate modal with skills only if they exist
                    if (skills && skills.trim().length > 0) {
                        modalBubbleDeets.innerHTML = skills.split(' ').map(skill => `<div class="custom-text">${skill}</div>`).join('');
                    } else {
                        modalBubbleDeets.innerHTML = ''; // Clear if no skills
                    }

                    modal.style.display = 'flex';
                });
            });

            // Close modal logic remains the same
            document.querySelector('.modal-close').addEventListener('click', () => {
                document.getElementById('project-modal').style.display = 'none';
            });

            document.getElementById('project-modal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('project-modal')) {
                    document.getElementById('project-modal').style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error loading modal:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadModal();
});