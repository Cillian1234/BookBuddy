import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"; // Load environment variables
import "express-async-errors"; // Support async errors
import records from "./routes/record.js"; // Import the routes
import session from "express-session";

const PORT = process.env.PORT || 8080; // Use environment variable or default port
const app = express();

app.use(cors());
app.use(express.json()); // Parse incoming JSON data
app.use(
    session({
        secret: "Pookie:3", // Replace with a secure key
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 24, // 1 day session expiration
        },
    })
);

// Load the /record routes
app.use("/record", records);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
