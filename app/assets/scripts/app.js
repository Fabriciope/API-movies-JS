import { ApiActions } from "./apiActions.js";
import Favorites from "./favorites.js";

const API_KEY = "api_key=53f0b465d661ac1da90479eaf8520de0";
const BASE_URL = "https://api.themoviedb.org/3";
const URL_SEARCH_MOVIE = BASE_URL + "/search/movie?" + API_KEY + "&query=";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const inputSearch = document.getElementById("search");
const loading = document.getElementById("loading");
const textAlert = document.getElementById("alert");
const containerFoundMovies = document.getElementById("containerFoundMovies");

export default class App extends ApiActions {
  searchMovie(search) {
    this.fetchMovie(search).then((foundMovies) => {
      if(foundMovies)
       this.showFoundMovies(foundMovies);
    });
  }

  showFoundMovies(foundMovies) {
    containerFoundMovies.innerHTML = "";
    foundMovies.forEach((movie) => {
      let boxMovie = this.createBoxMovie(movie);
      containerFoundMovies.appendChild(boxMovie);
      this.addActionToSeeMore(boxMovie);
    });

    loading.classList.add("hidden");

    ("https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg");
  }

  showMovieInModal(movie) {
    const {
      original_title: title,
      overview,
      release_date,
      vote_average,
      genres,
      poster_path,
      id,
    } = movie;
    const year = release_date.substring(0, 4);
    const movieGenres = genres.reduce((accumulator, currentValue) => {
      return accumulator == ""
        ? currentValue.name
        : `${accumulator}, ${currentValue.name}`;
    }, "");
    const modal = `
      <div class="relative flex justify-between items-center w-[80%] max-w-[1100px] sm:h-[480px] mx-auto rounded-lg shadow-xl overflow-hidden bg-slate-800">
        <i id="closeButton" class="fa-solid fa-xmark absolute top-3 right-3 text-3xl text-slate-950/80 hover:text-red-600 transition duration-200 cursor-pointer"></i>
        <div class="h-full w-[40%] hidden md:block">
            <img class="h-full w-full max-w-[310px] object-cover shadow-xl shadow-gray-900" src="${IMG_URL}${poster_path}" alt="">
        </div>
        <div class="h-full w-full md:w-[60%]  p-4 flex flex-col justify-between ">
            <div>
                <p class="text-left my-3 text-zinc-200">Year: ${year}</p>
                <h3 class="text-zinc-100 font-semibold text-2xl text-center mb-3">${title}</h3>
                <p class="text-zinc-300 font-normal text-center text-sm mb-1">${overview}</p>
                <p class="text-zinc-400 text-sm text-center mt-2">${movieGenres}</p>
                <div class="flex justify-center items-center gap-1 mt-3">
                    <i class="fa-regular fa-star text-yellow-400"></i>
                    <span class="text-zinc-200">${vote_average.toFixed(2)}</span>
                </div>
            </div>

            <button id="addFavorites" data-movie-id="${id}" class="block ml-auto mt-3 px-4 py-2 font-bold shadow-md rounded-md text-zinc-200 bg-sky-600 hover:bg-sky-500 transition duration-150">add favorites</button>
        </div>
    </div>
    `;

    const containerModal = document.createElement("div");
    containerModal.classList.add(
      "fixed",
      "top-0",
      "right-0",
      "w-screen",
      "h-screen",
      "flex",
      "justify-center",
      "items-center",
      "bg-gray-950/70",
      "backdrop-blur-sm"
    );
    //containerModal.setAttribute('id', 'bgModal');
    containerModal.innerHTML = modal;

    //TODO: trocar lógica de lugar
    const closeButton = containerModal.querySelector("#closeButton");
    closeButton.addEventListener("click", (event) => {
      //const bgModal = event.target.closest('#bgModal');
      containerModal.remove();
    });

    //TODO: trocar lógica de lugar
    const addToFavoritesButton = containerModal.querySelector("#addFavorites");
    addToFavoritesButton.onclick = (event) => {
      const movieId = event.target.dataset.movieId;
      Favorites.add(movieId);
    };

    //TODO: pesquisar diferença entre append e appendChild
    document.body.appendChild(containerModal);
  }

  createBoxMovie(movie) {
    const { id, original_title: title, release_date, poster_path } = movie;
    const year = release_date.substring(0, 4);
    let contentBoxMovie;
    if (poster_path === null) {
      contentBoxMovie = `
        <div class="w-full p-2 rounded-md shadow-md bg-slate-800/50">
            <div class="w-full h-60 rounded-lg bg-slate-500/10">
                <p class="text-center text-zinc-300 ">Without poster</p>
            </div>
            <div class="my-3">
                <p class="mb-0.5 pr-2 text-sm font-normal text-zinc-300 text-right">${year}</p>
                <h3 class="text-md text-center text-zinc-200 font-semibold">${title}</h3>
            </div>
            <button data-movie-id="${id}" id="buttonSeeMore" class="mt-1 w-full py-1 rounded-md text-md text-zinc-200 font-semibold bg-sky-700 hover:bg-sky-600 transition duration-200">See more</button>
        </div>
    `;
    } else {
      contentBoxMovie = `
        <div class="p-2 rounded-sm shadow-md bg-slate-800/50">
            <img class="w-full rounded-md shadow-sm" src= "${IMG_URL}${poster_path}" alt="">
            <div class="my-3">
                <p class="mb-0.5 pr-2 text-sm font-normal text-zinc-300 text-right">${year}</p>
                <h3 class="text-md text-center text-zinc-200 font-semibold">${title}</h3>
            </div>
            <button data-movie-id="${id}" id="buttonSeeMore" class="mt-1 w-full py-1 rounded text-md text-zinc-200 font-semibold bg-sky-700 hover:bg-sky-600 transition duration-200">See more</button>
        </div>
    `;
    }

    let boxMovie = document.createElement("div");
    boxMovie.classList.add("place-self-stretch");
    boxMovie.innerHTML = contentBoxMovie;
    return boxMovie;
  }

  addActionToSeeMore(boxMovie) {
    let button = boxMovie.querySelector("#buttonSeeMore");
    button.onclick = (event) => {
      const movieId = event.target.dataset.movieId;
      this.findMovieById(movieId);
    };
  }
}

export const app = new App();
