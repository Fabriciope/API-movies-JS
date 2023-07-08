import { apiActions } from './apiActions.js';

const inputSearch = document.getElementById('search');
const loading = document.getElementById('loading');
const textAlert = document.getElementById('alert');

const ERROR_MESSAGE_TYPE = 'ERROR';
const SUCCESS_MESSAGE_TYPE = 'SUCCESS';


document.forms[0].addEventListener('submit', (event) => {
    event.preventDefault();

    textAlert.textContent = '';
    loading.classList.remove('hidden');
    let movieSearch = String(inputSearch.value);

    if(movieSearch == '') {  
        makeMessage('Digite algo para sua pesquisa', ERROR_MESSAGE_TYPE);
        loading.classList.add('hidden');
        return;
    }

    apiActions.fetchMovie(movieSearch);
});
