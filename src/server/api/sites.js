import { Router } from 'express';
import { Site } from '../models';

function getSites(req) {
    return Site.find({ admins: req.user.id }).populate('admins', 'name').exec();
}

function getSite(req) {
    return Site.findOne({ identifier: req.params.id }).populate('admins', 'name').exec();
}

function createSite(req) {
    const site = new Site(req.body.site); // TODO: use _.pick
    site.admins.addToSet(req.user.id);
    return site.save();
}

const router = new Router();
router.route('/')
.get((req, res, next) => {
    if (req.user) {
        getSites(req)
        .then((sites) => {
            res.json({ sites });
        })
        .catch((err) => {
            next(err);
        });
    }
    else {
        res.json({ sites: [] });
    }
})
.post((req, res, next) => {
    if (req.user) {
        createSite(req)
        .then((site) => {
            res.json({ site });
        })
        .catch((err) => {
            next(err);
        });
    }
    else {
        res.sendStatus(401);
    }
});

router.route('/:id')
.get((req, res, next) => {
    getSite(req)
    .then((site) => {
        res.json({ site });
    });
});

export default router;
