const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const season = params.get("season");
const episode = params.get("episode");

window.addEventListener("DOMContentLoaded", async () => {
  console.log(id);
  console.log(season);
  console.log(episode);
});
