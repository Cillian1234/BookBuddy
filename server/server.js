import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import records from "./routes/record.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/record", records);



// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});