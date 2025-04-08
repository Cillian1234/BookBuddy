import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/login/teachSign.css';
import Login from '../../../../server/loginLogic/Login.js';
import Diamonds from '../../assets/Images by AJ/YellowSparkle.png';
import Cookies from 'js-cookie';
import Books from '../../assets/Images by AJ/booksBpile.png';
import home from '../../assets/Images by AJ/bckhome.png';

const TeachSign = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errMessage, setErrMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const level = "Teacher";

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
            Cookies.set("Level", "Teacher", { expires: 1 });
            navigate('/teacher');
          }
        });
    }
    login();
  };

  useEffect(() => {}, []);

  return (
    <div className="TeachSign-con">
      <Link to={`/`}><img id = {"home"} src={home} alt={"backHome"}/></Link>

      <form onSubmit={handleSubmit} className="form-t">
        <h1 id="TeachSign-h1">Teacher Sign In</h1>
        <div className="img-Con-T">
          <div className="image-box-T">
            <img src={Diamonds} alt="Diamond" /> {/* Diamond image added */}
            <label htmlFor="upload-photo" className="up-lbl-T">Upload Photo</label>
            <input type="file" id="upload-photo" className="up-inp-T" />
          </div>
          <img src={Books} alt="Books Pile" className="bookBpile-image" />
        </div>
        <div className="form-group-T">
          <label htmlFor="username">Enter Your Name</label>
          <input
            type="email"
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
        <button type="submit" className="sub-B-T">Signup</button>
        {errMessage && <p>Wrong</p>}
      </form>
    </div>
  );
};

export default TeachSign;
