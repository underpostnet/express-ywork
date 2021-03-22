/*

npm install express

npm install nodemon

npm install path

npm install ws

npm install pg-promise

npm install var_dump

npm install crypto-js

*/

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

			return path.join(data.path_file, '');

		}

		return path.join(data.path_file, dir);

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

let CryptoJS = require("crypto-js");

class NodeCrypto {

	constructor(key) {
		this.key = key;
	}

	encr(content){
		return CryptoJS.AES.encrypt(content, this.key).toString();
	}

	decr(content){
		let bytes  = CryptoJS.AES.decrypt(content, this.key);
		return  bytes.toString(CryptoJS.enc.Utf8);
	}

}

var k = new NodeCrypto(data.db.key);

//--------------------------------------------
//--------------------------------------------


function logHeader(req, res, data){

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	let session_state = 'session: off';
	if(req.session.name && req.session.email){

		session_state = `session: on
		name: `+req.session.name+`
		email: `+req.session.email+`
		id_users: `+req.session.id_users;

	}

	console.log(

		`
		http connection
		url: `+data.url+`
		ip: `+ip+`
		time: `+new Date()+`
		host: `+req.headers.host+`
		lang: `+req.acceptsLanguages()+`
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

	res.writeHead(200, {

		'Content-Type': 'text/html; charset=utf-8',
		'Content-Language': (''+lang)

	});

	return {lang: lang, id: id};

}
