export function team() {
  const screenWidth = window.screen.width;

  const team = [
    {
      name: "Ігор Олександрович",
      surname: "Романенко",
      img: "images/team/1.png",
      posada: ["Голова Спілки", "Голова Правління"],
    },
    {
      name: "Михайло Васильович",
      surname: "Нікандров",
      img: "images/team/2.png",
      posada: ["Заступник Голови Спілки", "Член Правління"],
    },
    {
      name: "Валерій Миколайович",
      surname: "Решетінський",
      img: "images/team/3.png",
      posada: ["Член Правління"],
    },
    {
      name: "Валерій Ілліч",
      surname: "Труфанов",
      img: "images/team/4.png",
      posada: ["Член Правління"],
    },
    {
      name: "Пилипенко",
      surname: "Анатолій Федорович",
      img: "images/team/5.png",
      posada: ["Член Правління"],
    },
  ];

  let SLIDES_PER_PAGE_TEAM = 4;
  if (screenWidth <= 1200) {
    SLIDES_PER_PAGE_TEAM = 3;
  }
  if (screenWidth <= 940) {
    SLIDES_PER_PAGE_TEAM = 2;
  }
  if (screenWidth <= 680) {
    SLIDES_PER_PAGE_TEAM = 1;
  }

  let currentSlideIndex_TEAM = 0;

  function initTEAMSlider() {
    const slidesContainer_TEAM = document.querySelector(".team-slides");
    const buttonPrev_TEAM = document.querySelector(".team-prev");
    const buttonNext_TEAM = document.querySelector(".team-next");
    const indicators_TEAM = document.querySelector(".team-indicators");

    function createPersonalBlock(person) {
      return `
      <div class="team-block">
        <div class="team-block-top text-m">
          ${person.posada.map((el) => `<p class="bold700">${el}</p>`).join("")}
        </div>
      <img src="${person.img}" alt="${person.name} ${
        person.surname
      }" class="team-block-img">
      <h2 class="text-l bold700" style="text-transform: uppercase;">
        <span style="color: #1F12D4;">${person.surname}</span><br>
        ${person.name}
      </h2>
      </div>
    `;
    }

    function updateSlides_TEAM() {
      const totalSlides = Math.ceil(team.length / SLIDES_PER_PAGE_TEAM);
      const currentSlide = document.querySelector(
        ".team-slides .swiper-slide.active"
      );

      // Create new slide
      const newSlide = document.createElement("div");
      newSlide.className = "swiper-slide team-slide";

      const startIdx = currentSlideIndex_TEAM * SLIDES_PER_PAGE_TEAM;
      const endIdx = Math.min(startIdx + SLIDES_PER_PAGE_TEAM, team.length);

      const slideContent = team
        .slice(startIdx, endIdx)
        .map((person) => createPersonalBlock(person))
        .join("");

      newSlide.innerHTML = slideContent;

      // Add new slide to container
      const slidesContainer_TEAM = document.querySelector(".team-slides");

      if (currentSlide) {
        // Fade out current slide
        currentSlide.style.opacity = "0";
        currentSlide.style.visibility = "hidden";

        // Wait for fade out animation
        setTimeout(() => {
          currentSlide.remove();
          slidesContainer_TEAM.appendChild(newSlide);

          // Trigger reflow
          void newSlide.offsetWidth;

          // Add active class to trigger fade in
          newSlide.classList.add("active");
        }, 200);
      } else {
        slidesContainer_TEAM.appendChild(newSlide);
        setTimeout(() => {
          newSlide.classList.add("active");
        }, 0);
      }

      updatePagination_TEAM(totalSlides);
    }

    function updatePagination_TEAM(totalSlides) {
      indicators_TEAM.innerHTML = "";

      if (totalSlides <= 5) {
        for (let i = 0; i < totalSlides; i++) {
          addPageButton_TEAM(i);
        }
      } else {
        if (currentSlideIndex_TEAM > 2) {
          addPageButton_TEAM(0);
          addEllipsis_TEAM();
        }

        for (
          let i = Math.max(0, currentSlideIndex_TEAM - 1);
          i <= Math.min(totalSlides - 1, currentSlideIndex_TEAM + 1);
          i++
        ) {
          addPageButton_TEAM(i);
        }

        if (currentSlideIndex_TEAM < totalSlides - 3) {
          addEllipsis_TEAM();
          addPageButton_TEAM(totalSlides - 1);
        }
      }
    }

    function addPageButton_TEAM(pageNum) {
      const button = document.createElement("div");
      button.className = `indicator-swiper${
        pageNum === currentSlideIndex_TEAM ? " active" : ""
      }`;
      button.dataset.team = pageNum;
      button.textContent = pageNum + 1;
      indicators_TEAM.appendChild(button);
    }

    function addEllipsis_TEAM() {
      const span = document.createElement("span");
      span.textContent = "...";
      span.className = "pagination-ellipsis";
      indicators_TEAM.appendChild(span);
    }

    function nextSlide_TEAM() {
      const totalSlides = Math.ceil(team.length / SLIDES_PER_PAGE_TEAM);
      if (currentSlideIndex_TEAM < totalSlides - 1) {
        currentSlideIndex_TEAM++;
        updateSlides_TEAM();
      }
    }

    function prevSlide_TEAM() {
      if (currentSlideIndex_TEAM > 0) {
        currentSlideIndex_TEAM--;
        updateSlides_TEAM();
      }
    }

    // Touch events
    let startX, endX;

    function handleTouchStart_TEAM(event) {
      startX = event.touches[0].clientX;
    }

    function handleTouchMove_TEAM(event) {
      endX = event.touches[0].clientX;
    }

    function handleTouchEnd_TEAM() {
      if (!endX) return;

      const deltaX = endX - startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextSlide_TEAM();
        } else {
          prevSlide_TEAM();
        }
      }
    }

    // Event Listeners
    buttonNext_TEAM.addEventListener("click", nextSlide_TEAM);
    buttonPrev_TEAM.addEventListener("click", prevSlide_TEAM);

    indicators_TEAM.addEventListener("click", (event) => {
      const clickedIndicator = event.target;
      if (clickedIndicator.classList.contains("indicator-swiper")) {
        currentSlideIndex_TEAM = parseInt(clickedIndicator.dataset.team, 10);
        updateSlides_TEAM();
      }
    });

    slidesContainer_TEAM.addEventListener("touchstart", handleTouchStart_TEAM);
    slidesContainer_TEAM.addEventListener("touchmove", handleTouchMove_TEAM);
    slidesContainer_TEAM.addEventListener("touchend", handleTouchEnd_TEAM);

    // Initial render
    updateSlides_TEAM();
  }

  document.addEventListener("DOMContentLoaded", initTEAMSlider);
}
