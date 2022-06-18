import MovieRepository from 'repositories/MovieRepository';
import DebugMovie from 'components/DebugMovie';
import { useState } from 'react';
import axios from 'axios';
import CreateMovieBox from 'components/CreateMovieBox';

const Movies = (props) => {
    const [movies, setMovies] = useState(props.movies);

    const onCreate = async (movie) => {
        let response;

        try {
            response = await axios.post('/api/movies/create', { ...movie });
            setMovies([...movies, movie]);
        }
        catch (e) { }
    }

    const onDelete = async (movieId) => {
        let response;

        try {
            response = await axios.delete('/api/movies/delete', { data: { id: movieId } });
            setMovies(movies.filter(el => el.id != movieId));
        }
        catch (e) { }
    }

    const onLike = async (movieId) => {
        let response;

        try {
            response = await axios.post('/api/movies/like', { movieId });

            setMovies(prevState => {
                const newState = prevState.map(el => {
                    if (el.id === movieId) {
                        return { ...el, liked: true };
                    }
                    return el;
                });

                return newState;
            });
        }
        catch (e) {}
    }    

const onDislike = async (movieId) => {
    let response;

    try {
        response = await axios.post('/api/movies/dislike', { movieId });

        setMovies(prevState => {
            const newState = prevState.map(el => {
                if (el.id === movieId) {
                    return { ...el, liked: false };
                }
                return el;
            });

            return newState;
        });
    }
    catch (e) {

    }
}

const onHide = async (movieId) => {
    setMovies(movies.filter(el => el.id != movieId));
}

return (
    <div>
        {movies.map(el => (
            <DebugMovie {...el} onDelete={onDelete} onLike={onLike} onDislike={onDislike} onHide={onHide} />
        ))}
        <CreateMovieBox onCreate={onCreate} />
    </div>
)
}

export async function getServerSideProps(context) {
    const movies = await MovieRepository.getAllMoviesWithSingleUserLikes(context.req.socket.remoteAddress.replace(/\D/g, ''));

    return {
        props: {
            //this removes all extra unserializable properties from the objection objects
            movies: JSON.parse(JSON.stringify(movies))
        }
    }
}

export default Movies;