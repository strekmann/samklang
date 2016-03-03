import Immutable from 'immutable';
import { LOAD_SITE_SUCCESS } from '../constants';

const initialState = Immutable.fromJS({
    id: null,
});

function site(state = initialState, action) {
    switch (action.type) {
        case LOAD_SITE_SUCCESS:
            // site saves complete object, to be compatible with server side middleware
            return action.payload;
        default:
            return state;
    }
}

export default site;
