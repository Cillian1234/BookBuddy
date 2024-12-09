import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login/parentSign.css';
import twoStars from '../../assets/Images by AJ/YellowStars.png';

//TODO: ADD BOOKS IMAGE
// import books from '../../assets/Images by AJ/';

const ParentSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      <form onSubmit={handleSubmit} className="form-p">
        <h1>Parent Sign In</h1>
        <div className="img-Con-P">
          <div className="img-L-P">
            <img src={twoStars} alt="Two Stars" className="side-img-P"/>
          </div>
          <div className="image-box-P">
            <label htmlFor="upload-photo" className="up-lbl-P">Upload Photo</label>
            <input type="file" id="upload-photo" className="up-inp-P"/>
          </div>
          <div className="img-R-P">
            {/* <img src={Books} alt="Books" className="side-img-P"/> */}
          </div>
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
