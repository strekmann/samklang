import { LOAD_SITES_SUCCESS } from '../constants';

import Immutable from 'immutable';

const initialState = Immutable.Map();

function site(state = initialState, action) {
    switch (action.type) {
        case LOAD_SITES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export default site;
