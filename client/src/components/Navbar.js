import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link to={isLoggedIn ? '/dashboard' : '/'} className="navbar-brand fw-bold fs-4 text-primary">
        🧑‍⚕️TeleHealth🩺
      </Link>

      <div className="ms-auto">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="btn btn-outline-primary me-2">
              Dashboard
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
