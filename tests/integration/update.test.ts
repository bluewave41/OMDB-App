import handler from 'pages/api/movies/update';
import httpMocks from 'node-mocks-http';
import MovieRepository from 'repositories/MovieRepository';
import knex from 'lib/Database';

test("it should return 404 if the id doesn't exist", async () => {
    await knex.seed.run();
    const movie = {
        id: 999,
        title: 'Hello New World',
        description: 'A riveting tale of a programmers first adventure into finding a career',
        releaseYear: 2022,
        duration: 50,
        rating: 9.9
    }
    const req = httpMocks.createRequest({ method: 'PUT', body: { ...movie }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(404);
})

test("it should return an updated movie if it matches the schema", async () => {
    await knex.seed.run();
    const movie = {
        id: 1,
        title: 'Hello New World',
        description: 'A riveting tale of a programmers first adventure into finding a career',
        releaseYear: 2022,
        duration: 50,
        rating: 9.9
    }

    const req = httpMocks.createRequest({ method: 'PUT', body: {...movie}});
    const res = httpMocks.createResponse();

    const responseMovie = JSON.parse((await handler(req, res))._getData());

    expect(res.statusCode).toBe(200);
    expect(responseMovie).toBeTruthy();
    expect(responseMovie.title).toBe('Hello New World');

    const fetchedMovie = await MovieRepository.getMovie(1);
    expect(fetchedMovie).toBeTruthy();
    expect(fetchedMovie.title).toBe('Hello New World');
})