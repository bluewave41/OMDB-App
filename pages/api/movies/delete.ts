import MovieRepository from 'repositories/MovieRepository';

export default async function handler(req, res) {
    const { id } = req.body;

    if(!id) {
        return res.status(422).end();
    }

    await MovieRepository.deleteMovie(id);

    return res.status(204).end();
}