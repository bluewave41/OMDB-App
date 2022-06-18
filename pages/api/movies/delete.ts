import MovieRepository from 'repositories/MovieRepository';

export default async function handler(req, res) {
    if(req.method != 'DELETE') {
        return res.status(405).end();
    }
    
    const { id } = req.body;

    if(!id) {
        return res.status(422).json("Missing id parameter").end();
    }

    await MovieRepository.deleteMovie(id);

    return res.status(204).end();
}