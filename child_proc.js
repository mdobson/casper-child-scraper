 var spawn = require('child_process').spawn;
 var exec = require('child_process').exec;

var http = require('http');
var qs = require('querystring');
http.createServer(function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {

            //var POST = qs.parse(body);
            var POST = JSON.parse(body);
            // use POST
            var args = ['scraper.js', '--url="'+POST.url+'"', '--selector="'+POST.selector+'"'];
            //console.log(POST.props);
            for (var i = 0; i < POST.props.length; i++) {
            	var htmlProp = POST.props[i];
            	args.push('"'+htmlProp+'"');
            }
            var argsString = "casperjs";
            for (var i = 0; i < args.length; i++) {
            	argsString += " "+args[i];
            }
            console.log(argsString);


            exec( argsString ,
			  function (error, stdout, stderr) {
			    
			    if (error !== null) {
			      console.log('exec error: ' + error);
			    }
			    else{
			    	res.writeHead(200, {'Content-Type': 'application/json'});
			    	var resp = JSON.parse(stdout);
				 	res.end(JSON.stringify(resp));
			    }
			});
   //          scraper  = spawn('casperjs', argsString);
			// scraper.stdout.on('data', function (data) {
		 //    	console.log('stdout: ' + data);
		 //    	res.writeHead(200, {'Content-Type': 'application/json'});
			// 	res.end(JSON.stringify(data));
			// });
        });
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');