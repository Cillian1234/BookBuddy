import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../src/components/Navbar.jsx";
import starRevB from "../../assets/Images by AJ/starRevB.png";
import bookHWB from "../../assets/Images by AJ/bookHWB.png";
import lib from "../../assets/Images by AJ/libBooks.png";
import bckgrdImg from "../../assets/Images by AJ/childbckimg.jpg";
import progressBarImg from "../../assets/Images by AJ/prog_Bar.png";
import progressIconImg from "../../assets/Images by AJ/mdProg_Icon.png";
import "../../css/acc/child/child.css";
import Cookies from "js-cookie";

export default function Child() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]); // Store assignments
  const [progress, setProgress] = useState(0); // Store progress as percentage

  // Check if the user should be here (based on their level and locked status)
  useEffect(() => {
    if (Cookies.get("Level") !== "Child" && Cookies.get("Locked") === "true") {
      navigate("/ChildSign"); // Redirect if not allowed
    }
  }, [navigate]);

  // Fetch assignments and calculate progress
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

        // Filter out submitted assignments
        const submittedAssignments = data.filter((assignment) => assignment.submitted);

        setAssignments(submittedAssignments); // Save submitted assignments to state

        // Calculate total assignments and submitted assignments
        const totalAssignments = data.length;
        const submittedCount = submittedAssignments.length;

        // Calculate progress percentage
        const progressPercentage = totalAssignments > 0 ? (submittedCount / totalAssignments) * 100 : 0;
        setProgress(progressPercentage); // Update the progress state
      } catch (err) {
        console.error("Error loading assignments", err);
      }
    };

    getAssignments(); // Run the fetch function on component mount
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return (
    <>
      <Navbar /> {/* Render navbar */}

      {/* Main content section with background image */}
      <div className="child-Con" style={{ backgroundImage: `url(${bckgrdImg})` }}>
        <div className="ButtonCon">
          {/* Navigation buttons */}
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

        {/* Progress bar section */}
        <div className="progress-bar-container">
          <img src={progressBarImg} alt="Progress bar" className="progress-bar-image" />
          <img
            src={progressIconImg}
            alt="Progress icon"
            className="progress-bar-icon"
            style={{
              left: `calc(${progress}% - 10px)`, // Ensure the icon is within the bar width
              position: "absolute",
              top: "-12px", // Position the icon on top of the bar
            }}
          />
        </div>
      </div>
    </>
  );
}
