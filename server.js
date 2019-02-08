const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const email = require('./routes/api/email');

const app = express();

// Body parser Middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Morgan Middleware
app.use(morgan('dev'));

// Use Routes 
app.use('/api/email', email);

const port = process.env.port || 5000;

app.listen(port, () => { console.log(`Server running on port ${port}`); });