const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const carousel = document.querySelector(".carousel");
const carouselCard = document.querySelectorAll(".carousel-card");
const sceneWidth = 315;
const sceneHeight = 140;
let angle = 0;
let index = 0;

const rotateAngle = 360 / carouselCard.length;
const radian = (rotateAngle / 2) * Math.PI / 180;
const colTz = Math.round((sceneWidth / 2) / Math.tan(radian));
const rowTz = Math.round((sceneHeight / 2) / Math.tan(radian));

carouselCard.forEach((el, idx) => {
    el.style.transform = `rotateY(${rotateAngle * idx}deg) translateZ(${colTz}px) scale(1)`;
});

function updateCardScale() {
    carouselCard.forEach((el, idx) => {
        el.style.transition = 'transform 0.5s ease'; // 부드러운 전환 추가
        el.style.transform = `rotateY(${rotateAngle * idx}deg) translateZ(${colTz}px) scale(${idx === index ? 1.6 : 1})`;
    });
}

prevBtn.addEventListener('click', () => {
    angle -= rotateAngle;
    index = (index - 1 + carouselCard.length) % carouselCard.length; // Update index
    updateCardScale();
    carousel.style.transform = `rotateY(${-angle}deg)`;
});

nextBtn.addEventListener('click', () => {
    angle += rotateAngle;
    index = (index + 1) % carouselCard.length; // Update index
    updateCardScale();
    carousel.style.transform = `rotateY(${-angle}deg)`;
});

// Second carousel
const carousel2 = document.querySelector(".carousel2");
const carouselCard2 = document.querySelectorAll(".carousel-card2");
let currentIndex2 = 0; // Start at the first card
const totalCards = carouselCard2.length;

function updateCarousel() {
    const translateX = -(currentIndex2 * 1005); // Card width for translation
    carousel2.style.transform = `translateX(${translateX}px)`;
}

// Initial position adjustment
updateCarousel();

prevBtn.addEventListener('click', () => {
    if (currentIndex2 === 0) {
        currentIndex2 = totalCards; // Go to the last card
        carousel2.style.transition = 'none'; // Remove animation
        updateCarousel();
        requestAnimationFrame(() => {
            carousel2.style.transition = 'transform 0.5s ease'; // Reset animation
            currentIndex2--; // Decrement index
            updateCarousel();
        });
    } else {
        currentIndex2--; // Decrement index
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex2 === totalCards - 1) {
        currentIndex2 = -1; // Go to the first card
        carousel2.style.transition = 'none'; // Remove animation
        updateCarousel();
        requestAnimationFrame(() => {
            carousel2.style.transition = 'transform 0.5s ease'; // Reset animation
            currentIndex2++; // Increment index
            updateCarousel();
        });
    } else {
        currentIndex2++; // Increment index
        updateCarousel();
    }
});

// 초기 크기 조정 호출
updateCardScale();