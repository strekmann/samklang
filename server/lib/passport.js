import passport from "passport";
import LocalStrategy from "passport-local";

import {User} from "../models";
import log from "./logger";
import settings from "../settings";


passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(user_id, done) {
    User.findById(user_id, function(err, user){
        if (err) {
            return done(err.message, null);
        }
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    });
});

passport.passportLocal = new LocalStrategy(function(email, password, done){
    email = email.toLowerCase();

    User.findOne({email: email}, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + email }); }

        user.authenticate(password, function(err, ok) {
            if (err) { return done(err); }
            if (ok) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Invalid password' });
            }
        });
    });
});

passport.use(passport.passportLocal);
export default passport;
