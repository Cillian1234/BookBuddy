import DengRead from './assets/Images by AJ/DengReadingBook.jpg';
import teachB from './assets/Images by AJ/BluePencil.png';
import childB from './assets/Images by AJ/YellowPencil.png';
import parentB from './assets/Images by AJ/RedPencil.png'; 
import '../main.css';
import Navbar from './components/Navbar';
import { Outlet } from "react-router-dom";

function App() {
    async function setSession() {
        await fetch("http://localhost:8080/record/setSession")
        .then((res) => console.log(res.text()))
    }

    async function getSession() {
        await fetch("http://localhost:8080/record/getSession")
            .then((res) => console.log(res.text()))
    }

  return (
    <>
      <Navbar />
      <div className="image-container">
        <img src={DengRead} className="logo" alt="Hippo reading" />
        <a href="/teachSign" target="_blank">
          <img src={teachB} className="tSign" alt="Blue button pencil" />
          <span>Teacher</span>
        </a>
        <a href="/childSign" target="_blank">
          <img src={childB} className="cSign" alt="yellow pencil" />
          <span>Child</span>
        </a>
        <a href="/parentSign" target="_blank">
          <img src={parentB} className="pSign" alt="red pencil" />
          <span>Parent</span>
        </a>
      </div>

      <h1>Book Buddy!</h1>
        <div className="card">
            <button onClick={setSession}>Set</button>
            <button onClick={getSession}>Get</button>
            <p>
                The beginning.
            </p>
            <p>
                I{`'`}m losing my mind :3 I love that song "Where Is My Mind".
            </p>
        </div>
        <hr/>
        <Outlet/>
    </>
  );
}

export default App;
