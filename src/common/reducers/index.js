import { combineReducers } from 'redux-immutable';
import viewer from './viewer';
import users from './users';
import user from './user';
import sites from './sites';
import site from './site';
import projects from './projects';
import socket from './socket';
import routeReducer from './routeReducer';

const reducer = combineReducers({
    viewer,
    users,
    user,
    sites,
    site,
    projects,
    socket,
    routing: routeReducer,
});

export default reducer;
