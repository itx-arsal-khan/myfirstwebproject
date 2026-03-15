import React, { useEffect, useState } from "react";
import Navbar from './Navbar';

const FoundItemsPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [claimingItem, setClaimingItem] = useState(null);
  const [claimForm, setClaimForm] = useState({
    date: "",
    location: "",
    title: "",
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedLost = JSON.parse(localStorage.getItem("lostItems")) || [];
    setLostItems(storedLost);
  }, []);

  const handleClaim = (item) => {
    setClaimingItem(item);
    setClaimForm({ date: "", location: "", title: "" });
    setResult(null);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const matched =
      claimingItem.date === claimForm.date &&
      claimingItem.location.toLowerCase().includes(claimForm.location.toLowerCase()) &&
      claimingItem.title.toLowerCase().includes(claimForm.title.toLowerCase());

    setResult(
      matched
        ? { success: true, message: "✅ Verification Successful! Please proceed to Admin Office to collect." }
        : { success: false, message: "❌ Verification failed. Details do not match our records." }
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Found Items Claim</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          If you have lost an item, browse the list below. To claim an item, verify ownership by providing correct details.
        </p>

        <div className="grid-cards">
          {lostItems.map((item) => (
            <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span className="badge badge-info">FOUND ITEM CANDIDATE</span>
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Reported by: {item.userEmail || 'Anonymous'}
              </p>
              
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%' }}
                  onClick={() => handleClaim(item)}
                >
                  Apply to Claim
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Claim Modal */}
        {claimingItem && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
          }}>
            <div className="glass-card animate-fadeInUp" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3>Verify Ownership</h3>
                <button 
                  onClick={() => setClaimingItem(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>

              <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                To prevent theft, please enter the exact details of when and where you lost the item '{claimingItem.title}'.
              </p>

              <form onSubmit={handleVerify}>
                <div className="form-group">
                  <label className="form-label">Date Lost</label>
                  <input
                    type="date"
                    className="form-control"
                    value={claimForm.date}
                    onChange={(e) => setClaimForm({ ...claimForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={claimForm.location}
                    onChange={(e) => setClaimForm({ ...claimForm, location: e.target.value })}
                    placeholder="e.g. Library"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Item Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={claimForm.title}
                    onChange={(e) => setClaimForm({ ...claimForm, title: e.target.value })}
                    placeholder="e.g. Blue Backpack"
                    required
                  />
                </div>

                {result && (
                  <div className={`alert ${result.success ? 'alert-success' : 'alert-error'}`} style={{ marginTop: '1rem' }}>
                    {result.message}
                  </div>
                )}

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setClaimingItem(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Verify</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItemsPage;
