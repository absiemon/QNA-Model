require('dotenv').config();
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const initPinecone = require('./config/pinecone.js');
const initOpenAI = require('./config/openAI.js')
const { PineconeStore } = require('langchain/vectorstores/pinecone');
const { ConversationalRetrievalQAChain } = require('langchain/chains')

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
{context}
Question: {question}
Helpful answer in markdown:`;

const aksQuestions = async (query) => {

    const embeddings = new OpenAIEmbeddings();
    const pineconeConfig = await initPinecone();
    const pineconeIndex = pineconeConfig.Index(process.env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        {
            pineconeIndex: pineconeIndex,
            textKey: 'text',
        },
    );
    const model = await initOpenAI();
    const chain = ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever(),
        {
            qaTemplate: QA_PROMPT,
            questionGeneratorTemplate: CONDENSE_PROMPT,
            returnSourceDocuments: true, //The number of source documents returned is 4 by default
        },
    );
    const response = await chain.call({
        question: query,
        chat_history: [] ,
    });

    return response;
}

module.exports = aksQuestions;