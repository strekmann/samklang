import alt from '../alt';
import io from 'socket.io-client';

let socket;

class SocketActions {
    constructor() {
        this.generateActions('error', 'joined', 'connected', 'usercount');
    }

    setup() {
        // set up socket
        socket = io({
            path: '/s',
        });

        // Handle default socket events
        socket.on('connect', data => {
            this.actions.connected(true);
        });
        socket.on('error', data => {
            this.actions.error(data);
        });
        socket.on('disconnect', data => {
            this.actions.connected(false);
        });

        // Handle socket app events
        socket.on('usercount', data => {
            this.actions.usercount(data.users);
        });
        console.log("S", this);
    }

    login(data) {
        socket.emit('login', data);
    }

    sendMessage(message) {
        console.log("T", this);
        socket.emit('dust', message);
    }
}

export default alt.createActions(SocketActions);
