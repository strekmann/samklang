import { Router } from 'express';
import { Site } from '../models';

const router = new Router();

router.route('/')
.get((req, res, next) => {
    if (req.user) {
        Site.find({ admins: req.user }).populate('admins', 'name').exec((err, sites) => {
            if (err) {
                return next(err);
            }
            return res.json({ sites });
        });
    }
    else {
        return res.json({ sites: [] });
    }
});

export default router;
