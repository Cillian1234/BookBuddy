import DengBack from './assets/Images by AJ/DengBackpack.png'
import DengRead from './assets/Images by AJ/DengReadingBook.jpg'
import '../main.css'
import Navbar from './components/Navbar'
import {Outlet} from "react-router-dom";


function App() {
  return (
    <>
        <Navbar />
      <div>
        <a href="https://en.wikipedia.org/wiki/Moo_Deng" target="_blank">
          <img src={DengRead} className="logo" alt="Hippo reading" />
        </a>
        <a href="https://www.reddit.com/r/vegan/comments/1fsb3cm/moo_deng/" target="_blank">
          <img src={DengBack} className="logo react" alt="Hippo with backpack" />
        </a>
      </div>
      <h1>Book Buddy!</h1>
      <div className="card">
        <input type={"text"}>

        </input>
        <p>
          The beginning.
        </p>
        <p>
            I{`'`}m losing my mine :3 I love that song where is my mind
        </p>
      </div>
        <hr />
    <Outlet />
    </>
  )
}

export default App
