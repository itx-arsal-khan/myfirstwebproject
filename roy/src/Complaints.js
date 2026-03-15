import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { motion, AnimatePresence } from "framer-motion";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    category: "",
    title: "",
    description: "",
    priority: "Medium",
  });
  const [filter, setFilter] = useState("All");

  const categories = ["Facilities", "Food", "Transport", "Security", "Academic", "Other"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Pending", "In Progress", "Resolved"];

  useEffect(() => {
    // Initial sample data if empty
    const saved = JSON.parse(localStorage.getItem('complaints')) || [
      {
        id: 1,
        category: "Facilities",
        title: "Broken chairs in Lecture Hall 3",
        description: "Several chairs in the back row are broken and need repair.",
        priority: "High",
        status: "Pending",
        date: "2023-05-15"
      },
       {
        id: 2,
        category: "Food",
        title: "Unhygienic cafeteria conditions",
        description: "The food serving area needs better cleaning standards.",
        priority: "Medium",
        status: "In Progress",
        date: "2023-05-10"
      }
    ];
    setComplaints(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const complaint = {
      id: Date.now(),
      ...newComplaint,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [complaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    setNewComplaint({ category: "", title: "", description: "", priority: "Medium" });
    setFormVisible(false);
  };

  const filtered = filter === "All" ? complaints : complaints.filter((c) => c.status === filter);

  const getPriorityColor = (p) => {
    switch(p) {
      case 'Critical': return 'var(--error)';
      case 'High': return 'var(--warning)';
      case 'Medium': return 'var(--info)';
      default: return 'var(--success)';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="animate-fadeInUp">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Campus Complaints</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Report issues and track their resolution</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <select
                  className="form-control"
                  style={{ width: 'auto' }}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

              <button 
                className="btn btn-primary"
                onClick={() => setFormVisible(!formVisible)}
              >
                {formVisible ? 'Cancel' : '+ New Complaint'}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {formVisible && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card"
                style={{ padding: '2rem', marginBottom: '2rem', overflow: 'hidden' }}
              >
                <h3 style={{ marginBottom: '1.5rem' }}>Submit a Complaint</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select 
                        className="form-control"
                        value={newComplaint.category}
                        onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Priority</label>
                      <select 
                        className="form-control"
                        value={newComplaint.priority}
                        onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value})}
                      >
                        {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Title</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={newComplaint.title}
                        onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Description</label>
                      <textarea 
                        className="form-control"
                        rows="4"
                        value={newComplaint.description}
                        onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                    <button type="submit" className="btn btn-primary">Submit Complaint</button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid-cards">
            {filtered.map((complaint) => (
              <motion.div 
                key={complaint.id}
                layout
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="glass-card" 
                style={{ padding: '1.5rem', borderLeft: `4px solid ${getPriorityColor(complaint.priority)}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-info">{complaint.category}</span>
                  <span className="badge" style={{ 
                    background: complaint.status === 'Resolved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
                    color: complaint.status === 'Resolved' ? 'var(--success)' : 'var(--text-secondary)'
                  }}>
                    {complaint.status}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{complaint.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', minHeight: '60px' }}>
                  {complaint.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span>📅 {complaint.date}</span>
                  <span style={{ color: getPriorityColor(complaint.priority) }}>● {complaint.priority} Priority</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
