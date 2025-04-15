// Image Slider
const section = document.querySelector(".überUns");
const slider = section.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevButtons = section.querySelectorAll('.desktop-arrows .prev, .mobile-arrows .prev');
const nextButtons = section.querySelectorAll('.desktop-arrows .next, .mobile-arrows .next');
const shownCounter = section.querySelector('.counter .shown');
const totalCounter = section.querySelector('.counter .total');
const dotsContainer = section.querySelector('.dots');

let currentIndex = 0; // Counts the current slide index

// --- Set Slide Parameters ---
let slideWidth = 0, gapWidth = 0, visibleSlides = 0;
function updateSlideParameters() {
    if (window.innerWidth <= 1000) {
        slideWidth = window.innerWidth * 0.90; // 90vw when only 1 slide is visible
        gapWidth = 0; // No gap when only 1 slide is visible
        visibleSlides = 1;
        createDots(); // Create dots when only 1 slide is visible
    } else if (window.innerWidth <= 1400) {
        slideWidth = window.innerWidth * 0.445; // 44.5vw when 2 slides are visible
        gapWidth = window.innerWidth * 0.01; // 1vw gap
        visibleSlides = 2;
        removeDots();   // Remove dots when 2 slides are visible
    } else {
        slideWidth = window.innerWidth * 0.2933; // 29.33vw when 3 slides are visible
        gapWidth = window.innerWidth * 0.01; // 1vw gap
        visibleSlides = 3;
        removeDots();  // Remove dots when 3 slides are visible
    }
}
// --- Change Parameters on resize ---
window.addEventListener('resize', () => {
    updateSlideParameters();
    updateArrowVisibility();
    updateCounter();
    moveSlide(0);
});

// --- Update the arrow visibility based on the current index ---
function updateArrowVisibility() {
    prevButtons.forEach(button => button.style.opacity = currentIndex > 0 ? '1' : '0.4');
    nextButtons.forEach(button => button.style.opacity = currentIndex < totalSlides - visibleSlides ? '1' : '0.4');
}

// --- Update the counter ---
totalCounter.textContent = totalSlides; // Display total number of slides
function updateCounter() {
    shownCounter.textContent = currentIndex + visibleSlides;
}

// --- Dots for the slider ---
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            moveSlide(i - currentIndex);
        });
        dotsContainer.appendChild(dot);
    }
}
function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}
function removeDots() {
    dotsContainer.innerHTML = '';
}

// --- Slider Move Function ---
function moveSlide(direction) {
    currentIndex += direction;
    currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - visibleSlides)); // Boundary checks

    const newTranslate = -currentIndex * (slideWidth + gapWidth);
    slider.style.transform = `translateX(${newTranslate}px)`;

    updateArrowVisibility();
    updateCounter();
    updateDots();
}

// --- Touch-Swipe ---
let startX = 0;
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) { // Threshold for swipe detection
        if (diffX < 0) {
            moveSlide(1);
        } else {
            moveSlide(-1);
        }
    }
});

// --- Button Controls ---
prevButtons.forEach(button => button.addEventListener('click', () => moveSlide(-1)));
nextButtons.forEach(button => button.addEventListener('click', () => moveSlide(1)));

// --- Initialize ---
updateSlideParameters();
updateCounter();
moveSlide(0);