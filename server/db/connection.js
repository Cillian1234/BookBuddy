import { MongoClient } from "mongodb"; // Import MongoDB client
import dotenv from "dotenv"; // Import dotenv to handle environment variables

dotenv.config(); // Load environment variables from .env file

// Get the MongoDB connection string from environment variables
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);
let db;

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        const conn = await client.connect(); // Connect to MongoDB
        db = conn.db("BookBuddy"); // Use the specific database
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

// Initialize the database connection
await connectToDatabase();

export default db; // Export the database object for use in other files
