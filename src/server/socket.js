import { logger } from 'libby';

let numUsers = 0;
const names = {};

function socketRoutes(io) {
    io.on('connection', socket => {
        let addedUser = false;
        logger.info('socket connected', socket.id, socket.request.user.name);
        io.emit('action', { type: 'SOCKET_SET_USERCOUNT', payload: io.engine.clientsCount });

        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                name: socket.name,
                message: data,
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', (name) => {
            // we store the name in the socket session for this client
            socket.name = name;
            // add the client's name to the global list
            names[name] = name;
            ++numUsers;
            addedUser = true;
            socket.emit('login', { numUsers });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                name: socket.name,
                numUsers,
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', () => {
            socket.broadcast.emit('typing', {
                name: socket.name,
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', () => {
            socket.broadcast.emit('stop typing', {
                name: socket.name,
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
            io.emit('usercount', { users: io.engine.clientsCount });
            // remove the name from global names list
            if (addedUser) {
                delete names[socket.name];
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    name: socket.name,
                    numUsers,
                });
            }
        });
    });
}

export default socketRoutes;
