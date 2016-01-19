import express from 'express';
import { ensureAuthenticated } from '../lib/middleware';
import { Site } from '../models';

const router = express.Router();

router.post('/create', ensureAuthenticated, (req, res, next) => {
    const identifier = req.body.identifier.trim();
    const name = req.body.name.trim();

    if (!name || !identifier) {
        return next(new Error(res.locals.__('Both name and identifier is needed')));
    }

    const site = new Site();
    site.name = name;
    site.identifier = identifier;
    site.admins.addToSet(req.user._id);
    site.save((err, site) => {
        if (err) { return next(err); }
        site.populate('admins', 'username', (err, site) => {
            if (err) { return next(err); }
            res.json({site: site});
        });
    });
});

export default router;
