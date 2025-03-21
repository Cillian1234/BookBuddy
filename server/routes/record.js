import express from "express";
import db from "../db/connection.js" // DB connection
import {ObjectId} from "mongodb";

const router = express.Router(); // Router defines routes

/*
 TODO: Change all variable names to match field in DB so queries can be written as
 Query = {teacherID}
*/

// Get records
router.get("/", async (req, res) => { // "/" is path for this route
    let collection = await db.collection("Users"); // In collection Users
    let results = await collection.find({}).toArray(); // Find all entries, convert data to array

    res.send(results).status(200); // return array and status code 200
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

router.post("/getReviews", async (req, res) => {
    const body = await req.body;
    const {childID} = body;

    let collection = await db.collection("Reviews");
    let results = await collection.find({
        childID
    }).toArray();

    res.send(results).status(200);
});

router.post("/setReview", async (req, res) => { // "setReview"
    const body = await req.body; // Wait for content of request
    const {childID, stars, teacherName, teacherComment} = body; // Destructure body into individual data that was sent
    try { // try
        let newReview = { // make an object containing data formatted correctly for DB collection
            childID,
            stars: Number(stars),
            comment: teacherComment,
            teacherName,
        };
        let collection = await db.collection("Reviews"); // In Reviews collection
        let result = await collection.insertOne(newReview); // Insert review object
        res.send(result).status(204); // Return result (which is null) and status 200
    } catch (err) { // Or it fucks up
        console.error(err);
        res.status(500).send("Error adding record")
    }
});

router.post("/getAssignments", async (req, res) => { // Get with .post as the method, needed if you want to search with params
    const body = await req.body; // Body from req
    const {childID} = body; // Destructure childID

    let collection = await db.collection("Assignments"); // Search in Assignments
    let results = await collection.find({
        assignedTo: childID
    }).toArray(); // Find entries where assignedTo matches childID

    res.send(results).status(200); // Return results as array
});

router.post("/setAssignment", async (req, res) => {
    const body = await req.body;
    const {assignedTo, assignmentContent, teacherName, dueDate} = body;
    try {
        let newAssignment = {
            assignedTo,
            assignmentContent,
            teacherName,
            dueDate,
        };
        let collection = await db.collection("Assignments");
        let result = await collection.insertOne(newAssignment);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record")
    }
});

router.post("/updateAssignment", async (req, res) => {
    const body = await req.body;
    const {_id} = body;

    let collection = await db.collection("Assignments");
    let filter = {_id}
    let update = {$set: {"submitted": true}}
    let results = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { submitted: true } }
    );

    res.send(results).status(200);
});

router.post("/AddToClass", async (req, res) => {
    const body = await req.body;
    const {teacherID, studentName, studentID} = body;
    try {
        let filter = {teacherID}
        let query = {
            $push: {
                students: {
                    name: studentName,
                    studentID: studentID,
                    notifications: 0
                }
            }
        }
        let collection = await db.collection("Classrooms");
        let result = await collection.updateOne(filter, query);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record")
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
        res.send(null).status(404)
    } else {
        res.send(result._id).status(200)
    }
})

router.post("/getUserInfo", async (req, res) => {
    const body = await req.body;
    const {_id} = body;

    let collection = await db.collection("Users");
    let results = await collection.find({
        _id: new ObjectId(_id),
    }).toArray();

    res.send(results).status(200);
});

router.post("/getClassroom", async (req, res) => {
    const body = await req.body;
    const {_id} = body;

    let collection = await db.collection("Classrooms");
    let results = await collection.find({
        teacherID: _id,
    }).toArray();

    res.send(results).status(200);
});

router.post("/getClassAssignments", async (req, res) => {
    const body = await req.body;
    const {_id} = body;

    let collection = await db.collection("Assignments");
    let results = await collection.find({
        assignedTo: _id
    }).toArray();

    res.send(results).status(200);
});

// TODO: https://www.geeksforgeeks.org/how-to-handle-sessions-in-express/ Continue with sessions

router.get("/setSession", async (req, res) => {

})

router.get("/getSession", async (req, res) => {

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

// TODO: make delete user entry in classroom student table
router.delete("/deleteStudent/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const collection = await db.collection("Classrooms");
        let result = await collection.deleteOne(query)
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record")
    }
})

export default router;