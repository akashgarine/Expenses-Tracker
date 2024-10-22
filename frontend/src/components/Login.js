import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import your custom CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/userlogin', { email, password });
      if (response.status === 200) {
        const userId = response.data; // Extract user ID from the response
        sessionStorage.setItem('userId', userId); // Store user ID in localStorage
        // Redirect to the home page upon successful login

        window.location.href = '/home';
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid email or password');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card login-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                {loginError && <p className="text-danger mt-2">{loginError}</p>}
              </form>
              <p className="text-center mt-3">Not Registered? <Link to="/usersignup">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
