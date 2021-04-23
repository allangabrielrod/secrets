module.exports.loginRequired = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    } else {
        return next();
    }
}

module.exports.isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("back");
    } else {
        next();
    }
}