const fs = require("fs");
const sql = require('../sql/init')

function loadPage(path){
	return new Promise(function(resolve,reject){
		fs.readFile(path, function(error, data){             
		if(error){  
			reject(new Error('Page not found'))
		}else{
			resolve(data)
		}
	})	
	})
}

function getContentType(path){
	var p;
	if(p=path.lastIndexOf('.')){
		var ext=path.substr(p+1);
		switch (ext){
			case 'html':return 'text/html'
			case 'css':return 'text/css'
			case 'js':return 'text/javascript'
			case 'ico': return 'image/x-icon'
			case 'png': return 'image/x-png'
		}
	}
	return 'text/html'
}



function optionsRouting(request,response){
	  var headers = {}
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers['Access-Control-Allow-Origin'] = '*';
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
      headers['Access-Control-Allow-Credentials'] = false;
      headers['Access-Control-Max-Age'] = '86400'; // 24 hours
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
      response.writeHead(200, headers);
      response.end();
}


function getRouting(path,request,response){
	
	if(getContentType(path)=='text/html'){
		fs.exists('./public/index.html',exists=>{
			if(exists){
				response.writeHead(200, {'Content-Type': getContentType(path)})
				fs.createReadStream('./public/index.html').pipe(response)
			}else{
				response.writeHead(400, {'Content-Type': 'text/html'})
				response.end('Page not found')
			}
		
		return		
		})
	}
				
	loadPage(path)
		.then(
			result=>{
				response.writeHead(200, {'Content-Type': getContentType(path)})
				response.end(result)
			},
			error=>{
				path='public/404.html'
				loadPage(path)
					.then(
						result=>{
							response.writeHead(400, {'Content-Type': 'text/html'})
							response.end(result);
						},
						error=>{
							response.writeHead(400, {'Content-Type': 'text/html'})
							response.end('Page not found')
						}
					)
			}
		)
	

}

function checkAuth(request,response){
	
  let body = ''
  request.setEncoding('utf8')

  request.on('data', (chunk) => {
    body += chunk
  })

  request.on('end', () => {
    try {
      const data = JSON.parse(body)
	  var headers = {}
      headers['Access-Control-Allow-Origin'] = '*';	
	  headers['Content-Type'] = 'text/json';	
	  response.writeHead(200, headers);
	  // TODO added user check in database, generate a token
	  var answer={}
	  if ((data.username==='admin') && (data.password==='admin')){
		  answer={'id':1, 'user':'admin', 'token':'1111'}
	  }else{
		  answer={'id':0}
	  }
      response.write(JSON.stringify(answer))
      response.end()
    } catch (er) {
      // bad json
      response.statusCode = 400
      return response.end(`error: ${er.message}`)
    }
  });
  
}

function postRouting(path,request,response){
	switch(path){
	case 'auth':
		checkAuth(request,response)
		break
	}
}


var routing=function(request,response){
	var url=(request.url=='/')?'/public/index.html':request.url
	var path=url.substr(1)
	switch(request.method){
		case 'OPTIONS':optionsRouting(request,response)
		break
		case 'GET':getRouting(path,request,response)
		break
		case 'POST':postRouting(path,request,response)
		break
	}
}
module.exports=routing;