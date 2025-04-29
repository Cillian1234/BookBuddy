import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Importing the navbar at the top
import Navbar from "../../../src/components/Navbar.jsx";

// Importing the images used to link to their pages
import starRevB from "../../assets/Images by AJ/starRevB.png";
import bookHWB from "../../assets/Images by AJ/bookHWB.png";
import lib from "../../assets/Images by AJ/libBooks.png";

// Background image
import bckgrdImg from "../../assets/Images by AJ/childbckimg.jpg";

// Progress bar image + icon
import taskBar from "../../assets/Images by AJ/taskBar.png";
import taskIcon from "../../assets/Images by AJ/taskIcon.png";

// CSS file
import "../../css/acc/child/child.css";

import Cookies from "js-cookie";

export default function Child() {
  const navigate = useNavigate();

  // This keeps track of how many assignments were done
  const [assignments, setAssignments] = useState([]);

  // This is how "far" the icon should move on the progress bar (0 to 100%)
  const [progress, setProgress] = useState(0); // Default is 0

  // When the page loads, check if the user is allowed here (if not, redirect them)
  useEffect(() => {
    if (Cookies.get("Level") !== "Child" && Cookies.get("Locked") === "true") {
      navigate("/ChildSign");
    }
  }, []);

  // Load assignments and calculate progress when the page opens
  useEffect(() => {
    const getAssignments = async () => {
      try {
        const res = await fetch("http://localhost:8080/record/getAssignments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ childID: Cookies.get("UID") }),
        });
        const data = await res.json();
        setAssignments(data);

        // Count how many assignments were submitted
        const total = data.length;
        const done = data.filter((a) => a.submitted).length;

        // If there are assignments, calculate the percentage
        setProgress(total > 0 ? (done / total) * 100 : 0);
      } catch (err) {
        console.error("Error loading assignments", err);
      }
    };
    getAssignments();
  }, []);

  return (
    <>
      <Navbar />

      {/* Main content with background image */}
      <div className="child-Con" style={{ backgroundImage: `url(${bckgrdImg})` }}>
        <div className="ButtonCon">
          <Link to={"/Child/Review"}>
            <img id="sRB" src={starRevB} alt="Review" />
          </Link>
          <Link to={"/Child/Assignment"}>
            <img id="bHWB" src={bookHWB} alt="Assignment" />
          </Link>
          <Link to={"/Child/Library"}>
            <img id="lib" src={lib} alt="Library" />
          </Link>
        </div>
      </div>

      {/* This is the progress bar at the bottom */}
      <div className="progress-bar-wrapper">
        <img src={taskBar} alt="Progress bar" className="progress-bar-image" />
        <img
          src={taskIcon}
          alt="Progress icon"
          className="progress-bar-icon"
          style={{ left: `calc(${progress}% - 20px)` }} // This moves the icon left/right based on progress
        />
      </div>
    </>
  );
}
