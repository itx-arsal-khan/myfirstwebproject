import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Assuming the backend is running on port 5000
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel - Branding */}
      <div className="auth-branding">
        <div className="auth-branding-content">
          <h1>CUI CONNECT</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Your all-in-one university companion for seamless campus life.
          </p>
          
          <ul className="feature-list">
            <li className="feature-item">
              <span className="feature-icon">🔍</span>
              <span>lost & found tracking system</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">🚌</span>
              <span>Real-time transportation schedules</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">📚</span>
              <span>Shared study notes & resources</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">📢</span>
              <span>Anonymous complaint portal</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="auth-form-container">
        <div className="glass-card auth-card animate-fadeInUp">
          <div className="auth-header">
            <h3>Welcome Back</h3>
            <p>Sign in to your student account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@cui.edu"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)' }}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
