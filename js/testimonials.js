export function testimonials(){
  const screenWidth = window.screen.width;

  const reviews = [
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "images/testimonials/1.png",
    name: "Ім'я",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

  let SLIDES_PER_PAGE = 3;
// Ваш код для роботи з відгуками
if (screenWidth < 1100) {
  SLIDES_PER_PAGE = 2;
}
if (screenWidth < 665) {
  SLIDES_PER_PAGE = 1;
}
const MAX_TEXT_LENGTH = 180;
let currentSlide = 0;

function init() {
  const slidesContainer = document.querySelector(".testimonials-slides");
  const prevButton = document.querySelector(".controls-testimonials-prev");
  const nextButton = document.querySelector(".controls-testimonials-next");
  const indicators = document.querySelector(".indicators-testimonials");

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  function updateSlides() {
    const totalSlides = Math.ceil(reviews.length / SLIDES_PER_PAGE);
    const slideContent = document.querySelector(".testimonial-slide");

    // Приховуємо поточний контент
    slideContent.style.opacity = "0";

    setTimeout(() => {
      slideContent.innerHTML = "";

      const startIdx = currentSlide * SLIDES_PER_PAGE;
      const endIdx = Math.min(startIdx + SLIDES_PER_PAGE, reviews.length);

      for (let i = startIdx; i < endIdx; i++) {
        const review = reviews[i];
        const block = document.createElement("div");
        block.className = "testimonial-slide-block";

        const isLongText = review.text.length > MAX_TEXT_LENGTH;
        const truncatedText = truncateText(review.text, MAX_TEXT_LENGTH);

        block.innerHTML = `
          <div class="">
            <div class="slide-block-top">
            <img src="${review.image}" />
            <h2 class="text-l bold700 testimonial-slide-title">${review.name}</h2>
            </div>
            <p class="text-m testimonial-slide-text">${truncatedText}</p>
            ${
              isLongText
                ? `<button class="read-more-btn">Читати більше</button>`
                : ""
            }
          </div>
        `;

        if (isLongText) {
          const readMoreBtn = block.querySelector(".read-more-btn");
          const textElement = block.querySelector(".testimonial-slide-text");
          let isExpanded = false;

          readMoreBtn.addEventListener("click", () => {
            isExpanded = !isExpanded;
            textElement.textContent = isExpanded ? review.text : truncatedText;
            readMoreBtn.textContent = isExpanded
              ? "Згорнути"
              : "Читати більше...";
          });
        }

        slideContent.appendChild(block);
      }

      // Показуємо новий контент
      requestAnimationFrame(() => {
        slideContent.style.opacity = "1";
      });

      updatePagination(totalSlides);
    }, 250);
  }

  // Оновлюємо обробники подій для кнопок
  function initButtons(prevButton, nextButton) {
    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlides();
      }
    });

    nextButton.addEventListener("click", () => {
      const totalSlides = Math.ceil(reviews.length / SLIDES_PER_PAGE);
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlides();
      }
    });
  }
  function updatePagination(totalSlides) {
    indicators.innerHTML = "";

    // Add page numbers
    if (totalSlides <= 5) {
      for (let i = 0; i < totalSlides; i++) {
        addPageButton(i, totalSlides);
      }
    } else {
      if (currentSlide > 2) {
        addPageButton(0, totalSlides);
        indicators.appendChild(createEllipsis());
      }

      for (
        let i = Math.max(0, currentSlide - 1);
        i <= Math.min(totalSlides - 1, currentSlide + 1);
        i++
      ) {
        addPageButton(i, totalSlides);
      }

      if (currentSlide < totalSlides - 3) {
        indicators.appendChild(createEllipsis());
        addPageButton(totalSlides - 1, totalSlides);
      }
    }
  }

  function addPageButton(pageNum, totalSlides) {
    const button = document.createElement("button");
    button.textContent = pageNum + 1;
    button.className = pageNum === currentSlide ? "active" : "";
    button.addEventListener("click", () => {
      currentSlide = pageNum;
      updateSlides();
    });
    indicators.appendChild(button);
  }

  function createEllipsis() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.className = "pagination-ellipsis";
    return span;
  }

  prevButton.addEventListener("click", () => {
    const totalSlides = Math.ceil(reviews.length / SLIDES_PER_PAGE);
    if (currentSlide > 0) {
      currentSlide--;
      updateSlides();
    } else if (currentSlide === 0) {
      currentSlide = totalSlides - 1;
      updateSlides();
    }
  });

  nextButton.addEventListener("click", () => {
    const totalSlides = Math.ceil(reviews.length / SLIDES_PER_PAGE);
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlides();
    } else if (currentSlide === totalSlides - 1) {
      currentSlide = 0;
      updateSlides();
    }
  });

  updateSlides();
}

document.addEventListener("DOMContentLoaded", init);
}