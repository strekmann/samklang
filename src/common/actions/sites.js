import Immutable from 'immutable';

import fetch from '../lib/fetch';
import { LOAD_SITES_SUCCESS } from '../constants';

function loadSitesSuccess(payload) {
    return {
        type: LOAD_SITES_SUCCESS,
        payload,
    };
}

export function loadSites(cookie) {
    return function something(dispatch) {
        return fetch(`/sites`, {
            method: 'get',
            cookie,
        })
        .then((data) => {
            dispatch(loadSitesSuccess(Immutable.fromJS(data.sites)));
        });
    };
}
