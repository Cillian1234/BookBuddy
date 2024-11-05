import {Link} from 'react-router-dom';
//Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';

export default function Assignment() {
  return (
    <> 
    <ChildNavbar />
    <div>
      <h1>Assignment Page</h1>
      <p>This is where assignments will be displayed and managed.</p>
    </div>
    </>
  );
}

function ChildNavbar() {
  return (
      <nav className="ChildNB">
          <Navbar />
          <Link to={"/Child/Review"}>Review</Link>
      </nav>
  )
}
