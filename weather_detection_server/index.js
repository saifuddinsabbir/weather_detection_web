const express = require('express')
const cors = require('cors')
const mongodb = require('mongodb')
const { MongoClient } = mongodb
const app = express()
app.use(cors())
require('dotenv').config()
app.use(express.json())
const port = 4000
const url = "mongodb+srv://weather_detection:weather_detection12345@cluster0.pz1hxyg.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function server() {
    try {
        await client.connect()
        const database = client.db("Weather_Database")
        const weatherCollection = database.collection("weather")
        const userCollection = database.collection("users")

        app.get('/weather', async (req, res) => {
            //const filter = {"class": {$lte: 2}}
            const result = await userCollection.find({}).toArray();
            res.json(result);
        })
    }
    finally {
    }
}

server().catch()
app.get('/', (req, res) => {
    res.json('Hello World')
})

app.listen(port, () => {
    console.log(port);
})