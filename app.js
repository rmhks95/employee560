const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const services = require('./services.js')

const app = express();




// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// An api endpoint that returns a short list of items
app.get('/api/getAll', (req,res) =>  {
    services.getAll(req,res);
});

app.get('/api/getStats', (req,res)=>{
    services.getStats(req,res);
})

// An api endpoint that returns a employee based off the id
app.get('/api/getEmployee/:name', (req,res) =>  {
    services.getEmployee(req,res);
});

app.get('/api/getfields/:name', (req,res)=> {
    services.getFields(req,res);
})


app.post('/api/newEmployee', (req, res) => {
    services.newEmployee(req,res);
});

app.post('/api/updateEmployee', (req, res) => {
    services.updateEmployee(req,res);
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/lost.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
