import handler from 'pages/api/movies/dislike';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import LikesRepository from 'repositories/LikesRepository';

const ipObject = {
    socket: {
        remoteAddress: '19216801'
    }
}

afterEach(() => {
    sinon.restore();
})

test('it should fail for non POST requests', async () => {
    const req = httpMocks.createRequest({ method: 'GET' });
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(405);
})

test("it should fail if a malformed like is passed", async () => {
    const like = {
        ip: 19216801,
        movieId: 1,
    }
    const req = httpMocks.createRequest({ ...ipObject, method: 'POST', body: { ...like }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(422);
})

test('it should return 204 if valid data passed', async () => {
    const like = {
        ip: 19216801,
        movieId: 1,
        liked: true
    }
    const req = httpMocks.createRequest({ ...ipObject, method: 'POST', body: { ...like }});
    const res = httpMocks.createResponse();
    sinon.stub(LikesRepository, 'likeMovie').returns(null);

    await handler(req, res);
    expect(res.statusCode).toBe(204);
})