import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Transportation from './Transportation';
import FoundItemsPage from './FoundItemsPage';
import Lost from './Lost';
import Profile from './Profile';
import Complaint from './Complaints';
import Notes from './Notes';
import Navigation from './Navigation';

const PlaceholderPage = ({ title }) => (
  <div style={{
    padding: '4rem',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)'
  }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</h1>
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h2>
    <p style={{ fontSize: '1.2rem' }}>This feature is currently under development.</p>
    <a href="/home" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Home</a>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Feature Routes */}
        <Route path="/lost" element={<Lost />} />
        <Route path="/found" element={<FoundItemsPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/complaints" element={<Complaint />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/navigation" element={<Navigation />} />
        
        {/* Additional/Placeholder Routes */}
        <Route path="/uniclicks" element={<PlaceholderPage title="UniClicks Portal" />} />

        {/* Redirects for legacy/removed routes if any */}
        <Route path="/report-lost" element={<Navigate to="/lost" replace />} />
        <Route path="/report-found" element={<Navigate to="/found" replace />} />

        {/* 404 Fallback */}
        <Route path="*" element={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'var(--bg-base)',
            color: 'var(--text-primary)'
          }}>
            <h1 style={{ fontSize: '6rem', margin: 0, background: 'linear-gradient(to right, var(--accent-primary), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
            <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The page you are looking for does not exist.</p>
            <a href="/home" className="btn btn-primary" style={{ marginTop: '2rem', textDecoration: 'none' }}>Return Home</a>
          </div>
        } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;