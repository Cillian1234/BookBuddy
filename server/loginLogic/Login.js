import db from "../db/connection.js"; // Import MongoDB connection

export default async function Login(username, pass, level) {
    // TODO: I thought I was onto something man :(
    // U WERE UP TO SUM MAN! THANK YURRR~

    try {
        // Validate input specific to this form (username, pass, level)
        if (!username || !pass || !level) {
            throw new Error("All fields are required."); // Error for missing fields
        }

        // Query the database for the user with matching fields
        const user = await db.collection("Users").findOne({
            username, // Match the username
            level     // Match the user level (Parent, Teacher, or Child)
        });

        if (!user) {
            // If no matching user is found
            throw new Error("User not found. Please check your credentials.");
        }

        if (user.pass !== pass) {
            // If the provided password doesn't match the stored password
            throw new Error("Incorrect password.");
        }

        // If login is successful, return relevant data based on the level
        switch (level) {
            case "Parent":
                return { redirect: "/parent", userId: user._id };
            case "Teacher":
                return { redirect: "/teacher", userId: user._id };
            case "Child":
                return { redirect: "/child", userId: user._id };
            default:
                throw new Error("Invalid user level provided.");
        }
    } catch (error) {
        // Handle and propagate errors
        console.error("Error during login:", error.message);

        // Log specific message for debugging purposes
        if (error.message === "All fields are required.") {
            console.error("Missing fields in request.");
        } else if (error.message === "User not found. Please check your credentials.") {
            console.error("User not found in database.");
        } else if (error.message === "Incorrect password.") {
            console.error("Password mismatch.");
        } else {
            console.error("Unexpected error occurred during login.");
        }

        throw error; // Re-throw the error for handling by the caller
    }

    // .then(data => {
        //     if (data) {
        //         switch (level) {
        //             case "Teacher": return redirect('/teacher');
        //             case "Parent": return '/parent';
        //             case "Child": return '/child';
        //             default: return null;
        //         }
        //     }
        // })

    return null;
}
