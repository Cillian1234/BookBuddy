import {Link} from 'react-router-dom';
//Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';
//Importing images for navbar
//Importing the images used to link to their page
import starRevB from '../../assets/Images by AJ/starRevB.png';
import home from '../../assets/Images by AJ/home.png';
//Importing the css files from css folder
import './css/assign.css'; 

export default function Assignment() {
  return (
    <> 
    <ChildNavbar />
    <div className = "assignCon">
      <h1>Assignment Page</h1>
      <p>This is where assignments will be displayed and managed.</p>
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
          <Link to={"/Child/Review"}><img id = {"strB"} src={starRevB} alt={"Review"}/></Link>
          </div>
      </nav>
    </>
  )
}
