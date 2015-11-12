import express from "express";
import expressBunyan from "express-bunyan-logger";
import fs from "fs";
import libby from "libby";
import moment from "moment";
import path from "path";
import consolidate from "consolidate";

import db from "./lib/db";
import log from "./lib/logger";
import middleware from "./lib/middleware";
import passport from "./lib/passport";
import pkg from "../package";
import settings from "./settings";

import indexRoutes from "./routes";

settings.sessionName = settings.sessionName || pkg.name || "connect.sid";

var app = libby(express, settings, db);

if (app.settings.env === "development" || app.settings.env === "production"){
    let bunyanOpts = {
        logger: log,
        excludes: ["req", "res", "req-headers", "res-headers"]
    };
    app.use(expressBunyan(bunyanOpts));
    app.use(expressBunyan.errorLogger(bunyanOpts));
}

app.passport = passport;
app.use(app.passport.initialize());
app.use(app.passport.session());

app.use(middleware.addRenderReact);
app.use(middleware.addRenderHTML);

app.use(function(req, res, next){
    moment.locale(res.locals.locale);
    next();
});

app.engine('html', consolidate.lodash);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// passport routes here bitte

app.use("/", indexRoutes);

// static files for development
app.use("/", express.static(path.join(__dirname, "..", "public")));

app.use(function(err, req, res, next){
    log.error(err);

    res.format({
        html: function(){
            res.status(500).render("500", {
                error: err.message
            });
        },
        json: function(){
            res.status(500).json({
                error: err.message
            });
        }
    });
});

app.use(function(req, res, next){
    res.format({
        html: function(){
            res.status(404).render("404", {
                error: "file not found"
            });
        },
        json: function(){
            res.status(404).json({
                error: "file not found"
            });
        }
    });
});

export default app;
