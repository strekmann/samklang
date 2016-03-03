import { combineReducers } from 'redux-immutable';
import viewer from './viewer';
import users from './users';
import user from './user';
import sites from './sites';
import site from './site';
import projects from './projects';
import project from './project';
import socket from './socket';
import routeReducer from './routeReducer';

const reducer = combineReducers({
    viewer,
    users,
    user,
    sites,
    site,
    projects,
    project,
    socket,
    routing: routeReducer,
});

export default reducer;
