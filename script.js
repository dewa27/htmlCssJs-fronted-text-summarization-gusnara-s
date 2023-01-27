const loading = document.querySelector(".loading");
const loadingBg = document.querySelector(".loading-background");
const textareas = document.querySelectorAll(".teks-input");
const submitBtn = document.querySelector("#submit-btn");
const wrapper = document.querySelectorAll(".wrapper"),
  selectBtn = document.querySelectorAll(".select-btn"),
  options = document.querySelectorAll(".options");

const percentageRange = document.querySelector(".slider");
const percentageValueContainer = document.querySelector("#percentage-value");
const kalimatUtamaOptions = ["Awal Kalimat", "Akhir Kalimat"];
const kalimatUtamaSbgOptions = ["Premise", "Hipotesis"];

//textarea word counting and height adjustment
textareas.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    console.log("tes");
    this.nextElementSibling.querySelector("span").innerHTML = this.value
      ? this.value.match(/\S+/g).length
      : 0;
  });
});

//addOptions to select Kalimat Utama
function addOptionsUtama(selectedOptions) {
  options[0].innerHTML = "";
  kalimatUtamaOptions.forEach((option) => {
    let isSelected = option == selectedOptions ? "selected" : "";
    let li = `<li onclick="updateNameUtama(this)" class="${isSelected}">${option}</li>`;
    options[0].insertAdjacentHTML("beforeend", li);
  });
}
//addOptions to select Kalimat Utama Sebagai
function addOptionsUtamaSbg(selectedOptions) {
  options[1].innerHTML = "";
  kalimatUtamaSbgOptions.forEach((option) => {
    let isSelected = option == selectedOptions ? "selected" : "";
    let li = `<li onclick="updateNameUtamaSbg(this)" class="${isSelected}">${option}</li>`;
    options[1].insertAdjacentHTML("beforeend", li);
  });
}
function updateNameUtama(selectedLi) {
  addOptionsUtama(selectedLi.innerText);
  wrapper[0].classList.remove("active");
  selectBtn[0].firstElementChild.innerText = selectedLi.innerText;
}
function updateNameUtamaSbg(selectedLi) {
  addOptionsUtama(selectedLi.innerText);
  wrapper[1].classList.remove("active");
  selectBtn[1].firstElementChild.innerText = selectedLi.innerText;
}
//call the function
addOptionsUtama();
addOptionsUtamaSbg();

//toggling options for both select kalimat utama and kalimat utama sebagai
selectBtn.forEach((select, key) => {
  select.addEventListener("click", () =>
    wrapper[key].classList.toggle("active")
  );
});

//show percentage value when slider change
percentageRange.addEventListener("input", function () {
  percentageValueContainer.innerHTML = this.value;
});

//submit button on click event. your request code to Machine Learning / server goes here
submitBtn.addEventListener("click", function () {
  // $("#fullpage").moveDown();
  showLoading();
  //make request to server here
  setTimeout(function () {
    console.log("request is over");
    //bronara this setTimeout just dummy, lets say 2s
    //request is over, hide the loading
    hideLoading();
  }, 2000);
});

//function used to show the loading
function showLoading() {
  loading.classList.add("loading-active");
  loadingBg.classList.add("loading-active");
}
//function used to hide the loading
function hideLoading() {
  loading.classList.remove("loading-active");
  setTimeout(function () {
    loadingBg.classList.remove("loading-active");
  }, 50);
}
$("#fullpage").onepage_scroll({
  sectionContainer: ".section",
  pagination: false,
  easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
  // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
  animationTime: 800, // AnimationTime let you define how long each section takes to animate  updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
  beforeMove: function (index) {}, // This option accepts a callback function. The function will be called before the page moves.
  afterMove: function (index) {}, // This option accepts a callback function. The function will be called after the page moves.
  loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
  responsiveFallback: false, // You can fallback to normal page scroll by defining the width of the browser in which
  // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
  // the browser's width is less than 600, the fallback will kick in.
  direction: "horizontal", // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
});
$(".nav-btn__right").on("click", function () {
  $("#fullpage").moveDown();
});
$(".nav-btn__left").on("click", function () {
  $("#fullpage").moveUp();
});
$("body").on("scroll touchmove mousewheel", function (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

$(".nav-btn").hover(
  function () {
    $(this).find("i").addClass("bounce");
  },
  function () {
    $(this).find("i").removeClass("bounce");
  }
);
