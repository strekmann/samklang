/* eslint-env nodejs, mocha  */
/* global describe:false, app:false, request:false */

describe('basic requests', () => {
    var passportStub = require('passport-stub');
    var User = require('../server/models').User;

    /*
    before((done) => {
        app.db.connection.db.dropDatabase(() => {
            var testUser;
            passportStub.install(app);
            testUser = new User({
                name: 'Testuser',
                email: 'testuser@ntnu.no',
                is_admin: false,
            });
            testUser.save((err, user) => {
                done(err);
            });
        });
    });

    after((done) => {
        app.db.connection.db.dropDatabase(() => {
            passportStub.uninstall();
            done();
        });
    });
    */

    describe('when fetching unknown url', () => {
        it('expect return status 404', (done) => {
            request(app)
                .get('/err')
                .expect(404)
                .end((err, res) => {
                    if (err) { return done(err); }
                    done();
                });
        });
    });
});
