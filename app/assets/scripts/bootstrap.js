import { app } from './App.js';

const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');
const btnSeeFavoritesMovies = document.getElementById('seeFavoritesMovies');

app.showPopularMovies();

document.forms[0].addEventListener('submit', (event) => {
    event.preventDefault();

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
    btnSeeFavoritesMovies.innerHTML = "My favorites movies";
    app.showFavoritesMovies();
};




