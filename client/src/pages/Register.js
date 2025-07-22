import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert("Registration Successful!");
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name } = decoded;

      const response = await axios.post('http://localhost:5000/api/auth/google-login', {
        email,
        name,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Google login failed');
    }
  };

  return (
    <div className="container-fluid vh-90 d-flex p-0">
      {/* Left Side - Info Section */}
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
        style={{
          background: 'linear-gradient(135deg, #056674, #028090)',
          padding: '40px'
        }}
      >
        <h1 className="fw-bold mb-3">Welcome to <span style={{ color: '#fdfcdc' }}>TeleHealth</span></h1>
        <p className="text-center" style={{ maxWidth: '400px' }}>
          A smarter way to manage your health. Join us to consult certified doctors, get e-prescriptions, and track your health easily.
        </p>
        <img
          src="https://as2.ftcdn.net/jpg/03/66/92/15/1000_F_366921589_KneyA33ktFnNvTc6wTtYXRFZGQSrP8RZ.jpg"
          alt="Healthcare illustration"
          className="img-fluid mt-4"
          style={{ maxHeight: '200px' }}
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
        <div className="card border-0 shadow px-4 py-3" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center text-primary mb-3">Register to Continue</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
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

          {error && (
            <div className="alert alert-danger text-center py-2">{error}</div>
          )}

          <div className="text-center mt-2">
            <span className="text-muted">Already registered? </span>
            <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
