const booksWrapper = document.querySelector(".books");
const loader = document.querySelector(".loader");
const errorBlock = document.querySelector("#error");

function renderBooks(books) {
  let html = " ";

  for (const book of books) {
    html += `
        <a href="${book.url}" target="_blank" class="books-item">
          <div class="books-img">
            <img src="${book.image}" alt="">
          </div>
          <div class="books-info">
            <h6 class="books-title">${book.title}</h6>
            <span class="books-price">${book.price}</span>
          </div>
        </a>
      `;
  }
  booksWrapper.innerHTML = html;
}

async function fetchBooks() {
  try {
    const response = await fetch("https://api.itbook.store/1.0/new");
    const data = await response.json();
    renderBooks(data.books.slice(0, 8));
  } catch (error) {
    errorBlock.textContent = "Ошибка на сервере";
  } finally {
    loader.style.display = "none";
  }
}

fetchBooks();

//  Slider

const sliderWrapper = document.querySelector(".testimonials");
const sliderContainer = document.querySelector(".testimonials-container");
const sliderItems = document.querySelectorAll(".testimonials-item");
const sliderButtons = document.querySelectorAll(".testimonials-btn");
const sliderLeftButton = sliderButtons[0];
const sliderRightButton = sliderButtons[1];
const offsetSize = sliderWrapper.offsetWidth;
let sliderIndex = 0;

function moveSlide(index){
    sliderContainer.style.marginLeft = `-${index * offsetSize}px`;
}

function previousSlide() {
    if (sliderIndex !== 0) {
        sliderIndex--;
        moveSlide(sliderIndex);
      }
}
function nextSlide() {
  if (sliderIndex !== sliderItems.length - 1) {
    sliderIndex++;
    moveSlide(sliderIndex);
  }
}

sliderLeftButton.addEventListener("click", previousSlide);
sliderRightButton.addEventListener("click", nextSlide);
