



//------------------------------------------------------------------------------
// C Y B E R I A o n l i n e
//------------------------------------------------------------------------------

let fs = require('fs');
var data = JSON.parse(fs.readFileSync('C:/dd/global_data/json/cyberia/cyberia.json', 'utf8'));
var microdata = JSON.parse(fs.readFileSync(data.dataPath+'microdata.json', 'utf8'));
eval(fs.readFileSync(data.underpostPath+'util.js', 'utf8'));
var dev = process.argv.slice(2)[0]=='d' ? true: false;
var ws_host = 'wss://'+data.url.split('//')[1]+'/'+data.ws_host_path;
if(dev){
  data.url = data.http_host_dev;
  ws_host = 'ws://'+data.url+':'+data.ws_port;
  data.url = 'http://'+data.url+':'+data.http_port;
}
var serverToken = getHash();
var usersToken = [];
var logUsersToken = [];
var yWork = (name) =>{return fs.readFileSync(data.serverPath+name, 'utf8')};

eval(yWork('console.js'));
eval(yWork('crypto.js'));
eval(yWork('node.js'));
eval(yWork('session/sessionOff.js'));
eval(yWork('session/sessionOn.js'));
eval(yWork('session/session.js'));
eval(yWork('mailer.js'));
eval(yWork('redirect.js'));
eval(yWork('modJsCssController.js'));
eval(yWork('path.js'));
eval(yWork('seo.js'));
eval(yWork('postgresql.js'));
eval(yWork('wsnode.js'));
eval(yWork('stream.js'));
eval(yWork('progress/controller.js'));
eval(yWork('progress/updates/koyn.js'));
eval(yWork('progress/updates/life.js'));
eval(yWork('koyn.js'));


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
console.log('argv', process.argv);
log('progress', 'yWork v1.5');
log('info', 'set server token -> '+serverToken);
let mode = dev ? 'DEV MODE' : 'PROD MODE';
log('warn','HTTP '+mode+' SERVER ONLINE -> PORT:'+data.http_port);
log('warn','WS '+mode+' SERVER ONLINE -> PORT:'+data.ws_port);
log('warn','PEER '+mode+' SERVER ONLINE -> PORT:'+data.peer_port);
log('warn','WS KOYN SERVER '+mode+' ONLINE -> PORT:'+data.ws_koyn_port);



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
