var spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	http = require('http'),
  port = process.env.PORT || 3000;

http.createServer(function (req, res) {
	if (req.method == 'POST') {
		var body = '';

		req.on('data', function (data) {
			body += data;
		});

		req.on('end', function () {
			var POST = JSON.parse(body);
			var args = ['scraper.js', '--url="'+POST.url+'"', '--selector="'+POST.selector+'"'];
			for (var i = 0; i < POST.properties.length; i++) {
			var htmlProp = POST.properties[i];
				args.push('"'+htmlProp+'"');
			}
			var argsString = "casperjs";
			for (var i = 0; i < args.length; i++) {
				argsString += " "+args[i];
			}
			exec( argsString , function (error, stdout, stderr) {
				if (error !== null) {
					console.log('exec error code:'+error.code+' error: ' + error);
				}
				else {
					res.writeHead(200, {'Content-Type': 'application/json'});
					var resp = JSON.parse(stdout);
					res.end(JSON.stringify(resp));
				}
			});
		});
	}
}).listen(port);

console.log('Server running at http://127.0.0.1:'+port+'/');
