import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/teachSign.css';
import Diamonds from '../../assets/Images by AJ/YellowSparkle.png';

//TODO: ADD BOOKS IMAGE
// import Books from '../../assets/Images by AJ/.png';

const TeachSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      <form onSubmit={handleSubmit} className="form-t">
        <h1 id="TeachSign-h1">Teacher Sign In</h1>
        <div className="img-Con-T">
          <div className="img-L-T">
            <img src={Diamonds} alt="Two Diamonds" className="side-img-T"/>
          </div>
          <div className="image-box-T">
            <label htmlFor="upload-photo" className="up-lbl-T">Upload Photo</label>
            <input type="file" id="upload-photo" className="up-inp-T"/>
          </div>
          <div className="img-R-T">
            {/* <img src={Book} alt="Books" className="side-img-T"/> */}
          </div>
        </div>
        <div className="form-group-T">
          <label htmlFor="username">Enter Your Name</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group-T">
          <label htmlFor="email">Enter Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group-T">
          <label htmlFor="pass">Enter Your Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button type="submit" className="sub-B-T">Signup</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default TeachSign;
