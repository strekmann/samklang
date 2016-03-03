import Immutable from 'immutable';
import { push } from 'react-router-redux';

import fetch from '../lib/fetch';
import { LOAD_SITES_SUCCESS, LOAD_SITE_SUCCESS, CREATE_SITE_SUCCESS } from '../constants';

function loadSitesSuccess(payload) {
    return {
        type: LOAD_SITES_SUCCESS,
        payload,
    };
}

function loadSiteSuccess(payload) {
    return {
        type: LOAD_SITE_SUCCESS,
        payload,
    };
}

function createSiteSuccess(payload) {
    return {
        type: CREATE_SITE_SUCCESS,
        payload,
    };
}

export function loadSites() {
    return (dispatch) => fetch('/sites', {
        method: 'get',
    })
    .then((data) => {
        const sites = data.sites.reduce(
            (_sites, site) => {
                _sites[site.id] = site;
                return _sites;
            }, {}
        );
        dispatch(loadSitesSuccess(Immutable.fromJS(sites)));
    });
}

// not in use: site is added in server middleware
export function loadSite(payload) {
    return (dispatch) => fetch(`/sites/${payload.identifier}`, {
        method: 'get',
    })
    .then((data) => {
        dispatch(loadSiteSuccess(Immutable.fromJS(data.site)));
    });
}

export function createSite(payload) {
    return (dispatch) => fetch('/sites', {
        method: 'post',
        body: JSON.stringify({ site: payload }),
    })
    .then((data) => {
        dispatch(createSiteSuccess(Immutable.fromJS(data.site)));
        dispatch(push(`/${data.site.identifier}`));
    });
}
