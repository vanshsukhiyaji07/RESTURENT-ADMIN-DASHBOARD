import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <div className="error-code">404</div>
                <h1>Page Not Found</h1>
                <p>The page you're looking for doesn't exist or you don't have permission to access it.</p>
                <Link to="/" className="home-btn">
                    <Home size={20} />
                    <span>Back to Dashboard</span>
                </Link>
            </div>
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
        </div>
    );
};

export default NotFound;
