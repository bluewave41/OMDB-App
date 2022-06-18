import MovieRepository from 'repositories/MovieRepository';
import knex from 'lib/Database';

test("it should get multiple movies", async () => {
    await knex.seed.run();
    const movies = await MovieRepository.getAllMovies();
    expect(movies.length).toBeGreaterThan(1);
})

test("it should get a movie", async () => {
    await knex.seed.run();
    const movie = await MovieRepository.getMovie(1);
    expect(movie).toBeTruthy();
})

test("it should return null for a missing movie", async () => {
    await knex.seed.run();
    const movie = await MovieRepository.getMovie(999);
    expect(movie).not.toBeTruthy();
})

test("it should create a valid movie", async () => {
    const movie = {
        title: 'test',
        description: 'test',
        releaseYear: 1995,
        duration: 150,
        rating: 9.7
    }

    const addedMovie = await MovieRepository.createMovie(MovieRepository.fromObject(movie));
    expect(addedMovie).toBeTruthy();

    const fetchedMovie = await MovieRepository.getMovie(addedMovie.id);
    expect(fetchedMovie).toBeTruthy();
})

test("it should update a movie", async () => {
    let movie: any = {
        title: 'test',
        description: 'test',
        releaseYear: 1995,
        duration: 150,
        rating: 9.7
    }

    const addedMovie = await MovieRepository.createMovie(MovieRepository.fromObject(movie));
    expect(addedMovie).toBeTruthy();

    movie.id = addedMovie.id;
    movie.title = 'edited test';

    const updatedMovie = await MovieRepository.updateMovie(movie);
    expect(updatedMovie).toBeTruthy();
    expect(updatedMovie.title).toBe('edited test');

    const fetchedMovie = await MovieRepository.getMovie(movie.id);
    expect(fetchedMovie).toBeTruthy();
    expect(fetchedMovie.title).toBe('edited test');
})

test("it should get movies by title", async () => {
    await knex.seed.run();
    //the should be 2
    let movies = await MovieRepository.getMoviesByTitle('the');
    expect(movies.length).toBe(2);
    //hello should be 2
    movies = await MovieRepository.getMoviesByTitle('hello');
    expect(movies.length).toBe(2);
    //t should be 3
    movies = await MovieRepository.getMoviesByTitle('t');
    expect(movies.length).toBe(3);
})

test("it should delete a movie", async () => {
    await knex.seed.run();
    const movie = await MovieRepository.deleteMovie(1);
    expect(movie).toBe(1);

    const fetchedMovie = await MovieRepository.getMovie(1);
    expect(fetchedMovie).not.toBeTruthy();
})