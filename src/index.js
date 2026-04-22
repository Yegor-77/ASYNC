const API_KEY = "44015822-49767676646b9a89767f40673";
const BASE_URL = "https://pixabay.com/api/";

let page = 1;
const perPage = 12;

const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");

if (localStorage.getItem("page")) {
  page = parseInt(localStorage.getItem("page"));
}

async function fetchImages() {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&editors_choice=true&image_type=photo&page=${page}&per_page=${perPage}`,
    );

    const data = await response.json();

    renderImages(data.hits);

    if (data.hits.length === 0) {
      loadMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Помилка:", error);
  }
}

function renderImages(images) {
  images.forEach((img) => {
    const div = document.createElement("div");
    div.classList.add("image-card");

    div.innerHTML = `
      <img src="${img.webformatURL}" alt="${img.tags}" style="width: 300px; margin: 10px;">
    `;

    gallery.appendChild(div);
  });
}

loadMoreBtn.addEventListener("click", () => {
  page++;
  localStorage.setItem("page", page);
  fetchImages();
});

fetchImages();
