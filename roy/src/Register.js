import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/send-otp', {
        email: formData.email
      });
      const devOtpNote = res.data.otp ? ` Your OTP (dev): ${res.data.otp}` : '';
      setMessage(res.data.message + devOtpNote);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/verify-otp', {
        email: formData.email,
        otp: enteredOtp,
      });

      if (res.data.message === 'OTP verified successfully') {
        setStep(3);
      } else {
        setError('Invalid or expired OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-branding">
        <div className="auth-branding-content">
          <h1>Join CUI CONNECT</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Create your student account to access all campus resources.
          </p>
          <div className="steps-indicator">
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <span className={`badge ${step >= 1 ? 'badge-info' : 'badge-secondary'}`}>1. Account</span>
              <span className={`badge ${step >= 2 ? 'badge-info' : 'badge-secondary'}`}>2. Verify</span>
              <span className={`badge ${step >= 3 ? 'badge-info' : 'badge-secondary'}`}>3. Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-form-container">
        <div className="glass-card auth-card animate-fadeInUp">
          <div className="auth-header">
            <h3>Create Account</h3>
            <p>Step {step} of 3</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@cui.edu"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Sending OTP...' : 'Next Step'}
              </button>
            </form>
          )}

          {step === 2 && (
            <div>
              <div className="form-group">
                <label className="form-label">Enter OTP sent to your email</label>
                <input
                  type="text"
                  className="form-control"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="123456"
                />
              </div>
              <button
                onClick={handleVerifyOtp}
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
              <button
                onClick={() => setStep(1)}
                className="btn btn-ghost"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Back
              </button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleFinalRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  className="form-control"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled style={{ color: 'black' }}>Select Department</option>
                  <option value="Computer Science" style={{ color: 'black' }}>Computer Science</option>
                  <option value="Software Engineering" style={{ color: 'black' }}>Software Engineering</option>
                  <option value="Electrical Engineering" style={{ color: 'black' }}>Electrical Engineering</option>
                  <option value="Management Sciences" style={{ color: 'black' }}>Management Sciences</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </form>
          )}

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
