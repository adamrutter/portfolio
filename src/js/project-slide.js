const projects = document.querySelectorAll('.project');

// Add event listener to each toggle
if (document.querySelector('body').classList.contains('home')) {
	projects.forEach(project => {
		const slideToggle = project.querySelector('.hr.slide .button');
		const slideToggleSvg = slideToggle.querySelector('svg');
		const description = project.querySelector('.project-description');
		function rotateButton() {
			// Rotate the toggle arrow
			if (description.classList.contains('hidden')) {
				slideToggle.classList.replace('down', 'up');
			} else if (description.classList.contains('visible')) {
				slideToggle.classList.replace('up', 'down');
			}
		}
		function ariaToggle() {
			// Check to see if the button is pressed
			const pressed = slideToggleSvg.getAttribute('aria-pressed') === 'true';
			// Change aria-pressed to the opposite state
			slideToggleSvg.setAttribute('aria-pressed', !pressed);
		}

		slideToggle.addEventListener('click', () => {
			rotateButton();
			ariaToggle();
			slide(description);
		});

		slideToggle.addEventListener('keyup', () => {
			if (event.keyCode === 13) {
				rotateButton();
				ariaToggle();
				slide(description);
			}
		});
	});
}
