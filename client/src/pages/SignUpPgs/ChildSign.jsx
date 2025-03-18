import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/login/childSign.css';
import childGP from '../../assets/Images by AJ/GreenPencil.png';
import dengBackpack from '../../assets/Images by AJ/DengBackpack.png';
import happyBlocks from '../../assets/Images by AJ/HappyBlocks.png';
import Cookies from "js-cookie";
import home from '../../assets/Images by AJ/bckhome.png';

const ChildSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [errMessage, setErrMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const level = "Child";

    async function login() {
      await fetch(`http://localhost:8080/record/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          username, pass, level
        }),
      })
          .then(res => res.json())
          .then(data => {
            if (!data) {
              setErrMessage(errMessage => !errMessage);
            } else {
              Cookies.set("UID", data, {expires: 1});
              Cookies.set("Level", "Child", {expires: 1});
              navigate('/child');
            }
          });
    }
    login();
  };

  useEffect(() => {}, []);

  return (
    <div className="cSign-Con">
      <Link to={`/`}><img id="home" src={home} alt="backHome" /></Link>

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
