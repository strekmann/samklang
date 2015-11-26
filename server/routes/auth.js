import express from 'express';
import _ from 'lodash';
import {User} from '../models';

var router = express.Router();

router.post('/register', (req, res, next) => {
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const password = req.body.password;  // should not trim this

    // simple validation
    if (!name || !email || !password) {
        return next(new Error(res.locals.__('All fields are needed')));
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.save((err, user) => {
        if (err) { return next(err); }

        // let the new user be logged in
        req.logIn(user, (err) => {
            if (err) { return next(err); }

            res.json(_.pick(user, '_id', 'name', 'email_verified'));
        });
    });
});

export default router;
