import { getSeason, getDetail } from "../api/tmdb.js";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const season = params.get("season");
const episode = params.get("episode");

window.addEventListener("DOMContentLoaded", async () => {
  loadEpisode();
});

async function loadEpisode() {
  const dataSeason = await getSeason(id, season);
  console.log(dataSeason.episodes[episode - 1]);
}

function showStream() {}
