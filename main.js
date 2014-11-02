var fs = require('fs');
var express = require('express');
var webServer = express();
//var bodyParser = require("body-parser");


//mysql
var routes = require('./routes');
var http = require('http');
var path = require('path');
////load customers route
var customers = require('./routes/customers'); 
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
//webServer.use(bodyParser.urlencoded({ extended: false }));
webServer.use(express.logger('dev'));
webServer.use(express.json());
webServer.use(express.urlencoded());
webServer.use(express.methodOverride());

webServer.use(express.static(path.join(__dirname, 'public')));

webServer.set('port', process.env.PORT || 9001);
webServer.set('views', path.join(__dirname, 'views'));
webServer.set('view engine', 'ejs');

webServer.use(express.static(path.join(__dirname, 'public')));

var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
	 host     : 'localhost',
	 user     : 'root',
	 password : 'generic',
	 database : 'h2r',
	 debug : false,
});


//app.get('/load',function(req,res){
//	 connection.query("SELECT * from user_info",function(err,rows){
//	if(err)
//	{
//	 console.log("Problem with MySQL"+err);
//	}
//	else
//	{
//	 res.end(JSON.stringify(rows));
//	}
//	});
//	});

webServer.post('/endpoint', function(req, res){
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
	});

webServer.post('/mysql_update',function(req,res){
	console.log("### - Updating MySQL data results - ###");
	
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	//res.send(req.body);
	
		var postid = req.body.postid
		var startpoint = req.body.startpoint
		var endpoint = req.body.endpoint
		var userid = req.body.userid
		var postdate = req.body.postdate
		var via = req.body.via
		var restrictions = req.body.restrictions
		
		console.log("postid = "+req.body.postid);
		
		//row={"postid":'012'}
		//jrow=JSON.stringify(row);
		//console.log("JSON-ROW = "+jrow);
		//postid = '00222'
			//,"startpoint":"Inga","endpoint":"AngaT","userid":"Naanthaan","via":"Pillar","restrictions":"onnumilla"}
		
		mysqlConnection.query('INSERT INTO postride  set ?',req.body,function(err,result){
		//mysqlConnection.query('INSERT INTO postride (postid,startpoint,endpoint,userid,via,restrictions) VALUES ("'+row+'")', function(err,result){
		//mysqlConnection.query('INSERT INTO postride (postid,startpoint,endpoint,userid,via,restrictions) VALUES ("'+JSON.stringify(req.body)+'")', function(err,result){
		//mysqlConnection.query('INSERT INTO postride (postid,startpoint,endpoint,userid,via,restrictions) VALUES ("' + req.body.postid + '", "' + req.body.startpoint + '", "' + req.body.endpoint + '", "' + req.body.userid + '", "' + req.body.via + '", "' + req.body.restrictions + '")', function(err,result) {

			if (err) throw err;

			if(result)
				res.type('application/json');
				res.send([{"added":1}]);
				res.end("yes");
		});
});

//webServer.get('/mysql', function(req, res){
//	
//	var json = '';
//	var postid = 007
//	var query = 'SELECT * FROM test';
//	
//	mysqlConnection.query('SELECT * FROM postride WHERE postid = ?', [postid], function(err, results) {
//	//mysqlConnection.query('SELECT * FROM postride', function(err, results){
//	//mysqlConnection.query('INSERT INTO postride VALUES (\'008\',\'Velachery\',\'AnnaNagar\',\'ashok\',\'2014-09-30\',\'Pillar\',\'NA\')', function(err, results) {
//	    //res.render('users', {users : rows});
//		//res.render('users', {users : rows});
//		
//		json = JSON.stringify(results);
//		console.log('result:',results);
//		
//        connection.end();
//        console.log('JSON-result:', json);
//        callback(null, json);
//        
//	  });
//});

webServer.get('/mysql_query',function(req,res){
	console.log("retrieving MySQL data results");
	mysqlConnection.query("SELECT * from postride",function(err,rows){
		if(err)	{
		 console.log("Problem with MySQL"+err);
		} else {
			
			res.type('application/json');
			res.send(rows)
			res.end(JSON.stringify(rows));
		}
	});
});

webServer.post('/mysql_test',function(req,res){
	console.log("### - Updating MySQL data results - ###");
	console.log("postid = "+req.body.postid)
//	mysqlConnection.query("SELECT * from postride",function(err,rows){
//		if(err)	{
//		 console.log("Problem with MySQL"+err);
//		} else {
//			res.type('application/json');
//			res.send(rows)
//			res.end(JSON.stringify(rows));
//		}
//	});
	
	
});

//connection  = mysqlConnection.connect(function(err) {

//if ( !err ) {
//	 console.log("Connected to Mysql");
//	 var postid = 001
//	 //mysqlConnection.query('SELECT * FROM postride WHERE postid = ?', [postid], function(err, results) {
//	 mysqlConnection.query('INSERT INTO postride VALUES (\'003\',\'Velachery\',\'CMBT\',\'ashok\',\'2014-09-30\',\'Pillar\',\'NA\')', function(err, results) {
//	 console.log(results);
//});
//}else if ( err ) {
//	console.log(err);
//}
//});
		webServer.get('/', routes.index);
		webServer.get('/customers', customers.list);
		webServer.get('/customers/add', customers.add);
//		webServer.post('/customers/add', customers.save);
//		webServer.get('/customers/delete/:id', customers.delete_customer);
//		webServer.get('/customers/edit/:id', customers.edit);
//		webServer.post('/customers/edit/:id',customers.save_edit);
//		
		webServer.use(webServer.router);
		
//		webServer.set('views', __dirname + '/webServer/views')
//	    webServer.set('view **enigne**', 'jade')

//	
//http.createServer(webServer).listen(webServer.get('port'), function(){
//	  console.log('Express server listening on port ' + webServer.get('port'));
//	});		
		
webServer.configure(function(){
	webServer.use(express.cookieParser());
	webServer.use(express.session({secret : 'secret', key: 'express.sid'}));
	webServer.use(express.static(__dirname));
});

	webServer.listen(9001,'localhost');