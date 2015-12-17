import express from 'express';
import expressBunyan from 'express-bunyan-logger';
import libby from 'libby';
import moment from 'moment';
import path from 'path';
import consolidate from 'consolidate';
import _ from 'lodash';
import passportSocketIO from 'passport.socketio';
import Socketio from 'socket.io';

import db from './lib/db';
import log from './lib/logger';
import {addRenderReact} from './lib/middleware';
import passport from './lib/passport';
import pkg from '../package';
import settings from './settings';

import indexRoutes from './routes';
import authRoutes from './routes/auth';
import socketRoutes from './routes/socket';


var app = libby(express, settings, db);
var io = new Socketio();
var socketOptions = _.assign(app.sessionConfig, {
    success: (data, accept) => {
        log.debug('successful auth');
        accept();
    },
    fail: (data, message, error, accept) => {
        log.debug('auth failed', message);
        accept(new Error(message));
    },
});
io.path('/s');

io.use(passportSocketIO.authorize(socketOptions));
app.io = io;

settings.sessionName = settings.sessionName || pkg.name || 'connect.sid';

if (app.settings.env === 'development' || app.settings.env === 'production') {
    const bunyanOpts = {
        logger: log,
        excludes: ['req', 'res', 'req-headers', 'res-headers'],
    };
    app.use(expressBunyan(bunyanOpts));
    app.use(expressBunyan.errorLogger(bunyanOpts));
}

app.passport = passport;
app.use(app.passport.initialize());
app.use(app.passport.session());

app.use(addRenderReact);

app.use((req, res, next) => {
    moment.locale(res.locals.locale);
    res.locals.stamp = app.stamp;

    res.locals.html = '';
    res.locals.page = 'index';
    next();
});

app.engine('html', consolidate.lodash);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// passport routes here bitte
app.post('/_/auth/login', passport.authenticate('local'), (req, res) => {
    res.format({
        html: () => {
            res.redirect('/');
        },
        json: () => {
            res.json(_.pick(req.user, '_id', 'name', 'email_verified'));
        },
    });
});
app.get('/_/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/socket', function(req, res, next) {
    res.render('socket');
});

app.use('/', indexRoutes);
app.use('/_/auth', authRoutes);

socketRoutes(app.io);

// static files for development
app.use('/_/', express.static(path.join(__dirname, '..', 'public')));

app.use((err, req, res, next) => {
    log.error(err);

    res.format({
        html: () => {
            res.status(500).render('500', {
                error: err.message,
            });
        },
        json: () => {
            res.status(500).json({
                error: err.message,
            });
        },
    });
});

app.use((req, res, next) => {
    res.format({
        html: () => {
            res.status(404).render('404', {
                error: 'file not found',
            });
        },
        json: () => {
            res.status(404).json({
                error: 'file not found',
            });
        },
    });
});

export default app;
