import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login/childSign.css"; // Import the CSS for styling
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import happyBlocks from "../../assets/Images by AJ/HappyBlocks.png";
import dengBackpack from "../../assets/Images by AJ/DengBackpack.png";
import home from "../../assets/Images by AJ/bckhome.png";

const ChildSign = () => {
    const [username, setUsername] = useState(""); // State for the child's username
    const [pass, setPass] = useState(""); // State for the parent's name
    const [errMessage, setErrMessage] = useState(""); // State for error messages
    const navigate = useNavigate(); // Hook for nav

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const level = "Child"; // Set user level as "Child"

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

            // Navigate to the child's dashboard
            navigate(result.redirect || "/child");
        } catch (error) {
            console.error("An error occurred during login:", error.message);
            setErrMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="cSign-Con">
            <Link to={`/`}><img id="home" src={home} alt="backHome" /></Link>
            <form onSubmit={handleSubmit} className="form">
                <h1 id="stu-Sign">Student Sign In</h1>
                <div className="img-Con">
                    <div className="img-L">
                        <img src={happyBlocks} alt="Happy Blocks" className="side-img" />
                    </div>
                    <div className="image-box">
                        <label htmlFor="upload-photo" className="up-lbl">Upload Photo</label>
                        <input type="file" id="upload-photo" className="up-inp" />
                    </div>
                    <div className="img-R">
                        <img src={dengBackpack} alt="Deng Backpack" className="side-img" />
                    </div>
                </div>
                <div className="child-Form">
                    <label htmlFor="username">Enter Your Name</label>
                    <input
                        type="text"
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="child-Form">
                    <label htmlFor="pass">Enter Your Parent's Name</label>
                    <input
                        type="text"
                        id="pass"
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-BChild">Submit</button>
                {errMessage && <p>{errMessage}</p>}
            </form>
        </div>
    );
};

export default ChildSign;
