import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login/parentSign.css"; // Import CSS
import Cookies from "js-cookie"; // For managing cookies
import twoStars from "../../assets/Images by AJ/YellowStars.png";
import booksRpile from "../../assets/Images by AJ/booksRpile.png";
import home from "../../assets/Images by AJ/bckhome.png";

const ParentSign = () => {
    const [fullName, setFullName] = useState(""); // State for full name
    const [email, setEmail] = useState(""); // State for email
    const [pass, setPass] = useState(""); // State for password
    const [error, setError] = useState(""); // State for handling errors
    const navigate = useNavigate(); // React Router navigation hook

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        const level = "Parent"; // Fixed user level for parents

        // Validate input fields
        if (!fullName.trim() || !email.trim() || !pass.trim()) {
            setError("All fields are required.");
            return;
        }

        // Split the full name into fName and sName
        const [fName, ...sNameParts] = fullName.trim().split(" ");
        const sName = sNameParts.join(" ") || " "; // Handle cases where the last name has spaces

        try {
            // Use the imported Login function for validation
            const result = await Login(email, pass, level); // Pass the inputs to the Login function

            if (!result || !result.redirect) {
                setError("Invalid credentials. Please check your details.");
                return;
            }

            console.log("Login successful:", result);

            // Store user details in cookies
            Cookies.set("UID", result.userId, { expires: 1, secure: true });
            Cookies.set("Level", level, { expires: 1, secure: true });

            // Redirect the user to the parent dashboard
            navigate(result.redirect);
        } catch (error) {
            console.error("An error occurred during login:", error);
            setError("A network error occurred. Please try again.");
        }
    };

    return (
        <div className="parentSign-con">
            <Link to={`/`}><img id="home" src={home} alt="backHome" /></Link>
            <form onSubmit={handleSubmit} className="form-p">
                <h1 id="ParentSign-h1">Parent Sign In</h1>
                <div className="img-Con-P">
                    <div className="image-box-P">
                        <img src={twoStars} alt="Star" />
                        <label htmlFor="upload-photo" className="up-lbl-P">Upload Photo</label>
                        <input type="file" id="upload-photo" className="up-inp-P" />
                    </div>
                    <img src={booksRpile} alt="Books Pile" className="booksRpile-image" />
                </div>

                <div className="form-group-P">
                    <label htmlFor="fullName">Enter Your Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                </div>

                <div className="form-group-P">
                    <label htmlFor="email">Enter Your Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="form-group-P">
                    <label htmlFor="pass">Enter Your Password</label>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button type="submit" className="sub-BP">
                    Submit
                </button>

                {/* Error message display */}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default ParentSign;
