import { Link } from 'react-router-dom';
// Importing the navbar
import Navbar from '../../../src/components/Navbar.jsx';
// Importing images for navbar
import starRevB from '../../assets/Images by AJ/starRevB.png';
import home from '../../assets/Images by AJ/home.png';
// Importing the CSS files from the CSS folder
import '../../css/acc/child/assign.css';
import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";

export default function Assignment() {
  // State for assignments
  const [assignments, setAssignments] = useState([
    {
      assignmentContent: "",
      teacherName: "",
      dueDate: "",
    }
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
  const childID = Cookies.get("UID")

  function getAssignments(childID) {
    fetch(`http://localhost:8080/record/getAssignments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        childID
      }),
    })
        .then((res) => res.json())
        .then((data) => {setAssignments(data)})
  }

  useEffect(() => {
    getAssignments(childID);
  }, []);

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
                  <h3>Given by: {assignment.teacherName}</h3>
                  <p>To do: {assignment.assignmentContent}</p>
                  <p>Due: {assignment.dueDate}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="teacher-comments-section">
          <h2>Teacher Comments</h2>
          <ul className="teacher-comments">
            {/*TODO: decide what to do with comments? too similar to reviews?*/}
            {/*{teacherComments.map((comment, index) => (*/}
            {/*  <li key={index} className="comment-item">*/}
            {/*    <h3>{comment.teacherName}</h3>*/}
            {/*    <p>{comment.comment}</p>*/}
            {/*  </li>*/}
            {/*))}*/}
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
