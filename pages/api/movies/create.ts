import MovieRepository from 'repositories/MovieRepository';
import MovieModel from 'models/MovieModel';

export default async function handler(req, res) {
    if(req.method != 'POST') {
        return res.status(405).end();
    }

    let movie: MovieModel;

    try {
        movie = MovieRepository.fromObject(req.body);
        movie = await MovieRepository.createMovie(movie);

        return res.status(200).json(movie).end();
    }
    catch(e) {
        //TODO: make better error message?
        return res.status(422).json(e.message);
    }
}