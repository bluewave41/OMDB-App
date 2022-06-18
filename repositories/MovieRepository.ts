import MovieModel from 'models/MovieModel';

async function deleteMovie(id: number) {
    await MovieModel.query().delete()
        .where('movieId', id);
}

async function getMovie(id: number) {
    return await MovieModel.query()
        .findOne('id', id);
}

export default { deleteMovie, getMovie }