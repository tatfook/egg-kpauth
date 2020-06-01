'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, ' + this.app.plugins.kpauth.name;
    }

    async needToken() {
        const user = this.ctx.authenticated();
        this.ctx.body = user;
    }

    async needAdminToken() {
        const admin = this.ctx.adminAuthenticated();
        this.ctx.body = admin;
    }

    async refreshToken() {
        const token = await this.ctx.refreshToken('token', { userId: 1 });
        this.ctx.body = token;
    }
}

module.exports = HomeController;
