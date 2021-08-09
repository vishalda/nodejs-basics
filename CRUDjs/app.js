const express = require('express')
const app = express()

const routes = require('./Routes/NotesRoutes.js');

app.use(express.json());
app.use(express.urlencoded());

app.use('/',routes);

module.exports = app;
