const mysql = require('mysql')
const createQueries = require('./createQueries')
const insertDefaultValuesQueries = require('./insertDefaultValuesQueries')

const reconnectTime=10000

var _mySqlIsConnect=false
var _tryToConnect=false
var _con


function sqlInit(){
	sqlInitProc()
	setInterval(_=>{
		if(!_tryToConnect && !_mySqlIsConnect){
			sqlInitProc()
		}
	},reconnectTime)
}

function runQuery(query){
	return new Promise(function(resolve,reject){
		_con.query(query, function (err, result) {
		if (err) reject(err)
		resolve(result)
	  })
	})
}

function createDB(){
	  let chain=Promise.resolve()
	  createQueries.forEach(function(query){
		  chain=chain
		  .then(
			()=>runQuery(query))
	  })
	  chain.catch((err)=>{
		  console.log('Error during init mysql database:',err.sqlMessage)
		  _mySqlIsConnect=false;
	  })
}

function checkTableEmpty(key){
	
	var query=`SELECT TABLE_ROWS
			   FROM information_schema.TABLES
			   WHERE TABLE_SCHEMA = 'b9'
			   AND TABLE_NAME = '${key}'`
	console.log(query)		   
	return new Promise(function(resolve,reject){
		runQuery(query).then(
			(result)=>{
				console.dir(result)
				// TODO check not work
				if(result===[]) reject(new TypeError('No such table'))
				console.log('here')	
				if(result[0].TABLE_ROWS>0) reject(new Error('Table not empty'))
				resolve('empty')
			},
			(err)=>{
				reject(new Error(err))
			}
		)
	})
}

function populateTable(key){
	console.log('poputate '+key)
	return new Promise(function(resolve,reject){
		if(key=='tank_tape'){
			resolve('ok')
		}
		if(key=='tank_volume'){ 
			resolve('ok')
		}
		if(key=='tank_elpower'){ 
			resolve('ok')
		}		
	})
}

function populateDB(){
	  let chain=Promise.resolve()
	  for (key in insertDefaultValuesQueries){
		(function(key){ 
			chain=chain
			.then(()=>checkTableEmpty(key)
			.then(()=>populateTable(key),()=>console.log('Table '+key+' not empty')))
		})(key)
	  }
	  chain.catch((err)=>console.log('Error during populate mysql database:',err))
}

function sqlInitProc(){
	_tryToConnect=true
	_con = mysql.createConnection({
	  host: "192.168.0.99",
	  user: "root",
	  password: "root"
	});
	_con.connect(function(err) {
	  if (err){
		console.log("Not connect to mysql")
		_mySqlIsConnect=false
		_tryToConnect=false
		return
	  }
	  _mySqlIsConnect=true
	  _tryToConnect=false
	  createDB()
	  populateDB()
	});
	
}

function getConnectState(){
	return _mySqlIsConnect
}

function getConnect(){
	return _con
}


module.exports={sqlInit, getConnectState, getConnect};