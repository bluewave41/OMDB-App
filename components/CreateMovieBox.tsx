import { useState } from 'react';

const CreateMovieBox = (props) => {
    const [movie, setMovie] = useState({
        id: 1,
        title: '',
        description: '',
        releaseYear: 0,
        duration: 0,
        rating: 0
    });
    
    const onChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.type == 'number' ? parseInt(e.target.value) : e.target.value
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <input type="number" name="id" onChange={onChange} placeholder='ID' />
            <input type="text" name="title" onChange={onChange} placeholder='Title' />
            <input type="text" name="description" onChange={onChange}  placeholder='Description' />
            <input type="number" name="releaseYear" onChange={onChange}  placeholder='Release Year' />
            <input type="number" name="duration" onChange={onChange}  placeholder='Duration' />
            <input type="number" name="rating" onChange={onChange}  placeholder='Rating' />
            <button onClick={() => props.onCreate(movie)}>Create</button>
        </div>
    )
}

export default CreateMovieBox;