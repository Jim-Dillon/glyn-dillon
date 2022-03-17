const carousel = document.querySelector('.carousel');
const track = carousel.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = carousel.querySelector('.carousel__button--right');
const prevButton = carousel.querySelector('.carousel__button--left');

// Initialise the carousel and recalculate slide width on resize
const init = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Sets slide position
    const setSlidePosition = (slide, index) => {
        slide.style.left = (slideWidth + 100) * index + 'px';

        track.style.transition = "none";
        const currentSlide = track.querySelector('.current-slide');
        track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
    };

    slides.forEach(setSlidePosition);
};

// Previous button click event handler. Calculate the previous index
// and move to the slide
prevButton.addEventListener('click', e => {
    track.style.transition = "transform 250ms ease-in";
    const currentSlide = track.querySelector('.current-slide');

    let prevSlide;
    if (currentSlide.previousElementSibling == null) {
        prevSlide = slides[slides.length-1];
    } else {
        prevSlide = currentSlide.previousElementSibling;
    }

    moveToSlide(track, currentSlide, prevSlide);
});

// Next button click event handler. Calculate the next index
// and move to the slide
nextButton.addEventListener('click', e => {
    track.style.transition = "transform 250ms ease-in";
    const currentSlide = track.querySelector('.current-slide');

    let nextSlide;
    if (currentSlide.nextElementSibling == null) {
        nextSlide = slides[0];
    } else {
        nextSlide = currentSlide.nextElementSibling;
    }

    moveToSlide(track, currentSlide, nextSlide);
});

// Moves to the next or previous slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

window.addEventListener('resize', init);
init();
