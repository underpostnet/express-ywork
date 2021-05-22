


	var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: data.ws_port}),
	CLIENTS=[], USERDATA=[];

	var update_coin_atk_bot_user = 0;
	var update_coin_atk_bot = 0;
	var update_coin_atk_user = 0;

	wss.on('connection', function(ws) {

		CLIENTS.push(ws);

		ws.on('message', function(message) {

			let send_all = false;

			if(isJSON(message)){

				send_all = true;
				not_auto_send = null;

				var obj = JSON.parse(message);


				for (var i=0; i<CLIENTS.length; i++) {

					if(CLIENTS[i]==ws){

						USERDATA[i]=obj;

						if((!obj.bots.activeServer)&&(obj.state!='checkinput')){

							not_auto_send = i;

							/* checkinput es una accion que solo debe hacer el frontend
							y esta redundante nunca el cliente devuelve el estado al servidor ws */

							/* si soy el activeServer debido a que tengo multiples hash debo ser capas de recibir
							varios a un mismo token websocket */

							/* la mayoria de las veces el user no se reenvia msg websocket excepto estas */

						}

						if(obj.state=='sv_id'){

							send_all = false;
							USERDATA[i].sv_id = i;
							ws.send(JSON.stringify(USERDATA[i]));

						}

						//------------------------------------------------------------------
						// Individual Request Response
						//------------------------------------------------------------------

						if(obj.state=='checkinput/username'){

							send_all = false;

							let res_obj = {
								input_name: 'username',
								adv: ''
							};

							getDB('users', USERDATA[i].users.var[0].hash, function(data, hash){

								for(let ii=0;ii<l(data);ii++){

									if(data[ii].username==obj.validator){

										for(let iii=0;iii<l(USERDATA);iii++){

											if(USERDATA[iii]!=null){

												if(USERDATA[iii].users.var[0].hash==hash){

													res_obj.adv = ['username already exist', 'usuario existente'];
													USERDATA[iii].state = 'checkinput';
													USERDATA[iii].validator = res_obj;
													CLIENTS[iii].send(JSON.stringify(USERDATA[iii]));

												}

											}

										}

									}

								}

							});

						}

						//-----------------------------------------------------------------
						//-----------------------------------------------------------------

						if(obj.state=='checkinput/email'){

							send_all = false;

							let res_obj = {
								input_name: 'email',
								adv: ''
							};

							getDB('users', USERDATA[i].users.var[0].hash, function(data, hash){

								for(let ii=0;ii<l(data);ii++){

									if(data[ii].email==tl(obj.validator)){

										for(let iii=0;iii<l(USERDATA);iii++){

											if(USERDATA[iii]!=null){

												if(USERDATA[iii].users.var[0].hash==hash){

													res_obj.adv = ['email already exist', 'email existente'];
													USERDATA[iii].state = 'checkinput';
													USERDATA[iii].validator = res_obj;
													CLIENTS[iii].send(JSON.stringify(USERDATA[iii]));

												}

											}

										}

									}

								}

							});

						}

						//-----------------------------------------------------------------
						//-----------------------------------------------------------------

						if(obj.state=='checkinput/global'){

							send_all = false;

							console.log('register -> ');
							var_dump(obj.validator);

							let name_test = obj.validator[0][1];
							let email_test = tl(obj.validator[1][1]);
							let success_register = true;
							const id_register = i;

							//----------------------------------------------------------------
							//----------------------------------------------------------------

							getDB('users', USERDATA[i].users.var[0].hash, function(data, hash){

								for(let ii=0;ii<l(data);ii++){

									if(data[ii].username==name_test){

										console.log('username exist failed -> '+name_test);
										success_register = false;

										let res_obj = {
											input_name: 'username',
											adv: ''
										};
										res_obj.adv = ['username already exist', 'usuario existente'];
										USERDATA[id_register].state = 'checkinput';
										USERDATA[id_register].validator = res_obj;
										CLIENTS[id_register].send(JSON.stringify(USERDATA[id_register]));

									}

									if(data[ii].email==email_test){

										console.log('email exist failed -> '+email_test);
										success_register = false;

										let res_obj = {
											input_name: 'email',
											adv: ''
										};
										res_obj.adv = ['email already exist', 'email existente'];
										USERDATA[id_register].state = 'checkinput';
										USERDATA[id_register].validator = res_obj;
										CLIENTS[id_register].send(JSON.stringify(USERDATA[id_register]));

									}

								}

								//----------------------------------------------------------------
								//----------------------------------------------------------------

								if(success_register){

									insert_USERS(id_register, {

										name: obj.validator[0][1],
										email: tl(obj.validator[1][1]),
										pass: obj.validator[2][1]

									}, function(id_register, result){

										// showDB();

										let res_obj = {
											success: result,
											username: obj.validator[0][1],
											email: obj.validator[1][1],
											pass: obj.validator[2][1],
											adv: ['', '']
										};

										// set session y frontend solo reload ->
										USERDATA[id_register].state = 'register';
										USERDATA[id_register].validator = res_obj;
										CLIENTS[id_register].send(JSON.stringify(USERDATA[id_register]));

									});

								}

								//----------------------------------------------------------------
								//----------------------------------------------------------------

							});

							//----------------------------------------------------------------
							//----------------------------------------------------------------

						}

						//-----------------------------------------------------------------
						// Progress Events
						//-----------------------------------------------------------------

						// LOS EVENTOS DE KOYN SOLO SE EJECUTAN
						// SI EXISTE KOYN > 0 POR TRANSFERIR

						if(obj.state=='update-coin-atk-bot-user'){
							// var_dump(obj);
							update_coin_atk_bot_user++;
							console.log('Progress Events  | kill '+update_coin_atk_bot_user+' | bot -> user');
						}

						if(obj.state=='update-coin-atk-bot'){
							// var_dump(obj);
							update_coin_atk_bot++;
							console.log('Progress Events  | kill '+update_coin_atk_bot+' | user -> bot ');
						}

						if(obj.state=='update-coin-atk-user'){
							// var_dump(obj);
							update_coin_atk_user++;
							console.log('Progress Events  | kill '+update_coin_atk_user+' | user -> user ');
						}


						//-----------------------------------------------------------------
						//-----------------------------------------------------------------

					}

				}

				if(send_all){sendAll(message, not_auto_send);}

			}

		});

		ws.on('close', function close() {

			for (var i=0; i<CLIENTS.length; i++) {

				if(CLIENTS[i]==ws){

					if(USERDATA[i]!=null){

						/* condicional para evitar colgar el sistema por conexiones ws externas sin user data */

						USERDATA[i].state = 'del';
						sendAll(JSON.stringify(USERDATA[i]), null);
						// CLIENTS.splice(i, 1);
						// USERDATA.splice(i, 1);
						USERDATA[i] = null;
						CLIENTS[i] = null;

					}

				}

			}

		});

	});

	function sendAll (message, not_auto_send) {
		for (var i=0; i<CLIENTS.length; i++) {

			if((USERDATA[i]!=null) && (i!=not_auto_send)){

				CLIENTS[i].send(message);

			}

		}
	}
