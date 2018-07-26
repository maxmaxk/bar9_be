const http = require('http');
const router = require('./router/routing')
const sql = require('./sql/init')
const port=8888

sql.sqlInit()

http.createServer( function(request, response){
	router(request, response);
}).listen(port);
console.log('Server running on '+port)




