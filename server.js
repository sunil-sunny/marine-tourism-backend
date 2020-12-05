const express = require('express');
const app = express();
require('dotenv').config();
const profileMagementRoute=require('./routes/profileManagementRoute');
const blogManagementRoute=require('./routes/blogManagementRoute');
const spotManagementRoute=require('./routes/spotManagementRoute');
const bookingManagementRoute=require('./routes/bookingManagementRoute');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));
app.use('/user',profileMagementRoute)
app.use('/blog',blogManagementRoute)
app.use('/spot',spotManagementRoute)
app.use('/booking',bookingManagementRoute)

//Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server running on port ${PORT}`));