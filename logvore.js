require('http').createServer(function(request, response) {
  if (request.url !== '/tail') {
    response.writeHead(404);
    response.end();
  }
  if (request.method !== 'GET') {
    response.writeHead(405);
    response.end();
  }
  response.writeHead(200, {'Content-Type': 'text/plain'});
  process.stdin.on('data', function(chunk) {
    process.stdout.write(chunk);
    response.write(chunk);
  });
  process.stdin.on('end', function() {
    response.end();
  });
  process.stdin.resume();
}).listen(3000);
