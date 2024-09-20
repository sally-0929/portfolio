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
    el.style.transform = `rotateY(${rotateAngle * idx}deg) translateZ(${colTz}px)`;
});

prevBtn.addEventListener('click', () => {
    angle -= rotateAngle;
    carousel.style.transform = `rotateY(${-angle}deg)`;
});

nextBtn.addEventListener('click', () => {
    angle += rotateAngle;
    carousel.style.transform = `rotateY(${-angle}deg)`;
});

// Second carousel
const prevBtn2 = document.querySelector(".prev-btn");
const nextBtn2 = document.querySelector(".next-btn");
const carousel2 = document.querySelector(".carousel2");
const carouselCard2 = document.querySelectorAll(".carousel-card2");
let currentIndex2 = 0; // Start at the first card
const totalCards = carouselCard2.length;

// Update the carousel position
function updateCarousel() {
    const translateX = -(currentIndex2 * 1005); // Card width for translation
    carousel2.style.transform = `translateX(${translateX}px)`;
}

// Initial position adjustment
updateCarousel();

prevBtn2.addEventListener('click', () => {
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

nextBtn2.addEventListener('click', () => {
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

let currentImg = carouselCard[index].querySelector('img');

function updateCarousel() {
    carousel.style.transform = `rotateY(${-angle}deg)`;
    carouselCard.forEach((card, idx) => {
        card.querySelector('img').style.transform = idx === index ? 'scale(1.5)' : 'scale(1)'; // 현재 인덱스 이미지 확대
    });
}

prevBtn.addEventListener('click', () => {
    angle -= rotateAngle;
    index = (index - 1 + carouselCard.length) % carouselCard.length; // 인덱스 조정
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    angle += rotateAngle;
    index = (index + 1) % carouselCard.length;
    updateCarousel();
});

// 초기 설정
updateCarousel();