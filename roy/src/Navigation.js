import React, { useState } from 'react';
import Navbar from './Navbar';

const facultyData = [
  { no: 1, room: '401', name: 'Muhammad Ahmad Mustafa. (AP)', designation: 'AP' },
  { no: 2, room: '402', name: 'Dr. Kashif Bilal', designation: 'Associate P' },
  { no: 3, room: '403A', name: '2 Lecturers (New)', designation: 'Lecturers' },
  { no: 4, room: '403B', name: 'Mr. Sumair Khan (AP) + 1 Lecturer', designation: 'AP + Lecturer' },
  { no: 5, room: '403C', name: 'Dr. Ahmad Saeed Khilji - Mukhtar Zain', designation: 'AP + Lecturer' },
  { no: 6, room: '406', name: '3 Lecturers', designation: '3 Lecturers' },
  { no: 7, room: '407', name: 'Dr. Kashif Nasir - Faizal Jamal - Muhammad Adil Khan - Wajahat Ghuffar Khan', designation: '4 Lecturers' },
  { no: 8, room: '408', name: 'Associate Professor', designation: 'Associate P' },
  { no: 9, room: '409', name: 'Bushra Mushtaq - Ayesha - Ayesha Khalid', designation: '3 Lecturers' },
  { no: 10, room: '410', name: 'Dr. Muhtashim Ahmad', designation: 'AP' },
  { no: 11, room: '411', name: 'HoD Office', designation: 'Associate Proffessor' },
  { no: 12, room: '412', name: 'Mr. Tariq Baloch - AP', designation: 'AP' },
  { no: 13, room: '413', name: 'Ms. Sara Shafique - Ms. Zaib-un-Nisa - Faiza Hamid', designation: '3 Lecturers' },
  { no: 14, room: '414', name: 'Muhammad Ikram Gul', designation: 'Lecturers' },
  { no: 15, room: '415', name: 'Mr. Ahsan Riaz - Aqib Hashim - Habibur Rehman', designation: '2 Lecturers + Assistant' },
  { no: 16, room: '416', name: 'Hafiza Bibi - Qurat ul Ain - Maimoona Firdaus + 1', designation: '4 Lecturers' },
  { no: 17, room: '419A', name: 'Umair Mujtaba - Muhammad Javed Raza', designation: '2 Lecturers' },
  { no: 18, room: '419B', name: 'Muhammad Ali Khan - Yasar Khan', designation: '2 Lecturers' },
  { no: 19, room: '419C', name: 'Dr. Usman Khalid', designation: 'Associate P' },
  { no: 20, room: '420A', name: '2 Lecturers', designation: '2 Lecturers' },
  { no: 21, room: '420B', name: 'Dr. Zia ur Rehman', designation: 'Associate P' },
  { no: 22, room: '420C', name: 'Dr. Waqas Jadoon', designation: 'Associate P' },
  { no: 23, room: '421', name: 'Dr. Rab Nawaz Jadoon', designation: 'AP' },
  { no: 24, room: '422', name: 'Mr. Muhammad Ali Tariq', designation: 'AP' },
];

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = facultyData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="animate-fadeInUp">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>S-BLOCK Navigation</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Faculty Room Directory</p>

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by name, room no. or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '2rem', padding: '1rem', fontSize: '1.1rem' }}
          />

          <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '1rem', color: 'var(--accent-primary)' }}>Room</th>
                  <th style={{ padding: '1rem', color: 'var(--accent-primary)' }}>Name</th>
                  <th style={{ padding: '1rem', color: 'var(--accent-primary)' }}>Designation</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr key={item.no} style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                  }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.room}</td>
                    <td style={{ padding: '1rem' }}>{item.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.designation}</td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No matching results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
