import { getGenreNames } from "./latihan2.js";

/* Membuat card untuk ditampilkan di content setelah user mengklik searcButton */
export function showCards(movie) {
  const poster =
    movie.poster_path && movie.poster_path !== "N/A"
      ? movie.poster_path
      : "not-found.jpg";

  let dateMovie = movie.release_date || movie.first_air_date;
  let nameMovie = movie.title || movie.name;
  let originalName = movie.original_name || movie.original_title;

  if (dateMovie === "") {
    dateMovie = "Coming Soon...";
  }
  /* const genreId = movie.genre_ids; */
  /*  const genreMovie = genreId.map((id) => {
    const genre = genreList.find((g) => id === g.id);
    return genre.name;
  }); */
  return `<a href="detail.html?id=${movie.id}&type=${movie.media_type}&${movie.name || movie.title}">
  <div
    class="movie-card"
    data-bs-toggle="modal"
    data-bs-target="#movieDetailModal"
  >
    <div class="movie-poster">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
    </div>
    <div class="movie-info">
      <div class="movie-top">
        <div class="movie-title">
          <h2>
            ${nameMovie}
            <span class="title">(${originalName})</span>
          </h2>
        </div>
        <span class="movie-date">${dateMovie}</span>
      </div>
      <div class="movie-bottom">
        <p>${movie.overview}</p>
      </div>
    </div>
  </div></a>
`;
}

export function showModal(detail) {
  let dateMovie = detail.release_date || detail.first_air_date;
  let nameMovie = detail.title || detail.name;
  /*  let originalMovie = detail.original_title || detail.original_name; */
  let genres = "Unknown";
  console.log(dateMovie);
  console.log(nameMovie);
  /*  console.log(originalMovie) */
  console.log(genres);
  if (detail.genres && detail.genres.length > 0) {
    genres = detail.genres
      .map(function (g) {
        return g.name;
      })
      .join(", ");
  }
  console.log(detail);
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
                      <strong>Genre : </strong> ${genres}
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

/* Untuk membuat content hero slider */
export function showSwiper(data) {
  const genre = getGenreNames(data.genre_ids);
  /*  console.log(data); */
  return `<div class="swiper-slide">
            <div class="slide-bg" style="background-image: url('https://image.tmdb.org/t/p/w500${data.backdrop_path}')" ></div>
            <div class="slide-overlay">
              <div class="slide-content">
                <img
                  src="https://image.tmdb.org/t/p/w500${data.poster_path}"
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
                  <a href="#" class="slide-button-2 modal-detail-button" data-tmdbid=${data.id} data-typeid="${data.media_type}"> More Info</a>
                </div>
              </div>
            </div>
          </div>`;
}

/* Membuat card untuk ditampilkan di home slider(non hero) */
export function renderMovies(movies, selector, type) {
  const container = document.querySelector(`${selector}`);

  const htmlCards = movies.map((movie) => {
    return `<a href="detail.html?id=${movie.id}&type=${movie.media_type}" class="swiper-slide">
            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              alt=""
              class="card-img modal-detail-button"
              data-tmdbid=${movie.id} data-typeid=${movie.media_type ?? type}
            />
          </a>`;
  });

  container.innerHTML = htmlCards.join("");
}
