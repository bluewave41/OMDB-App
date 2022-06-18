import LikeModel from 'models/LikeModel';

async function getLike(ip: number, movieId: number) {
    return await LikeModel.query()
        .findOne('ip', ip)
        .findOne('movieId', movieId);
}

async function likeMovie(like: LikeModel) {
    const fetchedLike = await getLike(like.ip, like.movieId);
    if(fetchedLike) {
        return await updateLike(like);
    }
    else {
        return await createLike(like);
    }
}

async function createLike(like: LikeModel) {
    return await LikeModel.query()
        .insert(like);
}

async function updateLike(like: LikeModel) {
    return await LikeModel.query()
        .patch({ liked: like.liked })
        .where('ip', like.ip)
        .where('movieId', like.movieId);
}

function fromObject(likeObject: object, ip: number, liked: boolean) {
    return LikeModel.fromJson({
        ...likeObject,
        ip,
        liked
    });
}

export default { likeMovie, getLike, updateLike, fromObject }