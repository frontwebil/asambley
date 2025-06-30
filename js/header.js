export function initHeaderScroll() {
  const header = document.querySelector("header");
  const body = document.body;
  const headerBurger = document.querySelector(".custom-burger");
  const slidingMenu = document.querySelector(".sliding-menu");
  const links = document.querySelector(".mobile-nav-link");
  const joinButton = document.querySelector('.header-button-mobile')

  window.addEventListener("scroll", () => {
    if (window.scrollY > 90) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  headerBurger.addEventListener("click", () => {
    if (!headerBurger.classList.contains("active")) {
      header.classList.add("scrolled");
      headerBurger.classList.add("active");
      slidingMenu.classList.add("active");
      body.style.overflow = "hidden";
    } else {
      if (window.scrollY > 90) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      headerBurger.classList.remove("active");
      slidingMenu.classList.remove("active");
      body.style.overflow = "";
    }
  });

  links.addEventListener("click", () => {
    if (window.scrollY > 90) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    headerBurger.classList.remove("active");
    slidingMenu.classList.remove("active");
    body.style.overflow = "";
  });

  joinButton.addEventListener("click", () => {
    if (window.scrollY > 90) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    headerBurger.classList.remove("active");
    slidingMenu.classList.remove("active");
    body.style.overflow = "";
  });
  
}
