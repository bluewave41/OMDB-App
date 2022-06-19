import Link from 'next/link';

const Home = (props) => {
    return (
        <div>
            <h1>Landing Page</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link href='/movies'><a href='/movies'>&gt; Movies</a></Link>
                <Link href='/search'><a href='/search'>&gt; Search</a></Link>
            </div>
        </div>
    )
}

export default Home;