function updateNavbarClass() {
  const sections = document.querySelectorAll('main > section');
  const links = {
    'about-me': document.querySelector('.navbar li.about-me'),
    'my-work': document.querySelector('.navbar li.my-work'),
    'let-s-talk': document.querySelector('.navbar li.let-s-talk'),
  };

  // Values we need so we can move the threshold from the top of the viewport
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const circuitBoardHeight = document.querySelector('.circuit-board').offsetHeight;
  const sectionOverflow = 29;

  document.addEventListener('scroll', () => {
    sections.forEach((section) => {

      // The relevant navbar link
      const link = links[section.id];

      // The distance the top and bottom edges of the element is from the threshold
      const topDistance = section.getBoundingClientRect().top
        - navbarHeight - sectionOverflow
        - circuitBoardHeight;
      const bottomDistance = section.getBoundingClientRect().bottom
        - navbarHeight - sectionOverflow
        - circuitBoardHeight;

      if (topDistance <= 0 && bottomDistance > 0) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavbarClass();
});
