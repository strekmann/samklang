import passport from 'passport';
import LocalStrategy from 'passport-local';

import {User} from '../models';
import log from './logger';
import settings from '../settings';


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => {
        if (err) {
            return done(err.message, null);
        }
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    });
});

passport.passportLocal = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        const _email = email.toLowerCase();

        User.findOne({email: _email}, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user with email ' + _email }); }

            user.authenticate(password, (err, ok) => {
                if (err) { return done(err); }
                if (ok) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Invalid password' });
            });
        });
    }
);

passport.use(passport.passportLocal);
export default passport;
