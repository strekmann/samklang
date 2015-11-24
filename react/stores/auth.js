import alt from "../alt";
import Immutable from "immutable";
import immutableStore from "alt/utils/ImmutableUtil";

import AuthActions from "../actions/auth";

class AuthStore {
    constructor() {
        this.bindListeners({
            onError: AuthActions.error,
            onRegistered: AuthActions.registered,
        });

        this.state = Immutable.Map({
            error: null,
            registered: false,
        });
    }

    onRegistered() {
        this.setState(this.state.set("registered", true));
    }

    onError(data) {
        this.setState(this.state.set("error", data.error));
    }

    static getError() {
        return this.getState().get("error");
    }

    static getRegistered() {
        return this.getState().get("registered");
    }
}

export default alt.createStore(immutableStore(AuthStore), "AuthStore");
