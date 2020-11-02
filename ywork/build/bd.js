module.exports = function(app, data, dir){

	let fs = require('fs');
	let var_dump = require('var_dump');
	eval(fs.readFileSync(dir.get('/../ywork/lib/crypto.js'), 'utf8'));
	eval(fs.readFileSync(dir.get('/../ywork/lib/ywork.js'), 'utf8'));
	eval(fs.readFileSync(dir.get('/../ywork/lib/postgresql.js'), 'utf8'));

	//------------------------------------
	//------------------------------------

	//truncateDB();
  showDB();
	//insertDB({name: 'name_test', pass: '123123', email: 'test@test.cl'});
	//getDB('users', function(data){var_dump(data)});

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
