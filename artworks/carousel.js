// DEFINE VARIABLES FIRST FOR LATER USE

const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
//const dotsNav = document.querySelector('.carousel__nav');
//const dots = Array.from(dotsNav.children);


//Each slide size is the same width as the first [0] slide


// ARRANGE SLIDES NEXT TO EACH OTHER

// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const init = () => {
console.log('init');
    const slideWidth = slides[0].getBoundingClientRect().width;
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    //function to set slide position

    slides.forEach(setSlidePosition);
    // loop so it applies to all slides automatically
};

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


/*const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }   else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }   else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}
*/

// WHEN I CLICK LEFT, MOVE SLIDES LEFT

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');

    let prevSlide;
    if (currentSlide.previousElementSibling == null) {
        prevSlide = slides[slides.length-1];
    } else {
        prevSlide = currentSlide.previousElementSibling;
    }

    /*
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    */
    moveToSlide(track, currentSlide, prevSlide);
    //updateDots(currentDot, prevDot);
});




// WHEN I CLICK RIGHT, MOVE SLIDES RIGHT
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');

    let nextSlide;
    if (currentSlide.nextElementSibling == null) {
        nextSlide = slides[0];
    } else {
        nextSlide = currentSlide.nextElementSibling;
    }

    /*
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    */
    moveToSlide(track, currentSlide, nextSlide);
    //updateDots(currentDot, nextDot);
});

window.addEventListener('resize', init);

init();



// When I click the nav indicators, move to that slide

/*
dotsNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.currentSlide');
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);


})

*/