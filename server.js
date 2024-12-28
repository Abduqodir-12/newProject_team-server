const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4001;

// routes
const userRouter = require('./src/Router/userRouter');
const tranportRouter = require('./src/Router/transportRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

// routes usage
app.use('/api/user', userRouter);
app.use('/api/transport', tranportRouter);

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {}).then(() => {
    console.log('Connect to DB');
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
}).catch(error => {
    console.log(error);
})