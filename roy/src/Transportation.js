import React from 'react';
import Navbar from './Navbar';

function Transportation() {
  const faresData = [
    { place: "Haripur", type: "Pick and Drop", fare: 22000 },
    { place: "Mansehra", type: "Drop", fare: 33000 },
    { place: "Havelian", type: "Pick and Drop", fare: 12500 },
    { place: "Haripur (Dhamtour)", type: "Pick and Drop", fare: 66000 },
    { place: "Mansehra (Dhamtour)", type: "Pick and Drop", fare: 55000 },
    { place: "Havelian (Dhamtour)", type: "Pick and Drop", fare: 47000 },
    { place: "CUI Main Campus to Dhamtour", type: "Pick and Drop", fare: 22000 }
  ];

  const routesData = [
    {
      route: "Main Road Route",
      stops: ["Bismillah Hotel", "Missile Chowk", "Jabb pul/Jhangi", "Radio Station", "Qureshi Pump", "Supply", "CMH", "Murree Chowk"],
      arrival: "8:55 am",
      departures: ["2:15 pm", "4:00 pm", "5:15 pm", "6:45 pm"]
    },
    {
      route: "PMA Road Route",
      stops: ["PMA Road", "Lady Garden", "Gami Adda", "Fawara Chowk", "Murree Road", "Dhobi Ghat Chowk", "Kala Pul"],
      arrival: "8:50 am",
      departures: ["2:15 pm", "3:45 pm", "5:15 pm"]
    },
    {
      route: "Nawan Shehr Route",
      stops: ["Javaid Shaheed Rd", "Tameer e Wattan Chowk", "Commerce College", "PMA Bypass", "Bilal Town", "Thanda Choha", "Dairy Chowk", "Illiyasi Masjid", "Lakhpati Chowk", "Jinnah Hospital", "Gharipanna Chowk"],
      arrival: "8:50 am",
      departures: ["2:15 pm", "3:45 pm", "5:15 pm"]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="animate-fadeInUp">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Transportation</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Spring 2025 Semester Schedules & Fares</p>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Fares Section */}
            <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Bus Fares</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '1rem', color: 'var(--accent-primary)' }}>Place</th>
                    <th style={{ padding: '1rem', color: 'var(--accent-primary)' }}>Service</th>
                    <th style={{ padding: '1rem', color: 'var(--accent-primary)' }}>Fare (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {faresData.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }}>{item.place}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.type}</td>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.fare.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Routes Section */}
            <h3 style={{ marginTop: '1rem' }}>Bus Routes & Timings</h3>
            <div className="grid-cards">
              {routesData.map((route, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🚌</span>
                    <h4 style={{ margin: 0 }}>{route.route}</h4>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Arrival</span>
                      <span style={{ fontWeight: 'bold' }}>{route.arrival}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Departure</span>
                       <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{route.departures.join(', ')}</span>
                    </div>
                  </div>

                  <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Stops:</p>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {route.stops.map((stop, i) => (
                      <li key={i}>{stop}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transportation;
