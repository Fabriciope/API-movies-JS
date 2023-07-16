import { ApiActions } from "./ApiActions.js";
import Favorites from "./Favorites.js";

const API_KEY = "api_key=53f0b465d661ac1da90479eaf8520de0";
const BASE_URL = "https://api.themoviedb.org/3";
const URL_SEARCH_MOVIE = BASE_URL + "/search/movie?" + API_KEY + "&query=";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const loading = document.getElementById("loading");

export default class App extends ApiActions {
  showFavoritesMovies() {
    const favoritesMoviesModal = document.createElement("div");
    favoritesMoviesModal.classList.add(
      "fixed",
      "z-40",
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
    favoritesMoviesModal.innerHTML = `
        <div id="contentFavoritesMovies" class="p-7 fixed top-10 left-1/2 -translate-x-1/2 rounded shadow-lg bg-slate-800">
          <i id="closeButton" class="fa-solid fa-xmark absolute top-3 right-3 text-3xl text-slate-950/80 hover:text-red-600 transition duration-200 cursor-pointer"></i>
          <h2 class="mt-3 mb-6 text-zinc-100 text-center text-xl font-normal">My favorites movies</h2>
        </div>
    `;

    const containerFavoritesMovies = favoritesMoviesModal.querySelector("#contentFavoritesMovies");
    containerFavoritesMovies.append(this.createContainerFavoritesMovies());

    const closeButton = favoritesMoviesModal.querySelector("#closeButton");
    closeButton.addEventListener("click", () => {
      favoritesMoviesModal.remove();
    });

    document.body.appendChild(favoritesMoviesModal);
  }

  createContainerFavoritesMovies() {
    const container = document.createElement("div");
    container.classList.add("flex", "flex-col", "gap-3");

    Favorites.all().forEach((movieId) => {
      this.findMovieById(movieId)
        .then((movie) => {
          const { original_title: title, id } = movie;
          let boxMovie = document.createElement("div");
          boxMovie.innerHTML = `
            <div data-movie-id="${id}" id="buttonSeeMore" class="py-2 px-6 flex justify-between items-center gap-x-16 group rounded-md shadow cursor-pointer transition duration-150 bg-slate-700/70 hover:bg-slate-700/95">
              <div class="flex justify-center items-center gap-2">
                <h4 data-movie-id="${id}" class="max-w-[400px] text-zinc-100 font-normal truncate">${title}</h4>
                <i data-movie-id="${id}" class="fa-solid fa-arrow-right text-sm text-sky-500 h-full group-hover:text-sky-400 transition duration-150"></i>
              </div>
              <button class="py-1 px-3 rounded text-red-600 hover:bg-gray-200/10"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          `;

          const removeMovieButton = boxMovie.getElementsByTagName("button")[0];
          removeMovieButton.addEventListener('click', ()=> {
            Favorites.remove(id);
            boxMovie.remove();
          });
          this.addActionToSeeMore(boxMovie, true);
          container.prepend(boxMovie);
        }).catch(error => {
          console.log(error.message);
        });
    });

    return container;
  }

  searchMovie(search) {
    this.fetchMovie(search).then((foundMovies) => {
      if (foundMovies) this.showFoundMovies(foundMovies);
    });
  }

  showFoundMovies(foundMovies) {
    const containerFoundMovies = document.getElementById(
      "containerFoundMovies"
    );
    containerFoundMovies.innerHTML = "";

    foundMovies.forEach((movie) => {
      let boxMovie = this.createBoxMovie(movie);
      containerFoundMovies.appendChild(boxMovie);
      this.addActionToSeeMore(boxMovie);
    });

    loading.classList.add("hidden");
  }

  showMovieInModal(movie, withoutAddFavorites) {
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

    const containerModal = document.createElement("div");
    containerModal.classList.add(
      "fixed",
      "z-40",
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

    let contentModal;
    if (poster_path === null) {
      contentModal = `
      <div class="relative flex justify-between items-center w-[80%] max-w-[1100px] sm:h-[480px] mx-auto rounded-lg shadow-xl overflow-hidden bg-slate-800">
        <i id="closeButton" class="fa-solid fa-xmark absolute top-3 right-3 text-3xl text-slate-950/80 hover:text-red-600 transition duration-200 cursor-pointer"></i>
        <div class="h-full w-[40%] hidden md:block">
            <div class="h-full w-full max-w-[310px] object-cover shadow-xl">Without poster </div>
        </div>
        <div id="containerInfoMovie" class="h-full w-full md:w-[60%]  p-4 flex flex-col justify-between ">
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

        </div>
    </div>
    `;
    } else {
      contentModal = `
        <div class="relative flex justify-between items-center w-[80%] max-w-[1100px] sm:h-[480px] mx-auto rounded-lg shadow-xl overflow-hidden bg-slate-800">
          <i id="closeButton" class="fa-solid fa-xmark absolute top-3 right-3 text-3xl text-slate-950/80 hover:text-red-600 transition duration-200 cursor-pointer"></i>
          <div class="h-full w-[40%] hidden md:block">
              <img class="h-full w-full max-w-[310px] object-cover shadow-xl shadow-gray-900" src="${IMG_URL}${poster_path}" alt="">
          </div>
          <div id="containerInfoMovie" class="h-full w-full md:w-[60%]  p-4 flex flex-col justify-between ">
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
          </div>
      </div>
      `;
    }

    containerModal.innerHTML = contentModal;
    const closeButton = containerModal.querySelector("#closeButton");
    closeButton.addEventListener("click", () => {
      containerModal.remove();
    });

    if(!withoutAddFavorites) {
      const containerInfoMovie = containerModal.querySelector('#containerInfoMovie')
      const button  = document.createElement('button');
      button.id = "addFavorites";
      button.setAttribute('class', "block ml-auto mt-3 px-4 py-2 font-bold shadow-md rounded-md text-zinc-200 bg-sky-600 hover:bg-sky-500 transition duration-150");
      button.dataset.movieId = id;
      button.textContent = 'Add favorites';
      containerInfoMovie.append(button);

      button.onclick = (event) => {
        const movieId = event.target.dataset.movieId;
        Favorites.add(movieId);
      };
    }



    document.body.appendChild(containerModal);
  }

  createBoxMovie(movie) {
    const { id, original_title: title, release_date, poster_path } = movie;
    const year = release_date.substring(0, 4);

    let boxMovie = document.createElement("div");
    boxMovie.classList.add("place-self-stretch");
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
    boxMovie.innerHTML = contentBoxMovie;

    return boxMovie;
  }

  addActionToSeeMore(boxMovie, withoutAddFavorites) {
    let button = boxMovie.querySelector("#buttonSeeMore");
    button.onclick = (event) => {
      const movieId = event.target.dataset.movieId;
      this.findMovieById(movieId)
      .then((movie) => {
        if(movie){
          this.showMovieInModal(movie, withoutAddFavorites)
        }
      }).catch(error => console.log(error.message));
    };
  }
}

export const app = new App();
