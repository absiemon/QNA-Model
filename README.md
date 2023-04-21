# QNA-Model
This is a AI Chat Model trained on our own set of data. 
This is a MERN (MongoDB, Express, React, Node.js) application that serves as a starter template for building web applications. It has been created with best practices in mind and includes various features such as authentication, routing, and database integration.
Various other tools have been used like OpenAI API, Langchain, Pinecone etc.

![image](https://user-images.githubusercontent.com/106826721/233492392-252d8ece-ae2e-4807-8f78-acda96802bf4.png)
![image](https://user-images.githubusercontent.com/106826721/233492607-07e7e2c1-bbe4-4512-8d1f-7181fb36da79.png)

## Installation
1. Download project
```bash
$ git clone url
```
2. Download required node packages using the npm install command:

```bash
$ npm install
```
3. Create a .env file in root directory of the api directory of the application and add the following variables:
```bash
MONGODB_URI= your-mongo-uri
OPENAI_API_KEY = your-openai-api-key
PINECONE_API_KEY = your-pinecone-api-key
PINECONE_ENVIRONMENT = your-pinecone-environment
PINECONE_INDEX_NAME = your-pinecone-index-name
```
4. To Get the Pinecone credentials.
* go to pinecone website.
* create an account.
* create an index of dimension 1536.
* copy all the credentilas needed.
5. Create a .env file in startup directory of the api directory of the application and add the following variables:
```bash
OPENAI_API_KEY = your-open-api-key
```
6. Create a .env file in config directory of the api directory of the application and add the following variables:
```bash
OPENAI_API_KEY = your-openai-api-key
PINECONE_API_KEY = your-pinecone-api-key
PINECONE_ENVIRONMENT = your-pinecone-environment
PINECONE_INDEX_NAME = your-pinecone-index-name
```
7. Create a .env file in root directory of the client directory and add the following variables:
```bash
VITE_API_BASE_URL = your-api-base-url ( ex:- http://localhost:port/api )
```
8. Go to download directory of api directory and paste a url of desired youtube video for transcription.

9. Execute the below command to download, compress, spliting into chunks, transcribing and embedding the vector into pinecone:
```bash
$ npm run dev
```
10. start the server using below command:
```bash
$ npm start
```
11. start the frontend using below command:
```bash
$ npm run dev.
```
## User Guide

1. Start by creating a chat by clicking on create chat.
2 you can start by asking how are you today.
3. Ask the question related the data that you have provided.
4. You can delete a chat but all messages related to that chat will be deleted.
5. All the chats and messages are stored in mongoDB database.
6. Make sure to use your own API keys.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
