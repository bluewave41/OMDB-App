import handler from 'pages/api/movies/read';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import MovieRepository from 'repositories/MovieRepository';

afterEach(() => {
    sinon.restore();
})

test("it should fail if id parameter missing", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(422);
    expect(res._getData() == 'Missing id parameter');
})

test("it should fail if no movie was found for the given id", async () => {
    sinon.stub(MovieRepository, 'getMovie').returns(null);

    const req = httpMocks.createRequest({ body: { id: 1 }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._getData() == 'No movie found with that ID');
})

test('it should return a movie if thye given id is valid', async () => {
    const movie = {
        id: 1,
        title: 'Hello World',
        description: 'A riveting tale of a programmers first adventure into finding a career',
        releaseYear: 2022,
        duration: 50,
        rating: 9.9
    }

    const req = httpMocks.createRequest({ body: { id: 1 }});
    const res = httpMocks.createResponse();

    sinon.stub(MovieRepository, 'getMovie').returns(movie);

    await handler(req, res);

    expect(res.statusCode).toBe(200);

    const fetchedMovie = JSON.parse(res._getData());
    expect(fetchedMovie.title).toBe('Hello World');
})