'use strict';
const Service = require('egg').Service;
const Axios = require('axios');
class Token extends Service {
    get client() {
        if (this._client) return this._client;
        this._client = Axios.create({
            baseURL: this.app.config.kpauth.coreserviceURL,
            headers: { 'x-api-key': this.app.config.kpauth.INTERNAL_API_KEY },
        });

        return this._client;
    }

    // 校验adminToken是否有效
    async validAdminToken(token) {
        const ret = await this.client.post('/internal/adminAuthenticated', {
            token,
        });
        return ret.data;
    }

    // 校验token是否有效
    async validUserToken(token) {
        const ret = await this.client.post('/internal/authenticated', {
            token,
        });
        return ret.data;
    }

    async refreshToken(token, tokenBody) {
        const ret = await this.client.post('/internal/refreshToken', {
            token,
            tokenBody,
        });
        return ret.data;
    }
}

module.exports = Token;
