


	var WebSocket = require('ws');

	var wss = new WebSocket.Server({port: data.ws_port});
	var CLIENTS=[];
	var USERDATA=[];

	var update_coin_atk_bot_user = 0;
	var update_coin_atk_bot = 0;
	var update_coin_atk_user = 0;
	var latency_cont_test = 0;

	wss.on('connection', function(ws) {

		CLIENTS.push(ws);

		ws.on('message', function(message) {

			let send_all = false;

			if(isJSON(message)){

				try {

				send_all = true;
				not_auto_send = null;

				var obj = JSON.parse(message);


				for (var i=0; i<CLIENTS.length; i++) {

					if(CLIENTS[i]==ws){



						// meta info ws obj ------------------------------------------------
						USERDATA[i]=obj;
						let name_ = obj.users.var[0].name==null ? obj.token : (obj.users.var[0].name+'<'+obj.users.var[0].email+'>');
						let date_ = new Date().toISOString();
						// end -------------------------------------------------------------



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
							ws_search_USERNAME(obj.validator, USERDATA[i], CLIENTS[i], function(result){
								if(result.success){
									//console.log(result.wsData);
									res_obj.adv = ['username already exist', 'usuario existente'];
									result.wsData.state = 'checkinput';
									result.wsData.validator = res_obj;
									result.wsClient.send(JSON.stringify(result.wsData));
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
							ws_search_EMAIL(obj.validator, USERDATA[i], CLIENTS[i], function(result){
								if(result.success){
									//console.log(result.wsData);
									res_obj.adv = ['email already exist', 'email existente'];
									result.wsData.state = 'checkinput';
									result.wsData.validator = res_obj;
									result.wsClient.send(JSON.stringify(result.wsData));
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
						// KOYN
						//-----------------------------------------------------------------

						// LOS EVENTOS DE KOYN SOLO SE EJECUTAN
						// SI EXISTE KOYN > 0 POR TRANSFERIR

						/*

						var update_coin_atk_bot_user = 0;
						var update_coin_atk_bot = 0;
						var update_coin_atk_user = 0;

						contadores definidos antes

						*/

						if(obj.state=='update-coin-atk-bot-user'){
							// var_dump(obj);
							update_coin_atk_bot_user++;
							log('progress', 'Progress Events  '+date_+' | kill Drop koyn | cont:'+update_coin_atk_bot_user+' | bot -> user');
						}

						if(obj.state=='update-coin-atk-bot'){
							// var_dump(obj);
							update_coin_atk_bot++;
							log('progress', 'Progress Events  '+date_+' | kill Drop Koyn | cont:'+update_coin_atk_bot+' | user -> bot ');
						}

						if(obj.state=='update-coin-atk-user'){
							// var_dump(obj);
							update_coin_atk_user++;
							log('progress', 'Progress Events  '+date_+' | kill Drop koyn | cont:'+update_coin_atk_user+' | user -> user ');
						}

						//-----------------------------------------------------------------
						// INFO SERVER
						//-----------------------------------------------------------------

						if(obj.state=='info-server-life'){
							send_all = false;
							log('progress', 'Progress Events '+date_+' | Life Change | name:'+name_+' life:'+obj.validator.life);
						}

						//-----------------------------------------------------------------
						// CHAT
						//-----------------------------------------------------------------

						if(obj.state=='msg'){
							log('chat', 'Chat Events | '+date_+' '+name_+': '+obj.chat.msg.msg_chat);
						}

						//-----------------------------------------------------------------
						// CORS
						//-----------------------------------------------------------------

						if( (obj.users.var[0].status=='bot') && (obj.token!=serverToken) ){
							// en este caso no != 'del' ya que lo envia el user server
							log('error', 'token ws corrupt -> '+obj.token);
							send_all = false;
							wsBan(ws, i);
						}

						if( (obj.users.var[0].status!='bot') && (obj.state!='del') && (!validateToken(obj.token)) ){
							log('error', 'token ws corrupt -> '+obj.token);
							send_all = false;
							wsBan(ws, i);
						}

						//-----------------------------------------------------------------
						// SERVER LATENCY PING TEST
						//-----------------------------------------------------------------

						if( (obj.state=='server-latency-ping-req') && (obj.users.var[0].status=='botServer') ) {

							log('warn', 'server latency test ping req cont:'+latency_cont_test);
							/* sacar los null de obj.validator,
							son espacios null por desconectados */
							let validator_no_null = [];
							for(let nonull of obj.validator.hash_test){
								if(nonull!=null){
									validator_no_null.push(nonull);
								}
							}
							console.log(validator_no_null);

							latency_cont_test++;
							send_all = false;

							for(let hash_ of obj.validator.hash_test){
								if(hash_!=null){
									let ind_=0;
									for(let user_ of USERDATA){
										if(user_!=null){
											if(hash_==user_.users.var[0].hash){
												CLIENTS[ind_].send(JSONstr(obj));
											}
										}
										ind_++;
									}
								}
							}

						}

						//------------------------------------------------------------------

						if(obj.state=='server-latency-ping-resp'){

							console.log('server latency test ping resp hash:'+obj.users.var[0].hash);
							let ind_ = 0;
							for(let user_ of USERDATA){
								if(user_!=null){
									if(user_.users.var[0].status=='botServer'){
										CLIENTS[ind_].send(JSONstr(obj));
									}
								}
								ind_++;
							}
							send_all = false;

						}

						//-----------------------------------------------------------------
						// DEL
						//-----------------------------------------------------------------

						if(obj.state=='del'){
							console.log(' DEL WS ('+date_+') -> '+name_);
						}

						//-----------------------------------------------------------------
						//-----------------------------------------------------------------

					}

				}

				if(send_all){sendAll(message, not_auto_send);}

			} catch(err){

				log('error', 'wsnode error obj ->');
				console.log(message);
				log('error', 'wsnode error msg ->')
				console.log(err);

				}

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
