# egg-kpauth

## Install

```bash
$ npm i egg-kpauth --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.kpauth = {
	enable: true,
	package: "egg-kpauth",
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.kpauth = {
	coreserviceURL: "http://10.28.18.44:3001/mock/32",
	INTERNAL_API_KEY: "test",
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

In controllers:

### 用户身份校验

> 校验失败会抛错，返回状态码 401

```JS
const user = this.ctx.authenticated();
```

### 管理员身份校验

```JS
const admin = this.ctx.adminAuthenticated();
```

### 刷新或者更换 token

```JS
const token = await this.ctx.refreshToken(oldToken, tokenBody);
```

旧的 token 会失效，tokenBody 里面必要参数为`userId`,要保证`userId`与 oldToken 一致，否则也会返回 401

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
