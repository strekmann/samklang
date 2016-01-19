import alt from '../alt';
import axios from 'axios';

class SiteActions {
    constructor() {
        this.generateActions('error', 'created');
    }

    create(data) {
        axios.post('/_/site/create', data)
        .then(response => {
            this.actions.created(response.data);
        })
        .catch(response => {
            if (response instanceof Error) {
                this.actions.error(response.message);
            }
            else {
                this.actions.error(response.data);
            }
        });
    }
}

export default alt.createActions(SiteActions);
