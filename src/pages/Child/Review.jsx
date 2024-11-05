import React from 'react';
import {Link} from 'react-router-dom'
//Importing the navbar
import '../../main.jsx';

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
          <Link to={"/Child"}>Child</Link>
          <Link to={"/Assignment"}>Assignment</Link>
      </nav>
  )
}