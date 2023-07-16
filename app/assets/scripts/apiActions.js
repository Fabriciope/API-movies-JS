import { makeErrorMessage } from "./messages.js";

const API_KEY = "api_key=53f0b465d661ac1da90479eaf8520de0";
const BASE_URL = "https://api.themoviedb.org/3";
const URL_SEARCH_MOVIE = BASE_URL + "/search/movie?" + API_KEY + "&query=";
const URL_POPULAR_MOVIES = BASE_URL + "/movie/popular?" + API_KEY;

const loading = document.getElementById("loading");

export class ApiActions {
  async fetchPopularMovies() {
    try {
      const foundMovies = await fetch(URL_POPULAR_MOVIES)
        .then((data) =>
            data.json()
        );

      if (foundMovies.total_results === 0) {
        loading.classList.add("hidden");
        throw new Error(`Not found movie for search: ${search}`);
      }

      return foundMovies.results;
    } catch (error) {
      makeErrorMessage(`Error: ${error.message}`);
      return false;
    }
  }

  async fetchMoviesBySearch(movieSearch) {
    try {
      let search = movieSearch.trim();

      const popularMovies = await fetch(URL_SEARCH_MOVIE + search)
        .then((data) =>
            data.json()
        );

      if (popularMovies.total_results === 0) {
        throw new Error(`Not found popular movies`);
      }

      return popularMovies.results;
    } catch (error) {
      makeErrorMessage(`Error: ${error.message}`);
      return false;
    }
  }

  async findMovieById(movieId) {
    try {
      if (movieId) {
        const url = `${BASE_URL}/movie/${parseInt(movieId)}?${API_KEY}&append_to_response=videos,images`;
        const fetchMovie = await fetch(url);
        const movie = await fetchMovie.json();

        if (movie.success === false) {
          throw new Error("unexpected error");
        }

        return movie;
      }
    } catch (error) {
      makeErrorMessage(`Error: ${error.message}`);
      return false;
    }
  }
}
