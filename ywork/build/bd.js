module.exports = function(app, data, dir){

	//------------------------------------
	//------------------------------------

	let pgp = require("pg-promise")(/*options*/);
	let connect = "postgres://"+data.db.username+":"+data.db.password+"@"+data.db.host+":"+data.db.port+"/"+data.db.database+"";
	let db = pgp(connect);

	//------------------------------------
	//------------------------------------

	let bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());

	//------------------------------------
	//------------------------------------

	let var_dump = require('var_dump');

	//------------------------------------
	//------------------------------------

	function l(size){return size.length;};

	//------------------------------------
	//------------------------------------

	let CryptoJS = require("crypto-js");
	let key = data.db.key;

	function encr(content){
		return CryptoJS.AES.encrypt(content, key).toString();
	}

	function decr(content){
		let bytes  = CryptoJS.AES.decrypt(content, key);
		return  bytes.toString(CryptoJS.enc.Utf8);
	}

	//------------------------------------
	//------------------------------------

	function viewall(){

		db.map('SELECT * FROM users', [], row => row)
		.then(data => {
			// data = array of active user id-s

			console.log('\nPOSTGRES DB - USERS TABLE');
			for(let i=0;  i<l(data); i++){

				data[i].username = decr((''+data[i].username).trim());
				data[i].email = decr((''+data[i].email).trim());
				data[i].pass = (''+data[i].pass).trim();

			}

			var_dump(data);

		})
		.catch(error => {
			// error
			var_dump(error);
		});

	};

	function truncatedb(){

		db.one('TRUNCATE TABLE users RESTART IDENTITY')
		.then(data => {
		})
		.catch(error => {
		});

	};

	//------------------------------------
	/*/------------------------------------

	db.one('INSERT INTO users(id_users, username, pass, email) VALUES(DEFAULT, $1, $2, $3) RETURNING id_users',

	[encr('name_test'), encr('pass_test'), encr('mail@test.com')])

	.then(data => {

		var_dump(data);

	})
	.catch(error => {

	});

  *///------------------------------------
	//------------------------------------

	//truncatedb();
	viewall();

	//------------------------------------
	//------------------------------------

	app.post(('/check_input'), function(req, res) {

		let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('/check_input -> http request\nip:'+ip);
		var_dump(req.body);
		let res_obj = {adv:''};

		//-----------------------------
		//-----------------------------

		if(req.body.name=='username'){

			res_obj.adv = 'usuario ya existente';

		}

		//-----------------------------
		//-----------------------------

		res.send(JSON.stringify(res_obj));
		res.end();

	});


};
