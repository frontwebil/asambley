const screenWidth = window.screen.width;

const personal = [
  {
    name: "майстер Юлія",
    img: "img/personal/1.png",
    experience: "понад 7 років",
    time: "з 09:00 до 21:00",
    services: ["Ручний та апаратний масаж", "Обгортання та скрабування"],
  },
  {
    name: "майстер Світлана",
    img: "img/personal/2.png",
    experience: "понад 8 років",
    time: "з 09:00 до 21:00",
    services: [
      "Ручний та апаратний масаж",
      "Обгортання та скрабування",
      "Тейпування",
    ],
  },
  {
    name: "майстер Катерина",
    img: "img/personal/3.png",
    experience: "понад 15 років",
    time: "з 09:00 до 20:00",
    services: ["Воскова депіляція шугаринг", "Електроепіляція"],
  },
  {
    name: "майстер Тетяна",
    img: "img/personal/4.png",
    experience: "понад 11 років",
    time: "з 09:00 до 21:00",
    services: [
      "Ручний та апаратний масаж",
      "Обгортання та скрабування",
      "Доглядові (косметологічні) процедури",
    ],
  },
  {
    name: "майстер Олена",
    img: "img/personal/5.png",
    experience: "понад 8 років",
    time: "з 09:00 до 20:00",
    services: [
      "Лазерна епіляція різних зон",
      "Лазерна косметологія",
      "Апаратний масаж",
      "Обгортання та скрабування, тейпування",
    ],
  },
  {
    name: "масажист В’ячеслав",
    img: "img/personal/6.png",
    experience: "понад 8 років",
    time: "Під запис",
    services: ["Ручний та апаратний масаж", "Обгортання та скрабування"],
  },
  {
    name: "масажист Костянтин",
    img: "img/personal/7.png",
    experience: "вт/чт/нд",
    time: "з 09:00 до 21:00",
    services: ["Ручний масаж", "Spa-обгортання та скрабування"],
  },
  // Додайте інших майстрів аналогічно
];

let SLIDES_PER_PAGE_NAME = 3;
if (screenWidth <= 1265) {
  SLIDES_PER_PAGE_NAME = 2;
}
if (screenWidth <= 850) {
  SLIDES_PER_PAGE_NAME = 1;
}

let currentSlideIndex_NAME = 0;

function initPersonalSlider() {
  const slidesContainer_NAME = document.querySelector(".swiper-slides");
  const buttonPrev_NAME = document.querySelector(".controls-swiper-prev");
  const buttonNext_NAME = document.querySelector(".controls-swiper-next");
  const indicators_NAME = document.querySelector(".indicators-swiper");

  function createPersonalBlock(person) {
    return `
      <div class="swiper-block">
        <div class="swiper-block-top">
          <img src="${person.img}" alt="" class="swiper-block-top-img">
          <div class="swiper-block-top-text">
            <h2 class="swiper-block-top-text-title">${person.name}</h2>
            <div class="swiper-block-top-text-row">
              <p class="swiper-block-top-text-row-title">Досвід</p>
              <p class="swiper-block-top-text-row-decription">${
                person.experience
              }</p>
            </div>
            <div class="swiper-block-top-text-row">
              <p class="swiper-block-top-text-row-title">Час</p>
              <p class="swiper-block-top-text-row-decription">(під запис)</p>
            </div>
          </div>
        </div>
        <div class="swiper-block-info">
          ${person.services
            .map(
              (service) => `
            <div class="swiper-block-info-text">${service}</div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function updateSlides_NAME() {
    const totalSlides = Math.ceil(personal.length / SLIDES_PER_PAGE_NAME);
    const currentSlide = document.querySelector(".swiper-slide.active");

    // Create new slide
    const newSlide = document.createElement("div");
    newSlide.className = "swiper-slide";

    const startIdx = currentSlideIndex_NAME * SLIDES_PER_PAGE_NAME;
    const endIdx = Math.min(startIdx + SLIDES_PER_PAGE_NAME, personal.length);

    const slideContent = personal
      .slice(startIdx, endIdx)
      .map((person) => createPersonalBlock(person))
      .join("");

    newSlide.innerHTML = slideContent;

    // Add new slide to container
    const slidesContainer_NAME = document.querySelector(".swiper-slides");

    if (currentSlide) {
      // Fade out current slide
      currentSlide.style.opacity = "0";
      currentSlide.style.visibility = "hidden";

      // Wait for fade out animation
      setTimeout(() => {
        currentSlide.remove();
        slidesContainer_NAME.appendChild(newSlide);

        // Trigger reflow
        void newSlide.offsetWidth;

        // Add active class to trigger fade in
        newSlide.classList.add("active");
      }, 200);
    } else {
      slidesContainer_NAME.appendChild(newSlide);
      setTimeout(() => {
        newSlide.classList.add("active");
      }, 0);
    }

    updatePagination_NAME(totalSlides);
  }

  function updatePagination_NAME(totalSlides) {
    indicators_NAME.innerHTML = "";

    if (totalSlides <= 5) {
      for (let i = 0; i < totalSlides; i++) {
        addPageButton_NAME(i);
      }
    } else {
      if (currentSlideIndex_NAME > 2) {
        addPageButton_NAME(0);
        addEllipsis_NAME();
      }

      for (
        let i = Math.max(0, currentSlideIndex_NAME - 1);
        i <= Math.min(totalSlides - 1, currentSlideIndex_NAME + 1);
        i++
      ) {
        addPageButton_NAME(i);
      }

      if (currentSlideIndex_NAME < totalSlides - 3) {
        addEllipsis_NAME();
        addPageButton_NAME(totalSlides - 1);
      }
    }
  }

  function addPageButton_NAME(pageNum) {
    const button = document.createElement("div");
    button.className = `indicator-swiper${
      pageNum === currentSlideIndex_NAME ? " active" : ""
    }`;
    button.dataset.personal = pageNum;
    button.textContent = pageNum + 1;
    indicators_NAME.appendChild(button);
  }

  function addEllipsis_NAME() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.className = "pagination-ellipsis";
    indicators_NAME.appendChild(span);
  }

  function nextSlide_NAME() {
    const totalSlides = Math.ceil(personal.length / SLIDES_PER_PAGE_NAME);
    if (currentSlideIndex_NAME < totalSlides - 1) {
      currentSlideIndex_NAME++;
      updateSlides_NAME();
    }
  }

  function prevSlide_NAME() {
    if (currentSlideIndex_NAME > 0) {
      currentSlideIndex_NAME--;
      updateSlides_NAME();
    }
  }

  // Touch events
  let startX, endX;

  function handleTouchStart_NAME(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchMove_NAME(event) {
    endX = event.touches[0].clientX;
  }

  function handleTouchEnd_NAME() {
    if (!endX) return;

    const deltaX = endX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextSlide_NAME();
      } else {
        prevSlide_NAME();
      }
    }
  }

  // Event Listeners
  buttonNext_NAME.addEventListener("click", nextSlide_NAME);
  buttonPrev_NAME.addEventListener("click", prevSlide_NAME);

  indicators_NAME.addEventListener("click", (event) => {
    const clickedIndicator = event.target;
    if (clickedIndicator.classList.contains("indicator-swiper")) {
      currentSlideIndex_NAME = parseInt(
        clickedIndicator.dataset.personal,
        10
      );
      updateSlides_NAME();
    }
  });

  slidesContainer_NAME.addEventListener("touchstart", handleTouchStart_NAME);
  slidesContainer_NAME.addEventListener("touchmove", handleTouchMove_NAME);
  slidesContainer_NAME.addEventListener("touchend", handleTouchEnd_NAME);

  // Initial render
  updateSlides_NAME();
}

document.addEventListener("DOMContentLoaded", initPersonalSlider);
