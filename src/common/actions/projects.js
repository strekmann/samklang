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

export function loadProjects() {
    return (dispatch) => fetch('/projects', {
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

export function createProject(payload) {
    return (dispatch) => fetch('/projects', {
        method: 'post',
        body: JSON.stringify({ project: payload }),
    })
    .then((data) => {
        dispatch(loadProjectSuccess(Immutable.fromJS(data.project)));
        dispatch(push(`${data.project.identifier}`));
    });
}
