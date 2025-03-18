import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login/teachSign.css"; // Import the CSS for styling
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import Diamonds from "../../assets/Images by AJ/YellowSparkle.png";
import Books from "../../assets/Images by AJ/booksBpile.png";
import home from "../../assets/Images by AJ/bckhome.png";

const TeachSign = () => {
    const [username, setUsername] = useState(""); // State for username
    const [pass, setPass] = useState(""); // State for password
    const [errMessage, setErrMessage] = useState(""); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const level = "Teacher"; // Set the user level as "Teacher"

        // Input validation to ensure both fields are filled
        if (!username || !pass) {
            setErrMessage("Both fields are required.");
            return;
        }

        try {
            // Call the Login function
            const result = await Login(username, pass, level);

            // Handle invalid credentials
            if (!result || !result.redirect) {
                setErrMessage("Invalid credentials. Please check your details.");
                return;
            }

            console.log("Login successful:", result);

            // Set cookies for user ID and level
            Cookies.set("UID", result.userId, { expires: 1, secure: true });
            Cookies.set("Level", level, { expires: 1, secure: true });

            // Navigate to the teacher's dashboard
            navigate(result.redirect || "/teacher");
        } catch (error) {
            console.error("An error occurred during login:", error.message);
            setErrMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="TeachSign-con">
            <Link to={`/`}><img id="home" src={home} alt="backHome" /></Link>
            <form onSubmit={handleSubmit} className="form-t">
                <h1 id="TeachSign-h1">Teacher Sign In</h1>
                <div className="img-Con-T">
                    <div className="image-box-T">
                        <img src={Diamonds} alt="Diamond" />
                        <label htmlFor="upload-photo" className="up-lbl-T">Upload Photo</label>
                        <input type="file" id="upload-photo" className="up-inp-T" />
                    </div>
                    <img src={Books} alt="Books Pile" className="bookBpile-image" />
                </div>
                <div className="form-group-T">
                    <label htmlFor="username">Enter Your Name</label>
                    <input
                        type="text"
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input
                        type="password"
                        id="pass"
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                <button type="submit" className="sub-B-T">Submit</button>
                {errMessage && <p>{errMessage}</p>}
            </form>
        </div>
    );
};

export default TeachSign;
