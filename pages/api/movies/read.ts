import MovieRepository from 'repositories/MovieRepository';

export default async function handler(req, res) {
    const { id } = req.body;

    if(!id) {
        return res.status(422).json("Missing id parameter").end();
    }

    const movie = await MovieRepository.getMovie(id);
    if(!movie) {
        return res.status(404).json("No movie found with that ID").end();
    }

    return res.status(200).json(movie).end();
}