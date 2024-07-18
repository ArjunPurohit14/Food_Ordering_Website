import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file
import ParticlesBackground from '../ParticlesBackground';

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/creatuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors[0].msg || 'Failed to create user');
            }

            console.log('User created successfully');
            setError(null);
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Error creating user:', error.message);
            setError(error.message || 'Failed to create user. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <ParticlesBackground /> {/* Render the ParticlesBackground component */}
            <div className="login-card">
                <h2 className="text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputName1">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            placeholder="Enter your full name"
                            name="name"
                            value={credentials.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter your email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                        />
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
                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
