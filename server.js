const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();


//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.get("/", (req,res)=>{
    res.status(200).send({
        message: "server running",
    });
});

//listen port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
    
    );

    });
