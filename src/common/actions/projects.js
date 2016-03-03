import Immutable from 'immutable';
import { push } from 'react-router-redux';

import fetch from '../lib/fetch';
import { LOAD_PROJECTS_SUCCESS, LOAD_PROJECT_SUCCESS } from '../constants';

function loadProjectsSuccess(payload) {
    return {
        type: LOAD_PROJECTS_SUCCESS,
        payload,
    };
}

function loadProjectSuccess(payload) {
    return {
        type: LOAD_PROJECT_SUCCESS,
        payload,
    };
}

export function loadProjects(site) {
    return (dispatch) => fetch(`/sites/${site}/projects`, {
        method: 'get',
    })
    .then((data) => {
        const projects = data.projects.reduce(
            (_projects, project) => {
                _projects[project.id] = project;
                return _projects;
            }, {}
        );
        dispatch(loadProjectsSuccess(Immutable.fromJS(projects)));
    });
}

export function loadProject(identifier, site) {
    return (dispatch) => fetch(`/sites/${site}/projects/${identifier}`, {
        method: 'get',
    })
    .then((data) => {
        dispatch(loadProjectSuccess(Immutable.fromJS(data.project)));
    });
}

export function createProject(payload, site) {
    return (dispatch) => fetch(`/sites/${site}/projects`, {
        method: 'post',
        body: JSON.stringify({ project: payload }),
    })
    .then((data) => {
        dispatch(loadProjectSuccess(Immutable.fromJS(data.project)));
        dispatch(push(`${data.project.identifier}`));
    });
}
