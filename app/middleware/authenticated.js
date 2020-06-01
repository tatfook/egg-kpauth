/* eslint-disable no-magic-numbers */
'use strict';

function getAuthorizationHeaderToken(ctx) {
    const authorization = ctx.header.authorization || '';
    const parts = authorization.split(' ');

    if (parts.length === 2) {
        if (/^Bearer$/i.test(parts[0])) return parts[1];
    }
    return '';
}

module.exports = () => {
    return async function(ctx, next) {
        const token = getAuthorizationHeaderToken(ctx);
        ctx.state.token = token;
        try {
            ctx.state.user = token
                ? await ctx.service.token.validUserToken(token)
                : {};
        } catch (e) {
            ctx.state.user = {};
        }

        try {
            ctx.state.admin = token
                ? await ctx.service.token.validAdminToken(token)
                : {};
        } catch (e) {
            ctx.state.admin = {};
        }

        await next();
    };
};
