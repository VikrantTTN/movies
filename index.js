const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users=require('./routes/users');
const authentication=require('./routes/authentication');
const express = require('express');
const handleErrors = require('./middleware/handleErrors');
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesApi',{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'+err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users);
app.use('/api/authentication',authentication);

app.use(handleErrors)


const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));