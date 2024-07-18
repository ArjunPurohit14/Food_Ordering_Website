import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file
import ParticlesBackground from '../ParticlesBackground';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      const { token } = data;
      localStorage.setItem('token', token);
      onLogin();
      navigate('/'); // Redirect to home page upon successful login
    } catch (error) {
      setError(error.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <ParticlesBackground /> {/* Render the ParticlesBackground component */}
      <div className="login-card">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
