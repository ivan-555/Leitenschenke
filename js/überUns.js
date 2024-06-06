// Image Slider
function setupSlider(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    const slider = section.querySelector('.slider');
    const prevButtons = section.querySelectorAll('.desktop-arrows .prev, .mobile-arrows .prev');
    const nextButtons = section.querySelectorAll('.desktop-arrows .next, .mobile-arrows .next');
    const shownCounter = section.querySelector('.counter .shown');
    const totalCounter = section.querySelector('.counter .total');
    const dotsContainer = section.querySelector('.dots');
    let currentIndex = 0;
    let isDragging = false;
    let startX, startTranslate;

    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideWidth, gapWidth, visibleSlides;

    totalCounter.textContent = totalSlides; // Set the total number of slides

    function updateSlideParameters() {
        if (window.innerWidth <= 1000) {
            slideWidth = window.innerWidth * 0.90; // 90vw when only 1 slide is visible
            gapWidth = 0;
            visibleSlides = 1;
            createDots();
        } else if (window.innerWidth <= 1400) {
            slideWidth = window.innerWidth * 0.445; // 44.5vw when 2 slides are visible
            gapWidth = window.innerWidth * 0.01; // 1vw gap
            visibleSlides = 2;
            removeDots();
        } else {
            slideWidth = window.innerWidth * 0.2933; // 29.33vw when 3 slides are visible
            gapWidth = window.innerWidth * 0.01; // 1vw gap
            visibleSlides = 3;
            removeDots();
        }
    }

    function updateArrowVisibility() {
        prevButtons.forEach(button => button.style.opacity = currentIndex > 0 ? '1' : '0.4');
        nextButtons.forEach(button => button.style.opacity = currentIndex < totalSlides - visibleSlides ? '1' : '0.4');
    }

    function updateCounter() {
        shownCounter.textContent = currentIndex + visibleSlides; // Update the counter to show the number of visible slides
    }

    function moveSlide(direction) {
        currentIndex += direction;
        currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - visibleSlides));
        const newTranslate = -currentIndex * (slideWidth + gapWidth);
        slider.style.transform = `translateX(${newTranslate}px)`;
        updateArrowVisibility();
        updateCounter(); // Update the counter whenever the slide moves
        updateDots();
    }

    function startDrag(event) {
        isDragging = true;
        startX = event.clientX;
        startTranslate = parseInt(window.getComputedStyle(slider).transform.split(',')[4] || 0);
        slider.style.transition = 'none';
        slider.classList.add('grabbing'); // Add grabbing class
    }

    function onDragging(event) {
        if (!isDragging) return;
        const currentX = event.clientX;
        const dx = currentX - startX;
        const newTranslate = startTranslate + dx;
        const maxTranslate = 0;
        const minTranslate = -(totalSlides - visibleSlides) * (slideWidth + gapWidth);
        slider.style.transform = `translateX(${Math.max(minTranslate, Math.min(newTranslate, maxTranslate))}px)`;
    }

    function stopDrag(event) {
        isDragging = false;
        slider.style.transition = 'transform 0.5s';
        slider.classList.remove('grabbing'); // Remove grabbing class
        const endTranslate = parseInt(window.getComputedStyle(slider).transform.split(',')[4]);
        const nearestIndex = -Math.round(endTranslate / (slideWidth + gapWidth));
        currentIndex = Math.max(0, Math.min(nearestIndex, totalSlides - visibleSlides));
        moveSlide(0);
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                moveSlide(0);
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

    slider.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onDragging);
    document.addEventListener('mouseup', stopDrag);

    prevButtons.forEach(button => button.addEventListener('click', () => moveSlide(-1)));
    nextButtons.forEach(button => button.addEventListener('click', () => moveSlide(1)));

    window.addEventListener('resize', () => {
        updateSlideParameters();
        updateArrowVisibility();
        updateCounter(); // Ensure the counter is updated after resize
        moveSlide(0); // Ensure the slider is correctly positioned after resize
    });

    // Initialize the slider
    updateSlideParameters();
    updateCounter();
    moveSlide(0); // Set the initial position of the slider
}

document.addEventListener('DOMContentLoaded', () => {
    setupSlider('.überUns');
});
