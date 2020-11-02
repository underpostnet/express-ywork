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

	function testMail(email){

	  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

	}

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

	function showDB(){

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

	function truncateDB(){

		db.one('TRUNCATE TABLE users RESTART IDENTITY')
		.then(data => {
		})
		.catch(error => {
		});

	};

	function getDB(table, end){

		db.map(('SELECT * FROM '+table), [], row => row)
		.then(data => {

			for(let i=0;  i<l(data); i++){

				data[i].username = decr((''+data[i].username).trim());
				data[i].email = decr((''+data[i].email).trim());
				data[i].pass = decr((''+data[i].pass).trim());

			}

			end(data);

		})
		.catch(error => {

			var_dump(error);

		});

	}

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

	//truncateDB();
  showDB();

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

			if(l(req.body.value)<5){

				res_obj.adv = ['minimum 5 characters', 'minimo 5 caracteres'];
				res.send(JSON.stringify(res_obj));
				res.end();

			}else{

				getDB('users', function(data){

					for(let i=0;i<l(data);i++){

						if(data[i].username==req.body.value){

							res_obj.adv = ['username already exist', 'usuario existente'];
							res.send(JSON.stringify(res_obj));
							res.end();

						}

					}

				});

			}

		}

		//-----------------------------
		//-----------------------------

		if(req.body.name=='email'){

			if(!testMail(req.body.value)){

				res_obj.adv = ['invalid email', 'email invalido'];
				res.send(JSON.stringify(res_obj));
				res.end();

			}else{

				getDB('users', function(data){

					for(let i=0;i<l(data);i++){

						if(data[i].email==req.body.value){

							res_obj.adv = ['email already exist', 'email existente'];
							res.send(JSON.stringify(res_obj));
							res.end();

						}

					}

				});

			}

		}

		//-----------------------------
		//-----------------------------

	});


};
