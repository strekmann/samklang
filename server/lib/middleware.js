import moment from 'moment';
import Iso from 'iso';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import alt from '../../react/alt';


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

var addRenderReact = (req, res, next) => {
    res.renderReact = (page, data) => {
        var html;
        var element = require('../../react/pages/' + page).default;

        moment.locale(req.lang);

        alt.bootstrap(JSON.stringify(data));
        html = Iso.render(ReactDOMServer.renderToString(React.createElement(element, {lang: req.lang})), alt.flush(), {react: true});

        res.render('react', {
            html: html,
            page: page,
        });
    };
    next();
};

export {ensureAuthenticated, ensureAdmin, addRenderReact};
