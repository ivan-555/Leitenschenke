// Küche Galerie Slider
function setupKuecheSlider() {
    const section = document.querySelector('#unsereGerichte');
    const slider = section.querySelector('.slider');
    const prevButtons = section.querySelectorAll('.desktop-arrows .prev, .mobile-arrows .prev');
    const nextButtons = section.querySelectorAll('.desktop-arrows .next, .mobile-arrows .next');
    const shownCounter = section.querySelector('.counter .shown');
    const totalCounter = section.querySelector('.counter .total');
    const dotsContainer = section.querySelector('.dots');
    let currentIndex = 0;
    const slideWidth = 95; // Fixed slide width in vw
    const gapWidth = 0; // No gap width
    const visibleSlides = 1; // Always showing one slide at a time

    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    totalCounter.textContent = totalSlides.toString(); // Updates total number of slides

    function updateButtonVisibility() {
        prevButtons.forEach(button => button.style.opacity = currentIndex > 0 ? '1' : '0.5');
        nextButtons.forEach(button => button.style.opacity = currentIndex < totalSlides - visibleSlides ? '1' : '0.5');
    }

    function moveSlide(direction) {
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = 0;
        } else if (currentIndex > totalSlides - visibleSlides) {
            currentIndex = totalSlides - visibleSlides;
        }

        const slideMove = slideWidth + gapWidth;
        slider.style.transform = `translateX(${-currentIndex * slideMove}vw)`;
        shownCounter.textContent = (currentIndex + visibleSlides).toString(); // Updates visible slides counter
        updateButtonVisibility();
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function createDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                moveSlide(0);
            });
            dotsContainer.appendChild(dot);
        }
    }

    prevButtons.forEach(button => button.addEventListener('click', () => moveSlide(-1)));
    nextButtons.forEach(button => button.addEventListener('click', () => moveSlide(1)));

    createDots();
    updateButtonVisibility();
}

document.addEventListener('DOMContentLoaded', () => {
    setupKuecheSlider();
});