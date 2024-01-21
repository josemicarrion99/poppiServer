const { MongoClient } = require("mongodb");

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const keyVaultName = 'db-connection-string';
const secretName = 'MongoDBConnectionString';
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUrl, credential);

async function getSecret() {
    const secret = await secretClient.getSecret(secretName);
    return secret.value;
}

async function startServer() {

    const uri = await getSecret();


    const dbName = "poppi";
    const collectionName = "surveyResults";

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
        const surveyData = JSON.parse(req.body.surveyData);
        console.log(surveyData);

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

    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
}

startServer();
