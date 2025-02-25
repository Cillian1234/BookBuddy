import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/login/parentSign.css';
import twoStars from '../../assets/Images by AJ/YellowStars.png';
import Cookies from 'js-cookie';
import booksRpile from '../../assets/Images by AJ/booksRpile.png'; // Import the book image
import home from '../../assets/Images by AJ/bckhome.png';

const ParentSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errMessage, setErrMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const level = "Parent";

    async function login() {
      await fetch(`http://localhost:8080/record/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, pass, level,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            setErrMessage(errMessage => !errMessage);
          } else {
            Cookies.set("UID", data, { expires: 1 });
            Cookies.set("Level", "Parent", { expires: 1 });
            navigate('/parent');
          }
        });
    }
    login();
  };

  useEffect(() => {}, []);

  return (
    <div className="parentSign-con">
      <Link to={`/`}><img id="home" src={home} alt="backHome"/></Link>

      <form onSubmit={handleSubmit} className="form-p">
        <h1 id="ParentSign-h1">Parent Sign In</h1>
        <div className="img-Con-P">
          <div className="image-box-P">
            <img src={twoStars} alt="Star" /> {/* Star image added */}
            <label htmlFor="upload-photo" className="up-lbl-P">Upload Photo</label>
            <input type="file" id="upload-photo" className="up-inp-P" />
          </div>
          <img src={booksRpile} alt="Books Pile" className="booksRpile-image" />
        </div>
        <div className="form-group-P">
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
        <div className="form-group-P">
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
        <div className="form-group-P">
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
        <button type="submit" className="sub-BP">Submit</button>
        {errMessage && <p>{errMessage}</p>}
      </form>
    </div>
  );
};

export default ParentSign;
