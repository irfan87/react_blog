const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./configs/key");

// load models
const User = require("./models/user");

// load env
require("dotenv").config();

app = express();

// set the port and print the shout to make sure it's work!
const PORT = process.env.PORT || 5000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// route
// save new user
app.post("/api/users/register", (req, res) => {
	const user = new User(req.body);

	user.save((err, userData) => {
		if (err) {
			return res.json(`Error: ${err}`);
		}

		return res.status(200).json("New User added!");
	});
});

// add mongodb middleware
// const mongo_uri = process.env.MONGO_URI;
mongoose.connect(config.mongoUri, {
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
