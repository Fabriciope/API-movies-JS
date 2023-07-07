import makeMessage from './messages.js';

const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');
const textAlert = document.getElementById('alert');
const containerFoundMovies = document.getElementById('containerFoundMovies');

const ERROR_MESSAGE_TYPE = 'text-red-600';
const SUCCESS_MESSAGE_TYPE = 'text-green-600';

class App {

    async fetchMovie(movieSearch) {
        try {
            let search = movieSearch.trim();
            const fetchPromise = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=302eb14c&s=${search}`);
            const foundMovies = await fetchPromise.json();
    
            if(foundMovies.Response !== 'True') {
                loading.classList.add('hidden');
                makeMessage(`Nenhum filme encontrado para: ${search}`);
                return;
            }

            this.showFoundMovies(foundMovies.Search);
        } catch(error) {
            makeMessage(`Erro inesperado. Error: ${error}`,ERROR_MESSAGE_TYPE);
        }
    }

    showFoundMovies(foundMovies) {
        containerFoundMovies.innerHTML = '';
        foundMovies.forEach( movie => {
            containerFoundMovies.appendChild(this.createBoxMovie(movie));
        });

        loading.classList.add('hidden');

        'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg';
    }

    createBoxMovie({ Title, Year, Poster }) {
        // TODO: antes de inserir verificar se tem poster ou não - caso não tenha a api ira retornar Poster "N/A"
        let boxMovie = document.createElement('div');
        boxMovie.classList.add('p-2', 'rounded-md', 'shadow-md', 'bg-slate-800/50');
        let contentBoxMovie = `
            <img class="w-full rounded-lg" src= "${Poster}" alt="">
            <div class="my-3">
                <p class="mb-0.5 pr-2 text-sm font-normal text-zinc-300 text-right">${Year}</p>
                <h3 class="text-md text-center text-zinc-200 font-semibold">${Title}</h3>
            </div>
        `;
        boxMovie.innerHTML = contentBoxMovie;

        return boxMovie;
    }
}

export function searchMovie(event) {
    event.preventDefault();

    textAlert.textContent = '';
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