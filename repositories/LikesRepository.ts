import LikeModel from 'models/LikeModel';

async function getLike(like: LikeModel) {
    return await LikeModel.query()
        .findById(like.ip);
}

async function likeMovie(like: LikeModel) {
    const fetchedLike = await getLike(like);
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
        .patchAndFetchById(like.ip, like);
}

function fromObject(likeObject: object, ip: number, liked: boolean) {
    return LikeModel.fromJson({
        ...likeObject,
        ip,
        liked
    });
}

export default { likeMovie, fromObject }