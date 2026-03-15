// Placeholder for Recent Activity feature
import React from 'react';

const RecentActivity = () => {
    return (
        <div className="glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <h3>Recent Activity</h3>
            <div style={{ color: 'var(--text-secondary)', padding: '1rem 0' }}>
                <p>• User123 reported a lost ID card (2 mins ago)</p>
                <p>• Admin posted new transport schedule (1 hour ago)</p>
                <p>• 5 new notes added to CS Dept (3 hours ago)</p>
            </div>
        </div>
    );
};

export default RecentActivity;
