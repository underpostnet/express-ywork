function wsTest(ws){

	if(ws.readyState==0){
		//WebSocket.CONNECTING
		console.log('ws server connecting -> state:0');
		return 0;

	}

	if(ws.readyState==1){
		//WebSocket.OPEN
		console.log('ws server on -> state:1');
		return 1;

	}

	if(ws.readyState==2){
		//WebSocket.CLOSING
		console.log('ws server closing -> state:2');
		return 2;

	}

	if(ws.readyState==3){
		//WebSocket.CLOSED
		console.log('ws server closed -> state:3');
		return 3;

	}

}

function onLogWs(ws, time){

	wsTest(ws);

	setInterval(function(){

		wsTest(ws);

	}, time);

}
