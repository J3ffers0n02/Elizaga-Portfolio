const projectCardTemplate = `
    <img src="{image}" alt="Image Name" class="project-pic">
    <div class="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p class="category">{category}</p>
    </div>
`;

// Function to populate project cards
document.querySelectorAll('.project-card').forEach(card => {
    const title = card.getAttribute('data-title');
    const description = card.getAttribute('data-description');
    const category = card.getAttribute('data-category');
    const image = card.getAttribute('data-image') || 'project_display/placeholder.jpg'; // Fallback image path
    let content = projectCardTemplate
        .replace('{title}', title)
        .replace('{description}', description)
        .replace('{category}', category)
        .replace('{image}', image);
    card.innerHTML = content;
}


);