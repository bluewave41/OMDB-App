import LikeModel from 'models/LikeModel';
import LikesRepository from 'repositories/LikesRepository';

export default async function handler(req, res) {
    let like: LikeModel;
    const ip = parseInt(req.socket.remoteAddress.replace(/\D/g, ''));

    try {
        like = LikesRepository.fromObject(req.body, ip, true);
        await LikesRepository.likeMovie(like);
        return res.status(204).end();
    }
    catch(e) {
        //TODO: better error message?
        console.log(e);
    }
}