import handler from 'pages/api/movies/create';
import httpMocks from 'node-mocks-http';
import MovieRepository from 'repositories/MovieRepository';

test("it should return a movie if it matches the schema", async () => {
    const movie = {
        id: 1,
        title: 'Hello World',
        description: 'A riveting tale of a programmers first adventure into finding a career',
        releaseYear: 2022,
        duration: 50,
        rating: 9.9
    }

    const req = httpMocks.createRequest({ method: 'POST', body: { ...movie }});
    const res = httpMocks.createResponse();

    const responseMovie = JSON.parse((await handler(req, res))._getData());
    expect(responseMovie).toBeTruthy();
    expect(res.statusCode).toBe(200);

    const fetchedMovie = await MovieRepository.getMovie(responseMovie.id);
    expect(fetchedMovie).toBeTruthy();
})