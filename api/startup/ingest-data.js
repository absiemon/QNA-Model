require('dotenv').config();
const fs = require('fs');
const {DirectoryLoader} = require('langchain/document_loaders');
const {TextLoader} = require('langchain/document_loaders/fs/text')
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const  initPinecone  = require('../config/pinecone.js');
const {PineconeStore} = require('langchain/vectorstores/pinecone');

const runInject = async () =>{

    const embeddings = new OpenAIEmbeddings();
    const loader = new DirectoryLoader(
        '../data',
        {
            ".txt": (path) => new TextLoader(path),
        }
    );
    
    loader.load().then( async (docs)=>{
        const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
        const texts = await textSplitter.splitDocuments(docs)
        const pineconeConfig = await initPinecone();
        const pineconeIndex = pineconeConfig.Index(process.env.PINECONE_INDEX_NAME);
        await PineconeStore.fromDocuments(texts, embeddings, { pineconeIndex:pineconeIndex});
        console.log("ingestion completed");
        fs.rmdir('../chunks', { recursive: true }, (err) => {
            if (err) throw err; 
            console.log('Folder deleted successfully');
        });
    }).catch(err => {
        console.log('Error', err)
        throw new Error('Failed to ingest your data');
    })
}

runInject();