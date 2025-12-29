import { useState } from 'react';
import { useAuth } from '../App';
import { Utensils, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('admin@savoria.com');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Demo login - accept any credentials
        if (email && password) {
            login({
                id: 1,
                name: 'Admin User',
                email: email,
                role: 'Administrator'
            });
        } else {
            setError('Please enter email and password');
        }

        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-brand">
                        <Utensils size={40} />
                        <h1>Savoria</h1>
                        <p>Admin Dashboard</p>
                    </div>
                    <div className="login-features">
                        <div className="feature">
                            <span className="feature-icon">📊</span>
                            <div>
                                <h3>Real-time Analytics</h3>
                                <p>Track your restaurant's performance</p>
                            </div>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">🍽️</span>
                            <div>
                                <h3>Menu Management</h3>
                                <p>Easily update your menu items</p>
                            </div>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">📅</span>
                            <div>
                                <h3>Reservation System</h3>
                                <p>Manage bookings efficiently</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form-container">
                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your admin account</p>
                        </div>

                        {error && (
                            <div className="login-error">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" defaultChecked />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" className="login-btn" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="demo-credentials">
                            <p>Demo Credentials:</p>
                            <span>Email: admin@savoria.com</span>
                            <span>Password: admin123</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
