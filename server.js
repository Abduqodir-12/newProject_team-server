const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4001;

// routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

// routes usage

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))