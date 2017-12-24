const http = require('http');
const chalk = require('chalk');
const path = require('path');
const route = require('./route');
const conf = require('./config/defaultConfig');
const openUrl=require('./config/openUrl');

module.exports = class Server {
	constructor(config) {
		this.conf = Object.assign({}, conf, config);
	}

	start() {
		const server = http.createServer((req, res) => {
			const filePath = path.join(this.conf.root, req.url);
			route(req, res, filePath, this.conf);
		});

		server.listen(this.conf.port, this.conf.hostname, () => {
			const addr = `http://${this.conf.hostname}:${this.conf.port}`;
			console.info(`Server started at ${chalk.green(addr)}`);
			// 尝试自动打开url
			openUrl(addr);
		});
	}
};

