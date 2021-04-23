const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

router.get("/google/secrets",
    passport.authenticate("google", {
        successRedirect: "/secrets",
        failureRedirect: "/login"
    })
);

router.get("/facebook",
    passport.authenticate("facebook"));

router.get("/facebook/secrets",
    passport.authenticate("facebook", {
        successRedirect: "/secrets",
        failureRedirect: "/login"
    })
);

module.exports = router;