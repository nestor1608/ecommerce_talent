import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <h2>Page Not Found</h2>
            <p style={{ marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
            <Link to="/" style={{ color: '#667eea', fontWeight: 600 }}>
                Go back home
            </Link>
        </div>
    );
};

export default NotFound;
