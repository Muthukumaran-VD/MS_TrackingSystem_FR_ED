// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';  // Import axios for API calls
import './Signup.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Basic validation for email and password
      if (!email || !password) {
        throw new Error('Both fields are required.');
      }

      // Regular expression for email validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        throw new Error('Please enter a valid email.');
      }

      if (password.length < 6) {
        throw new Error('Password should be at least 6 characters.');
      }

      // Prepare user data
      const userData = { email, password };

      // Send POST request to backend to create the user
      const response = await axios.post('http://localhost:8000/users/signup', userData);

      if (response.status === 201) {
        // If user is created successfully
        setSuccess('Sign up successful!');
        setError('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
