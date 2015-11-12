import util from "util";
import _ from "lodash";
import bunyan from "bunyan";
import settings from "../settings";

var logger = null;
var opts = { name: 'samklang' };

if (settings.bunyan){
    opts = _.assign(opts, settings.bunyan);
}

logger = bunyan.createLogger(opts);

var consoleLog = logger.child({console: true});
console.log   = function(){ consoleLog.debug(null, util.format.apply(this, arguments)); };
console.debug = function(){ consoleLog.debug(null, util.format.apply(this, arguments)); };
console.info  = function(){ consoleLog.info (null, util.format.apply(this, arguments)); };
console.warn  = function(){ consoleLog.warn (null, util.format.apply(this, arguments)); };
console.error = function(){ consoleLog.error(null, util.format.apply(this, arguments)); };

export function defaultSerializer() {
    return {
        res: function(res){
            if (!_.isObject(res)) { return res; }
            return {
                statusCode: res.statusCode,
                header: res._header
            };
        },
        req: function(req){
            if (!_.isObject(req)) { return req; }

            var connection = req.connection || {};
            return {
                method: req.method,
                url: req.url,
                headers: req.headers,
                remoteAdress: connection.remoteAddress,
                remotePort: connection.remotePort
            };
        }
    }
};

export default logger;
