import { combineReducers } from 'redux-immutable';
import viewer from './viewer';
import users from './users';
import user from './user';
import sites from './sites';
import socket from './socket';
import routeReducer from './routeReducer';

const reducer = combineReducers({
    viewer,
    users,
    user,
    sites,
    socket,
    routing: routeReducer,
});

export default reducer;
