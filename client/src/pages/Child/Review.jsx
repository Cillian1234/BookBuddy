import {Link} from 'react-router-dom'
//Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';

export default function Review() {
  return (
    <> 
    <ChildNavbar />
    <div>
    <h1>Review Page</h1>
    <p>This is where book reviews will be displayed and managed.</p>
    </div>
    </>
  
  );
}

function ChildNavbar() {
  return (
      <nav className="ChildNB">
          <Navbar />
          <Link to={"/Child/Assignment"}>Assignment</Link>
      </nav>
  )
}