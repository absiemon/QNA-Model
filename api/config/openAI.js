require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const apiKey = process.env.OPENAI_API_KEY;

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

module.exports = initOpenAI;