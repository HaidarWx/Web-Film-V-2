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
  showEpisodes(dataSeason.episodes);
  console.log(dataSeason);
  console.log(dataDetail);
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
                <span>(${date ? date.slice(0, 4) : "-"})</span>
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

function showEpisodes(data) {
  const container = document.querySelector(".episode-container");
  const nfound = `https://static.vecteezy.com/system/resources/thumbnails/004/639/366/small/error-404-not-found-text-design-vector.jpg`;

  container.innerHTML = data
    .map((e) => {
      const isOpen = e.season_number === 1 ? "open" : "";
      const rating = e.vote_average ? Math.round(e.vote_average * 10) : "-";
      const runtime = e.runtime ? e.runtime : "-";
      const imgEpisode = e.still_path
        ? `https://media.themoviedb.org/t/p/w227_and_h127_face/${e.still_path}`
        : nfound;
      return `<a href="watch.html?id=${e.show_id}&season=${e.season_number}&episode=${e.episode_number}" class="episode-card">
              <div class="episode-card-left">
                <img
                  src="${imgEpisode}"
                  alt=""
                />
              </div>
              <div class="episode-card-right">
                <div class="title-episode">
                  <div class="title-wrapper">
                    <span class="episode-number">${e.episode_number}</span>
                    <div class="title-box">
                      <div class="episode-title">
                        ${e.name}
                      </div>
                      <div class="more-info">
                        <div class="rating">★ ${rating}%</div>
                        <div class="date">${e.air_date}</div>
                        <div class="runtime">• ${runtime}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="overview">
                  <p>
                    ${e.overview}
                  </p>
                </div>
              </div>
            </a>`;
    })
    .join("");
}
