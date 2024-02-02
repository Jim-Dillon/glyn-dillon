"use strict";
const carousel = document.querySelector('.carousel');
const track = carousel === null || carousel === void 0 ? void 0 : carousel.querySelector('.carousel__track');
const slides = Array.from((track === null || track === void 0 ? void 0 : track.children) || []);
const nextButton = carousel === null || carousel === void 0 ? void 0 : carousel.querySelector('.carousel__button--right');
const prevButton = carousel === null || carousel === void 0 ? void 0 : carousel.querySelector('.carousel__button--left');
// Initialise the carousel and recalculate slide width on resize
const init = () => {
    var _a;
    const slideWidth = ((_a = slides[0]) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || 0;
    // Sets slide position
    const setSlidePosition = (slide, index) => {
        if (slide) {
            slide.style.left = (slideWidth + 100) * index + 'px';
            if (track) {
                track.style.transition = "none";
                const currentSlide = track.querySelector('.current-slide');
                track.style.transform = 'translateX(-' + ((currentSlide === null || currentSlide === void 0 ? void 0 : currentSlide.style.left) || '0') + ')';
            }
        }
    };
    slides.forEach(setSlidePosition);
};
// Previous button click event handler. Calculate the previous index
// and move to the slide
prevButton === null || prevButton === void 0 ? void 0 : prevButton.addEventListener('click', e => {
    if (track) {
        track.style.transition = "transform 250ms ease-in";
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide;
        if ((currentSlide === null || currentSlide === void 0 ? void 0 : currentSlide.previousElementSibling) == null) {
            prevSlide = slides[slides.length - 1];
        }
        else {
            prevSlide = currentSlide.previousElementSibling;
        }
        showImage(prevSlide);
        moveToSlide(track, currentSlide, prevSlide);
    }
});
// Next button click event handler. Calculate the next index
// and move to the slide
nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener('click', e => {
    if (track) {
        track.style.transition = "transform 250ms ease-in";
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide;
        if ((currentSlide === null || currentSlide === void 0 ? void 0 : currentSlide.nextElementSibling) == null) {
            nextSlide = slides[0];
        }
        else {
            nextSlide = currentSlide.nextElementSibling;
        }
        showImage(nextSlide);
        moveToSlide(track, currentSlide, nextSlide);
    }
});
// Moves to the next or previous slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    if (track && currentSlide && targetSlide) {
        track.style.transform = 'translateX(-' + (targetSlide.style.left || '0') + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }
};
// Take the data-src attribute of the current slide and set it as the background image of the carousel
const showImage = (slide) => {
    if (slide) {
        const image = slide.querySelector('.carousel__image');
        console.log('showImage', image === null || image === void 0 ? void 0 : image.src);
        if (image && image.src === '') {
            image.src = image.dataset.src || '';
        }
    }
};
window.addEventListener('resize', init);
init();
