import mongoose from 'mongoose';
import settings from '../settings';

var db;

if (process.env.NODE_ENV === 'test') {
    db = mongoose.connect('mongodb://localhost/mocha_test');
}
else {
    settings.mongo = settings.mongo || {servers: ['localhost'], replSet: null};
    db = mongoose.connect(settings.mongo.servers.join(','), {replSet: {rs_name: settings.mongo.replset}});
}

export default db;
