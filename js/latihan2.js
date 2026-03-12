import { API_KEY, BASE_URL } from "../api/tmdb.js";
import { getTrendingDays } from "../api/tmdb.js";
import { getTrendingWeeks } from "../api/tmdb.js";
import { getTrendingPopular } from "../api/tmdb.js";
import { getTrendingTopRated } from "../api/tmdb.js";
import { getMovies } from "../api/tmdb.js";
import { getModal } from "../api/tmdb.js";
import { getPopularMovies } from "../api/tmdb.js";
import { renderMovies, showCards } from "./moviecards.js";
import { showModal } from "./moviecards.js";
import { showSwiper } from "./moviecards.js";
import { loadAllGenres } from "../api/tmdb.js";
import { initSlider } from "./initSlider.js";
import { heroSlider } from "./initSlider.js";
window.addEventListener("DOMContentLoaded", async () => {
  genreList = await loadAllGenres();
  console.log(genreList);
  await getPopularMovies();
  await updateCardsDay();
  await updateCardsWeek();
  await updateCardsPopular();
  await updateCardsTopRated();
});
const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");
const modalBody = document.querySelector(".modal-body");

modalClose.addEventListener("click", function () {
  modalOverlay.classList.remove("active");
  modalBody.innerHTML = "";
  document.body.classList.remove("no-scroll");
});

let genreList = [];

const menuToggle = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const overlayNavbar = document.querySelector("#overlayNavbar");
const overlayGlobal = document.querySelector("#overlayGlobal");
const searchMobile = document.querySelector(".search-button-nav-mobile");
const inputMobile = document.querySelector(".input-keyword-mobile");
const searchBoxMobile = document.querySelector(".navbar-search-mobile");
const soundButton = document.querySelector(".nav-sound");
const music = document.querySelector("#bg-music");
const rowFilm = document.querySelector(".row-film");
const swiperFilm = document.querySelector(".swiper-content");
const swiperBg = document.querySelector(".slide-bg");

soundButton.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("play");
  music.volume = 0.3;
  music.play();
});

searchMobile.addEventListener("click", function () {
  searchBoxMobile.classList.toggle("active");
  searchMobile.classList.toggle("inactive");

  overlayGlobal.classList.toggle("active");

  if (searchBoxMobile.classList.contains("active")) {
    inputMobile.focus();
  }
});
menuToggle.addEventListener("click", function (e) {
  mobileMenu.classList.toggle("active");
  overlayNavbar.classList.toggle("active");

  document.body.classList.toggle("no-scroll");
});
overlayNavbar.addEventListener("click", function (e) {
  mobileMenu.classList.remove("active");
  overlayNavbar.classList.remove("active");
  document.body.classList.remove("no-scroll");
});
overlayGlobal.addEventListener("click", function () {
  searchBoxMobile.classList.remove("active");
  searchMobile.classList.remove("inactive");
  overlayGlobal.classList.remove("active");
});

//Fetch (Async Await)

const searchButton = document.querySelector("#searchButton");
const searchButtonMobile = document.querySelector("#searchButtonMobile");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");

    const movies = await getMovies(inputKeyword.value);

    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

searchButtonMobile.addEventListener("click", async function () {
  overlayGlobal.classList.remove("active");

  try {
    const inputKeyword = document.querySelector(".input-keyword-mobile");
    const movies = await getMovies(inputKeyword.value);

    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

function updateUI(movies) {
  if (movies.length === 0) {
    rowFilm.classList.remove("active");
    return;
  }

  rowFilm.classList.add("active");
  let cards = ``;
  const containerFilm = document.querySelector(".container-film");

  movies.forEach((movie) => (cards += showCards(movie)));
  containerFilm.innerHTML = cards;
}

function updateUIDetail(modalValue) {
  console.log(modalValue);
  modalOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  let modal = showModal(modalValue);
  modalBody.innerHTML = modal;
}

//Event binding
document.addEventListener("click", async function (e) {
  console.log(e.target);
  if (e.target.classList.contains("modal-detail-button")) {
    try {
      const tmdbid = e.target.dataset.tmdbid;
      const typeId = e.target.dataset.typeid;
      console.log("TypeId = " + typeId);
      const modalValue = await getModal(tmdbid, typeId);

      updateUIDetail(modalValue);
    } catch (err) {
      console.log(err);
    }
  }

  if (e.key === "Escape") {
    console.log("ESC");
    searchBoxMobile.classList.remove("active");
    searchMobile.classList.remove("inactive");
    overlayGlobal.classList.remove("active");
  }
});

export function getGenreNames(genreIds) {
  return genreIds
    .map((id) => {
      const genre = genreList.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .join(", ");
}

export function updateSwiper(dataSwiper) {
  const maxMovies = 20;
  const limitData = dataSwiper.slice(1, maxMovies);
  const swiperHTML = limitData.map(showSwiper).join("");
  swiperFilm.innerHTML = swiperHTML;
  heroSlider();
}

async function updateCardsDay() {
  const data = await getTrendingDays();
  const movies = data.results;
  renderMovies(movies, ".card-slider-day .swiper-wrapper");
  initSlider(".cardSwiper");
  console.log(data);
}
async function updateCardsWeek() {
  const data = await getTrendingWeeks();
  const movies = data.results;
  renderMovies(movies, ".card-slider-week .swiper-wrapper");
  initSlider(".cardSwiper");
  console.log(data);
}
async function updateCardsPopular() {
  const data = await getTrendingPopular();
  const movies = data;
  renderMovies(movies, ".card-slider-popular .swiper-wrapper", "tv");
  initSlider(".cardSwiper");
  console.log(data);
}
async function updateCardsTopRated() {
  const data = await getTrendingTopRated();
  const movies = data;
  renderMovies(movies, ".card-slider-topRated .swiper-wrapper", "movie");
  initSlider(".cardSwiper");
  console.log(data);
}
