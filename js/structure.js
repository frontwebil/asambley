export function structure() {
  const screenWidth = window.screen.width;

  const structure = [
    {
      img1: "images/structure/1.svg",
      title1: "Департамент духовності",
      text1: "Решетінський Валерій Миколайович",
      img2: "images/structure/2.svg",
      title2: "Департамент інформаційний",
      text2: "Вакансія",
    },
    {
      img1: "images/structure/3.svg",
      title1: "Департамент капеланства",
      text1: "Труфанов Валерій Ілліч",
      img2: "images/structure/4.svg",
      title2: "Департамент інженерно-технічний",
      text2: "Тарас Юрій Ярославович",
    },
    {
      img1: "images/structure/5.svg",
      title1: "Департамент сім’ї та молоді",
      text1: "Вакансія",
      img2: "images/structure/6.svg",
      title2: "Департамент фінансів та економіки: ",
      text2: "Вакансія",
    },
    {
      img1: "images/structure/7.svg",
      title1: "Департамент реабілітації та охорони здоров’я ",
      text1: "Біла Ольга Вікторівна",
      img2: "images/structure/8.svg",
      title2: "Департамент природних ресурсів та екології ",
      text2: "Вакансія",
    },
    {
      img1: "images/structure/9.svg",
      title1: "Департамент науки та освіти",
      text1: "Жуковський Василь Миколайович",
      img2: "images/structure/10.svg",
      title2:
        "Департамент  місцевого самоврядування та взаємодії з органами влади",
      text2: "Савончак Петро Васильович",
    },
    {
      img1: "images/structure/11.svg",
      title1: "Департамент права та юридичного супроводу",
      text1: "Курбанова Тетяна Григорівна",
      img2: "images/structure/12.svg",
      title2: "Департамент інфраструктури та відновлення України",
      text2: "Мазурчак Олександр Володимирович ",
    },
    {
      img1: "images/structure/13.svg",
      title1: "Департамент благодійності",
      text1: "Романенко Михайло Сергійович",
      img2: "images/structure/14.svg",
      title2: "Департамент культури і просвітництва",
      text2: "Шаповалов Костянтин ",
    },
    {
      img1: "images/structure/15.svg",
      title1: "Департамент закордонних справ",
      text1: "кандидат на посаду керівника: Радченко Юрій Ігорович",
      img2: "images/structure/16.svg",
      title2: "Департамент громадських формувань",
      text2: "Кондратенко Іван Сергійович",
    },
    {
      img1: "images/structure/17.svg",
      title1: "Департамент мілітарний",
      text1: "Романенко Ігор Олександрович",
      img2: "images/structure/18.svg",
      title2: "Департамент українського козацтва",
      text2: "Марасін Олег Вікторович",
    },
    {
      img1: "images/structure/19.svg",
      title1: "Департамент внутрішньої та зовнішньої безпеки",
      text1: "Нікандров Михайло Васильович",
      img2: "images/structure/20.svg",
      title2: "Департамент аграрний (АПК): ",
      text2: "Вакансія",
    },
    {
      img1: "images/structure/21.svg",
      title1: "Департамент розвитку підприємництва та виробництва",
      text1: "Вакансія",
      img2: "",
      title2: "",
      text2: " ",
    },
  ];

  let SLIDES_PER_PAGE_Structure = 3;
  if (screenWidth <= 1265) {
    SLIDES_PER_PAGE_Structure = 2;
  }
  if (screenWidth <= 850) {
    SLIDES_PER_PAGE_Structure = 1;
  }

  let currentSlideIndex_Structure = 0;

  function initPersonalSlider() {
    const slidesContainer_Structure =
      document.querySelector(".structure-slides");
    const buttonPrev_Structure = document.querySelector(".structure-prev");
    const buttonNext_Structure = document.querySelector(".structure-next");
    const indicators_Structure = document.querySelector(
      ".structure-indicators"
    );

    function createPersonalBlock(person) {
      return `
      <div class="structure-column">
        <div class="whats-difference-block" style="height : 100%;">
          <img src="${person.img1}" alt="" />
          <h3 class="text-m-vn" style="text-transform: uppercase">${
            person.title1
          }</h3>
          <p class="text-m" style="color: #464646">
            ${person.text1}
          </p>
        </div>
        ${
          person.title2
            ? `
        <div class="whats-difference-block" style="height : 100%;">
          <img src="${person.img2}" alt="" />
          <h3 class="text-m-vn" style="text-transform: uppercase">${person.title2}</h3>
          <p class="text-m" style="color: #464646">
            ${person.text2}
          </p>
        </div>`
            : `
        <div class="whats-difference-block" style="visibility : hidden;">
          <img src="${person.img2}" alt="" />
          <h3 class="text-m-vn" style="text-transform: uppercase">${person.title2}</h3>
          <p class="text-m" style="color: #464646">
            ${person.text2}
          </p>
        </div>`
        }

      </div>
    `;
    }

    function updateSlides_Structure() {
      const totalSlides = Math.ceil(
        structure.length / SLIDES_PER_PAGE_Structure
      );
      const currentSlide = document.querySelector(
        ".structure-slides .swiper-slide.active"
      );

      // Create new slide
      const newSlide = document.createElement("div");
      newSlide.className = "swiper-slide structure-slide";

      const startIdx = currentSlideIndex_Structure * SLIDES_PER_PAGE_Structure;
      const endIdx = Math.min(
        startIdx + SLIDES_PER_PAGE_Structure,
        structure.length
      );

      const slideContent = structure
        .slice(startIdx, endIdx)
        .map((person) => createPersonalBlock(person))
        .join("");

      newSlide.innerHTML = slideContent;

      // Add new slide to container
      const slidesContainer_Structure =
        document.querySelector(".structure-slides");

      if (currentSlide) {
        // Fade out current slide
        currentSlide.style.opacity = "0";
        currentSlide.style.visibility = "hidden";

        // Wait for fade out animation
        setTimeout(() => {
          currentSlide.remove();
          slidesContainer_Structure.appendChild(newSlide);

          // Trigger reflow
          void newSlide.offsetWidth;

          // Add active class to trigger fade in
          newSlide.classList.add("active");
        }, 200);
      } else {
        slidesContainer_Structure.appendChild(newSlide);
        setTimeout(() => {
          newSlide.classList.add("active");
        }, 0);
      }

      updatePagination_Structure(totalSlides);
    }

    function updatePagination_Structure(totalSlides) {
      indicators_Structure.innerHTML = "";

      if (totalSlides <= 5) {
        for (let i = 0; i < totalSlides; i++) {
          addPageButton_Structure(i);
        }
      } else {
        if (currentSlideIndex_Structure > 2) {
          addPageButton_Structure(0);
          addEllipsis_Structure();
        }

        for (
          let i = Math.max(0, currentSlideIndex_Structure - 1);
          i <= Math.min(totalSlides - 1, currentSlideIndex_Structure + 1);
          i++
        ) {
          addPageButton_Structure(i);
        }

        if (currentSlideIndex_Structure < totalSlides - 3) {
          addEllipsis_Structure();
          addPageButton_Structure(totalSlides - 1);
        }
      }
    }

    function addPageButton_Structure(pageNum) {
      const button = document.createElement("div");
      button.className = `indicator-swiper ${
        pageNum === currentSlideIndex_Structure ? "active" : ""
      }`;
      button.dataset.structure = pageNum;
      button.textContent = pageNum + 1;
      indicators_Structure.appendChild(button);
    }

    function addEllipsis_Structure() {
      const span = document.createElement("span");
      span.textContent = "...";
      span.className = "pagination-ellipsis";
      indicators_Structure.appendChild(span);
    }

    function nextSlide_Structure() {
      const totalSlides = Math.ceil(
        structure.length / SLIDES_PER_PAGE_Structure
      );
      if (currentSlideIndex_Structure < totalSlides - 1) {
        currentSlideIndex_Structure++;
        updateSlides_Structure();
      }
    }

    function prevSlide_Structure() {
      if (currentSlideIndex_Structure > 0) {
        currentSlideIndex_Structure--;
        updateSlides_Structure();
      }
    }

    // Touch events
    let startX, endX;

    function handleTouchStart_Structure(event) {
      startX = event.touches[0].clientX;
    }

    function handleTouchMove_Structure(event) {
      endX = event.touches[0].clientX;
    }

    function handleTouchEnd_Structure() {
      if (!endX) return;

      const deltaX = endX - startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextSlide_Structure();
        } else {
          prevSlide_Structure();
        }
      }
    }

    // Event Listeners
    buttonNext_Structure.addEventListener("click", nextSlide_Structure);
    buttonPrev_Structure.addEventListener("click", prevSlide_Structure);

    indicators_Structure.addEventListener("click", (event) => {
      const clickedIndicator = event.target;
      if (clickedIndicator.classList.contains("indicator-swiper")) {
        currentSlideIndex_Structure = parseInt(
          clickedIndicator.dataset.structure,
          10
        );
        updateSlides_Structure();
      }
    });

    slidesContainer_Structure.addEventListener(
      "touchstart",
      handleTouchStart_Structure
    );
    slidesContainer_Structure.addEventListener(
      "touchmove",
      handleTouchMove_Structure
    );
    slidesContainer_Structure.addEventListener(
      "touchend",
      handleTouchEnd_Structure
    );

    // Initial render
    updateSlides_Structure();
  }

  document.addEventListener("DOMContentLoaded", initPersonalSlider);
}
