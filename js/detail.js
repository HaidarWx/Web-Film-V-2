import { getModal } from "../api/tmdb.js";
window.addEventListener("DOMContentLoaded", async () => {
  loadDetail();
});
const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const type = params.get("type");

const container = document.querySelector("#movie-detail");

async function loadDetail() {
  try {
    const data = await getModal(id, type);

    container.innerHTML = `<h1>${data.title || data.name}</h1>
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" />
      <p>${data.overview}</p>
      <p>Release: ${data.release_date || data.first_air_date}</p>`;
  } catch (err) {
    container.innerHTML = "Data Error";
  }
}
