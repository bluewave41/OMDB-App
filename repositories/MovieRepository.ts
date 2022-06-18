import MovieModel from 'models/MovieModel';

async function createMovie(movie: MovieModel) {
    return await MovieModel.query()
        .insert(movie);
}

async function deleteMovie(id: number) {
    await MovieModel.query().delete()
        .where('movieId', id);
}

async function getMovie(id: number) {
    return await MovieModel.query()
        .findOne('id', id);
}

function fromObject(movieObject: object) {
    return MovieModel.fromJson(movieObject);
}

export default { createMovie, deleteMovie, getMovie, fromObject }