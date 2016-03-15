import { Router } from 'express';
import { User } from '../models';
import { ensureAuthenticated } from 'libby';

function getUser(req) {
    return User.findById(req.params.id).exec();
}

const router = new Router();
router.use(ensureAuthenticated);
router.route('/:id')
.get((req, res, next) => {
    getUser(req)
    .then((user) => {
        if (!user) {
            res.status(404).json({
                status: 404,
                error: 'Could not find user',
            });
        }
        else {
            res.json({ user });
        }
    })
    .catch((err) => {
        next(err);
    });
});

export default router;
export { getUser };
