'use strict';

const mock = require('egg-mock');
const assert = require('assert');
describe('test/kpauth.test.js', () => {
    let app;
    before(() => {
        app = mock.app({
            baseDir: 'apps/kpauth-test',
        });
        return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('should GET /', () => {
        return app.httpRequest().get('/').expect('hi, kpauth')
            .expect(200);
    });

    it('should GET /needToken', () => {
        return app
            .httpRequest()
            .get('/needToken')
            .set('Authorization', 'Bearer test')
            .expect(200);
    });

    it('should return 401 GET /needToken', () => {
        return app.httpRequest().get('/needToken').expect(401);
    });

    it('should GET /needAdminToken', () => {
        return app
            .httpRequest()
            .get('/needAdminToken')
            .set('Authorization', 'Bearer test')
            .expect(200);
    });

    it('should return 401 GET /needAdminToken', () => {
        return app.httpRequest().get('/needAdminToken').expect(401);
    });

    it('should GET /refreshToken', () => {
        return app
            .httpRequest()
            .get('/refreshToken')
            .expect(200)
            .then(res => {
                assert(res.body);
            });
    });
});
