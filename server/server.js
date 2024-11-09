import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

console.log("Loaded URI:", process.env.URI)

import express from 'express';
import cors from 'cors';
import records from './routes/record.js';


const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
})