import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/childSign.css';
import childGP from '../../assets/Images by AJ/GreenPencil.png';
import dengBackpack from '../../assets/Images by AJ/DengBackpack.png';
import happyBlocks from '../../assets/Images by AJ/HappyBlocks.png';

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
        <h1 id="stu-Sign">Student Sign In</h1>
        <div className="img-Con">
          <div className="img-L">
            <img src={happyBlocks} alt="Happy Blocks" className="side-img"/>
          </div>
          <div className="image-box">
            <label htmlFor="upload-photo" className="up-lbl">Upload Photo</label>
            <input type="file" id="upload-photo" className="up-inp"/>
          </div>
          <div className="img-R">
            <img src={dengBackpack} alt="Deng Backpack" className="side-img"/>
          </div>
        </div>
        <div className="child-Form">
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
        <div className="child-Form">
          <label htmlFor="pass">Enter Your Parent's Name</label>
          <input
            type="password"
            id="pass"
            name="pass"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-BChild">
          <img src={childGP} className="childGP-Sty" alt="green pencil" />
          <span className="submit-text">Submit</span>
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ChildSign;
