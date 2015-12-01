import alt from '../alt';
import io from 'socket.io-client';

class SocketActions {
    constructor() {
        this.generateActions('error', 'joined');
    }

    setup() {
        // set up socket
        this.socket = io({
            path: '/s',
        });
        this.socket.on('joined', data => {
            this.actions.joined(data);
        });
    }

    login(data) {
        this.socket.emit('login', data);
    }
}

export default alt.createActions(SocketActions);
