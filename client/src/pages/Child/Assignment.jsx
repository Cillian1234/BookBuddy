import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

// Importing Navbar and images
import Navbar from '../../../src/components/Navbar.jsx';
import starRevB from '../../assets/Images by AJ/starRevB.png';
import home from '../../assets/Images by AJ/home.png';
import libImg from '../../assets/Images by AJ/libBooks.png';

// Styles for this page
import '../../css/acc/child/assign.css';

export default function Assignment() {
  const [assignments, setAssignments] = useState([]); // Holds assignments
  const [teacherComments, setTeacherComments] = useState([]); // Holds comments
  const childID = Cookies.get("UID"); // Get student ID from cookie

  function submitAssignment(_id) {
    fetch(`http://localhost:8080/record/updateAssignment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        _id
      }),
    });
    setTeacherComments([]); 
  }

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
      .then((data) => setAssignments(data));
  }

  function getTeacherComments(childID) {
    fetch(`http://localhost:8080/record/getComments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        childID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Make sure the data is an array
        if (Array.isArray(data)) {
          setTeacherComments(data);
        } else {
          setTeacherComments([]); 
        }
      });
  }

  useEffect(() => {
    getAssignments(childID);
    getTeacherComments(childID); // Fetch comments when the component mounts
  }, [childID]);

  return (
    <>
      <ChildNavbar />
      <div className="assignCon">
        <h1>Assignment Page</h1>
        <div className="homework-section">
          <ul className="assignment-list">
            {assignments.map((assignment, index) => (
              <li key={index} className="assignment-item">
                {!assignment.submitted && (
                  <label className="upload-label">
                    <input
                      type="button"
                      className="upload-btn"
                      onClick={(event) => submitAssignment(assignment._id)}
                    />
                    Upload Homework
                  </label>
                )}
                <div className="assignment-details">
                  <h3>Given by: {assignment.teacherName}</h3>
                  <p>To do: {assignment.assignmentContent}</p>
                  <p>Due: {assignment.dueDate}</p>
                  <p>Submitted: {assignment.submitted ? 'Yes!' : 'No :('}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Teacher comments section */}
        <div className="teacher-comments-section">
          <h2>Teacher Comments</h2>
          <ul className="teacher-comments">
            {teacherComments.length > 0 ? (
              teacherComments.map((comment, index) => (
                <li key={index} className="comment-item">
                  <h3>{comment.teacherName}</h3>
                  <p>{comment.comment}</p>
                </li>
              ))
            ) : (
              <li>No comments yet.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

// Bottom navigation bar for the student
function ChildNavbar() {
  return (
    <>
      <Navbar />
      <nav className="ChildNB">
        <div className="navBTNS">
          <Link to={"/Child"}>
            <img id="home" src={home} alt="Home" />
          </Link>
          <Link to={"/Child/Review"}>
            <img id="strB" src={starRevB} alt="Review" />
          </Link>
          <Link to={"/Child/Library"}>
            <img id="libImg" src={libImg} alt="Library" />
          </Link>
        </div>
      </nav>
    </>
  );
}
