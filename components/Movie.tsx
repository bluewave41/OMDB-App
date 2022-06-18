const Movie = (props) => {
    return (
        <div>
            <p>{props.id}</p>
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{props.releaseYear}</p>
            <p>{props.duration}</p>
            <p>{props.rating}</p>
        </div>
    )
}

export default Movie;