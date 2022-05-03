const express = require('express')
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express());
app.use(bodyParser());



const uri = "mongodb+srv://books:D8Kn1IyvFUNTbnHN@cluster0.un1it.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const booksCollection = client.db("booksCollection").collection("collection");
        app.get('/books', async (req, res) => {
            const query = {};
            const cursor = booksCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await booksCollection.findOne(query);
            res.send(service);
        })
        //post one data
        app.post('/books', async (req, res) => {
            const newService = req.body;
            const result = await booksCollection.insertOne(newService);
            res.send(result);
        });
        //delete Data
        app.delete('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await booksCollection.deleteOne(query);
            res.send(result);
        });
    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})