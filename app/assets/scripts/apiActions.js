import { makeErrorMessage } from './messages.js';

const API_KEY = 'api_key=53f0b465d661ac1da90479eaf8520de0';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL_SEARCH_MOVIE = BASE_URL + '/search/movie?' + API_KEY + '&query=';


const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');
const textAlert = document.getElementById('alert');
const containerFoundMovies = document.getElementById('containerFoundMovies');


//const app = new App;

export class ApiActions {
    async fetchMovie(movieSearch) {
        try {
            let search = movieSearch.trim();

            const foundMovies = await fetch(URL_SEARCH_MOVIE + search)
                .then(data => data.json());
    
            if(foundMovies.total_results === 0) {
                loading.classList.add('hidden');
                throw new Error(`Not found movie for search: ${search}`);
            }

            return foundMovies.results;
        } catch(error) {
            makeErrorMessage(`Error: ${error.message}`);
            return false;
        }
    }

    async findMovieById(movieId) { 
        try {
            if(movieId) {
                const url = `${BASE_URL}/movie/${parseInt(movieId)}?${API_KEY}&append_to_response=videos,images`;
                const fetchMovie = await fetch(url);
                const movie = await fetchMovie.json();
                
                if(movie.success === false) {
                    throw new Error('unexpected error');
                }
    
                return movie;
            }
        } catch (error) {
            makeErrorMessage(`Error: ${error.message}`);
            return false;
        }


    }
}