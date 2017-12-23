const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('./config/defaultConfig');
const mime = require('./config/mime');
const compress = require('./config/compress');
const range = require('./config/range');

const tplPath = path.join(__dirname, './template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
module.exports = async function (req, res, filePath) {
	try {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			const contentType = mime(filePath);
			res.setHeader('Content-Type', contentType);
			let rs;
			const {
				code,
				start,
				end
			} = range(stats.size, req, res);
			//range范围请求
			//命令行 curl -r 0-10 -i http://127.0.0.1:9527/LICENSE 可以得到前0-10个字符
			if (code == 200) {
				res.statusCode = 200;
				rs = fs.createReadStream(filePath);
			} else {
				res.statusCode = 206;//206告诉你为这只是部分内容
				rs = fs.createReadStream(filePath, {
					start: start,
					end: end
				});
			}
			// 压缩文件
			if (filePath.match(config.compress)) {
				rs = compress(rs, req, res);
			}
			rs.pipe(res);
		} else if (stats.isDirectory()) {
			const files = await readdir(filePath);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html');
			const dir = path.relative(config.root, filePath);
			const data = {
				title: path.basename(filePath),
				dir: dir ? `/${dir}` : '',
				files: files.map(file => {
					return {
						file,
						icon: mime(file)
					};
				})
			};
			res.end(template(data));
		}
	} catch (err) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end(`${filePath} is not a directory or file. \n ${err}`);
	}
};

