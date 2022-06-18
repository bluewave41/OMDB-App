import handler from 'pages/api/movies/read';
import httpMocks from 'node-mocks-http';
import knex from 'lib/Database';

test("it should fail if no movie was found for the given id", async () => {
    const req = httpMocks.createRequest({ method: 'GET', body: { id: 999 }});
    const res = httpMocks.createResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._getData() == 'No movie found with that ID');
})

test('it should return a movie if the given id is valid', async () => {
    await knex.seed.run();
    const req = httpMocks.createRequest({ method: 'GET', body: { id: 1 }});
    const res = httpMocks.createResponse();

    const responseMovie = JSON.parse((await handler(req, res))._getData());
    expect(res.statusCode).toBe(200);
    expect(responseMovie).toBeTruthy();
})