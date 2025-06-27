export function wordpressPosts() {
  const posts = [];

  const postsContainer = document.querySelector(".posts-cards");

  fetch(
    "https://public-api.wordpress.com/wp/v2/sites/asambley.wordpress.com/posts"
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((p) => {
        if(posts.length > 3) return;
        const title = p.title.rendered;
        const contentHTML = p.content.rendered;
        const postLink = p.link;

        // Парсимо HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHTML, "text/html");

        // Витягуємо всі <p>
        const pTags = doc.querySelectorAll("p");
        let textOnly = "";
        pTags.forEach((p) => {
          textOnly += p.textContent + "\n"; // або + "<br>" для HTML-розривів
        });

        // Перше зображення (опційно)
        const imgTag = doc.querySelector("img");
        const imgSrc = imgTag ? imgTag.getAttribute("src") : null;

        // Вивід
        const post = {
          title,
          imgSrc,
          textOnly,
          postLink,
        };
        if (posts.length < 3) {
          posts.push(post);
          postsContainer.innerHTML += `
            <div class="post-card">
            <div class="post-card-top">
            <img src="${imgSrc}" alt="" class="post-card-img" />
            <h2 class="text-l bold600">${title}</h2>
            <p class="text-m">${textOnly}</p>
            </div>

            <a href="${postLink}" class="read-more">
              <p class="text-m bold500" style="color: #1F12D4;">Дізнатись більше</p>
              <img src="images/posts/ArrowUpRight.svg" alt="" />
            </a>
          </div>
          `;
        }
      });
    })
    .catch((err) => console.error("Помилка завантаження постів:", err));
}
