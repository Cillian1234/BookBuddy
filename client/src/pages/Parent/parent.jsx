import React, { useState, useEffect } from 'react'; // Importing necessary stuff from React
import { Link } from 'react-router-dom'; // Importing Link to navigate between pages
import Navbar from '../../../src/components/Navbar.jsx'; // Importing Navbar component for the top navigation bar
import '../../css/acc/parent/parent.css'; // Importing CSS file for styling the page
import Cookies from "js-cookie"; // Importing js-cookie to manage cookies
import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirecting
import pWave from "../../assets/Images by AJ/plant_Waving.gif"; // Importing an image of a waving plant

export default function Parent() {
    const navigate = useNavigate(); // Setting up navigate hook for redirection
    const [notifications, setNotifications] = useState([]); // Using useState to manage notifications

    // Simulating fetching notifications from a predefined array
    const notificationsData = [
        { id: 1, message: "Your child received a new comment from their teacher!", timestamp: "10:00 AM" },
        { id: 2, message: "Your child got a new homework assignment.", timestamp: "11:00 AM" }
    ];

    // Checking cookies to see if the user is allowed to be on this page
    useEffect(() => {
        if (Cookies.get("Level") !== "Parent" && Cookies.get("Locked") === "true") {
            navigate('/ParentSign'); // Redirecting to the ParentSign page if the user isn't allowed
        }
    }, [navigate]);

    // Setting the notifications using the simulated data
    useEffect(() => {
        setNotifications(notificationsData);
    }, []);

    return (
    <> 
    <Navbar /> {/* Including the Navbar at the top */}
        <div className="Contents">
            <div className="ButtonContainer"> {/* Container for navigation buttons */}
                <Link to="/Parent/P_to_C" className="navButton">Child</Link> {/* Link to Child page */}
                <Link to="/Parent/P_to_T" className="navButton">Teacher</Link> {/* Link to Teacher page */}
            </div>
            <div className="Notifications"> {/* Container for notifications */}
                <img id="plantWaving" src={pWave} alt="Plant Waving" /> {/* Displaying the plant waving image */}
                <h2>Notifications</h2>
                {notifications.map((notif) => (
                    <div key={notif.id} className="Notification"> {/* Displaying each notification */}
                        <p>{notif.message}</p>
                        <small>{notif.timestamp}</small>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}
