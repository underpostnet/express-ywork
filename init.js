



//------------------------------------------------------------------------------
// C Y B E R I A o n l i n e
//------------------------------------------------------------------------------


let fs = require('fs');
var data = JSON.parse(fs.readFileSync('C:/dd/global_data/json/cyberia/cyberia.json', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/console.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/cyberia/microdata.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/client/util.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/crypto.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/node.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/session/sessionOff.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/session/sessionOn.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/session/session.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/mailer.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/redirect.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/modJsCssController.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/path.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/seo.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/postgresql.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/wsnode.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/stream.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/progress/controller.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/progress/updates/koyn.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/progress/updates/life.js', 'utf8'));
eval(fs.readFileSync('C:/dd/deploy_area/node/ywork/koyn.js', 'utf8'));


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

log('warn','HTTP SERVER ONLINE -> PORT:'+data.http_port);
log('warn','WS SERVER ONLINE -> PORT:'+data.ws_port);
log('warn','PEER SERVER ONLINE -> PORT:'+data.peer_port);
log('warn','WS KOYN SERVER ONLINE -> PORT:'+data.ws_koyn_port);



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
