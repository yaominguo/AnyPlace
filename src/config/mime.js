const path = require('path');

const mimeTypes = {
	'css': 'text/css',
	'gif': 'imgage/gif',
	'html': 'text/html',
	'ico': 'image/x-icon',
	'jpeg': 'image/jpeg',
	'jpg': 'image.jpg',
	'js': 'text/javascript',
	'json': 'application/json',
	'pdf': 'application/json',
	'png': 'image/png',
	'svg': 'image/svg+xml',
	'swf': 'application/x-shockwave-flash',
	'tiff': 'image/tiff',
	'txt': 'text/plain',
	'wav': 'audio/x-wav',
	'wma': 'audio/x-ms-wma',
	'wmv': 'audio/x-ms-wmv',
	'xml': 'text/xml'
};

module.exports = (filePath,isDirectory) => {
	let ext = path.extname(filePath)
		.split('.')
		.pop()
		.toLowerCase();

	if (!ext) {
		ext = filePath;
    }
    
	return mimeTypes[ext] || mimeTypes['txt'];
};
