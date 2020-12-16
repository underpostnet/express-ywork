
	showDB();

	/*insertDB({
		name: 'NAME_TEST',
		pass: '123123',
		email: 'test2@gmail.com'
	})*/

	//-----------------------------------------------
	//-----------------------------------------------

	var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: data.ws_port}),
	CLIENTS=[], USERDATA=[];

	wss.on('connection', function(ws) {

		CLIENTS.push(ws);

		ws.on('message', function(message) {

			let send_all = false;

			if(isJSON(message)){

				send_all = true;

				var obj = JSON.parse(message);


				for (var i=0; i<CLIENTS.length; i++) {

					if(CLIENTS[i]==ws){

						USERDATA[i]=obj;

						//------------------------------------------------------------------
						// Individual Request Response
						//------------------------------------------------------------------

						if(obj.state=='checkinput/username'){

							send_all = false;

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

								getDB('users', USERDATA[i].users.var[0].hash, function(data, hash){

									for(let ii=0;ii<l(data);ii++){

										if(data[ii].username==obj.validator){

											for(let iii=0;iii<l(USERDATA);iii++){

												if(USERDATA[iii].users.var[0].hash==hash){

													res_obj.adv = ['username already exist', 'usuario existente'];
													USERDATA[iii].state = 'checkinput';
													USERDATA[iii].validator = res_obj;
													CLIENTS[iii].send(JSON.stringify(USERDATA[iii]));

												}

											}

										}

									}

								});

							}

						}

						//-----------------------------------------------------------------
						//-----------------------------------------------------------------









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
