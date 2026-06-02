import { getSeason, getDetail } from "../api/tmdb.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const season = params.get("season");
window.addEventListener("DOMContentLoaded", async () => {
  console.log(id);
  console.log(season);
  await loadSeason();
});

async function loadSeason() {
  const dataSeason = await getSeason(id, season);
  const dataDetail = await getDetail(id, "tv");
  showSeason(dataSeason, dataDetail);
  console.log(dataSeason);
}

function showSeason(dataSeason, dataDetail) {
  const container = document.querySelector(".season-container");
  const title = dataDetail.name;
  const seasonNumber = dataSeason.name;
  const poster = dataSeason.poster_path;
  const date = dataSeason.air_date;
  const rating = Math.round(dataSeason.vote_average * 10);
  const backdrop = dataDetail.belongs_to_collection
    ? dataDetail.belongs_to_collection.backdrop_path
    : dataDetail.backdrop_path;
  /* const backdrop = data.belongs_to_collection
    ? data.belongs_to_collection.backdrop_path
    : data.backdrop_path; */
  /* const video =
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Trailer",
    ) ||
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Teaser",
    ); */
  /*   const trailerEmbedUrl = video
    ? `https://www.youtube.com/embed/${video.key}`
    : null; */

  const bodyCard = `<div class="info-body" style="background-image: url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop});">
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
                <h2>
                  <a href="" class="title">${seasonNumber}</a>
                </h2>
                <span>(${date.slice(0, 4)})</span>
              </div>
              <div class="mov-fact">
                <div class="certification">${rating}</div>
              </div>
            </div>
            <div class="mov-bottom">
              <div class="overview">
                <p>
                  ${dataSeason.overview ? dataSeason.overview : dataDetail.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     `;

  container.innerHTML = bodyCard;
}
