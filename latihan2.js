/* $(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=dca61bcc&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search.map((movie) => movie);
      const row = document.querySelector(".container-film");
      let cards = ``;
      movies.forEach((movie) => {
        cards += showCards(movie);
      });
      $(".container-film").html(cards);
      console.log(movies);
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=dca61bcc&i=" +
            $(this).data("imdbid"),
          success: (results) => {
            console.log(results);
            const movieDetail = showModal(results);
            $(".modal-body").html(movieDetail);
          },
          error: (result) => console.log(result.responseText),
        });
      });
    },
    error: (results) => {
      console.log(results.responseText);
    },
  });
});
 */

//Fetch

/* const searchButton = document.getElementsByClassName("search-button")[0];
const cards = document.querySelector(".container-film");

searchButton.addEventListener("click", function () {
  const inputKeyword = document.getElementsByClassName("input-keyword")[0];

  fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + inputKeyword.value)
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      const movies = response.Search;
      let card = ``;
      movies.forEach((movie) => {
        card += showCards(movie);
      });
      cards.innerHTML = card;
      const modalButton = document.querySelectorAll(".modal-detail-button");
      modalButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbId = this.dataset.imdbid;

          fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbId)
            .then((response) => response.json())
            .then((response) => {
              const modalBody = document.querySelector(".modal-body");
              let modal = showModal(response);
              modalBody.innerHTML = modal;
            });
          console.log(imdbId);
        });
      });
    });
}); */

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
  /* e.stopPropagation(); */
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

/* mobileMenu.addEventListener("click", function (e) {
  e.stopPropagation();
}); */

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

function getMovies(inputKeyword) {
  return fetch("https://www.omdbapi.com/?apikey=dca61bcc&s=" + inputKeyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }

      return response.Search;
    });
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

function getModal(imdbid) {
  return fetch("https://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbid)
    .then((response) => {
      if (!response.ok) {
        alert("Api Key Salah!");
        throw new Error(response.Error);
      }
      return response.json();
    })
    .then((response) => response);
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
      const imdbid = e.target.dataset.imdbid;
      const modalValue = await getModal(imdbid);
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
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "not-found.jpg"; // gambar fallback
  console.log(poster);

  return `
    <div class="card">
      <img 
        src="${poster}" 
        class="card-img-top img-fluid"
        onerror="this.onerror=null; this.src='not-found.jpg';"
      />
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <h6 class="card-year mb-2 text-muted">${movie.Year}</h6>
        <button href="#" 
           class="btn btn-primary modal-detail-button"
           data-bs-toggle="modal"
           data-bs-target="#movieDetailModal"
           data-imdbid="${movie.imdbID}">
           Show Details
        </button>
      </div>
    </div>
  `;
}

function showModal(detail) {
  return `
              <div class="con-modBody">
                <div class="con-modImg">
                  <img src="${detail.Poster}"  class="modal-img" />
                </div>
                <div class="modal-list">
                  <ul class="list-group-modal">
                    <li class="list-group-item modal-title">
                      ${detail.Title} (${detail.Year})
                    </li>
                    <li class="list-group-item">
                      <strong>Writer : </strong> ${detail.Writer}
                    </li>
                    <li class="list-group-item">
                      <strong>Genre : </strong> ${detail.Genre}
                    </li>
                    <li class="list-group-item"><strong>Actor : </strong> ${detail.Actors}</li>
                    <li class="list-group-item"><strong>Plot : </strong> ${detail.Plot}</li>
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
