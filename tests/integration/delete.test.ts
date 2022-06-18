import handler from 'pages/api/movies/delete';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import MovieRepository from 'repositories/MovieRepository';

test('it should fail if id parameter missing', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(422);
})

test('it should return 202 is a valid id is provided', async () => {
    sinon.stub(MovieRepository, 'deleteMovie').returns(true);
    const req = httpMocks.createRequest({ body: { id: 1 }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(204);
})