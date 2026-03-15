import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Profile = () => {
  const [tab, setTab] = useState('reported');
  const [user, setUser] = useState(null);
  const [reportedItems, setReportedItems] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (savedUser) {
      setUser(savedUser);
      
      const allLostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
      const userReported = allLostItems.filter(item => item.userEmail === savedUser.email);
      setReportedItems(userReported);
    }
  }, []);

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>Access Denied</h3>
          <p>Please log in to view your profile.</p>
          <a href="/login" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="glass-card animate-fadeInUp" style={{ maxWidth: '800px', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
          {/* Header Cover */}
          <div style={{ height: '150px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-purple))' }}></div>
          
          <div style={{ padding: '0 2rem 2rem', marginTop: '-50px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '100px', height: '100px', borderRadius: '50%', 
                background: 'var(--bg-surface)', border: '4px solid var(--bg-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary)'
              }}>
                {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
              </div>
              <div style={{ paddingBottom: '0.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.75rem' }}>{user.firstName} {user.lastName}</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{user.department}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
              <button 
                onClick={() => setTab('reported')}
                style={{ 
                  background: 'none', border: 'none', padding: '1rem 0.5rem', 
                  color: tab === 'reported' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: tab === 'reported' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: 600
                }}
              >
                Reported Items
              </button>
              <button 
                onClick={() => setTab('settings')}
                style={{ 
                  background: 'none', border: 'none', padding: '1rem 0.5rem', 
                  color: tab === 'settings' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: tab === 'settings' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: 600
                }}
              >
                Account Settings
              </button>
            </div>

            {tab === 'reported' && (
              <div className="animate-fadeIn">
                {reportedItems.length > 0 ? (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {reportedItems.map(item => (
                      <div key={item.id} style={{ 
                        background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
                          <span className="badge badge-warning">LOST</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {item.date} • {item.location}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    <p>No items reported yet.</p>
                  </div>
                )}
              </div>
            )}

            {tab === 'settings' && (
               <div className="animate-fadeIn">
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={user.email} disabled />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Student ID</label>
                      <input type="text" className="form-control" value={user.studentId} disabled />
                    </div>
                 </div>
                 <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                   To change your details, please contact the administration.
                 </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
