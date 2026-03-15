import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Notes = () => {
  const [form, setForm] = useState({ subject: '', semester: '', file: null });
  const [notesList, setNotesList] = useState([]);
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notesList')) || [];
    setNotesList(savedNotes);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : form.file;
    setForm((prev) => ({
      ...prev,
      [name]: files ? file : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject || !form.semester || !form.file) {
      alert("Please fill all fields.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newNote = {
        id: Date.now(),
        subject: form.subject,
        semester: form.semester,
        fileName: form.file.name,
        fileInfo: `${(form.file.size / 1024 / 1024).toFixed(2)} MB`,
        date: new Date().toLocaleDateString()
      };
      
      const updatedNotes = [newNote, ...notesList];
      localStorage.setItem('notesList', JSON.stringify(updatedNotes));
      setNotesList(updatedNotes);
      setForm({ subject: '', semester: '', file: null });
      setShowUpload(false);
    };
    reader.readAsDataURL(form.file);
  };

  const filteredNotes = notesList.filter(note =>
    note.subject.toLowerCase().includes(search.toLowerCase()) ||
    note.semester.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="animate-fadeInUp">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Study Notes Repository</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Share and discover academic resources.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowUpload(!showUpload)}>
              {showUpload ? 'Cancel Upload' : 'Upload New Notes'}
            </button>
          </div>

          {showUpload && (
            <div className="glass-card animate-fadeIn" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3>Upload Notes</h3>
              <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Subject Name</label>
                    <input type="text" name="subject" className="form-control" value={form.subject} onChange={handleChange} required placeholder="e.g. Data structures" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Semester</label>
                    <input type="text" name="semester" className="form-control" value={form.semester} onChange={handleChange} required placeholder="e.g. 4th" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">File (PDF/Image)</label>
                    <input type="file" className="form-control" onChange={handleChange} required />
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <button type="submit" className="btn btn-primary">Upload Resource</button>
                </div>
              </form>
            </div>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <input 
              type="text"
              className="form-control"
              placeholder="Search notes by subject or semester..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '1rem', fontSize: '1rem' }}
            />
          </div>

          <div className="grid-cards">
            {filteredNotes.map((note) => (
              <div key={note.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <span className="badge badge-info">{note.semester} Semester</span>
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{note.subject}</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                   📄 {note.fileName} <br/>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Size: {note.fileInfo} • {note.date}</span>
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <button className="btn btn-secondary" style={{ width: '100%' }}>Download / View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
