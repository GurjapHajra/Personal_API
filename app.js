const express = require("express")
const app = express();
const bodyParser = require("body-parser")
require("dotenv/config")
const mongoose = require("mongoose");

//fixes the cors error on the frontend
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//import ROUTES
const LogScaleRoute = require("./routes/logScale")

app.use(bodyParser.json())
app.use("/LogScale",LogScaleRoute)


//ROUTES
app.get('/', (req, res) =>{
    res.send("Welcome to home directory")
})

mongoose.connect(process.env.connect_string, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {app.listen(process.env.PORT || 5000, "0.0.0.0");console.log("connected to db")})
.catch((err) => console.log(err));