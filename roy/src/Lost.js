import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Lost = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const userEmail = user?.email;

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    category: '',
    contact: ''
  });

  const [lostItems, setLostItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    setLostItems(savedItems);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert('Please log in to report a lost item.');
      return;
    }

    const newItem = {
      ...form,
      id: Date.now(),
      userEmail,
      status: 'Lost'
    };

    const updatedItems = [newItem, ...lostItems];
    setLostItems(updatedItems);
    localStorage.setItem('lostItems', JSON.stringify(updatedItems));
    setForm({ title: '', description: '', location: '', date: '', category: '', contact: '' });
    setShowForm(false);
  };

  const filteredItems = lostItems
    .filter(item => 
      (filterCategory === 'All' || item.category === filterCategory) &&
      [item.title, item.description, item.location].some(field =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    );

  const categories = ['Electronics', 'Documents', 'Clothing', 'Accessories', 'Others'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="animate-fadeInUp">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Lost Items Registry</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Report lost belongings and help others find theirs.</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel Report' : '+ Report Lost Item'}
            </button>
          </div>

          {showForm && (
            <div className="glass-card animate-fadeIn" style={{ padding: '2rem', marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Details of Lost Item</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Item Title</label>
                    <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required placeholder="e.g. Blue Backpack" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select name="category" className="form-control" value={form.category} onChange={handleChange} required>
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date Lost</label>
                    <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input type="text" name="location" className="form-control" value={form.location} onChange={handleChange} required placeholder="e.g. Library, 2nd Floor" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange} required placeholder="Detailed description..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Info (Phone/Email)</label>
                    <input type="text" name="contact" className="form-control" value={form.contact} onChange={handleChange} required />
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <button type="submit" className="btn btn-primary">Submit Report</button>
                </div>
              </form>
            </div>
          )}

          <div className="animate-fadeInUp delay-100">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search lost items..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: '400px' }}
              />
              <select 
                className="form-control" 
                style={{ width: 'auto' }}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="grid-cards">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      <span className="badge badge-warning">LOST</span>
                    </div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      <span style={{ marginRight: '10px' }}>📅 {item.date}</span>
                      <span>📍 {item.location}</span>
                    </p>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>{item.description}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contact: {item.contact}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '1.2rem' }}>No lost items found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lost;
