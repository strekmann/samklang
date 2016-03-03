import { LOAD_PROJECTS_SUCCESS, LOAD_PROJECT_SUCCESS } from '../constants';

import Immutable from 'immutable';

const initialState = Immutable.Map();

function projects(state = initialState, action) {
    switch (action.type) {
        case LOAD_PROJECTS_SUCCESS:
            return action.payload;
        case LOAD_PROJECT_SUCCESS:
            return state.set(action.payload.get('id'), action.payload);
        default:
            return state;
    }
}

export default projects;
