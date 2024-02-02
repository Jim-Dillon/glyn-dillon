const carousel: HTMLElement | null = document.querySelector('.carousel');
const track: HTMLElement | null = carousel?.querySelector('.carousel__track')!;
const slides: HTMLElement[] = Array.from(track?.children || []) as HTMLElement[];

const nextButton: HTMLElement | null = carousel?.querySelector('.carousel__button--right')!;
const prevButton: HTMLElement | null = carousel?.querySelector('.carousel__button--left')!;


// Initialise the carousel and recalculate slide width on resize
const init = (): void => {
    const slideWidth: number = slides[0]?.getBoundingClientRect().width || 0;

    // Sets slide position
    const setSlidePosition = (slide: HTMLElement | undefined, index: number): void => {
        if (slide) {
            slide.style.left = (slideWidth + 100) * index + 'px';

            if (track) {
                track.style.transition = "none";
                const currentSlide: HTMLElement | null = track.querySelector('.current-slide');
                track.style.transform = 'translateX(-' + (currentSlide?.style.left || '0') + ')';
            }
        }
    };

    slides.forEach(setSlidePosition);
};

// Previous button click event handler. Calculate the previous index
// and move to the slide
prevButton?.addEventListener('click', e => {
    if (track) {
        track.style.transition = "transform 250ms ease-in";
        const currentSlide: HTMLElement | null = track.querySelector('.current-slide');

        let prevSlide: HTMLElement | undefined;
        if (currentSlide?.previousElementSibling == null) {
            prevSlide = slides[slides.length - 1];
        } else {
            prevSlide = currentSlide.previousElementSibling as HTMLElement;
        }

        showImage(prevSlide);
        moveToSlide(track, currentSlide, prevSlide);
    }
});

// Next button click event handler. Calculate the next index
// and move to the slide
nextButton?.addEventListener('click', e => {
    if (track) {
        track.style.transition = "transform 250ms ease-in";
        const currentSlide: HTMLElement | null = track.querySelector('.current-slide');

        let nextSlide: HTMLElement | undefined;
        if (currentSlide?.nextElementSibling == null) {
            nextSlide = slides[0];
        } else {
            nextSlide = currentSlide.nextElementSibling as HTMLElement;
        }
        showImage(nextSlide);
        moveToSlide(track, currentSlide, nextSlide);
    }
});

// Moves to the next or previous slide
const moveToSlide = (track: HTMLElement | undefined, currentSlide: HTMLElement | null, targetSlide: HTMLElement | undefined): void => {
    if (track && currentSlide && targetSlide) {
        track.style.transform = 'translateX(-' + (targetSlide.style.left || '0') + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }
};

// Take the data-src attribute of the current slide and set it as the background image of the carousel
const showImage = (slide: HTMLElement | undefined): void => {
    if (slide) {
        const image: HTMLImageElement | null = slide.querySelector('.carousel__image');
        console.log('showImage', image?.src);
        if (image && image.src === '') {
            image.src = image.dataset.src || '';
        }
    }
};

window.addEventListener('resize', init);
init();
