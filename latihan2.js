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

//Responsive Design

const menuToggle = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const overlay = document.querySelector("#overlay");
menuToggle.addEventListener("click", function (e) {
  /* e.stopPropagation(); */
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");

  document.body.classList.toggle("no-scroll");
});
overlay.addEventListener("click", function (e) {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

/* mobileMenu.addEventListener("click", function (e) {
  e.stopPropagation();
}); */

//Fetch (Async Await)

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");

    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

function getMovies(inputKeyword) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + inputKeyword)
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
  let cards = ``;
  const containerFilm = document.querySelector(".container-film");

  movies.forEach((movie) => (cards += showCards(movie)));
  containerFilm.innerHTML = cards;
}

function getModal(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbid)
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
        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
        <a href="#" 
           class="btn btn-primary modal-detail-button"
           data-bs-toggle="modal"
           data-bs-target="#movieDetailModal"
           data-imdbid="${movie.imdbID}">
           Show Details
        </a>
      </div>
    </div>
  `;
}

function showModal(detail) {
  return ` <div class="container-fluid">
              <div class="row">
                <div class="col-md-4">
                  <img src="${detail.Poster}"  class="img-fluid" />
                </div>
                <div class="col-md-8">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <strong>Title : </strong>${detail.Title} (${detail.Year})
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
            </div>`;
}
