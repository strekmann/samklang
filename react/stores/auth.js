import alt from '../alt';
import Immutable from 'immutable';
import immutableStore from 'alt/utils/ImmutableUtil';

import AuthActions from '../actions/auth';

class AuthStore {
    constructor() {
        this.bindListeners({
            onError: AuthActions.error,
            onRegistered: AuthActions.registered,
        });

        this.state = Immutable.Map({
            error: null,
            viewer: null,
        });
    }

    onRegistered(data) {
        this.setState(this.state.set('viewer', Immutable.fromJS(data)));
    }

    onError(data) {
        this.setState(this.state.set('error', data.error));
    }

    static getError() {
        return this.getState().get('error');
    }

    static getViewer() {
        return this.getState().get('viewer');
    }
}

export default alt.createStore(immutableStore(AuthStore), 'AuthStore');
