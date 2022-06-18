import LikesRepository from 'repositories/LikesRepository';
import knex from 'lib/Database';

it('should create and get a like', async () => {
    await knex.seed.run();

    const like = LikesRepository.fromObject({ movieId: 1 }, 19216801, true);

    await LikesRepository.likeMovie(like);

    const fetchedLike = await LikesRepository.getLike(like.ip, like.movieId);

    expect(fetchedLike).toBeTruthy();
    expect(fetchedLike.liked).toBe(true);
})

it('should update a like if one exists', async () => {
    await knex.seed.run();

    let like = LikesRepository.fromObject({ movieId: 1 }, 19216801, true);

    await LikesRepository.likeMovie(like);

    like.liked = false;

    await LikesRepository.updateLike(like);

    const fetchedLike = await LikesRepository.getLike(like.ip, like.movieId);

    expect(fetchedLike).toBeTruthy();
    expect(fetchedLike.liked).toBe(false);
})