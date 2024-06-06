// Produkte Lightbox
document.querySelectorAll('.img-container img').forEach(image => {
    image.addEventListener('click', function() {
        document.querySelector('.lightbox').style.display = 'flex';
        document.querySelector('.lightbox-content').src = this.src;
    });
});

document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.lightbox').style.display = 'none';
});
