import { getDetail, BASE_URL, API_KEY } from "../api/tmdb.js";

window.addEventListener("DOMContentLoaded", async () => {
  loadDetail();
});
const params = new URLSearchParams(window.location.search); //cek URL
const bodyInfo = document.querySelector(".info-container");
const id = params.get("id"); //Ambil id dari URL
const type = params.get("type"); //Ambil id dari URL

async function loadDetail() {
  try {
    /* const [tvDetailRes, seasonRes] = Promise.all([
      fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/tv/${tvId}/season/1?api_key=${API_KEY}`),
    ]); */

    const detail = await getDetail(id, type);
    showDetail(detail);

    console.log(detail);
  } catch (err) {
    throw err;
  }
}

function showDetail(data) {
  const title = data.title || data.name;
  const poster = data.poster_path;
  const date = data.last_air_date || data.release_date;
  const original = data.original_name || data.original_title;
  const genre = data.genres.map((i) => i).map((g) => g.name);
  const rating = Math.round(data.vote_average * 10);
  const backdrop = data.belongs_to_collection
    ? data.belongs_to_collection.backdrop_path
    : data.backdrop_path;
  const video =
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Trailer",
    ) ||
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Teaser",
    );

  const youtubeUrl = video
    ? `https://www.youtube.com/watch?v=${video.key}`
    : null;
  console.log(youtubeUrl);
  const bodyCard = `<div class="info-body" style=" background-image: url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop});">
  <div class="container-detail">
        <div id="movie-detail">
          <div class="mov-poster">
            <img
              src="https://media.themoviedb.org/t/p/w300_and_h450_face/${poster}"
              alt="${title}"
            />
          </div>
          <div class="mov-info">
            <div class="mov-top">
              <div class="mov-title">
                <h2>
                  <a href="" class="title">${title}</a>
                </h2>
                <span>(${date.slice(0, 4)})</span>
              </div>
              <div class="original-name">${original}</div>
              <div class="mov-fact">
                <div class="certification">${rating}</div>
                <div class="genres">${genre}</div>
              </div>
            </div>
            <div class="mov-middle">
              <div class="mov-action">
                <a href="" class="mov-bookmark action">
                  <i class="bi bi-bookmark-fill"></i>
                </a>
                <a href="" class="mov-loves action">
                  <i class="bi bi-heart-fill"></i>
                </a>
                <div class="trailer">
                  <a href="" class="mov-play">
                    <i class="bi bi-play-fill"></i>
                    Play Trailer
                  </a>
                </div>
              </div>
            </div>
            <div class="mov-bottom">
              <div class="header-info">
                <h3 dir="auto">Overview</h3>
              </div>
              <div class="overview">
                <p>
                  ${data.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  bodyInfo.innerHTML = bodyCard;
}

/*   try {
    function getEpisode() {
    const data = await getDetail(id, type); // Fetch data berdasarkan id dan type
    console.log(data);

    container.innerHTML = `<h1>${data.title || data.name}</h1>
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" />
      <p>${data.overview}</p>
      <p>Release: ${data.release_date || data.first_air_date}</p>`;

    document.title = `${data.title || data.name} | NokaMovie`; */
