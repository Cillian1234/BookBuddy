import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../src/components/Navbar.jsx';
import '../../css/acc/parent/parent.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Parent() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    // Simulating fetching notifications from a predefined array
    const notificationsData = [
        { id: 1, message: "Your child received a new comment from their teacher!", timestamp: "10:00 AM" },
        { id: 2, message: "Your child got a new homework assignment.", timestamp: "11:00 AM" }
    ];

    useEffect(() => {
        if (Cookies.get("Level") != "Parent" && Cookies.get("Locked") === "true") {
            navigate('/ParentSign')
        }
    }, []);

    return (
    <> 
    <Navbar />
        <div className="Contents">  
            <div className="ButtonContainer">
                {/* // TODO: DIRECT TO ITS OWN CHILD PAGE AND TEACHER PAGE
                // TODO: DISPLAY MORE OF DATA FROM EACH PAGE RATHER THAN REDIRECTING TO THEIR PAGE AND GAINING ACCESS TO TEACHERS PAGE */}
                <Link to={"/Child"} className="navButton">Child</Link>
                <Link to={"/Teacher"} className="navButton">Teacher</Link>
            </div>
            <div className="Notifications">
                <h2>Notifications</h2>
                {notifications.map((notif) => (
                    <div key={notif.id} className="Notification">
                        <p>{notif.message}</p>
                        <small>{notif.timestamp}</small>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}
