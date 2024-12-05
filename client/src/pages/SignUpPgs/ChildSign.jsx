import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/childSign.css';
import childGP from '../../assets/Images by AJ/GreenPencil.png';

const ChildSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const role = "child";  // Simulate a successful login
    if (onLogin) {
      onLogin(role);
      setMessage('Login successful!');
    } else {
      console.error('onLogin function is not provided');
    }
  };

  useEffect(() => {
    if (message === 'Login successful!') {
      navigate('/Child');  // Redirect to child home page
    }
  }, [message, navigate]);

  return (
    <div className="cSign-Con">
      <form onSubmit={handleSubmit} className="form">
        <h2>Child Signup</h2>
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
        <button type="submit" className="submit-BChild"><img src={childGP} className="childGP-Sty" alt="yellow pencil" /></button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ChildSign;
