
//------------------------------------------------------------------------------
//
//      Ywork NodeJS Express Server
//
//      Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//      https://github.com/underpostnet/express-ywork
//
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
var loadServerMod = (name) =>{return fs.readFileSync(data.serverPath+name, 'utf8')};
var ServerMods = JSON.parse(fs.readFileSync(data.dataPath+'serverMods.json', 'utf8'));
for(let mod of ServerMods){
  console.log('Load server module -> '+mod);
  eval(loadServerMod(mod));
}
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
