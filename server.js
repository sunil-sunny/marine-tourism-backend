const express = require('express')
const app = express()
const profRoute=require('./routes/profileManagementRoute')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
app.use(bodyParser.json());
app.use(cors())

app.use('/user',profRoute)

//Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server running on port ${PORT}`));