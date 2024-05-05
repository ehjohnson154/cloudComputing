

const express = require('express')
const {MongoClient } = require('mongodb');

async function init_mongo() {
    const mongoHost = processs.env.MONGO_HOST || "localhost";
    const mongoPort = processs.env.MONGO_PORT || 27017;
    const mongoUser = processs.env.MONGO_USER;    
    const mongoPassword = processs.env.MONGO_PASSWORD;
    const mongoDBName = processs.env.MONGO_DB_NAME;

    const url = 
    `mongodb://${mongoUser}:${mongoPassword}:@` +
    `${mongoHost}:${mongoPort}/${mongoDBName}`

    return await MongoClient.connect(url)
}

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello, world!")
})

app.get('/lodgings', (req, res) => {
    const lodgings = client.db.collection('lodgings');
    const results = await collection.find('')
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})

async function init() {
    const client = 
    // TODO connect to MongoDB
    app.listen(3000, () => {
        console.log("listening on port 3000")
    })
}