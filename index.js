// loosely based on https://gist.github.com/bnerd/2011232
// requires node.js >= v0.10.0
// assumes that HLS segmenter filename base is 'out'
// and that the HLS playlist and .ts files are in the current directory
// point Safari browser to http://<hostname>:PORT/player.html

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var zlib = require('zlib');

const audioPath = __dirname + "/audio/";
const viewPath = __dirname + "/view/";

let PORT = process.env.PORT || 8000;
let SERVER_ADDR = "127.0.0.1"

http.createServer(function (req, res) {
	var uri = url.parse(req.url).pathname;

	if (uri == '/player.html') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write('<html><head><title>HLS Player fed by node.js' +
		    '</title></head><body>');
		res.write('<audio controls autoplay><source src="http://' + 'localhost' +
		    ':' + PORT + '/manifest.m3u8"></audio></body></html>');
		res.end();
		return;
	}
	if (uri == '/') {
		res.writeHead(302, {
			'Location': '/play_audio'
		});
		res.end();
		return;
	} else if (uri == '/play_audio') {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var stream = fs.createReadStream(viewPath + "play_audio.html");
		stream.pipe(res);
		return;
	}
	var filename = path.join("./audio/", uri);
	fs.exists(filename, function (exists) {
		if (!exists) {
			console.log('file not found: ' + filename);
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.write('file not found: %s\n', filename);
			res.end();
		} else {
			console.log('sending file: ' + filename);
			switch (path.extname(uri)) {
			case '.m3u8':
				fs.readFile(filename, function (err, contents) {
					if (err) {
						res.writeHead(500);
						res.end();
					} else if (contents) {
						res.writeHead(200,
						    {'Content-Type':
						    'application/vnd.apple.mpegurl'});
						var ae = req.headers['accept-encoding'];
						if (ae.match(/\bgzip\b/)) {
							zlib.gzip(contents, function (err, zip) {
								if (err) throw err;

								res.writeHead(200,
								    {'content-encoding': 'gzip'});
								res.end(zip);
							});
						} else {
							res.end(contents, 'utf-8');
						}
					} else {
						console.log('emptly playlist');
						res.writeHead(500);
						res.end();
					}
				});
				break;
			case '.ts':
				res.writeHead(200, { 'Content-Type':
				    'video/MP2T' });
				var stream = fs.createReadStream(filename,
				    { bufferSize: 64 * 1024 });
				stream.pipe(res);
				break;
			default:
				console.log('unknown file type: ' +
				    path.extname(uri));
				res.writeHead(500);
				res.end();
			}
		}
	});
}).listen(PORT, () => {
	console.log('Launching server listening on ... ', SERVER_ADDR + ':' + PORT);
});