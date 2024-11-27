const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorHandler');
const port = process.env.port||5000;
const connectDB = require('./connect/database')


connectDB();
const app = express();


//use JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Api for Tasks
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


//use Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));