



//------------------------------------------------------------------------------
// C Y B E R I A o n l i n e
//------------------------------------------------------------------------------


let fs = require('fs');
var data = JSON.parse(fs.readFileSync('C:/dd/global_data/json/cyberia/cyberia.json', 'utf8'));
var microdata = JSON.parse(fs.readFileSync(data.dataPath+'microdata.json', 'utf8'));
eval(fs.readFileSync(data.underpostPath+'util.js', 'utf8'));
var serverToken = getHash();

eval(fs.readFileSync(data.serverPath+'console.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'crypto.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'node.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'session/sessionOff.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'session/sessionOn.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'session/session.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'mailer.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'redirect.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'modJsCssController.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'path.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'seo.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'postgresql.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'wsnode.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'stream.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'progress/controller.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'progress/updates/koyn.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'progress/updates/life.js', 'utf8'));
eval(fs.readFileSync(data.serverPath+'koyn.js', 'utf8'));


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
