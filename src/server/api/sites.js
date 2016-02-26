import { Router } from 'express';
import { Site } from '../models';

function getSites(req) {
    return Site.find({ admins: req.user.id }).populate('admins', 'name').exec();
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
});

export default router;
export { getSites };
