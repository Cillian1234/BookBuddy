import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/childSign.css';
import childGP from '../../assets/Images by AJ/GreenPencil.png';
import dengBackpack from '../../assets/Images by AJ/DengBackpack.png';
import happyBlocks from '../../assets/Images by AJ/HappyBlocks.png';

const ChildSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [errMessage, setErrMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const level = "Child"

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
              navigate('/child');
            }
          })
    }
    login()
  };

  useEffect(() => {
  }, []);

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
        {errMessage && <p>{errMessage}</p>}
      </form>
    </div>
  );
};

export default ChildSign;
