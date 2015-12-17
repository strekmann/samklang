import alt from '../alt';
import Immutable from 'immutable';
import immutableStore from 'alt/utils/ImmutableUtil';

import AuthActions from '../actions/auth';
import SocketActions from '../actions/socket';

class AuthStore {
    constructor() {
        this.bindListeners({
            onError: AuthActions.error,
            onRegistered: AuthActions.registered,
            onWSConnected: SocketActions.connected,
            onUserCountChange: SocketActions.usercount,
        });

        this.state = Immutable.Map({
            error: null,
            viewer: null,
            wsconnected: false,
            usercount: 0,
        });
    }

    onRegistered(data) {
        this.setState(this.state.set('viewer', Immutable.fromJS(data)));
    }

    onError(data) {
        this.setState(this.state.set('error', data.error));
    }

    onWSConnected(isConnected) {
        this.setState(this.state.set('wsconnected', isConnected));
    }

    onUserCountChange(count) {
        this.setState(this.state.set('usercount', count));
    }

    static getError() {
        return this.getState().get('error');
    }

    static getViewer() {
        return this.getState().get('viewer');
    }

    static isWSConnected() {
        return this.getState().get('wsconnected');
    }

    static getUserCount() {
        return this.getState().get('usercount');
    }
}

export default alt.createStore(immutableStore(AuthStore), 'AuthStore');
