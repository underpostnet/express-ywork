



//------------------------------------------------------------------------------
// C Y B E R I A o n l i n e
//------------------------------------------------------------------------------


let fs = require('fs');
var data = JSON.parse(fs.readFileSync('C:/dd/global_data/json/cyberia/cyberia.json', 'utf8'));
var microdata = JSON.parse(fs.readFileSync(data.dataPath+'microdata.json', 'utf8'));
eval(fs.readFileSync(data.underpostPath+'util.js', 'utf8'));
var dev = false;
var ws_host = 'wss://'+data.url.split('//')[1]+'/cyon';
if(dev){
  data.url = 'localhost';
  ws_host = 'ws://'+data.url+':'+data.ws_port;
  data.url = 'http://'+data.url+':'+data.http_port;
}
var serverToken = getHash();
var usersToken = [];
var logUsersToken = [];
var serverMod = (name) =>{return fs.readFileSync(data.serverPath+name, 'utf8')};

eval(serverMod('console.js'));
eval(serverMod('crypto.js'));
eval(serverMod('node.js'));
eval(serverMod('session/sessionOff.js'));
eval(serverMod('session/sessionOn.js'));
eval(serverMod('session/session.js'));
eval(serverMod('mailer.js'));
eval(serverMod('redirect.js'));
eval(serverMod('modJsCssController.js'));
eval(serverMod('path.js'));
eval(serverMod('seo.js'));
eval(serverMod('postgresql.js'));
eval(serverMod('wsnode.js'));
eval(serverMod('stream.js'));
eval(serverMod('progress/controller.js'));
eval(serverMod('progress/updates/koyn.js'));
eval(serverMod('progress/updates/life.js'));
eval(serverMod('koyn.js'));


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// truncateDB();
// update_CHANGE_KOYN(0, 2)

// showDB();

// k.info();

// var_dump(data);

/*

get_USER('fcoverdugoa@gmail.com', '123123', function(response){

  console.log('get_USER ->');
  console.log(response);

});

console.log('insert_USERS ->');
insert_USERS(342, {
  name: 'Francisco',
  pass:'123123',
  email: 'fcoverdugoa@gmail.com'
}, function(id_register, success){

  console.log('result ->');
  console.log(success);

});

console.log('insert_USERS ->');
insert_USERS(342, {
  name: data.bot_server.name,
  pass: data.bot_server.pass,
  email: data.bot_server.email
}, function(id_register, success){

  console.log('result ->');
  console.log(success);

});


*/

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


server.listen(data.http_port);

log('info', 'set verver token -> '+serverToken);

log('warn','HTTP SERVER ONLINE -> PORT:'+data.http_port);
log('warn','WS SERVER ONLINE -> PORT:'+data.ws_port);
log('warn','PEER SERVER ONLINE -> PORT:'+data.peer_port);
log('warn','WS KOYN SERVER ONLINE -> PORT:'+data.ws_koyn_port);



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
