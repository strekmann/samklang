/* eslint no-console: 0 */
import request from 'supertest';
import chai from 'chai';

import log from '../../server/lib/logger';
import db from '../../server/lib/db';
import app from '../../server/app';

// Silence logging
console.error = () => {};

chai.should();
app.db = db;

global.app = app;
global.expect = chai.expect;
global.assert = chai.assert;
global.request = request;
global.log = log;
