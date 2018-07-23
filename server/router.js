const router = require("express").Router(),
	User = require("./user"),
	path = require("path"),
	lab = require("./lab_data"),
	data = require("./demo_data");

router.get("/", (req, res) => {
	if (req.session.userId) {
		return res.sendFile(path.join(__dirname + "/../public/index.html"));
	}
	return res.sendFile(path.join(__dirname + "/../public/login.html"));
});

router.get("/data", (req, res) => {
	User.findById(req.session.userId, (error, user) => {
		res.send([user, lab]);
	});
});

router.get(["/patients", "/appointments"], (req, res) => {
	res.redirect("/");
});

router.get("/demo", (req, res) => {
	res.sendFile(path.join(__dirname + "/../public/index.html"));
});

router.get("/demo_data", (req, res) => {
	res.send([data, lab]);
});

router.post("/insert", (req, res) => {
	User.findById(req.session.userId, (err, user) => {
		if (err) {
			throw err;
		}
		if (user) {
			user.patients = req.body.patients;
			user.diagnosis_list = req.body.diagnosis_list;
			user.medicine_dose_list = req.body.medicine_dose_list;
			user.medicine_list = req.body.medicine_list;

			user.save(err => {
				if (err) throw err;
				res.send(user.toJSON());
			});
		}
	});
});

//POST route for updating data
router.post("/", (req, res, next) => {
	// confirm that user typed same password twice
	if (req.body.password !== req.body.passwordConf) {
		var err = new Error("Passwords do not match.");
		err.status = 400;
		res.send("passwords dont match");
		return next(err);
	}

	if (
		req.body.email &&
		req.body.username &&
		req.body.password &&
		req.body.passwordConf
	) {
		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		};

		User.create(userData, (error, user) => {
			if (error) {
				return next(error);
			} else {
				req.session.userId = user._id;
				return res.redirect("/");
			}
		});
	} else if (req.body.logemail && req.body.logpassword) {
		User.authenticate(
			req.body.logemail,
			req.body.logpassword,
			(error, user) => {
				if (error || !user) {
					var err = new Error("Wrong email or password.");
					err.status = 401;
					return next(err);
				} else {
					req.session.userId = user._id;
					return res.redirect("/");
				}
			}
		);
	} else {
		var err = new Error("All fields required.");
		err.status = 400;
		return next(err);
	}
});

// GET for logout logout
router.get("/logout", (req, res, next) => {
	if (req.session) {
		// delete session object
		req.session.destroy(function(err) {
			if (err) {
				return next(err);
			} else {
				res.setHeader("Content-Type", "text/html");
				return res.redirect("/");
			}
		});
	}
});

module.exports = router;
