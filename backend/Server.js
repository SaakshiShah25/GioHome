// Required backend stuff
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Lib to access the .env file
require('dotenv').config();

// Initialize app select port
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// Get uri from 
const uri = process.env.MONGO_URI;

// Mongo Connection
mongoose.connect(uri,{useNewUrlParser : true, useCreateIndex : true})

const connection = mongoose.connection;
connection.once('open',()=>

    {
        console.log("MongoDb database connection established!")
    }
    
    )

app.use(cors());
// app.use(express.json());

// ####################_ALL_CONNECTIONs_SET_###############################//


// Routes 

const farmerRoute = require("./routes/farmer/farmer.route.js");
const productRoute = require("./routes/farmer/product.route.js");

app.use("/farmer",farmerRoute);
app.use("/product",productRoute);

// #################_KEEP_PORT_RUNNING_################ 
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
}
)




