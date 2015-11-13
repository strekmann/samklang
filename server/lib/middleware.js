import moment from "moment";
import Iso from "iso";
import React from "react";
import ReactDOMServer from "react-dom/server";
import alt from "../../react/alt";


var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }

    req.session.returnTo = req.originalUrl || req.url;
    res.redirect("/_/login");
};

var ensureAdmin = function(req, res, next){
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl || req.url;
        return res.redirect("/_/login");
    }

    if (req.user.is_admin === true){
        return next();
    }

    res.sendStatus(401);
};

var addRenderReact = function (req, res, next) {
    res.renderReact = function (page, data) {
        moment.locale(req.lang);

        var element = require("../../react/pages/" + page);

        alt.bootstrap(JSON.stringify(data));
        var html = Iso.render(ReactDOMServer.renderToString(React.createElement(element, {lang: req.lang})), alt.flush(), {react: true});

        res.render("react",{
            html: html,
            page: page
        });
    };
    next();
};

export {ensureAuthenticated, ensureAdmin, addRenderReact};
