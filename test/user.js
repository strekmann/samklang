/* eslint-env nodejs, mocha  */
/* global describe:false, app:false, request:false, expect:false */

describe('User', () => {
    var passportStub = require('passport-stub');
    var User = require('../server/models').User;
    var ValidationError = require('mongoose').Error.ValidationError;

    before((done) => {
        app.db.connection.db.dropDatabase(() => {
            done();
        });
    });

    after((done) => {
        app.db.connection.db.dropDatabase(() => {
            passportStub.uninstall();
            done();
        });
    });

    describe('when creating user', () => {
        it('fail if password is missing', (done) => {
            var user = User({
                name: 'Testulf',
                email: 'testulf@example.com',
            });

            user.save((err) => {
                expect(err).to.be.instanceOf(ValidationError);
                expect(err.errors).to.have.property('password');
                done();
            });
        });
    });
});
