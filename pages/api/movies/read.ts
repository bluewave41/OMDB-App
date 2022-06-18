import MovieRepository from 'repositories/MovieRepository';

export default async function handler(req, res) {
    if(req.method != 'GET') {
        return res.status(405).end();
    }

    //URL parameters are send via req.query while axios requsts fill req.body
    const params = { ...req.query, ...req.body }

    const { id } = params;

    if(!id) {
        return res.status(422).json("Missing id parameter");
    }

    const movie = await MovieRepository.getMovie(id);
    if(!movie) {
        return res.status(404).json("No movie found with that ID");
    }

    return res.status(200).json(movie);
}