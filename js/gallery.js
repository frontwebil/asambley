export function gallerySlider() {
  const screenWidth = window.screen.width;

  // Gallery
  let SLIDES_PER_PAGE_GALLERY = 4;
  if (screenWidth < 1100) {
    SLIDES_PER_PAGE_GALLERY = 3;
  }
  if (screenWidth < 800) {
    SLIDES_PER_PAGE_GALLERY = 2;
  }
  if (screenWidth < 600) {
    SLIDES_PER_PAGE_GALLERY = 1;
  }

  let currentSlide = 0;

  // Масив з зображеннями
  const images = [
    "images/about-us/example.png",
    "images/about-us/main.png",
    "images/about-us/example.png",
    "images/about-us/main.png",
    "images/about-us/example.png",
    "images/about-us/main.png",
    "images/about-us/example.png",
    "images/about-us/main.png",
    "images/about-us/example.png",
    "images/about-us/main.png",
    "images/about-us/example.png",
  ];

  // Створюємо модальне вікно
  function createModal() {
    const modal = document.createElement("div");
    modal.className = "gallery-modal";
    modal.innerHTML = `
    <div class="modal-content">
      <img src="" alt="Full screen image" class="modal-image">
      <button class="modal-close">&times;</button>
      <button class="modal-prev">&lt;</button>
      <button class="modal-next">&gt;</button>
    </div>
  `;

    // Додаємо обробник кліку на фон
    modal.addEventListener("click", (e) => {
      // Якщо клік був саме по фону (modal), а не по його вмісту
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    document.body.appendChild(modal);
    return modal;
  }

  function init() {
    const slidesContainer = document.querySelector(".gallery-slides");
    const prevButton = document.querySelector(".controls-gallery-prev");
    const nextButton = document.querySelector(".controls-gallery-next");
    const indicators = document.querySelector(".indicators-gallery");

    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    }

    function prevSlide() {
      const totalSlides = Math.ceil(images.length / SLIDES_PER_PAGE_GALLERY);
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = totalSlides - 1;
      }
      updateSlides();
    }

    function nextSlide() {
      const totalSlides = Math.ceil(images.length / SLIDES_PER_PAGE_GALLERY);
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlides();
    }

    slidesContainer.addEventListener("touchstart", handleTouchStart);
    slidesContainer.addEventListener("touchend", handleTouchEnd);

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    updateSlides();

    function handleSwipe() {
      const swipeThreshold = 50; // Мінімальна дистанція для реєстрації свайпа

      if (touchStartX - touchEndX > swipeThreshold) {
        // Свайп вліво → наступний слайд
        nextSlide();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Свайп вправо → попередній слайд
        prevSlide();
      }
    }

    const modal = createModal();
    const modalImage = modal.querySelector(".modal-image");
    let currentModalIndex = 0;

    // Обробники подій для модального вікна
    modal.querySelector(".modal-close").addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    modal.querySelector(".modal-prev").addEventListener("click", () => {
      currentModalIndex =
        (currentModalIndex - 1 + images.length) % images.length;
      modalImage.src = images[currentModalIndex];
    });

    modal.querySelector(".modal-next").addEventListener("click", () => {
      currentModalIndex = (currentModalIndex + 1) % images.length;
      modalImage.src = images[currentModalIndex];
    });

    // Закриття по клавіші Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    function updateSlides() {
      const totalSlides = Math.ceil(images.length / SLIDES_PER_PAGE_GALLERY);
      let slideContent = document.querySelector(".gallery-slide");

      if (!slideContent) {
        slideContent = document.createElement("div");
        slideContent.className = "gallery-slide";
        slidesContainer.appendChild(slideContent);
      }

      slideContent.style.opacity = "0";
      slideContent.classList.remove("active");

      setTimeout(() => {
        slideContent.innerHTML = "";

        const startIdx = currentSlide * SLIDES_PER_PAGE_GALLERY;
        const endIdx = Math.min(
          startIdx + SLIDES_PER_PAGE_GALLERY,
          images.length
        );

        for (let i = startIdx; i < endIdx; i++) {
          const imageSrc = images[i];
          const block = document.createElement("div");
          block.className = "gallery-slide-block";

          block.innerHTML = `
          <div class="gallery-image-wrapper">
            <img src="${imageSrc}" alt="Gallery image" class="gallery-image" />
          </div>
        `;

          // Додаємо обробник кліку для відкриття модального вікна
          const img = block.querySelector(".gallery-image");
          img.addEventListener("click", () => {
            currentModalIndex = i;
            modalImage.src = imageSrc;
            modal.classList.add("active");
            document.body.style.overflow = "";
          });

          slideContent.appendChild(block);
        }

        requestAnimationFrame(() => {
          slideContent.style.opacity = "1";
          slideContent.classList.add("active");
        });

        updatePagination(totalSlides);
      }, 250);
    }

    function updatePagination(totalSlides) {
      indicators.innerHTML = "";

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

    updateSlides();
  }

  document.addEventListener("DOMContentLoaded", init);
}
