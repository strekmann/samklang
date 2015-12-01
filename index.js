#!/usr/bin/env node

import http from 'http';
import moment from 'moment';

import app from './server/app';
import log from './server/lib/logger';
import settings from './server/settings';

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || settings.port || 3000;
var server = http.createServer(app);

app.stamp = moment().format('YYMMDDHHmm');

process.on('uncaughtException', (err) => {
    log.fatal(err);
    process.exit(1);
});

app.io.attach(server);

server.listen(port, () => {
    log.info('Listening to port %s, env=%s, stamp=%s', port, env, app.stamp);
});
