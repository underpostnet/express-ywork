


	var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: data.ws_port}),
	CLIENTS=[], USERDATA=[];

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

						}

						//-----------------------------------------------------------------
						//-----------------------------------------------------------------









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
