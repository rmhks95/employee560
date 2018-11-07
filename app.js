const express = require('express');
const path = require('path');
const services = require('./services.js')

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getAll', (req,res) =>  {
    services.getAll(req,res);
});

// An api endpoint that returns a employee based off the id
app.get('/api/getEmployee/:id', (req,res) =>  {
    services.getEmployee(req,res);
});

app.post('/api/custom', (req,res)=> {
    services.custom(req,res);
})

app.post('/api/newEmployee', (req, res) => {
    services.newEmployee(req,res);
});




// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/lost.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);