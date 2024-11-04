import React from 'react';
import {Link} from 'react-router-dom';
//Importing the navbar
import '../../main.jsx';

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
          <Link to={"/Child"}>Child</Link>
          <Link to={"/Review"}>Review</Link>
      </nav>
  )
}
