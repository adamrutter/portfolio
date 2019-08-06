// Slide function
function slide(element) {
	// If the element is hidden...
	if (element.classList.contains('hidden')) {
		element.classList.replace('hidden', 'visible');
		element.style.height = element.scrollHeight + 'px';
		// If the element is visible...
	} else if (element.classList.contains('visible')) {
		element.classList.replace('visible', 'hidden');
		element.style.height = 0 + 'px';
	}
}
