const mongoose = require("mongoose");
require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { OpenAI } = require('langchain/llms/openai');
const { PineconeClient } = require('@pinecone-database/pinecone');
const apiKey = process.env.OPENAI_API_KEY;

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.set("strictQuery", false);
function mongoConnect() {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
    }).then(() => {
        console.log('Connected to database')
    }).catch(err => {
        throw err;
    })
}


const initOpenAI = async()=>{
    try {
        const model = new OpenAI({
            openAIApiKey: apiKey,
            temperature: 0.9, 
        });
        return model;
    } catch (error) {
        console.log(error);
        throw new Error('failed to initialize openAI assistant');
    }
}

const initPinecone = async()=>{
    try {
        const pinecone = new PineconeClient();
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT,
            apiKey: process.env.PINECONE_API_KEY,
        })
        return pinecone;
    } catch (error) {
        console.log(error);
        throw new Error('failed to initialize Pinecone client');
    }
}

module.exports = {initPinecone, initOpenAI, mongoConnect};
