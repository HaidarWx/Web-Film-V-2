import { getDetail } from "../api/tmdb.js";
window.addEventListener("DOMContentLoaded", async () => {
  loadDetail();
});
const params = new URLSearchParams(window.location.search); //cek URL

const id = params.get("id"); //Ambil id dari URL
const type = params.get("type"); //Ambil id dari URL

const container = document.querySelector("#movie-detail");

async function loadDetail() {
  try {
    const data = await getDetail(id, type); // Fetch data berdasarkan id dan type
    console.log(data);

    container.innerHTML = `<h1>${data.title || data.name}</h1>
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" />
      <p>${data.overview}</p>
      <p>Release: ${data.release_date || data.first_air_date}</p>`;

    document.title = data.title || data.name + " | NokaFilm";
  } catch (err) {
    container.innerHTML = "Data Error";
  }
}
