import handler from 'pages/api/movies/like';
import httpMocks from 'node-mocks-http';
import LikesRepository from 'repositories/LikesRepository';
import sinon from 'sinon';

const ipObject = {
    socket: {
        remoteAddress: '192.168.0.1'
    }
}

const longIpObject = {
    socket: {
        remoteAddress: '192.168.100.152'
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
        movieId: 1,
    }
    const req = httpMocks.createRequest({ ...ipObject, method: 'POST', body: { ...like }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(422);
})

test('it should return 204 if valid data passed', async () => {
    const like = {
        movieId: 1,
        liked: true
    }
    const req = httpMocks.createRequest({ ...ipObject, method: 'POST', body: { ...like }});
    const res = httpMocks.createResponse();
    sinon.stub(LikesRepository, 'likeMovie').returns(null);

    await handler(req, res);
    expect(res.statusCode).toBe(204);
})

test('it should return 204 if IP is large', async () => {
    const like = {
        movieId: 1,
        liked: true
    }
    const req = httpMocks.createRequest({ ...longIpObject, method: 'POST', body: { ...like }});
    const res = httpMocks.createResponse();
    sinon.stub(LikesRepository, 'likeMovie').returns(null);

    await handler(req, res);
    expect(res.statusCode).toBe(204);
})