const DebugMovie = (props) => {
    return (
        <div style={{ color: props.liked == null ? 'black' : props.liked ? 'green' : 'red' }}>
            <div>{props.id}</div>
            <div>{props.title}</div>
            <div>{props.description}</div>
            <div>{props.releaseYear}</div>
            <div>{props.duration}</div>
            <div>{props.rating}</div>
            <button onClick={() => props.onLike(props.id)}>Like</button>
            <button onClick={() => props.onDislike(props.id)}>Dislike</button>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
            <button onClick={() => props.onHide(props.id)}>Hide</button>
        </div>
    )
}

export default DebugMovie;