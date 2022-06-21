import LikeModel from 'models/LikeModel';
import LikesRepository from 'repositories/LikesRepository';

export default async function handler(req, res) {
    if(req.method != 'POST') {
        return res.status(405).end();
    }

    let like: LikeModel;
    const ip = req.socket.remoteAddress;

    try {
        like = LikesRepository.fromObject(req.body, ip, true);
        await LikesRepository.likeMovie(like);
        return res.status(204).end();
    }
    catch(e) {
        //TODO: better error message?
        return res.status(422).json(e.message);
    }
}