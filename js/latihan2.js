import { getTrendingDays } from "../api/tmdb.js";
import { getTrendingWeeks } from "../api/tmdb.js";
import { getTrendingPopular } from "../api/tmdb.js";
import { getTrendingTopRated } from "../api/tmdb.js";
import { getMovies } from "../api/tmdb.js";
/* import { getDetail } from "../api/tmdb.js"; */
import { getPopularMovies } from "../api/tmdb.js";
import { renderMovies, showCards } from "./moviecards.js";
/* import { showModal } from "./moviecards.js"; */
import { showSwiper } from "./moviecards.js";
import { loadAllGenres } from "../api/tmdb.js";
import { initSlider } from "./initSlider.js";
import { heroSlider } from "./initSlider.js";

let genreList = [];

//Starting Website
window.addEventListener("DOMContentLoaded", async () => {
  const homeContent = document.querySelector(".home-content"); //Wrapper Content
  // 🔥 ambil keyword dari URL
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("search");
  /* console.log(params); */

  // load genre dulu
  genreList = await loadAllGenres();

  if (keyword) {
    // ✅ MODE SEARCH = aktif ketika user selesai input nama film.
    const input = document.querySelector(".input-keyword");
    if (input) input.value = keyword;

    const movies = await getMovies(keyword);
    updateUI(movies);
    homeContent.classList.add("active"); // Menghilangkan Swiper
  } else {
    // ✅ MODE HOME = aktif ketika user tidak di mode search
    homeContent.classList.remove("active");

    //me-request semua data swiper (kecuali hero) sekaligus
    await Promise.all([
      updateCards(getTrendingDays, "day"),
      updateCards(getTrendingWeeks, "week"),
      updateCards(getTrendingPopular, "popular"),
      updateCards(getTrendingTopRated, "topRated"),
    ]);

    //request data untuk hero slider
    updateSwiper(await getPopularMovies());
  }
});

/* const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");
const modalBody = document.querySelector(".modal-body"); */

/* if (modalClose) {
  modalClose.addEventListener("click", function () {
    modalOverlay.classList.remove("active");
    modalBody.innerHTML = "";
    document.body.classList.remove("no-scroll");
  });
} */

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

//BGM
soundButton.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("play");
  music.volume = 0.3;
  music.play();
});

/* MOBILE MODE */
/* Jika user mensearch film, seluruh content home akan ditutupi overlay agar user tidak secara sengaja
mengklik hal lain */
searchMobile.addEventListener("click", function () {
  searchBoxMobile.classList.toggle("active");
  searchMobile.classList.toggle("inactive");

  overlayGlobal.classList.toggle("active");

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
/* Jika user memasuki input mode, maka seluruh content kecuali search input akan ditutupi overlay */
overlayGlobal.addEventListener("click", function () {
  searchBoxMobile.classList.remove("active");
  searchMobile.classList.remove("inactive");
  overlayGlobal.classList.remove("active");
});

//Search Module for Mobile
const searchButtonMobile = document.querySelector("#searchButtonMobile");
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

//Search Module untuk Desktop

const searchButton = document.querySelector("#searchButton");

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

/* updateUIDetail adalah  */
/* function updateUIDetail(modalValue) {
  console.log(modalValue);
  modalOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  let modal = showModal(modalValue);
  modalBody.innerHTML = modal;
} */

//Event binding digunakan untuk mendeteksi apa yang diklik oleh user. BELUM DIGUNAKANs
/* document.addEventListener("click", async function (e) {
  const trigger = e.target.closest(
    ".movie-poster, .movie-title, .modal-detail-button",
    //strigger digunakan agar user hanya bisa masuk ke link film jika mengklik tag tertentu(poster dan title di card hasil search, dan card pada swiper)
  );
  if (!trigger) return;

  const card = e.target.closest(".movie-card, .modal-detail-button"); // card di swiper dan hasil search, digunakan untuk mengambil id dan type film tersebut untuk digunakan sebagai nilai parameter untuk updateUIDetails

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
 */
/* getGenreNames digunakan untuk menampilkan hasil genre yang sudah jadi(contoh : Mahou Shoujo, GL) */
export function getGenreNames(genreIds) {
  return genreIds
    .map((id) => {
      const genre = genreList.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .join(", ");
}

/* updateSwiper digunakan untuk menampilkan hero slider dari parameter dataSwipers */
export function updateSwiper(dataSwiper) {
  //Hero Slider
  const maxMovies = 20;
  const limitData = dataSwiper.slice(1, maxMovies);
  const swiperHTML = limitData.map(showSwiper).join("");
  swiperFilm.innerHTML = swiperHTML;
  heroSlider();
}

/* updateCards digunakan untuk menampilkan card slider di menu utama setelah hero slider,
data diambil dari getData yang merupakan nama fungsi getDataFilm dan target yang merupakan target tag
yang ingin dimasukan card swipernyas */
async function updateCards(getData, target) {
  const data = await getData();
  const movies = data;
  console.log(movies.length);
  renderMovies(movies, `.card-slider-${target} .swiper-wrapper`);
  initSlider(".cardSwiper");
  console.log(data);
}
