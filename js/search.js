import { getMovies } from "../api/tmdb.js";
import { showCards } from "./moviecards.js";

window.addEventListener("DOMContentLoaded", async () => {
  const homeContent = document.querySelector(".home-content");
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("search");

  if (keyword) {
    // ✅ MODE SEARCH = aktif ketika user selesai input nama film.
    const homeContent = document.querySelector(".home-content");
    const input = document.querySelector(".input-keyword");
    console.log(keyword);
    if (input) input.value = keyword.replace(/-/g, " ");

    const movies = await getMovies(input.value);
    console.log(input.value);
    updateUI(movies);

    homeContent ? homeContent.classList.add("active") : "";
    // Menghilangkan Swiper
  } else {
    // ✅ MODE HOME = aktif ketika user tidak di mode search
    /*   homeContent.classList.remove("active"); */
    //me-request semua data swiper (kecuali hero) sekaligus
  }
});

/* UpdateUI adalah fungsi untuk menampilkan card film yang sudah selesai di request dari api tmdb,
parameternya movies yang merupakan banyak data film */
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
const searchButton = document.querySelector("#searchButton");

soundButton?.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(music);
  music.volume = 1;
  music.play();
});
/* DESKTOP MODE */
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const inputUser = inputKeyword.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    if (!inputUser) return;
    window.location.href = `index.html?search=${encodeURIComponent(inputUser)}`; //Querry Parameter============

    /* const movies = await getMovies(inputKeyword.value);
    updateUI(movies); */
  } catch (err) {
    alert(err);
  }
});

/* MOBILE MODE */
/* Jika user mensearch film, seluruh content home akan ditutupi overlay agar user tidak secara sengaja
mengklik hal lain */
searchMobile.addEventListener("click", function () {
  searchBoxMobile.classList.toggle("active");
  searchMobile.classList.toggle("inactive");

  /*  overlayGlobal.classList.toggle("active"); */

  if (searchBoxMobile.classList.contains("active")) {
    inputMobile.focus();
  }
});

/* Jika user memasuki side bar, seluruh content akan ditutupi overlay */
menuToggle.addEventListener("click", function (e) {
  mobileMenu.classList.toggle("active");
  overlayNavbar.classList.toggle("active");

  document.body.classList.toggle("no-scroll");
});

/* Jika user sudah memasuki side bar dan mengklik overlay, maka side bar akan tertutup */
overlayNavbar.addEventListener("click", function (e) {
  mobileMenu.classList.remove("active");
  overlayNavbar.classList.remove("active");
  document.body.classList.remove("no-scroll");
});
const searchButtonMobile = document.querySelector("#searchButtonMobile");
searchButtonMobile.addEventListener("click", async function () {
  overlayGlobal.classList.remove("active");

  try {
    const inputKeyword = document.querySelector(".input-keyword-mobile");
    const inputUser = inputKeyword.value.trim().replace(/\s+/g, "-");
    window.location.href = `index.html?search=${inputUser}`; //Querry Parameter============

    /* const movies = await getMovies(inputKeyword.value); 
    updateUI(movies); */
  } catch (err) {
    alert(err);
  }
});
