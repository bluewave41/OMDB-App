const Movie = (props) => {
    return (
        <div>
            <div>{props.id}</div>
            <div>{props.title}</div>
            <div>{props.description}</div>
            <div>{props.releaseYear}</div>
            <div>{props.duration}</div>
            <div>{props.rating}</div>
            <button onClick={() => props.onLike(props.id)}>Like</button>
            <button onClick={() => props.onDislike(props.id)}>Like</button>
        </div>
    )
}

export default Movie;