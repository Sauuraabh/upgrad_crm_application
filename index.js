const express = require('express');
const mongoose = require('mongoose');
const app = express();
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');

app.use(express.json());

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on(`error`, () => {
    console.log('Error in connecting DB');
});

db.once(`open`, () => {
    console.log(`Successfully conected to MongoDb`);
});

require('./routes/auth.route')(app);
require('./routes/user.route')(app);
require('./routes/ticket.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is up and running on PORT : ${serverConfig.PORT}`)
});
    
/*
const { PORT, DB_URL } = require('./configs/config');

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on(`error`, () => {
    console.log(`Error in connecting DB`);
});

db.once('open', () => {
    console.log(`Successfully connected to MongoDB`);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});
*/
