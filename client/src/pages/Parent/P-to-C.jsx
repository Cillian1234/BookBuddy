import React, { useState, useEffect } from 'react';
import Navbar from '../../../src/components/Navbar.jsx'; // Importing Navbar component
import '../../css/acc/parent/ptoc.css'; // Importing CSS file
import star from '../../assets/Images by AJ/1Star.png'; // Importing the star image

import Cookies from "js-cookie";

export default function P_to_C() {
    const [assignments, setAssignments] = useState([]); // State for assignments
    const [reviews, setReviews] = useState([]); // State for reviews
    const [attendance, setAttendance] = useState({ present: 0, absent: 0 }); // State for attendance
    const childID = Cookies.get("UID"); // Getting child ID from cookies

    useEffect(() => {
        // Fetch assignments, reviews, and attendance data
        getAssignments(childID);
        getReviews(childID);
        getAttendance(childID);
    }, [childID]);

    function getAssignments(childID) {
        // Simulating fetching assignments data
        const assignmentsData = [
            { id: 1, title: "Math Homework", dueDate: "2025-02-28", status: "Due" },
            { id: 2, title: "Science Project", dueDate: "2025-03-05", status: "Completed" },
            { id: 3, title: "History Essay", dueDate: "2025-03-10", status: "Overdue" }
        ];
        setAssignments(assignmentsData);
    }

    function getReviews(childID) {
        // Simulating fetching reviews data
        const reviewsData = [
            { id: 1, teacherName: "Mr. Smith", stars: 4, comment: "Great improvement!" },
            { id: 2, teacherName: "Ms. Johnson", stars: 3, comment: "Needs to focus more." }
        ];
        setReviews(reviewsData);
    }

    function getAttendance(childID) {
        // Simulating fetching attendance data
        const attendanceData = { present: 180, absent: 5 };
        setAttendance(attendanceData);
    }

    return (
        <>
            <Navbar /> {/* Navbar at the top */}
            <div className="container">
                <h1>Parent to Child Page</h1>

                <div className="section assignments"> {/* Section for assignments */}
                    <h2>Assignments</h2>
                    <ul>
                        {assignments.map((assignment) => (
                            <li key={assignment.id} className={assignment.status.toLowerCase()}>
                                <p>{assignment.title}</p>
                                <p>Due Date: {assignment.dueDate}</p>
                                <p>Status: {assignment.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section reviews"> {/* Section for reviews */}
                    <h2>Reviews</h2>
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <h3>{review.teacherName}</h3>
                            <div className="stars">
                                {Array(review.stars).fill().map((_, i) => (
                                    <img key={i} src={star} alt="star" className="star-image" />
                                ))}
                                {Array(5 - review.stars).fill().map((_, i) => (
                                    <img key={i} src={star} alt="empty star" className="empty-star-image" />
                                ))}
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>

                <div className="section attendance"> {/* Section for attendance */}
                    <h2>Attendance</h2>
                    <p>Present Days: {attendance.present}</p>
                    <p>Absent Days: {attendance.absent}</p>
                </div>
            </div>
        </>
    );
}
