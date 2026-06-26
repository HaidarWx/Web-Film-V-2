/* Membuat card untuk ditampilkan di content setelah user mengklik searcButton */
export function showCards(movie) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://demofree.sirv.com/nope-not-here.jpg`;

  let dateMovie = movie.release_date || movie.first_air_date;
  let nameMovie = movie.title || movie.name;
  let originalName = movie.original_name || movie.original_title;

  let movieTitle = movie.name || movie.title;
  let movieURL = decodeURIComponent(
    movieTitle.trim().toLowerCase().replace(/\s+/g, "+"),
  );
  console.log(movieURL);
  if (dateMovie === "") {
    dateMovie = "Coming Soon...";
  }
  /* const genreId = movie.genre_ids; */
  /*  const genreMovie = genreId.map((id) => {
    const genre = genreList.find((g) => id === g.id);
    return genre.name;
  }); */
  return `<a href="detail.html?id=${movie.id}&type=${movie.media_type}&name=${movieURL.replace(/%20/g, "+")}">
  <div
    class="movie-card"
    data-bs-toggle="modal"
    data-bs-target="#movieDetailModal"
  >
    <div class="movie-poster"> 
      <img src="${poster}" alt="" />
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
  //Digunakan Nanti
  let dateMovie = detail.release_date || detail.first_air_date;
  let nameMovie = detail.title || detail.name;
  let originalMovie = detail.original_title || detail.original_name;
  let genres = "Unknown";
  if (detail.genres && detail.genres.length > 0) {
    genres = detail.genres
      .map(function (g) {
        return g.name;
      })
      .join(", ");
  }

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
