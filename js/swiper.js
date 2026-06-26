import { getTrendingDays } from "../api/tmdb.js";
import { getTrendingWeeks } from "../api/tmdb.js";
import { getTrendingPopular } from "../api/tmdb.js";
import { getTrendingTopRated } from "../api/tmdb.js";
import { getPopularMovies } from "../api/tmdb.js";
import { loadAllGenres } from "../api/tmdb.js";
import { initSlider } from "./initSlider.js";
import { heroSlider } from "./initSlider.js";

let genreList = []; /* << for swiper module */

//Starting Website
window.addEventListener("DOMContentLoaded", async () => {
  //me-request semua data swiper (kecuali hero) sekaligus
  genreList = await loadAllGenres();
  await Promise.all([
    updateCards(getTrendingDays, "day"),
    updateCards(getTrendingWeeks, "week"),
    updateCards(getTrendingPopular, "popular"),
    updateCards(getTrendingTopRated, "topRated"),
  ]);

  //request data untuk hero slider
  updateSwiper(await getPopularMovies());
});

/* const overlayGlobal = document.querySelector("#overlayGlobal"); */

const swiperFilm = document.querySelector(".swiper-content");

/* updateCards digunakan untuk menampilkan card slider di menu utama setelah hero slider,
data diambil dari getData yang merupakan nama fungsi getDataFilm dan target yang merupakan target tag
yang ingin dimasukan card swipernyas */
async function updateCards(getData, target) {
  const data = await getData();
  const movies = data;
  renderMovies(movies, `.card-slider-${target} .swiper-wrapper`);
  initSlider(".cardSwiper");
}
/* updateSwiper digunakan untuk menampilkan hero slider dari parameter dataSwipers */
function updateSwiper(dataSwiper) {
  //Hero Slider
  const maxMovies = 20;
  const limitData = dataSwiper.slice(1, maxMovies);
  const swiperHTML = limitData.map(showSwiper).join("");
  swiperFilm.innerHTML = swiperHTML;
  heroSlider();
}
/* getGenreNames digunakan untuk menampilkan hasil genre yang sudah jadi(contoh : Mahou Shoujo) */
function getGenreNames(genreIds) {
  return genreIds
    .map((id) => {
      const genre = genreList.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .join(", ");
}
/* Untuk membuat content hero slider */
function showSwiper(data) {
  const genre = getGenreNames(data.genre_ids);
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : `https://demofree.sirv.com/nope-not-here.jpg`;
  console.log(data);
  return `<div class="swiper-slide">
            <div class="slide-bg" style="background-image: url('https://image.tmdb.org/t/p/w500${data.backdrop_path}')" ></div>
            <div class="slide-overlay">
              <div class="slide-content">
                <img
                  src=""
                  alt=""
                  class="slide-img"
                />
                <h1 class="slide-title">
                  ${data.title || data.name}
                </h1>
                <div class="slide-genre">${genre}</div>
                <p class="slide-info">
                  ${data.overview}
                </p>
                <div class="slide-buttons">
                  <a href="#" class="slide-button-1" 
                    ><i class="bi bi-play-fill"></i> Watch Now</a
                  >
                  <a href="detail.html?id=${data.id}&type=${data.media_type}&name=${data.title}" class="slide-button-2 modal-detail-button" data-tmdbid=${data.id} data-typeid="${data.media_type}"> More Info</a>
                </div>
              </div>
            </div>
          </div>`;
}
/* Membuat card untuk ditampilkan di home slider(non hero) */
export function renderMovies(movies, selector, type) {
  const container = document.querySelector(`${selector}`);

  const htmlCards = movies.map((movie) => {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : `https://demofree.sirv.com/nope-not-here.jpg`;
    return `<a href="detail.html?id=${movie.id}&type=${movie.media_type}" class="swiper-slide">
            <img
              src="${poster}"
              alt=""
              class="card-img modal-detail-button"
              data-tmdbid=${movie.id} data-typeid=${movie.media_type ?? type}
            />
          </a>`;
  });

  container.innerHTML = htmlCards.join("");
}
