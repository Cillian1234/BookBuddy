import {Link} from 'react-router-dom'
//Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';
//Importing the images for the nav
import home from '../../assets/Images by AJ/home.png';
import bookHWB from '../../assets/Images by AJ/bookHWB.png';
//Importing the css files from css folder
import './css/rev.css'; 

export default function Review() {
  return (
    <> 
    <ChildNavbar />
    <div className = "revCon">
    <h1>Review Page</h1>
    <p>This is where book reviews will be displayed and managed.</p>
    </div>
    </>
  
  );
}

function ChildNavbar() {
  return (
    <>
    <Navbar/>
      <nav className="ChildNB">
          <div className="navBTNS">
            <Link to={"/Child"}><img id = {"home"} src={home} alt={"home"}/></Link>
            <Link to={"/Child/Assignment"}><img id = {"HWB"} src={bookHWB} alt={"Assignment"}/></Link>
          </div>
      </nav>
    </>
  )
}