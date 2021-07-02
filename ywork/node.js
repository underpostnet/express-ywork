
//--------------------------------------------
//--------------------------------------------

let express = require('express');
var app = express();
var var_dump = require('var_dump');

//--------------------------------------------
//--------------------------------------------

var path = require('path');
var dir = {
	get: function(dir){

		if(dir==null){

			return path.join(data.clientPath, '');

		}

		return path.join(data.clientPath, dir);

	}
};

//--------------------------------------------
//--------------------------------------------

function setStatic(list){

	for(let i=0; i<list.length; i++){

		const staticDir = '/'+list[i];
		app.use(express.static(staticDir));
		app.use(staticDir, express.static(dir.get() + staticDir));

		console.log('set static dir -> '+(dir.get() + staticDir));

	}

}

setStatic(data.static);

//--------------------------------------------
//--------------------------------------------

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//--------------------------------------------
//--------------------------------------------

function generateToken(req){
	if(!req.session.token){
		let token = getHash();
	  req.session.token = token;
		if(req.headers.host===data.url.split('//')[1]){
	    usersToken.push(token);
			log('info', 'generate valid token -> host:'+req.headers.host+' token:'+req.session.token);
	  }else{
			log('error', 'generate corrupt token -> host:'+req.headers.host+' token:'+req.session.token);
		}
	}
}

function validateToken(token){
  for(let check of usersToken){
    if(check===token){
      return true;
    }
  }
  return false;
}

function validateLogToken(token){
	for(let check of logUsersToken){
		if(check===token){
      return true;
    }
	}
	return false;
}

function wsBan(ws, i){
	USERDATA[i].state = 'close';
	USERDATA[i].validator = ['Corrupt Client', 'Cliente Corrupto'];
	ws.send(JSON.stringify(USERDATA[i]));
}

//--------------------------------------------
//--------------------------------------------

function logHeader(req, res, data, header){

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	let session_state = 'session: off';
	if(req.session.name && req.session.email){

		session_state = `session: on
		name: `+req.session.name+`
		email: `+req.session.email+`
		id_users: `+req.session.id_users+`
		koyn: `+req.session.koyn;

	}

	log('info',

		`
		http connection
		url: `+data.url+`
		ip: `+ip+`
		time: `+new Date()+`
		host: `+req.headers.host+`
		lang: `+req.acceptsLanguages()+`
		token: `+req.session.token+`
		`+session_state+`

		`

	);

	let lang = ''+req.acceptsLanguages();
	let id = 1;
	lang = lang.split('-')[0];
	if(!(lang=='es')){

		lang = 'en';
		id = 0;

	}

	if(header){
		res.writeHead(200, {

			'Content-Type': 'text/html; charset=utf-8',
			'Content-Language': (''+lang)

		});
	}

	// res.setHeader('Content-Type', 'application/json');

	return {lang: lang, id: id};

}



//--------------------------------------------
//--------------------------------------------

function logApiHeader(req, res, path, header){

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	let session_state = 'session: off';
	if(req.session.name && req.session.email){

		session_state = `session: on
		name: `+req.session.name+`
		email: `+req.session.email+`
		id_users: `+req.session.id_users+`
		koyn: `+req.session.koyn;

	}

	log('info',

		`
		http connection
		url: `+path+`
		ip: `+ip+`
		time: `+new Date()+`
		host: `+req.headers.host+`
		lang: `+req.acceptsLanguages()+`
		token: `+req.session.token+`
		`+session_state+`

		`

	);

	let lang = ''+req.acceptsLanguages();
	let id = 1;
	lang = lang.split('-')[0];
	if(!(lang=='es')){

		lang = 'en';
		id = 0;

	}

	if(header){
		res.writeHead(200, {

			'Content-Type': 'text/html; charset=utf-8',
			'Content-Language': (''+lang)

		});
	}

	// res.setHeader('Content-Type', 'application/json');

	return {lang: lang, id: id};

}





// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
