const express = require('express');

const app = express();

const con = require('./db/db');

const cRouter = require('./api/country/country.router');

app.use(express.json());

app.use('/api', cRouter);

app.listen(3000, () => {
    console.log('application running on port 3000');
});