import { Router } from 'express';
import moment from 'moment';

import Project from '../models/project';

const router = new Router();

function getProjects(site) {
    return Project.find({ site }).exec();
}
function getProject(identifier, site) {
    return Project.findOne({ identifier, site }).exec();
}
function createProject(project, user, site) {
    project.creator = user;
    project.site = site;
    project.end = moment(project.end);
    const _project = new Project(project); // TODO: use _.pick
    return _project.save();
}

router.route('/')
.get((req, res, next) => {
    getProjects(req.site.id)
    .then((projects) => {
        res.json({ projects });
    })
    .catch(err => {
        next(err);
    });
})
.post((req, res, next) => {
    if (req.user) {
        createProject(req.body.project, req.user.id, req.site.id)
        .then((project) => {
            res.json({ project });
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
    getProject(req.params.id, req.site.id)
    .then((project) => {
        res.json({ project });
    })
    .catch(err => {
        next(err);
    });
});

export default router;
