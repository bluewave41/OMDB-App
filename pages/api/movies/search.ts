import MovieRepository from 'repositories/MovieRepository';

export default async function handler(req, res) {
    const title = req.body.title?.toLowerCase();

    if(!title) {
        return res.status(422).json("Missing title parameter");
    }

    const movies = await MovieRepository.getMoviesByTitle(title);

    return res.status(200).json(movies);
}