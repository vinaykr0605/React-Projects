import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// Use this syntax  for mongodb creating articles collection
// const articleInfo = [
//     { name: 'learn-react', upvotes: 0, comments: [] },
//     { name: 'learn-node', upvotes: 0, comments: [] },
//     { name: 'mongodb', upvotes: 0, comments: [] },
// ];

const credentials = JSON.parse(fs.readFileSync("credentials.json"));

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();

app.use(express.json());

let db;

async function connectToDB() {
    const uri = "mongodb://127.0.0.1:27017";

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect();

    db = client.db("full-stack-react-db");
}

app.get("/api/articles/:name", async (req, res) => {
    const name = req.params.name;

    const article = await db.collection("articles").findOne({ name });

    res.json(article);
});

app.use(async function (req, res, next) {
    const authToken = req.headers.authtoken;

    if (authToken) {
        try {
            const user = await admin.auth().verifyIdToken(authToken);
            req.user = user;
            next();
        } catch (error) {
            console.error("Invalid token:", error);
            return res.status(401).send("Unauthorized: Invalid token");
        }
    } else {
        return res.status(401).send("Unauthorized: No token provided");
    }
});



app.post("/api/articles/:name/upvote", async (req, res) => {
    const name = req.params.name;
    const { uid } = req.user;

    const article = await db.collection("articles").findOne({ name });

    const upvotedIds = article.upvotedIds || [];

    const canUpvote = uid && !upvotedIds.includes(uid);

    if (canUpvote) {
        const updatedArticle = await db.collection("articles").findOneAndUpdate(
            { name },
            {
                $inc: { upvotes: 1 },
                $push: { upvotedIds: uid },
            },
            {
                returnDocument: "after",
            }
        );
        res.json(updatedArticle);
    } else {
        res.sendStatus(403);
    }
});

app.post("/api/articles/:name/comments", async (req, res) => {
    const name = req.params.name;
    const { postedBy, text } = req.body;

    const comment = await db.collection("articles").findOneAndUpdate(
        { name },
        {
            $push: { comments: { postedBy, text } },
        },
        {
            returnDocument: "after",
        }
    );
    res.json(comment);
});

async function start() {
    await connectToDB();
    app.listen(8000, function () {
        console.log("Server is running on port 8000");
    });
}

start();
