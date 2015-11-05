#!/usr/bin/env node

import http from "http";
import moment from "moment";

import app from "./server/app";
import log from "./server/lib/logger";
import settings from "./server/settings";

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || settings.port || 3000;

app.stamp = moment().format('YYMMDDHHmm');

process.on('uncaughtException', function(err){
    log.fatal(err);
    process.exit(1);
});

http.createServer(app).listen(port, function(){
    log.info("Listening to port %s, env=%s, stamp=%s", port, env, app.stamp);
});
