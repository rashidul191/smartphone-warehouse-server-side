const express = require ("express");
const cors = require("cors");
require ("dotenv").config();
const port = process.env.PORT || 5000;
const app = express()


// middleware
app.use(cors())
app.use(express.json())

// get response server
app.get("/", (req, res)=>{
    res.send("Running server side")
})

// listen port
app.listen(port, ()=>{
    console.log("listen port: ", port)
})