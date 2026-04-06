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

let genreList = [];
window.addEventListener("DOMContentLoaded", async () => {
  const homeContent = document.querySelector(".home-content");
  // 🔥 ambil keyword dari URL
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("search");
  /* console.log(params); */
  // load genre dulu
  genreList = await loadAllGenres();

  if (keyword) {
    // ✅ MODE SEARCH
    const input = document.querySelector(".input-keyword");
    if (input) input.value = keyword;

    const movies = await getMovies(keyword);
    updateUI(movies);
    homeContent.classList.add("active");
  } else {
    // ✅ MODE HOME (default)
    homeContent.classList.remove("active");
    await Promise.all([
      updateCards(getTrendingDays, "day"),
      updateCards(getTrendingWeeks, "week"),
      updateCards(getTrendingPopular, "popular"),
      updateCards(getTrendingTopRated, "topRated"),
    ]);

    updateSwiper(await getPopularMovies());
  }
});

const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");
const modalBody = document.querySelector(".modal-body");

if (modalClose) {
  modalClose.addEventListener("click", function () {
    modalOverlay.classList.remove("active");
    modalBody.innerHTML = "";
    document.body.classList.remove("no-scroll");
  });
}

const menuToggle = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const overlayNavbar = document.querySelector("#overlayNavbar");
const overlayGlobal = document.querySelector("#overlayGlobal");
const searchMobile = document.querySelector(".search-button-nav-mobile");
const inputMobile = document.querySelector(".input-keyword-mobile");
const searchBoxMobile = document.querySelector(".navbar-search-mobile");
const soundButton = document.querySelector(".nav-sound");
const music = document.querySelector("#bg-music");
const containerFilm = document.querySelector(".search-results");
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

//Fetch (Async Await) Search Button

const searchButton = document.querySelector("#searchButton");
const searchButtonMobile = document.querySelector("#searchButtonMobile");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    window.location.href = `index.html?search=${inputKeyword.value}`; //Querry Parameter============

    /* const movies = await getMovies(inputKeyword.value);
    updateUI(movies); */
  } catch (err) {
    alert(err);
  }
});

searchButtonMobile.addEventListener("click", async function () {
  overlayGlobal.classList.remove("active");

  try {
    const inputKeyword = document.querySelector(".input-keyword-mobile");
    window.location.href = `index.html?search=${inputKeyword.value}`; //Querry Parameter============

    /* const movies = await getMovies(inputKeyword.value); 
    updateUI(movies); */
  } catch (err) {
    alert(err);
  }
});

function updateUI(movies) {
  if (movies.length === 0) {
    containerFilm.classList.remove("active");
    return;
  }

  containerFilm.classList.add("active");

  const allowedTypes = ["movie", "tv"];
  let cards = ``;
  let filterMovie = movies.filter((mov) =>
    allowedTypes.includes(mov.media_type),
  );

  console.log(filterMovie);
  filterMovie.forEach((movie) => (cards += showCards(movie)));
  /* console.log(cards); */
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
  const trigger = e.target.closest(
    ".movie-poster, .movie-title, .modal-detail-button",
  );

  if (!trigger) return;

  const card = e.target.closest(".movie-card, .modal-detail-button");

  if (!card) return;

  try {
    const tmdbid = card.dataset.tmdbid;
    const typeId = card.dataset.typeid;
    console.log("TypeId = " + typeId);
    const modalValue = await getModal(tmdbid, typeId);

    updateUIDetail(modalValue);
  } catch (err) {
    console.log(err);
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
  //Hero Slider
  const maxMovies = 20;
  const limitData = dataSwiper.slice(1, maxMovies);
  const swiperHTML = limitData.map(showSwiper).join("");
  swiperFilm.innerHTML = swiperHTML;
  heroSlider();
}

async function updateCards(getData, target) {
  const data = await getData();
  const movies = data;
  console.log(movies.length);
  renderMovies(movies, `.card-slider-${target} .swiper-wrapper`);
  initSlider(".cardSwiper");
  console.log(data);
}
