import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission and make API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Validate email and password
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Make API request using Axios
      const response = await axios.post('', {
        email,
        password,
      });

      // Handle successful response
      console.log(response.data); // You can store token, redirect, etc.
      alert('Login successful!'); // Example alert, replace with actual functionality

    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
