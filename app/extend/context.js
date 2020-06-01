'use strict';
const _ = require('lodash');
module.exports = {
    authenticated() {
        const user = this.state.user;
        if (_.isEmpty(user)) return this.throw(401);
        return user;
    },

    adminAuthenticated() {
        const admin = this.state.admin;
        if (_.isEmpty(admin)) return this.throw(401);
        return admin;
    },

    async refreshToken(token, tokenBody) {
        try {
            return await this.service.token.refreshToken(token, tokenBody);
        } catch (error) {
            return this.throw(401);
        }
    },
};
