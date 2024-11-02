import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

try {
    await client.connect(); // Connect client to server
    await client.db("admin").command({ping: 1}); // Ping to confirm connection
    console.log("Connected to DB");
} catch (err) {
    console.error(err);
}

let db = client.db("employees");

export default db;