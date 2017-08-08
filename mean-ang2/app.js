//Import Node Modules
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');


const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}))
// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Failed to connect DB: ', err);

    } else {
        console.log('Connected to the DB ' + config.db);
    }
});

// Static directory
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication',authentication);

// Connect Server to Angular index.html
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});