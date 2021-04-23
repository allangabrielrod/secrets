const express = require("express");
const router = express.Router();
const passport = require("passport");

//Middleware
const middleware = require("../middleware");

//Models
const User = require("../models/user");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", middleware.isLogged, (req, res) => {
    res.render("login");
});

router.post("/login", middleware.isLogged, (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.logIn(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });
});

router.get("/register", middleware.isLogged, (req, res) => {
    res.render("register");
});

router.post("/register", middleware.isLogged, (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, use) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });
});

router.get("/secrets", (req, res) => {
    User.find({ secret: { $ne: null } }, (err, foundUsers) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUsers) {
                res.render("secrets/secrets", { usersWithSecrets: foundUsers });
            }
        }
    });
});

router.get("/submit", middleware.loginRequired, (req, res) => {

    res.render("secrets/submit");
});

router.post("/submit", middleware.loginRequired, (req, res) => {
    const submittedSecret = req.body.secret;

    User.findById(req.user.id, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else if (foundUser) {
            foundUser.secret = submittedSecret;
            foundUser.save(() => res.redirect("/secrets"));
        }
    });
});

router.get("/logout", middleware.loginRequired, (req, res) => {
    req.logOut();
    res.redirect("/");
});

module.exports = router;