function showEpisodes(data, dataSeason) {
  const nfound = `https://static.vecteezy.com/system/resources/thumbnails/004/639/366/small/error-404-not-found-text-design-vector.jpg`;

  bodyList.innerHTML = dataSeason
    .map((n, i) => {
      const isOpen = n.season_number === 1 ? "open" : "";

      const episodeHTML = n.episodes
        .map((e) => {
          const imgEpisode = e.still_path
            ? `https://media.themoviedb.org/t/p/w227_and_h127_face/${e.still_path}`
            : nfound;
          const rating = e.vote_average ? Math.round(e.vote_average * 10) : "-";
          const runtime = e.runtime ? e.runtime : "-";
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

      return `<details class="season" ${isOpen} data-season="${n.season_number}">
            <summary><i class="bi bi-caret-right-square arrow-season"></i>${n.name}</summary>
          ${episodeHTML}</details>`;
    })
    .join("");
}
