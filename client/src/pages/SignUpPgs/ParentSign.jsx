import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/parentSign.css';

const ParentSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const role = "parent";  // Simulate a successful login
    if (onLogin) {
      onLogin(role);
      setMessage('Login successful!');
    } else {
      console.error('onLogin function is not provided');
    }
  };

  useEffect(() => {
    if (message === 'Login successful!') {
      navigate('/Parent');  // Redirect to parent home page
    }
  }, [message, navigate]);

  return (
    <div className="parentSign-con">
      <form onSubmit={handleSubmit} className="form">
        <h2>Parent Signup</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="sub-b-P">Signup</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ParentSign;
