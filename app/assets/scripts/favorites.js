
class Favorites {
    add(movieId) {

        const favoritesMovies = this.all();
        
        
        if(!favoritesMovies) {
            localStorage.setItem('favoritesMovies', JSON.stringify([
                movieId
            ]));
            return;
        }
        
        if(favoritesMovies.some( id => id === movieId)) {
            //TODO: exibir mensagem;
            console.log('filme já favoritado');
            return;
        }

        localStorage.setItem('favoritesMovies', JSON.stringify([
            ... favoritesMovies,
            movieId
        ]));

        //TODO: exibir mensagem de sucesso;
    }
    
    all() {
        return JSON.parse(localStorage.getItem('favoritesMovies'));
    }
    
    clear() {
        localStorage.clear();
    }
    
    remove(movieId) {
        const favoritesMovies = this.all();
        const removalIndex = favoritesMovies.indexOf(movieId.toString());
        favoritesMovies.splice(removalIndex, 1);
        
        localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
    }
}

export default new Favorites;