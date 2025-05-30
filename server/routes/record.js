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

//Have to get back to this since I'm getting errors.. (ERRORS FIXED MWAHAHAHA.. But still have to get the childId)
// Getting books for a specific user (For Child's Library)
router.get("/getBooks", async (req, res) => {
    try {
        const childID = req.query.childID; // Get childID from query params

        // If no childID is provided, return an error
        if (!childID) {
            return res.status(400).send("Child ID is required.");
        }

        let collection = await db.collection("Books");

        // Construct query to filter by childID
        let query = { childID };

        // Find books for the specific child
        let books = await collection.find(query).toArray();

        if (books.length === 0) {
            return res.status(404).send("No books found for this child.");
        }

        // Send back books as JSON
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send("Error fetching books from the database.");
    }
});


// This too.. sorry goiys
// Adding a new book to the user's library (For Child's Library)
router.post("/addBook", async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the request body to check incoming data

        const { isbn, title, author, childID } = req.body;

        if (!isbn || !title || !author || !childID) {
            return res.status(400).send("All fields (isbn, title, author, childID) are required.");
        }
        let newBook = {
            isbn,
            title,
            author,
            childID, // Will be "Unknown" if not signed in (Jst for the moment until codes with session and login is merged)
            addedAt: new Date(),
        };

        let booksCollection = await db.collection("Books");

        const existingBook = await booksCollection.findOne({ isbn });
        if (existingBook) {
            return res.status(400).send("This book already exists in the library.");
        }

        let result = await booksCollection.insertOne(newBook);

        res.status(201).send({ message: "Book added successfully!", id: result.insertedId });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send("Error adding book to the library.");
    }
});

export default router;