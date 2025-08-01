const projectCardTemplate = `
    <img src="{image}" alt="{title}" class="project-pic">
    <div class="project-content">
        <h3>{title}</h3>
        {skillsSection}
        <p>{previewDescription}</p>
        <p class="category">{category}</p>
    </div>
`;

function loadModal() {
    fetch('modal.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);

            document.querySelectorAll('.project-card').forEach(card => {
                const title = card.getAttribute('data-title');
                const previewDescription = card.getAttribute('data-preview-description') || 'No preview description provided.';
                const fullDescriptionsAttr = card.getAttribute('data-image-descriptions') || '';
                const category = card.getAttribute('data-category');
                const imagesAttr = card.getAttribute('data-images') || card.getAttribute('data-image') || 'project_display/placeholder.jpg';
                const skills = card.getAttribute('data-skills') || '';

                const images = imagesAttr.split(',').map(img => img.trim());
                const fullDescriptions = fullDescriptionsAttr.split('/').map(d => d.trim());
                const firstImage = images[0];

                // Generate skills HTML
                let skillsSection = '';
                if (skills && skills.trim().length > 0) {
                    const skillsHTML = skills.split(' ').map(skill => `<div class="custom-text">${skill}</div>`).join('');
                    skillsSection = `<div class="bubble-deets">${skillsHTML}</div>`;
                }

                // Populate project card
                let content = projectCardTemplate
                    .replaceAll('{title}', title)
                    .replaceAll('{category}', category)
                    .replaceAll('{image}', firstImage)
                    .replaceAll('{previewDescription}', previewDescription)
                    .replaceAll('{skillsSection}', skillsSection);

                card.innerHTML = content;

                // Modal logic
                card.addEventListener('click', () => {
                    const modal = document.getElementById('project-modal');
                    const modalImage = document.getElementById('modal-image');
                    const modalTitle = document.getElementById('modal-title');
                    const modalDescription = document.getElementById('modal-description');
                    const modalCategory = document.getElementById('modal-category');
                    const modalBubbleDeets = modal.querySelector('.modal-bubble-deets');

                    let currentIndex = 0;

                    function showImage(index) {
                        modalImage.src = images[index];
                        modalImage.alt = `${title} (${index + 1})`;
                        modalDescription.textContent = fullDescriptions[index] || 'No detailed description.';
                    }

                    modalTitle.textContent = title;
                    modalCategory.textContent = category;

                    if (skills && skills.trim().length > 0) {
                        modalBubbleDeets.innerHTML = skills.split(' ').map(skill => `<div class="custom-text">${skill}</div>`).join('');
                    } else {
                        modalBubbleDeets.innerHTML = '';
                    }

                    showImage(currentIndex);
                    modal.style.display = 'flex';

                    // Arrows
                    const leftArrow = document.querySelector('.left-arrow');
                    const rightArrow = document.querySelector('.right-arrow');
                    if (images.length <= 1) {
                        leftArrow.style.display = 'none';
                        rightArrow.style.display = 'none';
                    } else {
                        leftArrow.style.display = 'block';
                        rightArrow.style.display = 'block';
                    }

                    leftArrow.onclick = () => {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        showImage(currentIndex);
                    };

                    rightArrow.onclick = () => {
                        currentIndex = (currentIndex + 1) % images.length;
                        showImage(currentIndex);
                    };
                });
            });

            // Close modal
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
