'use strict';

module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.index);

    router.get('/needToken', controller.home.needToken);

    router.get('/needAdminToken', controller.home.needAdminToken);

    router.get('/refreshToken', controller.home.refreshToken);
};
