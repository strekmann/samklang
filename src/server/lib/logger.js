/* eslint "no-console": 0 */
/* eslint "prefer-rest-params": 0 */

import util from 'util';
import _ from 'lodash';
import bunyan from 'bunyan';
import config from 'config';
import pkg from '../../../package';

const opts = _.assign({ name: pkg.name }, config.get('bunyan'));

const defaultSerializers = {
    res: (res) => {
        if (!_.isObject(res)) { return res; }
        return {
            statusCode: res.statusCode,
            header: res._header,
        };
    },
    req: (req) => {
        const connection = req.connection || {};

        if (!_.isObject(req)) { return req; }

        return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            remoteAdress: connection.remoteAddress,
            remotePort: connection.remotePort,
        };
    },
};

let logger = bunyan.createLogger(opts);

if (process.env.NODE_ENV === 'test') {
    logger = console;
    logger.fatal = logger.error;
}
else {
    const consoleLog = logger.child({ console: true });
    console.log = function log() {
        consoleLog.debug(null, util.format.apply(this, arguments));
    };
    console.debug = function debug() {
        consoleLog.debug(null, util.format.apply(this, arguments));
    };
    console.info = function info() {
        consoleLog.info(null, util.format.apply(this, arguments));
    };
    console.warn = function warn() {
        consoleLog.warn(null, util.format.apply(this, arguments));
    };
    console.error = function error() {
        consoleLog.error(null, util.format.apply(this, arguments));
    };
}

export default logger;
export { defaultSerializers };
