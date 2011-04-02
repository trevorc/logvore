process.stdin.resume();
process.stdin.setMaxListeners(256);

require('http').createServer(function(request, response) {
  var dataHandler = function(chunk) {
    response.write(chunk);
  };
  if (request.url !== '/tail') {
    response.writeHead(404);
    response.end();
  }
  if (request.method !== 'GET') {
    response.writeHead(405);
    response.end();
  }
  response.writeHead(200, {'Content-Type': 'text/plain'});
  process.stdin.on('data', dataHandler);
  response.on('end', function() {
    process.stdin.removeListener('data', dataHandler);
  });
}).listen(3000);
