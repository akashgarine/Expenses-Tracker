import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Signup.css'; // Import your custom CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/usersignup', { username, email, password });
      if (response.status === 200) {
        // Redirect to the login page upon successful signup
        window.location.href = '/userlogin';
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setSignupError('Username or email already exists');
      } else {
        setSignupError('An error occurred. Please try again later.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card signup-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">User Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
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
                <button type="submit" className="btn btn-success w-100">Register</button>
                {signupError && <p className="text-danger mt-2">{signupError}</p>}
              </form>
              <p className="text-center mt-3">Already have an account? <Link to="/userlogin">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
