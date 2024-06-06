// Bewertungen mehr anzeigen
const moreButton = document.querySelector('.mehr-anzeigen');
const mehrBewertungen = document.querySelector('.mehr-bewertungen');
const moreButtonIcon = document.querySelector('.mehr-anzeigen i');
const moreButtonSpan = document.querySelector('.mehr-anzeigen span');
const mehrBewertungenBewertungen = document.querySelectorAll('.mehr-bewertungen .bewertung');
const lang = document.body.getAttribute('data-lang');  // Sprache von data-lang Attribut im body Tag

let isOpen = false;

const text = {
    de: {
        showMore: 'Mehr anzeigen',
        showLess: 'Weniger anzeigen'
    },
    it: {
        showMore: 'Mostra di più',
        showLess: 'Mostra di meno'
    }
};

moreButton.addEventListener('click', () => {
    if (!isOpen) {
        // Temporär auf 'auto' setzen, um die volle Höhe zu berechnen
        mehrBewertungen.style.height = 'auto';
        const fullHeight = mehrBewertungen.scrollHeight + 'px';

        // Setze die Höhe zurück, bevor die Transition startet
        mehrBewertungen.style.height = '0px';
        
        // Force reflow
        mehrBewertungen.offsetHeight;

        // Setze die Höhe auf die berechnete volle Höhe
        mehrBewertungen.style.height = fullHeight;

        mehrBewertungenBewertungen.forEach(bewertung => {
            bewertung.style.opacity = '1';
        });

        moreButtonIcon.classList.add('rotated');
        moreButtonSpan.textContent = text[lang].showLess;
        isOpen = true;
    } else {
        mehrBewertungen.style.height = '0px';

        mehrBewertungenBewertungen.forEach(bewertung => {
            bewertung.style.opacity = '0';
        });

        moreButtonIcon.classList.remove('rotated');
        moreButtonSpan.textContent = text[lang].showMore;
        isOpen = false;
    }
});
