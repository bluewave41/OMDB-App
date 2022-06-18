import MovieModel from 'models/MovieModel';

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
        .patchAndFetch(movie);
}

async function deleteMovie(id: number) {
    await MovieModel.query().delete()
        .where('movieId', id);
}

function fromObject(movieObject: object) {
    return MovieModel.fromJson(movieObject);
}

export default { createMovie, getMovie, updateMovie, deleteMovie, fromObject }