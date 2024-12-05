import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/teachSign.css';

const TeachSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const role = "teacher";  // Simulate a successful login
    if (onLogin) {
      onLogin(role);
      setMessage('Login successful!');
    } else {
      console.error('onLogin function is not provided');
    }
  };

  useEffect(() => {
    if (message === 'Login successful!') {
      navigate('/Teacher');  // Redirect to teacher home page
    }
  }, [message, navigate]);

  return (
    <div className="TeachSign-con">
      <form onSubmit={handleSubmit} className="form">
        <h2>Teacher Signup</h2>
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
        <button type="submit" className="sub-B-T">Signup</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default TeachSign;
