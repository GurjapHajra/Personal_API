const express = require("express")
const app = express();
const bodyParser = require("body-parser")
require("dotenv/config")
const mongoose = require("mongoose");

//import ROUTES
const LogScaleRoute = require("./routes/LogScale")

app.use(bodyParser.json())
app.use("/LogScale",LogScaleRoute)


//ROUTES
app.get('/', (req, res) =>{
    res.send("Welcome to home directory")
})

mongoose.connect(process.env.connect_string, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {app.listen(process.env.port || 5000);console.log("connected to db")})
.catch((err) => console.log(err));