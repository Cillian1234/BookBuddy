import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/parentSign.css';

const ParentSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [errMessage, setErrMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const level = "Parent"

    // TODO: figure out how to get server/Login.js to work instead of copying this code

    async function login() {
      await fetch(`http://localhost:8080/record/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate the type of data being sent
        },
        body: JSON.stringify({
          username, pass, level
        }),
      })
          .then(res => {
            if (!res.ok) {
              setErrMessage(errMessage => !errMessage);
            } else {
              navigate('/parent');
            }
          })
    }
    login()
  };

  useEffect(() => {
  }, []);

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
        {errMessage && <p>Wrong</p>}
      </form>
    </div>
  );
};

export default ParentSign;
