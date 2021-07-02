

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

app.get('/koyn',  auth, (req, res) => {
  log('info', 'GET -> /koyn');
  logApiHeader(req, res, '/koyn', false);
  getKoynDB((dataKoyn)=>{
    res.setHeader('Content-Type', 'application/json');
    res.end(signData(dataKoyn));
  });
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// https://github.com/websockets/ws

var wssKoyn = new WebSocket.Server({port: data.ws_koyn_port});
var KOYNCLIENTS = [];

wssKoyn.on('connection', function(ws) {

  KOYNCLIENTS.push(ws);

  console.log('ws koyn connection ->');
  //console.log(ws);

  ws.on('message', function(message) {

      console.log('ws koyn server receiving ->');
      ws.send('response ws ->');

  });

  ws.on('close', function close() {
    for (var i=0; i<KOYNCLIENTS.length; i++) {
      if(KOYNCLIENTS[i]==ws){

      }
    }
  });

});

function sendAllWsKoyn (message) {
  for (var i=0; i<KOYNCLIENTS.length; i++) {
      KOYNCLIENTS[i].send(message);
  }
}

setTimeout(()=>{

  console.log('ws client koyn test ->');

  const wsKoynClient = new WebSocket(('ws://localhost:'+data.ws_koyn_port));


    wsKoynClient.on('open', function open() {
      wsKoynClient.send('client send something ->');
    });

    wsKoynClient.on('message', function incoming(data) {
      console.log('client receiving data ->');
      console.log(data);

      //KOYNCLIENTS[0].send('post msg send server end');

    });

}, 2000);







//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
