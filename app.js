const express = require("express");
const mongoose = require("mongoose");

// load env
require("dotenv").config();

app = express();

// set the port and print the shout to make sure it's work!
const PORT = process.env.PORT || 5000;

// add mongodb middleware
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

// test mongodb
const connection = mongoose.connection;
connection.once("open", () => console.log("Mongodb is running"));

// set the route
app.get("/", (req, res) => {
	res.send("Hello there!");
});

app.listen(PORT, (req, res) => console.log(`App is running on port ${PORT}`));
