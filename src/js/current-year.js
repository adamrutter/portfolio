function currentYear() {
  const year = new Date().getFullYear();
  return year;
}

// Add current year to when document loaded
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.year');
  elements.forEach((element) => {
    element.innerHTML = currentYear();
  });
});
