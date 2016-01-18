import express from 'express';
import _ from 'lodash';

var router = express.Router();

router.get('/', (req, res, next) => {
    var data = {};
    if (req.user) {
        data.AuthStore = {
            viewer: _.pick(req.user, '_id', 'name', 'email_verified'),
            wsconnected: false,
            usercount: 0,
        };
    }
    res.renderReact('index', data);
});

export default router;
