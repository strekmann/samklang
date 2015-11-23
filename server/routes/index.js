import express from "express";
import passport from "passport";
import {User} from "../models";

var router = express.Router();

router.get("/", function(req, res, next){
    var data = {};
    res.renderReact('index', data);
});

router.post("/register", (req, res, next) => {
    let name = req.body.name.trim();
    let email = req.body.email.trim();
    let password = req.body.password;  // should not trim this

    // simple validation
    if (!name || !email || !password) {
        return next(new Error(res.locals.__("All fields are needed")));
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.save((err, user) => {
        if (err) { return next(err); }

        // let the new user be logged in
        req.logIn(user, (err) => {
            if (err) { return next(err); }

            // if everything is OK, redirect to front page
            // TODO: Use better redirect.
            res.redirect("/");
        });
    });
});

export default router;
