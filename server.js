const { MongoClient } = require("mongodb");
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
// TODO:
// Altas cluster specifics. Be sure it includes
// a valid username and password! Note that in a production environment,
// you do not want to store your password in plain-text here.
const dbName = process.env.DATABASE_NAME;
const collectionName = "surveyResults";


// MongoDB connection string
const uri = process.env.DATABASE_URL || 'fallback_connection_string';
console.log(dbName)
console.log(uri)

const client = new MongoClient(uri);

client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

const database = client.db(dbName);
const collection = database.collection(collectionName);

app.post('/saveSurvey', async (req, res) => {
    console.log(req.body);

    const surveyData = JSON.parse(req.body.surveyData);

    try {
        const insertResult = await collection.insertOne(surveyData);
        console.log(`Documents successfully inserted.\n`);
        res.status(200).json({ message: 'Survey data saved successfully' });
    } catch (error) {
        console.error('Error saving survey data:', error);
        res.status(500).json({ message: 'An error occurred while saving survey data' });

    }

});

//figure out when to close the connection
// await client.close();
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});