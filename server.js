const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());



app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});


const dbconfig = require('./config/database.config.js');
const mongoose =  require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Successfully connected to database");
}).catch(err=>{
    console.log("Could not connect to database",err);
        process.exit();
});


app.get('/',(req,res)=>{
    res.json('Message',"Its working");
});


require('./app/routes/patient.routes.js')(app);

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
