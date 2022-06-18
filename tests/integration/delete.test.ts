import handler from 'pages/api/movies/delete';
import httpMocks from 'node-mocks-http';
import knex from 'lib/Database';
import MovieRepository from 'repositories/MovieRepository';

test("it return 404 if the id doesn't exist", async () => {
    const req = httpMocks.createRequest({ method: 'DELETE', body: { id: 999 } });
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(404);
})

test('it should return 204 if a valid id is provided', async () => {
    await knex.seed.run();
    const req = httpMocks.createRequest({ method: 'DELETE', body: { id: 1 }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(204);

    const fetchedMovie = await MovieRepository.getMovie(1);
    expect(fetchedMovie).not.toBeTruthy();
})