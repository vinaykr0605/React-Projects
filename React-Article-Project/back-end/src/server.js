import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

// Use this syntax  for mongodb creating articles collection
// const articleInfo = [
//     { name: 'learn-react', upvotes: 0, comments: [] },
//     { name: 'learn-node', upvotes: 0, comments: [] },
//     { name: 'mongodb', upvotes: 0, comments: [] },
// ];

const app = express();

app.use(express.json());

let db;

async function connectToDB() {

    const uri = 'mongodb://127.0.0.1:27017';

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    db = client.db('full-stack-react-db');
}

app.get('/api/articles/:name', async (req, res) => {
    const name = req.params.name;

    const article = await db.collection('articles').findOne({ name });

    res.json(article);
    res.sendStatus(200);

});

app.post('/api/articles/:name/upvote', async (req, res) => {
    const name = req.params.name;
    const updatedArticle = await db.collection('articles').findOneAndUpdate
        ({ name },
            {
                $inc: { upvotes: 1 },
            },
            {
                returnDocument: 'after',
            }
        );
    res.json(updatedArticle);
    res.sendStatus(200);
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const name = req.params.name;
    const { postedBy, text } = req.body;

    const comment = await db.collection('articles').findOneAndUpdate
        ({ name },
            {
                $push: { comments: { postedBy, text } },
            },
            {
                returnDocument: 'after',
            }
        );
    res.json(comment);
    res.sendStatus(200);
});

async function start() {
    await connectToDB();
    app.listen(8000, function () {
        console.log('Server is running on port 8000');
    });
}

start();