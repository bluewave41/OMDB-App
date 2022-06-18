import handler from 'pages/api/movies/update';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import MovieRepository from 'repositories/MovieRepository';

test("it should fail for non PUT requests", async () => {
    const req = httpMocks.createRequest({ method: 'POST' });
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(405);
})

test("it should fail if given object doesn't match schema", async () => {
    const req = httpMocks.createRequest({ method: 'PUT' });
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(422);
})

test("it should fail if given object partially match schema", async () => {
    const movie = {
        id: 1,
        title: 'Hello World',
        description: 'A riveting tale of a programmers first adventure into finding a career',
    }

    const req = httpMocks.createRequest({ method: 'PUT', body: {...movie}});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(422);
})

test("it should return an updated movie if it matches the schema", async () => {
    const movie = {
        id: 1,
        title: 'Hello World',
        description: 'A riveting tale of a programmers first adventure into finding a career',
        releaseYear: 2022,
        duration: 50,
        rating: 9.9
    }

    sinon.stub(MovieRepository, 'updateMovie').returns(movie);
    const req = httpMocks.createRequest({ method: 'PUT', body: {...movie}});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(200);
})