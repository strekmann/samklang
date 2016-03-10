import { SOCKET_SET_USERCOUNT, SOCKET_ADD_MESSAGE } from '../constants';

import Immutable from 'immutable';
const initialState = Immutable.fromJS({
    usercount: 0,
    messages: [],
});

function socket(state = initialState, action) {
    switch (action.type) {
        case SOCKET_SET_USERCOUNT:
            return state.set('usercount', action.payload);
        case SOCKET_ADD_MESSAGE:
            console.log("got message", action.payload);
            return state.update('messages', messages => messages.push(action.payload));
        default:
            return state;
    }
}

export default socket;
