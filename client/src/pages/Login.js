import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name } = decoded;

      const res = await axios.post('http://localhost:5000/api/auth/google-login', { email, name });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Google login failed');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email: forgotEmail });
      setForgotMessage(res.data.message || 'Check your email for reset instructions.');
      setTimeout(() => {
        setShowForgot(false);
        setForgotEmail('');
        setForgotMessage('');
      }, 2000);
    } catch (err) {
      setForgotMessage(err.response?.data?.message || 'Error sending reset link.');
    }
  };

  return (
    <div className="container-fluid vh-95 d-flex p-0">
      {/* Left side */}
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
        style={{ background: 'linear-gradient(135deg, #056674, #028090)', padding: '40px' }}
      >
        <h1 className="fw-bold mb-3">Welcome Back to <span style={{ color: '#fdfcdc' }}>TeleHealth</span></h1>
        <p className="text-center" style={{ maxWidth: '400px' }}>
          Consult trusted doctors online, access prescriptions, and manage your appointments — all from the comfort of your home.
        </p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6JDXcdKMWPM3B7ZhO_f2CiDMg0QMFNKb7w&s"
          alt="TeleHealth"
          className="img-fluid mt-4"
          style={{ maxHeight: '200px' }}
        />
      </div>

      {/* Right side */}
      <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
        <div className="card border-0 shadow px-4 py-3" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center text-primary mb-3">Login to Continue</h3>
<br></br>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <small>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>
              </small>
            </div>
<br></br>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="text-center my-2">
            <small className="text-muted">OR</small>
          </div>

          <div className="d-flex justify-content-center mb-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google sign-in failed")}
            />
          </div>

          {error && <div className="alert alert-danger text-center py-2 mt-2">{error}</div>}

          <div className="text-center mt-2">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/register">Register here</Link>
            <br></br>
          </div>
          <br></br>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: '#00000088' }}>
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <form onSubmit={handleForgotSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title text-primary">Reset Your Password</h5>
                  <button type="button" className="btn-close" onClick={() => setShowForgot(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                  {forgotMessage && (
                    <div className="alert alert-info mt-2 py-1 px-2">{forgotMessage}</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Send Reset Link</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForgot(false)}>Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
