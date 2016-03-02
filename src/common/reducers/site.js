import Immutable from 'immutable';
import { LOAD_SITE_SUCCESS } from '../constants';

const initialState = Immutable.fromJS({
    id: null,
});

function site(state = initialState, action) {
    switch (action.type) {
        case LOAD_SITE_SUCCESS:
            return state.set('id', action.payload.get('id'));
        default:
            return state;
    }
}

export default site;
