const express = require('express')
const app = express()
const profileMagementRoute=require('./routes/profileManagementRoute')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
app.use(bodyParser.json());
app.use(cors())

//connect to DB
mongoose
    .connect('mongodb+srv://saisunil:mongo!123@cluster0-i4z56.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));
app.use('/user',profileMagementRoute)

//Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server running on port ${PORT}`));