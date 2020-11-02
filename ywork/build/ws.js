module.exports = function(app, dir, port){

	let fs = require('fs');
	eval(fs.readFileSync(dir.get('/../ywork/lib/ywork.js'), 'utf8'));

	var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: port}),
	CLIENTS=[], USERDATA=[];

	wss.on('connection', function(ws) {

		CLIENTS.push(ws);

		ws.on('message', function(message) {

			if(isJSON(message)){

				var obj = JSON.parse(message);

				for (var i=0; i<CLIENTS.length; i++) {

					if(CLIENTS[i]==ws){

						USERDATA[i]=obj;

					}

				}

				sendAll(message);

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
