const express = require('express');
const {errorHandler} = require('./middleware/errormiddleware');
// to use environment variables we need dotenv
const dotenv = require('dotenv').config();
const port = /*process.env.PORT||*/5000;

// Initialize express
const app = express();

// creating middleware

// body parser for raw json
app.use(express.json); 

app.use(express.urlencoded({extended:false}));

// overrides the default express error handler
app.use(errorHandler);

// GET request handle
app.get('/api/goals',require('./routes/goalRoutes'));

app.listen(port, () => {
    console.log(`server started listening on port ${port}`);
});