import { app } from './app.js';

const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');
const textAlert = document.getElementById('alert');
const btnSeeFavoritesMovies = document.getElementById('seeFavoritesMovies');


//TODO: revisar projeto;

document.forms[0].addEventListener('submit', (event) => {
    event.preventDefault();

    textAlert.textContent = '';
    loading.classList.remove('hidden');
    let movieSearch = String(inputSearch.value);

    if(movieSearch == '') {  
        makeErrorMessage('Digite algo para sua pesquisa');
        loading.classList.add('hidden');
        return;
    }

    app.searchMovie(movieSearch);
});

btnSeeFavoritesMovies.onclick = () => {
    app.showFavoritesMovies();
};


