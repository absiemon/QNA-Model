const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const router = require('./router/router');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());    // for reading cookies
const allowedOrigins = ['http://127.0.0.1:5173', 'https://blabber-alpha.vercel.app', 'http://localhost:5173'];
const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, Cookie'
};

app.use(cors(corsOptions));

require("./config/mongoDB")();

app.use('/api', router);
const port = process.env.PORT || 8000;

const server = app.listen(port);

