import { Link } from 'react-router-dom';
// Importing the Navbar component
import Navbar from '../../../src/components/Navbar.jsx';
// Importing images for navigation buttons
import home from '../../assets/Images by AJ/home.png';
import bookHWB from '../../assets/Images by AJ/bookHWB.png';
import star from '../../assets/Images by AJ/1Star.png'; // Importing the star image
// Importing CSS file for styling
import '../../css/acc/child/rev.css'; 
import React, {useEffect, useState} from 'react';
import * as http from "node:http";

export default function Review() {
  // State to store reviews with teacher's name, star ratings, and comments
  const [reviews, setReviews] = useState([]);
  const childID = 1; // TODO: Get child ID from logged in sessions

  useEffect(() => {
    getReviews(childID)
  }, []);

  function getReviews(childID) {
      fetch(`http://localhost:8080/record/getReviews/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', // Indicate the type of data being sent
          },
          body: JSON.stringify({
              childID
          }),
      })
          .then((res) => res.json())
          .then((data) => {setReviews(data)})
  }

  // Calculate total stars from all reviews
  const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);

  return (
    <> 
      <ChildNavbar /> {/* Render Child Navbar */}
      <div className="revCon"> {/* Container for review content */}
        <h1>Review Page</h1> {/* Page title */}
        <img id='starAmount' src={star} alt='star' /> {/* Display star image */}
        <p>You Have {totalStars} Stars</p> {/* Display total stars */}
        
        {/* Iterate over reviews and display each review */}
        {reviews.map((review, index) => (
          <div key={index} className="review-card"> {/* Review card container */}
            <h3>{review.teacherName}</h3> {/* Teacher's name */}
            <div className="stars"> {/* Stars container */}
              {/* Display filled star images based on the number of stars */}
              {Array(review.stars).fill().map((_, i) => (
                <img key={i} src={star} alt="star" className="star-image" />
              ))}
              {/* Display empty star images for the remaining out of 5 stars */}
              {Array(5 - review.stars).fill().map((_, i) => (
                <img key={i} src={star} alt="empty star" className="empty-star-image" />
              ))}
            </div>
            <p>{review.comment}</p> {/* Teacher's comment */}
          </div>
        ))}
      </div>
    </>
  );
}

// Component for Child Navbar
function ChildNavbar() {
  return (
    <>
      <Navbar /> {/* Render Navbar component */}
      <nav className="ChildNB"> {/* Navigation container */}
        <div className="navBTNS"> {/* Buttons container */}
          <Link to={"/Child"}><img id="home" src={home} alt="home" /></Link> {/* Link to Child page */}
          <Link to={"/Child/Assignment"}><img id="HWB" src={bookHWB} alt="Assignment" /></Link> {/* Link to Assignment page */}
        </div>
      </nav>
    </>
  );
}
