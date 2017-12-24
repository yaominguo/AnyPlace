const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
	.usage('anywhere [options]')
	.option('p', {
		alias: 'port',
		describe: 'Port',
		default: 9527
	})
	.option('h', {
		alias: 'hostname',
		describe: 'Host',
		default: '127.0.0.1'
	})
	.option('d', {
		alias: 'root',
		describe: 'Root Path',
		default: process.cwd()
	})
	.version()
	.alias('v', 'version')
	.help()
	.argv;

const server = new Server(argv);
server.start();

