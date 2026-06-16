import { getSeason, getDetail, getSeasons } from "../api/tmdb.js";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const season = params.get("season");
const episode = params.get("episode");

window.addEventListener("DOMContentLoaded", async () => {
  await loadEpisode();
  const commentContainer = document.querySelector(".comment-list");
  const inputBox = document.querySelector(".input-box");
  const cancelBtn = document.querySelector(".cancel-button");
  const sendBtn = document.querySelector(".send-button");

  cancelBtn.addEventListener("click", function () {
    inputBox.value = "";
  });
  sendBtn.addEventListener("click", function () {
    const inputBox = document.querySelector(".input-box");

    if (inputBox.value) {
      const userComment = inputBox.value;

      commentContainer.insertAdjacentHTML("beforeend", userComment);
      inputBox.value = "";
    }
  });
});
function showComments(inputComment) {
  return `<div class="comment-card">
              <div class="comment-icon">
                <i class="bi bi-person-circle"></i>
              </div>
              <div class="comment-info">
                <div class="comment-name">Homudoka + 0 days</div>
                <div class="user-input">${inputComment.value}</div>
                <div class="comment-reply">
                  <div class="icon-love">
                    <i class="bi bi-heart"></i> ${many_comments} like
                  </div>

                  <div class="path"><i class="bi bi-flag"></i></div>
                </div>
              </div>
            </div>
            <hr />`;
}
async function loadEpisode() {
  const data = await getSeason(id, season);
  const dataMovie = await getDetail(id, "tv");

  const movieHTML = showStream(data.episodes[episode - 1], data, dataMovie);
  const movieContainer = document.querySelector(".watch-layout");
  movieContainer.innerHTML = movieHTML;
}

function showStream(dataEpisode, dataSeason, dataMovie) {
  const video = `https://image.tmdb.org/t/p/w500/${dataEpisode.still_path}`;
  const title = dataEpisode.name;
  const date = dataEpisode.air_date;
  const age = dataMovie.content_ratings.results[2].rating;
  const poster_season = dataSeason.poster_path;
  const genres = dataMovie.genres
    .map((g) => {
      return `<div class="serial-genre">${g.name}</div>`;
    })
    .join("");

  const episodeCards = dataSeason.episodes
    .map((e) => {
      const poster_episode = `https://image.tmdb.org/t/p/w500/${e.still_path}`;
      const name_episode = e.episode_number;
      const cardURL = `stream.html?id=${e.show_id}&season=${e.season_number}&episode=${e.episode_number}`;

      return `<a href="${cardURL}" class="episode-cards">
            <div class="episode-img">
              <img
                src="${poster_episode}"
                alt=""
              />
            </div>
            <div class="episode-title">
              <h4>Episode ${name_episode}</h4>
            </div>
          </a>`;
    })
    .join("");

  return `<section class="watch-player">
        <div class="video-frame">
          <img
            src="${video}"
            alt=""
          />
        </div>
        <div class="video-detail">
          <div class="video-title">
            <section class="video-name">${title}</section>
            <div class="video-etc">
              <div class="video-age">17+</div>
              <div class="video-year">${date}</div>
              <div class="video-number">Episode ${dataEpisode.episode_number}</div>
            </div>
          </div>
          <div class="serial-detail">
            <h3>Serial Detail</h3>
            <a href="watch.html?id=${id}&season=${season}" class="serial-poster">
              <div class="serial-left">
                <img
                  src="https://media.themoviedb.org/t/p/w300_and_h450_face/${poster_season}"
                  alt=""
                />
              </div>
              <div class="serial-right">
                <div class="serial-name">${dataMovie.name} ${dataSeason.name}</div>
                <div class="serial-etc">
                  <div class="serial-age">${age}</div>
                  <div class="serial-year">${dataSeason.air_date}</div>
                </div>
              </div>
            </a>
            <div class="serial-info">
              <p>
                ${dataEpisode.overview}
              </p>
            </div>
            <div class="genre-list">
              ${genres}
            </div>
          </div>
        </div>
        <div class="video-comment">
          <div class="comment-top">
            <h1>Comment's (0)</h1>
          </div>
          <div class="comment-user">
            <div class="user-icon"><i class="bi bi-person-circle"></i></div>
            <div class="input-comment">
              <input type="text" class="input-box" placeholder="Add comment's" />
              <div class="input-wrapper">
                <button class="cancel-button">Cancel</button>
                <button class="send-button">Send</button>
              </div>
            </div>
          </div>
          <div class="comment-list">
            
          </div>
        </div>
      </section>
      <aside class="episode-panel">
        <div class="episode-list">
          <a href="watch.html?id=${id}&season=${season}" class="all-episode">All Episode</a>
          ${episodeCards}
        </div>
      </aside>`;
}
