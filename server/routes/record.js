import express from "express";
import session from "express-session";
import db from "../db/connection.js" // DB connection
import {ObjectId} from "mongodb";

const router = express.Router(); // Router defines routes
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

// Get records
router.get("/", async (req, res) => {
    let collection = await db.collection("Users");
    let results = await collection.find({}).toArray();

    res.send(results).status(200);
});

// Get 1 record
router.get("/getOne/:id", async (req, res) => {
    let collection = await db.collection("Users");
    let query = {_id: new ObjectId(req.params.id)}
    let result = await collection.findOne(query)

    if (!result) {
        res.send("Not found").status(404)
    } else {
        res.send(result).status(200)
    }
});

router.post("/login", async (req, res) => {
    const body = await req.body;
    const {username, pass, level} = body;

    let collection = await db.collection("Users");
    let query = {
        email: username,
        pass: pass,
        level: level,
    }
    let result = await collection.findOne(query)
    if (!result) {
        res.sendStatus(404)
    } else {

        res.send("Login successful!").status(200)
    }
})

// TODO: https://www.geeksforgeeks.org/how-to-handle-sessions-in-express/ Continue with sessions

router.get("/setSession", async (req, res) => {
    req.session.user = {id: "1", username: "test"}
    res.send("Session is logged in")
})

router.get("/getSession", async (req, res) => {
    if (req.session.user) {
        res.send('Session data: '
            + JSON.stringify(req.session.user));
    } else {
        res.send('No session data found');
    }
})

// Create record
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            fName: req.body.fName,
            sName: req.body.sName,
            pass: req.body.pass,
            email: req.body.email,
            level: req.body.level
        };
        let collection = await db.collection("Users");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record")
    }
});

// Update record
router.patch("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const updates = {
            $set: {
                fName: req.body.fName,
                sName: req.body.sName,
                pass: req.body.pass,
                email: req.body.email,
                level: req.body.level
            }
        };

        let collection = await db.collection("Users");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record")
    }
})

// Delete a record
router.delete("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const collection = await db.collection("Users");
        let result = await collection.deleteOne(query)
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record")
    }
})

export default router;