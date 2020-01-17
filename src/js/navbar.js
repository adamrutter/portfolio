function updateNavbar() {
	const navbar = document.querySelector('.navbar');
	const hero = document.getElementById('hero');
	const sections = document.querySelectorAll('main > section');
	const links = {
		'about-me': document.querySelector('.navbar li.about-me'),
		'my-work': document.querySelector('.navbar li.my-work'),
		'lets-talk': document.querySelector('.navbar li.lets-talk')
	};

	// Change navbar item classes based on scroll position
	function updateClass() {
		// Values we need so we can move the threshold from the top of the viewport
		const navbarHeight = navbar.offsetHeight;
		const circuitBoardHeight = document.querySelector('.circuit-board')
			.offsetHeight;
		const sectionOverflow = 29;

		sections.forEach(section => {
			// The relevant navbar link
			const link = links[section.id];
			// The distance the top and bottom edges of the element is from the threshold
			const topDistance =
				section.getBoundingClientRect().top -
				navbarHeight -
				sectionOverflow -
				circuitBoardHeight;
			const bottomDistance =
				section.getBoundingClientRect().bottom -
				navbarHeight -
				sectionOverflow -
				circuitBoardHeight;

			if (topDistance <= 0 && bottomDistance > 0) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

	// Change the background colour based on scroll position
	function updateBackground() {
		if (hero.getBoundingClientRect().top < 0) {
			navbar.classList.add('background');
		} else {
			navbar.classList.remove('background');
		}
	}

	// Run the functions
	updateClass();
	updateBackground();
	document.addEventListener('scroll', () => {
		updateClass();
		updateBackground();
	});
}

// Function on run on page load
if (document.querySelector('body').classList.contains('home')) {
	window.addEventListener('load', () => {
		updateNavbar();
	});
}
