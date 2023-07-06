import makeMessage from './messages.js';

const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');

const ERROR_MESSAGE_TYPE = 'text-red-600';
const SUCCESS_MESSAGE_TYPE = 'text-green-600';

class App {

    async fetchMovie(movieSearch) {
        try {
            let search = movieSearch.trim();
            const fetchPromise = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=302eb14c&s=${search}`);
            const foundMovies = await fetchPromise.json();
    
            if(foundMovies.Response !== 'True') {
                makeMessage(`Nenhum filme encontrado para: ${search}`);
                return;
            }

            this.showFoundMovies(foundMovies.Search);
        } catch(error) {
            makeMessage(`Erro inesperado. Error: ${error}`,ERROR_MESSAGE_TYPE);
        }
    }

    showFoundMovies(foundMovies) {
        console.log(foundMovies[0].Poster);
        foundMovies.forEach( movie => {
            this.addMovie(movie);
        });
        loading.classList.add('hidden');

        'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg';
    }

    addMovie(movie) {
        console.log(movie);
    }
}



export function searchMovie(event) {
    event.preventDefault();
    loading.classList.remove('hidden');
    let movieSearch = String(inputSearch.value);

    if(movieSearch == '') {  
        makeMessage('Digite algo para sua pesquisa', ERROR_MESSAGE_TYPE);
        loading.classList.add('hidden');
        return;
    }

    const app = new App 
    app.fetchMovie(movieSearch);

};  