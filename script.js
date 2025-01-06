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


// form

const supportForm = document.querySelector(".support-form");
const nameInput = document.querySelector("input[name ='name']");
const emailInput = document.querySelector("input[name ='email']");
const messageInput = document.querySelector("textarea[name ='message']");



function validateInput(input, message){
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = `Данные отсутствуют. Заполните поле ${message}`;
    if(input.value.trim() === ""){
        errorMessage.classList.add("error");
        return false;
    }else{
        input.classList.remove("error");
        errorMessage.textContent = " ";
        return true;
    }
}

supportForm.addEventListener("submit", function(e){
    e.preventDefault();
   const nameIsValid =  validateInput(nameInput, "Имя");
   const emailIsValid = validateInput(emailInput, "E-mail");
   const messageIsValid = validateInput(messageInput, "Сообщение");

   if(nameIsValid && emailIsValid &&  messageIsValid ){
    alert("Данные успешно отправлены!!!");
    supportForm.reset();
   }
    
})


// scroll

const navLinks = document.querySelectorAll("a[href^='#']");
for (const link of navLinks) {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const id = link.getAttribute("href");
         document.querySelector(id).scrollIntoView({
            behavior: "smooth"
         })

    })
    
}

 