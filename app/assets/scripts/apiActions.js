import makeMessage from './messages.js';
import App from './app.js';

const API_KEY = 'api_key=53f0b465d661ac1da90479eaf8520de0';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL_SEARCH_MOVIE = BASE_URL + '/search/movie?' + API_KEY + '&query=';


const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');
const textAlert = document.getElementById('alert');
const containerFoundMovies = document.getElementById('containerFoundMovies');

const ERROR_MESSAGE_TYPE = 'ERROR';
const SUCCESS_MESSAGE_TYPE = 'SUCCESS';

const app = new App;

class ApiActions {
    async fetchMovie(movieSearch) {
        // OLD API 
        // const fetchPromise = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=302eb14c&s=${search}`);

        try {
            let search = movieSearch.trim();


            const foundMovies = await fetch(URL_SEARCH_MOVIE + search)
                .then(data => data.json());

                console.log(foundMovies);
    
            if(foundMovies.total_results === 0) {
                loading.classList.add('hidden');
                makeMessage(`Nenhum filme encontrado para: ${search}`, ERROR_MESSAGE_TYPE);
                return;
            }

           app.showFoundMovies(foundMovies.results);
        } catch(error) {
            makeMessage(`Erro inesperado. Error: ${error}`,ERROR_MESSAGE_TYPE);
        }
    }

    async findMovieById(movieId) {
        
        const url = `${BASE_URL}/movie/${parseInt(movieId)}?${API_KEY}&&append_to_response=videos,images`;
        const movie = await fetch(url)
        .then(data => data.json());

        console.log(movie);
    }
}

export const apiActions= new ApiActions;