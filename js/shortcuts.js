// mobile shortcuts öffnungszeiten details open and close modal
document.addEventListener('DOMContentLoaded', function() {
    let detailsModal = document.querySelector('.mobile-shortcuts .shortcut.öffnungszeiten .details');
    let öffnungszeitenIcon = document.querySelector('.mobile-shortcuts .shortcut.öffnungszeiten .icon');
    let detailsModalClose = document.querySelector('.mobile-shortcuts .shortcut.öffnungszeiten .details .close');

    öffnungszeitenIcon.addEventListener('click', function() {
        detailsModal.classList.toggle('open');
    });

    detailsModalClose.addEventListener('click', function() {
        detailsModal.classList.remove('open');
    });

    // Close the modal when clicking outside the details box
    document.addEventListener('click', function(event) {
        const isClickInsideModal = detailsModal.contains(event.target);
        const isClickOnIcon = öffnungszeitenIcon.contains(event.target);
        
        if (!isClickInsideModal && !isClickOnIcon) {
            detailsModal.classList.remove('open');
        }
    });
});

