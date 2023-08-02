import { makeSuccessMessage, makeErrorMessage } from "./messages.js";

class Favorites {
    add(movieId) {

        const favoritesMovies = this.all();
        
        if(!favoritesMovies) {
            localStorage.setItem('favoritesMovies', JSON.stringify([
                movieId
            ]));
            const favoritesMoviesButton = document.getElementById('seeFavoritesMovies');
            favoritesMoviesButton.innerHTML = `
              My favorites movies
              <span class="absolute animate-ping -top-2 -left-2 w-4 h-4 rounded-full bg-sky-900"></span>
              <span class="absolute  -top-2 -left-2 w-4 h-4 rounded-full bg-sky-900"></span>  
            `;
            
            makeSuccessMessage('Movie added to favorites');
            return;
        }
        
        if(favoritesMovies.some( id => id === movieId)) {
            makeErrorMessage('The movie is already in the favorites list');
            return;
        }

        localStorage.setItem('favoritesMovies', JSON.stringify([
            ... favoritesMovies,
            movieId
        ]));

        const favoritesMoviesButton = document.getElementById('seeFavoritesMovies');
        favoritesMoviesButton.innerHTML = `
          My favorites movies
          <span class="absolute animate-ping -top-2 -left-2 w-4 h-4 rounded-full bg-sky-900"></span>
          <span class="absolute  -top-2 -left-2 w-4 h-4 rounded-full bg-sky-900"></span>  
        `;
        
        makeSuccessMessage('Movie added to favorites');
    }
    
    all() {
        const favoritesMovies = JSON.parse(localStorage.getItem('favoritesMovies')) || 0;
        if(favoritesMovies.length > 0) {
            return favoritesMovies;
        }

        return undefined;
    }
    
    clear() {
        localStorage.clear();
        makeSuccessMessage('All movies removed successfully');
    }
    
    remove(movieId) {
        const favoritesMovies = this.all();
        const removalIndex = favoritesMovies.indexOf(movieId.toString());
        favoritesMovies.splice(removalIndex, 1);
        
        localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
        makeSuccessMessage('Successfully removed movie');
    }
}

export default new Favorites;