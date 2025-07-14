document.addEventListener('DOMContentLoaded', () => {
    const projectScroll = document.querySelector('.page-projects .projects-hscroll');
    if (projectScroll) {
        projectScroll.addEventListener('scroll', () => {
            const cards = projectScroll.querySelectorAll('.project-card');
            const lastCard = cards[cards.length - 1];
            const scrollWidth = projectScroll.scrollWidth;
            const scrollLeft = projectScroll.scrollLeft;
            const clientWidth = projectScroll.clientWidth;

            // Check if the last card is fully visible
            const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
            if (scrollWidth - scrollLeft - clientWidth < lastCard.offsetWidth + 10) { // Small tolerance
                projectScroll.classList.add('no-fade');
            } else {
                projectScroll.classList.remove('no-fade');
            }
        });
    }
});

// Existing card population code remains unchanged
const projectCardTemplate = `
    <img src="{image}" alt="Image Name" class="project-pic">
    <div class="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p class="category">{category}</p>
    </div>
`;

document.querySelectorAll('.project-card').forEach(card => {
    const title = card.getAttribute('data-title');
    const description = card.getAttribute('data-description');
    const category = card.getAttribute('data-category');
    const image = card.getAttribute('data-image') || 'project_display/placeholder.jpg';
    let content = projectCardTemplate
        .replace('{title}', title)
        .replace('{description}', description)
        .replace('{category}', category)
        .replace('{image}', image);
    card.innerHTML = content;
});