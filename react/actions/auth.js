import alt from '../alt';
import axios from 'axios';

class AuthActions {
    constructor() {
        this.generateActions('error', 'registered');
    }

    register(data) {
        axios.post('/_/auth/register', data)
        .then(response => {
            this.actions.registered(response.data);
        })
        .catch(response => {
            this.actions.error(response.data);
        });
    }
}

export default alt.createActions(AuthActions);
