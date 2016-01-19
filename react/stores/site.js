import alt from '../alt';
import Immutable from 'immutable';
import immutableStore from 'alt/utils/ImmutableUtil';

import SiteActions from '../actions/site';

class SiteStore {
    constructor() {
        this.bindListeners({
            onError: SiteActions.error,
            onCreated: SiteActions.created,
        });

        this.state = Immutable.Map({
            error: null,
            sites: Immutable.List(), // Sites a user administers
        });
    }

    onError(data) {
        this.setState(this.state.set('error', data.error));
    }

    onCreated(data) {
        this.setState(this.state.updateIn(['sites'], sites => sites.push(Immutable.fromJS(data.site))));
    }

    static getError() {
        return this.getState().get('error');
    }

    static getSites() {
        return this.getState().get('sites');
    }
}

export default alt.createStore(immutableStore(SiteStore), 'SiteStore');
