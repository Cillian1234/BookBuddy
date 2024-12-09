import { Link } from 'react-router-dom';
// Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';
// Importing images for navbar
import starRevB from '../../assets/Images by AJ/starRevB.png';
import home from '../../assets/Images by AJ/home.png';
// Importing the CSS files from the CSS folder
import '../../css/acc/child/assign.css';
import React, { useState } from 'react';

export default function Assignment() {
  // State for assignments
  const [assignments, setAssignments] = useState([
    {
      title: 'Assignment 1',
      details: 'Complete the coding exercise on arrays',
    },
    {
      title: 'Assignment 2',
      details: 'Write an essay on the importance of coding',
    },
  ]);

  // State for comments from teachers
  const [teacherComments, setTeacherComments] = useState([
    {
      teacherName: 'Begonia',
      comment: 'Keep working!',
    },
    {
      teacherName: 'Petunia',
      comment: 'Never forget to code! >:PPP',
    },
  ]);

  return (
    <> 
      <ChildNavbar />
      <div className="assignCon">
        <h1>Assignment Page</h1>
        <div className="homework-section">
          <ul className="assignment-list">
            {assignments.map((assignment, index) => (
              <li key={index} className="assignment-item">
                <label className="upload-label">
                  <input type="file" className="upload-btn"/>
                  Upload Homework
                </label>
                <div className="assignment-details">
                  <h3>{assignment.title}</h3>
                  <p>{assignment.details}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="teacher-comments-section">
          <h2>Teacher Comments</h2>
          <ul className="teacher-comments">
            {teacherComments.map((comment, index) => (
              <li key={index} className="comment-item">
                <h3>{comment.teacherName}</h3>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ChildNavbar() {
  return (
    <>
      <Navbar />
      <nav className="ChildNB">
        <div className="navBTNS">
          <Link to={"/Child"}><img id="home" src={home} alt="home" /></Link>
          <Link to={"/Child/Review"}><img id="strB" src={starRevB} alt="Review" /></Link>
        </div>
      </nav>
    </>
  );
}
