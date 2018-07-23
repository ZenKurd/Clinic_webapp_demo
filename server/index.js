const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	session = require("express-session"),
	MongoStore = require("connect-mongo")(session),
	path = require("path"),
	cors = require("cors");

let db;

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zen-clinic";

mongoose.Promise = global.Promise;
mongoose.connect(
	URI,
	{ useNewUrlParser: true }
);

db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	// we're connected!
});

//use sessions for tracking logins
app.use(
	session({
		secret: "ASjflksdASDLJKSADL:DSAK234245432@#$%$#@%$#@%",
		resave: true,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: db
		})
	})
);

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(
	express.static(path.join(__dirname, "../public"), {
		index: false,
		extensions: ["html"]
	})
);

// include routes
const routes = require("./router");
app.use("/", routes);

// listen on port 3000
app.listen(process.env.PORT || 3000);
