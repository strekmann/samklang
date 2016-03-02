import { LOAD_SITES_SUCCESS, LOAD_SITE_SUCCESS } from '../constants';

import Immutable from 'immutable';

const initialState = Immutable.Map();

function sites(state = initialState, action) {
    switch (action.type) {
        case LOAD_SITES_SUCCESS:
            return action.payload;
        case LOAD_SITE_SUCCESS:
            return state.set(action.payload.get('id'), action.payload);
        default:
            return state;
    }
}

export default sites;
