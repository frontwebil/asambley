import { initHeaderScroll } from "./js/header.js";
import { structure } from "./js/structure.js";
import { team } from "./js/team.js";
import { testimonials } from "./js/testimonials.js";
import { wordpressPosts } from "./js/wordpressPosts.js";
import { partnersCarousel } from "./js/partnersCarousel.js";

const teamList = [
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

initHeaderScroll();
structure();
team(teamList);
testimonials();
wordpressPosts();
partnersCarousel();
