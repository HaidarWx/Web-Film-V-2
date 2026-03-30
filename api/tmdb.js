export const API_KEY = "1c353dc1b6d94ce88642f8d6b57fa0b7";
export const BASE_URL = "https://api.themoviedb.org/3";
import { heroSlider, initSlider } from "../js/initSlider.js";
import { updateSwiper } from "../js/latihan2.js";

/* Card di home */
export async function getTrendingDays() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data movie popular!");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getTrendingWeeks() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data movie popular!");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}
export async function getTrendingPopular() {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error("Gagal mengambil data movie popular!");
    }
    const data = await response.json();
    /*  const movies = data.results.map((movie) => ({
      ...movie,
      media_type: "tv",
    }));
    console.log(movies); */
    return data;
  } catch (err) {
    throw err;
  }
}
export async function getTrendingTopRated() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data movie popular!");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}
/* Card di home */
export async function getMovies(inputKeyword) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${inputKeyword}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }

    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    throw error;
  }
}
export async function getModal(movie_id, movie_type) {
  try {
    const response = await fetch(
      `${BASE_URL}/${movie_type}/${movie_id}?api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data!");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function getPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}`, //Hero-Swiper
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data movie popular!");
    }
    const data = await response.json();
    console.log(data);
    updateSwiper(data.results);
  } catch (err) {
    throw err;
  }
}
export async function loadAllGenres() {
  // Library Genre
  try {
    const [movieRes, tvRes] = await Promise.all([
      fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
    ]);

    if (!movieRes.ok || !tvRes.ok) {
      throw new Error("Gagal mengambil data");
    }
    const movieData = await movieRes.json();
    const tvData = await tvRes.json();
    return [...movieData.genres, ...tvData.genres];
  } catch (error) {
    throw error;
  }
}
