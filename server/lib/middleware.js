var ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }

    req.session.returnTo = req.originalUrl || req.url;
    res.redirect('/_/login');
};

var ensureAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl || req.url;
        return res.redirect('/_/login');
    }

    if (req.user.is_admin === true) {
        return next();
    }

    res.sendStatus(401);
};

export {ensureAuthenticated, ensureAdmin};
