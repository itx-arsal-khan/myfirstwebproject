import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const features = [
  { 
    title: "Lost Items", 
    path: "/lost", 
    icon: "🔍", 
    desc: "Report and track lost belongings on campus.",
    color: "var(--warning)"
  },
  { 
    title: "Found Items", 
    path: "/found", 
    icon: "🎯", 
    desc: "Browse found items and reunite them with owners.",
    color: "var(--success)"
  },
  { 
    title: "Study Notes", 
    path: "/notes", 
    icon: "📚", 
    desc: "Share and access study materials and past papers.",
    color: "var(--accent-purple)"
  },
  { 
    title: "Complaints", 
    path: "/complaints", 
    icon: "📢", 
    desc: "Voice your concerns anonymously to administration.",
    color: "var(--error)"
  },
  { 
    title: "Navigation", 
    path: "/navigation", 
    icon: "📍", 
    desc: "Find your way around campus with interactive maps.",
    color: "var(--accent-teal)"
  },
  { 
    title: "Transport", 
    path: "/transportation", 
    icon: "🚌", 
    desc: "Check bus schedules and transport updates.",
    color: "var(--info)"
  },
];

const HomePage = () => {
  const [stats, setStats] = useState({ lost: 120, found: 85, notes: 340, resolved: 92 });

  // Simulate loading stats
  useEffect(() => {
    // In a real app, fetch these from backend
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      
      <main className="container">
        {/* Hero Section */}
        <section className="hero-section animate-fadeIn">
          <h1 className="hero-title">
            Find & Recover <br />
            <span className="text-gradient">With Ease</span>
          </h1>
          <p className="hero-subtitle">
            CUI Connect bridges the gap between students and campus resources. 
            Lost something? Need notes? We've got you covered.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/lost" className="btn btn-primary">Report Lost Item</Link>
            <Link to="/found" className="btn btn-secondary">I Found Something</Link>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="stats-bar animate-fadeInUp delay-100">
          <div className="stat-item">
            <span className="stat-value">{stats.lost}</span>
            <span className="stat-label">Items Lost</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--success)' }}>{stats.found}</span>
            <span className="stat-label">Items Found</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--accent-purple)' }}>{stats.notes}</span>
            <span className="stat-label">Study Notes</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--info)' }}>{stats.resolved}%</span>
            <span className="stat-label">Resolution Rate</span>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-grid">
          {features.map((feature, index) => (
            <Link 
              to={feature.path} 
              key={index} 
              className={`glass-card feature-card animate-fadeInUp`}
              style={{ animationDelay: `${index * 0.1}s`, textDecoration: 'none' }}
            >
              <div className="feature-card-content">
                <div className="feature-icon-wrapper" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p style={{ margin: '1rem 0' }}>{feature.desc}</p>
                <div className="feature-link">
                  Go to {feature.title} <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
