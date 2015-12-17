import alt from '../alt';
import io from 'socket.io-client';

class SocketActions {
    constructor() {
        this.generateActions('error', 'joined', 'connected', 'usercount');
    }

    setup() {
        // set up socket
        this.socket = io({
            path: '/s',
        });

        // Handle default socket events
        this.socket.on('connect', data => {
            this.actions.connected(true);
        });
        this.socket.on('error', data => {
            this.actions.error(data);
        });
        this.socket.on('disconnect', data => {
            this.actions.connected(false);
        });

        // Handle socket app events
        this.socket.on('usercount', data => {
            this.actions.usercount(data.users);
        });
    }

    login(data) {
        this.socket.emit('login', data);
    }
}

export default alt.createActions(SocketActions);
