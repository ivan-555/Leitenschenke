// Küche Galerie Slider
function setupKuecheSlider(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    const slider = section.querySelector('.slider');
    const prevButtons = section.querySelectorAll('.desktop-arrows .prev, .mobile-arrows .prev');
    const nextButtons = section.querySelectorAll('.desktop-arrows .next, .mobile-arrows .next');
    const shownCounter = section.querySelector('.counter .shown');
    const totalCounter = section.querySelector('.counter .total');
    const dotsContainer = section.querySelector('.dots');
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let moveX = 0;
    let startTranslate = 0;
    let currentTranslate = 0;
    const slideWidth = 90; // Fixed slide width in vw

    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    totalCounter.textContent = totalSlides.toString(); // Updates total number of slides

    function updateButtonVisibility() {
        prevButtons.forEach(button => button.style.opacity = currentIndex > 0 ? '1' : '0.5');
        nextButtons.forEach(button => button.style.opacity = currentIndex < totalSlides - 1 ? '1' : '0.5');
    }

    function moveSlide(index) {
        if (index < 0) index = 0;
        if (index > totalSlides - 1) index = totalSlides - 1;

        currentIndex = index;
        slider.style.transition = 'transform 0.5s';
        slider.style.transform = `translateX(${-currentIndex * slideWidth}vw)`;
        shownCounter.textContent = (currentIndex + 1).toString(); // Updates visible slides counter
        updateButtonVisibility();
        updateDots();
    }

    function startDrag(event) {
        isDragging = true;
        startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        startTranslate = getCurrentTranslate();
        slider.style.transition = 'none';
        slider.classList.add('grabbing'); // Add grabbing class
    }

    function onDragging(event) {
        if (!isDragging) return;
        currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        moveX = currentX - startX;
        currentTranslate = startTranslate + (moveX / window.innerWidth) * 100;

        // Limit dragging beyond the first and last slide
        const maxTranslate = 0;
        const minTranslate = -(totalSlides - 1) * slideWidth;
        currentTranslate = Math.max(Math.min(currentTranslate, maxTranslate), minTranslate);

        slider.style.transform = `translateX(${currentTranslate}vw)`;
    }

    function stopDrag() {
        if (!isDragging) return;
        isDragging = false;

        const movedBy = currentTranslate - startTranslate;
        if (movedBy < -slideWidth / 4) {
            currentIndex++;
        } else if (movedBy > slideWidth / 4) {
            currentIndex--;
        }
        moveSlide(currentIndex);
        slider.classList.remove('grabbing'); // Remove grabbing class
    }

    function getCurrentTranslate() {
        const style = window.getComputedStyle(slider);
        const matrix = new WebKitCSSMatrix(style.transform);
        return (matrix.m41 / window.innerWidth) * 100; // Convert to vw
    }

    function createDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        if (window.innerWidth <= 1000) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    moveSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevButtons.forEach(button => button.addEventListener('click', () => moveSlide(currentIndex - 1)));
    nextButtons.forEach(button => button.addEventListener('click', () => moveSlide(currentIndex + 1)));

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', onDragging);
    document.addEventListener('touchmove', onDragging);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    createDots();
    updateButtonVisibility();

    window.addEventListener('resize', () => {
        createDots(); // Recreate dots on resize if the window size changes
        updateDots(); // Update dots to reflect the current state
        moveSlide(currentIndex); // Ensure the slider is correctly positioned after resize
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupKuecheSlider('.unsereGerichte');
});
