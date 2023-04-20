const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { PineconeClient } = require('@pinecone-database/pinecone');

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

module.exports = initPinecone;