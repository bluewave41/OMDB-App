import axios from 'axios';
import { useState } from 'react';
import Movie from 'components/Movie';

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');

    const onChange = (e) => {
        setTitle(e.target.value);
    }

    const onSubmit = async () => {
        let response;
        console.log(title);

        try {
            response = await axios.post('/api/movies/search', { title });
            setMovies(response.data);
        }
        catch(e) {

        }
    }

    return (
        <div>
            <h1>Search</h1>
            <input type="text" onChange={onChange}></input>
            <button onClick={onSubmit}>Submit</button>

            {movies.map(el => (
                <Movie {...el} />
            ))}
        </div>
    )
}

export default Search;