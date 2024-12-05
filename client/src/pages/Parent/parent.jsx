import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../src/components/Navbar.jsx';
import '../../css/acc/parent/parent.css'; 

export default function Parent() {
    const [notifications, setNotifications] = useState([]);

    // Simulating fetching notifications from a predefined array
    const notificationsData = [
        { id: 1, message: "Your child received a new comment from their teacher!", timestamp: "10:00 AM" },
        { id: 2, message: "Your child got a new homework assignment.", timestamp: "11:00 AM" }
    ];

    useEffect(() => {
        // Setting notifications from the predefined array
        setNotifications(notificationsData);
    }, []);

    return (
    <> 
    <Navbar />
        <div className="Contents">  
            <div className="ButtonContainer">
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
