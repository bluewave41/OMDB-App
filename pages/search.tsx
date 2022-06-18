import axios from 'axios';
import { useState } from 'react';
import Movie from 'components/Movie';

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');

    const onChange = (e) => {
        setTitle(e.target.value);
    }

    const onLike = async (movieId) => {
        let response;

        try {
            response = await axios.post('/api/movies/like', { movieId });
        }
        catch(e) {

        }
    }

    const onDislike = async (movieId) => {
        let response;

        try {
            response = await axios.post('/api/movies/dislike', { movieId });
        }
        catch(e) {

        }
    }

    const onSubmit = async () => {
        let response;

        try {
            response = await axios.post('/api/movies/search', { title });
            setMovies(response.data);
        }
        catch(e) {

        }
    }

    const onCreate = async () => {
        let response;

        const movie = {
            id: 1,
            title: 'test',
            description: 'test',
            releaseYear: 1995,
            duration: 500,
            rating: 9.7
        }

        try {
            response = await axios.post('/api/movies/create', { ...movie })
        }
        catch(e) {

        }
    }

    return (
        <div>
            <h1>Search</h1>
            <input type="text" onChange={onChange}></input>
            <button onClick={onSubmit}>Submit</button>
            <button onClick={onCreate}>Create new movie</button>

            {movies.map(el => (
                <Movie {...el} onLike={onLike} onDislike={onDislike} />
            ))}
        </div>
    )
}

export default Search;