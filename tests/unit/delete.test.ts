import handler from 'pages/api/movies/delete';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import MovieRepository from 'repositories/MovieRepository';

afterEach(() => {
    sinon.restore();
})

test('it should fail for non DELETE requests', async () => {
    const req = httpMocks.createRequest({ method: 'POST' });
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(405);
})

test("it return 404 if the id doesn't exist", async () => {
    const req = httpMocks.createRequest({ method: 'DELETE', body: { id: 1} });
    const res = httpMocks.createResponse();
    sinon.stub(MovieRepository, 'deleteMovie').returns(0);

    await handler(req, res);
    expect(res.statusCode).toBe(404);
})

test('it should fail if id parameter missing', async () => {
    const req = httpMocks.createRequest({ method: 'DELETE' });
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(422);
})

test('it should return 204 if a valid id is provided', async () => {
    sinon.stub(MovieRepository, 'deleteMovie').returns(true);
    const req = httpMocks.createRequest({ method: 'DELETE', body: { id: 1 }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(204);
})