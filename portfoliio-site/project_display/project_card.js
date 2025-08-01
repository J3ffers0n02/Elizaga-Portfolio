const projectCardTemplate = `
    <div class="{imageWrapperClass}">
        {mediaContent}
    </div>
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
                const style = card.getAttribute('data-style') || 'default';
                const videoAttr = card.getAttribute('data-video');

                const images = imagesAttr.split(',').map(img => img.trim());
                const fullDescriptions = fullDescriptionsAttr.split('/').map(d => d.trim());
                const firstImage = images[0];

                // Style logic
                let imageWrapperClass = '';
                let imageClass = 'project-pic';

                if (style === 'window') {
                    imageWrapperClass = 'project-image-wrapper';
                    imageClass = 'project-pic2';
                } else if (style === 'mobile') {
                    imageWrapperClass = 'project-image-wrapper3';
                    imageClass = 'project-pic3';
                }

                // Media element (image or video)
                let mediaContent = '';
                if (videoAttr) {
                    mediaContent = `
                        <video class="project-video" muted loop preload="metadata">
                            <source src="${videoAttr}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                } else {
                    mediaContent = `<img src="${firstImage}" alt="${title}" class="${imageClass}">`;
                }

                // Skills
                let skillsSection = '';
                if (skills.trim().length > 0) {
                    const skillsHTML = skills.split(' ').map(skill => `<div class="custom-text">${skill}</div>`).join('');
                    skillsSection = `<div class="bubble-deets">${skillsHTML}</div>`;
                }

                // Final content
                const content = projectCardTemplate
                    .replaceAll('{title}', title)
                    .replaceAll('{category}', category)
                    .replaceAll('{previewDescription}', previewDescription)
                    .replaceAll('{skillsSection}', skillsSection)
                    .replaceAll('{imageWrapperClass}', imageWrapperClass)
                    .replaceAll('{mediaContent}', mediaContent);

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
                    modalBubbleDeets.innerHTML = skills.trim().length > 0
                        ? skills.split(' ').map(skill => `<div class="custom-text">${skill}</div>`).join('')
                        : '';

                    showImage(currentIndex);
                    modal.style.display = 'flex';

                    const leftArrow = document.querySelector('.left-arrow');
                    const rightArrow = document.querySelector('.right-arrow');
                    const arrowVisible = images.length > 1;

                    leftArrow.style.display = arrowVisible ? 'block' : 'none';
                    rightArrow.style.display = arrowVisible ? 'block' : 'none';

                    leftArrow.onclick = () => {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        showImage(currentIndex);
                    };

                    rightArrow.onclick = () => {
                        currentIndex = (currentIndex + 1) % images.length;
                        showImage(currentIndex);
                    };
                });

                // Hover-based video playback
                const video = card.querySelector('video.project-video');
                if (video) {
                    card.addEventListener('mouseenter', () => {
                        video.play();
                    });
                    card.addEventListener('mouseleave', () => {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            });

            // Modal close behavior
            const modal = document.getElementById('project-modal');
            document.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        })
        .catch(error => console.error('Error loading modal:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadModal();
});
