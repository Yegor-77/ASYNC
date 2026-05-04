const API_KEY = "55714880-b78f37b6e8e6ea7569ba17e8f";

const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");

let page = 1;


async function fetchImages() {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=cat&image_type=photo&page=${page}&per_page=12`,
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.json();
    renderImages(data.hits);
  } catch (error) {
    console.error("Помилка:", error.message);
  }
}


function renderImages(images) {
  images.forEach((img) => {
    const imgEl = document.createElement("img");

    imgEl.src = img.webformatURL;
    imgEl.alt = img.tags;

    imgEl.style.width = "200px";
    imgEl.style.margin = "10px";

    gallery.appendChild(imgEl);
  });
}


loadMoreBtn.addEventListener("click", () => {
  page += 1;
  fetchImages();
});


fetchImages();
