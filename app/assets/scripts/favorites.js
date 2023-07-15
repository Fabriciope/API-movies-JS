
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

        console.log(this.all());
        //TODO: exibir mensagem de sucesso;
    }

    all() {
        return JSON.parse(localStorage.getItem('favoritesMovies'));
    }

    clear() {
        localStorage.clear();
    }
}

export default new Favorites;