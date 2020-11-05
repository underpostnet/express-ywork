module.exports = function(app, dir, port, data){

	//-----------------------------------------------
	//-----------------------------------------------

	let fs = require('fs');
	let var_dump = require('var_dump');
	eval(fs.readFileSync(dir.get('/../ywork/lib/crypto.js'), 'utf8'));
	eval(fs.readFileSync(dir.get('/../ywork/lib/ywork.js'), 'utf8'));
	eval(fs.readFileSync(dir.get('/../ywork/lib/postgresql.js'), 'utf8'));

	showDB();

	//-----------------------------------------------
	//-----------------------------------------------

	var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: port}),
	CLIENTS=[], USERDATA=[];

	wss.on('connection', function(ws) {

		CLIENTS.push(ws);

		ws.on('message', function(message) {

			if(isJSON(message)){

				var obj = JSON.parse(message);
				let send_all = true;

				for (var i=0; i<CLIENTS.length; i++) {

					if(CLIENTS[i]==ws){

						USERDATA[i]=obj;

						//------------------------------------------------------------------
						// Individual Request Response
						//------------------------------------------------------------------

						if(obj.state=='checkinput/username'){

							send_all = false;

							//console.log(obj.validator);

							//------------------------------
							// Check Input Request
							//------------------------------

							let res_obj = {
								input_name: 'username',
								adv: ''
							};

							if(l(obj.validator)<5){

								res_obj.adv = ['minimum 5 characters', 'minimo 5 caracteres'];
								USERDATA[i].state = 'checkinput';
								USERDATA[i].validator = res_obj;
								CLIENTS[i].send(JSON.stringify(USERDATA[i]));

							}else{
								
								getDB('users', i, function(data, id){

									for(let ii=0;ii<l(data);ii++){

										if(data[ii].username==obj.validator){

											res_obj.adv = ['username already exist', 'usuario existente'];
											USERDATA[id].state = 'checkinput';
											USERDATA[id].validator = res_obj;
											CLIENTS[id].send(JSON.stringify(USERDATA[id]));

										}

									}

								});

							}

							//------------------------------
							// . . .
							//------------------------------

						}

						//-----------------------------------------------------------------
						//-----------------------------------------------------------------

					}

				}

				if(send_all){sendAll(message);}

			}

		});

		ws.on('close', function close() {

			for (var i=0; i<CLIENTS.length; i++) {

				if(CLIENTS[i]==ws){

					if(USERDATA[i]!=null){

						USERDATA[i].state = 'del';
						sendAll(JSON.stringify(USERDATA[i]));
						CLIENTS.splice(i, 1);
						USERDATA.splice(i, 1);

					}

				}

			}

		});

	});

	function sendAll (message) {
		for (var i=0; i<CLIENTS.length; i++) {
			CLIENTS[i].send(message);
		}
	}

	console.log('WS SERVER ONLINE -> PORT:'+port);

};
