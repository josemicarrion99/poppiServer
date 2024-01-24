// const { MongoClient } = require("mongodb");
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
// const dbName = process.env.DATABASE_NAME;
// const collectionName = "surveyResults";

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
// const uri = process.env.AZURE_COSMOS_CONNECTIONSTRING || 'fallback_connection_string';
// console.log(dbName)
// console.log(uri)

// const client = new MongoClient(uri);

// client.connect()
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch(err => {
//         console.error('Error connecting to MongoDB:', err);
//     });

// const database = client.db(dbName);
// const collection = database.collection(collectionName);

// app.post('/saveSurvey', async (req, res) => {
//     console.log(req.body);

//     const surveyData = JSON.parse(req.body.surveyData);

//     try {
//         const insertResult = await collection.insertOne(surveyData);
//         console.log(`Documents successfully inserted.\n`);
//         res.status(200).json({ message: 'Survey data saved successfully' });
//     } catch (error) {
//         console.error('Error saving survey data:', error);
//         res.status(500).json({ message: 'An error occurred while saving survey data' });

//     }

// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});