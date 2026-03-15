import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar animate-fadeIn">
      <Link to="/home" className="navbar-brand">
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
          borderRadius: '8px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          C
        </div>
        CUI CONNECT
      </Link>

      <div className="nav-links">
        <Link to="/home" className={`nav-link ${isActive('/home')}`}>Home</Link>
        <Link to="/lost" className={`nav-link ${isActive('/lost')}`}>Lost Items</Link>
        <Link to="/found" className={`nav-link ${isActive('/found')}`}>Found Items</Link>
        <Link to="/notes" className={`nav-link ${isActive('/notes')}`}>Notes</Link>
        <Link to="/transportation" className={`nav-link ${isActive('/transportation')}`}>Transport</Link>
      </div>

      <div className="nav-actions">
        <ThemeToggle />
        {user.email ? (
          <>
            <Link to="/profile">
              <div 
                title={user.firstName}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
              </div>
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
