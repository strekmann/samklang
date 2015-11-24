/* eslint "no-console": 0 */

import util from 'util';
import _ from 'lodash';
import bunyan from 'bunyan';
import settings from '../settings';

var logger = null;
var opts = { name: 'samklang' };
var consoleLog = logger.child({console: true});
var defaultSerializers = {
    res: (res) => {
        if (!_.isObject(res)) { return res; }
        return {
            statusCode: res.statusCode,
            header: res._header,
        };
    },
    req: (req) => {
        var connection = req.connection || {};

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

if (settings.bunyan) {
    opts = _.assign(opts, settings.bunyan);
}

logger = bunyan.createLogger(opts);

console.log = () => { consoleLog.debug(null, util.format.apply(this, arguments)); };
console.debug = () => { consoleLog.debug(null, util.format.apply(this, arguments)); };
console.info = () => { consoleLog.info(null, util.format.apply(this, arguments)); };
console.warn = () => { consoleLog.warn(null, util.format.apply(this, arguments)); };
console.error = () => { consoleLog.error(null, util.format.apply(this, arguments)); };

export default logger;
export {defaultSerializers};
