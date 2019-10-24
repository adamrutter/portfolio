// Calculate correct viewport height on mobile (where 100vh includes the address bar)
if (
	navigator.userAgent.indexOf('Mobi') !== -1 ||
	navigator.userAgent.indexOf('Android') !== -1
) {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
}
