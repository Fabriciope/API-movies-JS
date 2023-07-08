
const API_KEY = 'api_key=53f0b465d661ac1da90479eaf8520de0';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL_SEARCH_MOVIE = BASE_URL + '/search/movie?' + API_KEY + '&query=';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');
const textAlert = document.getElementById('alert');
const containerFoundMovies = document.getElementById('containerFoundMovies');

const ERROR_MESSAGE_TYPE = 'ERROR';
const SUCCESS_MESSAGE_TYPE = 'SUCCESS';

export default class App {

    showFoundMovies(foundMovies) {
        containerFoundMovies.innerHTML = '';
        foundMovies.forEach( movie => {
            let boxMovie = this.createBoxMovie(movie);
            containerFoundMovies.appendChild(boxMovie);
            this.addActionToSeeMore(boxMovie);
        });

        loading.classList.add('hidden');



        'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg';
    }

    createBoxMovie(movie) {

        let boxMovie = document.createElement('div');
        boxMovie.classList.add('place-self-stretch');
        const {original_title, release_date, poster_path } = movie;
        let contentBoxMovie;
        if(poster_path === null) {
            //TODO: formatar a data antes de exibir;
            contentBoxMovie = `
                <div class="w-full p-2 rounded-md shadow-md bg-slate-800/50">
                    <div class="w-full h-60 rounded-lg bg-slate-500/10">
                        <p class="text-center text-zinc-300 ">Without poster</p>
                    </div>
                    <div class="my-3">
                        <p class="mb-0.5 pr-2 text-sm font-normal text-zinc-300 text-right">${release_date}</p>
                        <h3 class="text-md text-center text-zinc-200 font-semibold">${original_title}</h3>
                    </div>
                    <button class="mt-1 w-full py-1 rounded-md text-md text-zinc-200 font-semibold bg-sky-700 hover:bg-sky-600 transition duration-200 bg-slate-500/10">See more</button>
                </div>
            `;
        } else {
            contentBoxMovie = `
                <div class="p-2 rounded-md shadow-md bg-slate-800/50">
                    <img class="w-full rounded-lg shadow-sm" src= "${IMG_URL}${poster_path}" alt="">
                    <div class="my-3">
                        <p class="mb-0.5 pr-2 text-sm font-normal text-zinc-300 text-right">${release_date}</p>
                        <h3 class="text-md text-center text-zinc-200 font-semibold">${original_title}</h3>
                    </div>
                    <button id="buttonSeeMore" class="mt-1 w-full py-1 rounded-md text-md text-zinc-200 font-semibold bg-sky-700 hover:bg-sky-600 transition duration-200 bg-slate-500/10">See more</button>
                </div>
            `;
        }
        
        
        
        boxMovie.innerHTML = contentBoxMovie;
        console.log(poster_path);
        return boxMovie;
    }

    addActionToSeeMore(boxMovie) {
        let button = boxMovie.querySelector('#buttonSeeMore');
        button.onclick = (event) => {
            console.log(event.target);
        };
    }

}