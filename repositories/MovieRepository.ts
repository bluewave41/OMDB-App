import MovieModel from 'models/MovieModel';

async function getAllMovies() {
    return await MovieModel.query()
        .select();
}

async function getAllMoviesWithSingleUserLikes(ip: number) {
    const movies = await MovieModel.query()
        .select()
        .withGraphFetched('liked')
        .modifyGraph('liked', builder => {
            builder.select('liked')
                .findOne('ip', ip)
        })

    //not entirely sure how to fix this right now
    movies.forEach(el => el.liked = el.liked?.liked);

    return movies;
}

async function createMovie(movie: MovieModel) {
    return await MovieModel.query()
        .insert(movie);
}

async function getMovie(id: number) {
    return await MovieModel.query()
        .findOne('id', id);
}

async function updateMovie(movie: MovieModel) {
    /*
        The JSON schema is being checked in the route so patch is used here over update as per below
        https://github.com/Vincit/objection.js/issues/965
    */
    return await MovieModel.query()
        .patchAndFetchById(movie.id, movie);
}

async function deleteMovie(id: number) {
    return await MovieModel.query().delete()
        .where('id', id);
}

async function getMoviesByTitle(title: string) {
    return await MovieModel.query()
        .select()
        .where('title', 'ILIKE', `${title}%`)  
}

function fromObject(movieObject: object) {
    return MovieModel.fromJson(movieObject);
}

export default { getAllMovies, createMovie, getMovie, updateMovie, deleteMovie, fromObject, getMoviesByTitle, getAllMoviesWithSingleUserLikes }