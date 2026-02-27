import { API_KEY, BASE_URL } from "./config.js";

const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.querySelector(".modal-close");

modalClose.addEventListener("click", function () {
  modalOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});
//Responsive Design

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
    console.log(movies);
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

async function getMovies(inputKeyword) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${inputKeyword}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}
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

async function getModal(movie_id, movie_type) {
  try {
    const response = await fetch(
      `${BASE_URL}/${movie_type}/${movie_id}?api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data!");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

function updateUIDetail(modalValue) {
  const modalBody = document.querySelector(".modal-body");
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
      const modalValue = await getModal(tmdbid, typeId);
      updateUIDetail(modalValue);
    } catch (err) {
      console.log(err);
    }
  }
  /*   mobileMenu.classList.remove("active"); */
  if (e.key === "Escape") {
    console.log("ESC");
    searchBoxMobile.classList.remove("active");
    searchMobile.classList.remove("inactive");
    overlayGlobal.classList.remove("active");
  }
});

function showCards(movie) {
  /* const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "not-found.jpg"; // gambar fallback
  console.log(poster);
 */

  let dateMovie = movie.release_date || movie.first_air_date;
  let nameMovie = movie.title || movie.name;
  if (dateMovie === "") {
    dateMovie = "Coming Soon...";
  }
  return `
    <div class="card">
      <img 
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        class="card-img-top img-fluid"
        onerror="this.onerror=null; this.src='not-found.jpg';"
      />
      <div class="card-body">
        <h5 class="card-title">${nameMovie}</h5>
        <h6 class="card-year mb-2 text-muted">${dateMovie}</h6>
        <button href="#" 
           class="btn btn-primary modal-detail-button"
           data-bs-toggle="modal"
           data-bs-target="#movieDetailModal"
           data-tmdbid="${movie.id}"
           data-typeid="${movie.media_type}">
           Show Details
        </button>
      </div>
    </div>
  `;
}

function showModal(detail) {
  let dateMovie = detail.release_date || detail.first_air_date;
  let nameMovie = detail.title || detail.name;
  let originalMovie = detail.original_title || detail.original_name;
  if (dateMovie === "") {
    dateMovie = "Coming Soon...";
  }
  return `
              <div class="con-modBody">
                <div class="con-modImg">
                  <img src="https://image.tmdb.org/t/p/w500${detail.poster_path}"  class="modal-img" />
                </div>
                <div class="modal-list">
                  <ul class="list-group-modal">
                    <li class="list-group-item modal-title">
                      ${nameMovie} (${dateMovie})
                    </li>
                    <li class="list-group-item">
                      <strong>Original Title : </strong> ${originalMovie}
                    </li>
                    <li class="list-group-item">
                      <strong>Original Language : </strong> ${detail.original_language}
                    </li>
                    <li class="list-group-item">
                      <strong>Plot: </strong> ${detail.overview}
                    </li>
                  
                  </ul>
                </div>
              </div>
            `;
}

/* Swiper Content */
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
