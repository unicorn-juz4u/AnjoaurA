import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>The link might be broken or the page has moved.</p>
            <Link to="/" className="cta-button">Go Back Home</Link>
        </div>
    );
}