const projects = document.querySelectorAll('.project');

// Add event listener to each toggle
projects.forEach((project) => {
  const slideToggle = project.querySelector('.hr.slide .button');
  const slideToggleSvg = slideToggle.querySelector('svg');
  const description = project.querySelector('.description');

  slideToggle.addEventListener('click', () => {

    // Rotate the toggle arrow
    if (description.classList.contains('hidden')) {
      slideToggle.classList.replace('down', 'up');
    } else if (description.classList.contains('visible')) {
      slideToggle.classList.replace('up', 'down');
    }

    // Show/hide the description
    slide(description);
  });
});
