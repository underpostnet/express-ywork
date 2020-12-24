

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('join-room', (roomid, peerid, type) => {
        socket.join(roomid);
        socket.to(roomid).broadcast.emit(type === 1 ? "sender-connected" : "receiver-connected", peerid);

        socket.on('disconnect', () => {
            socket.to(roomid).broadcast.emit(type === 1 ? "sender-disconnected" : "receiver-disconnected", peerid);
        });
    });
});

app.get(('/peer.js'), function(req, res){

	res.sendFile(dir.get('../ywork/peer.js'));

})

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


app.get(('/0.mp3'), function(req, res){

	res.sendFile('C:/xampp/htdocs/cloud/radio/music/synthwave/turbo_knight_spacecowboy.mp3');

})

app.get(('/1.mp3'), function(req, res){

	res.sendFile('C:/xampp/htdocs/cloud/radio/underpost_seth.mp3');

})

app.get(('/2.mp3'), function(req, res){

	res.sendFile('C:/xampp/htdocs/cloud/radio/music/synthwave/maverick_hunter_paradelous.mp3');

})

app.get(('/3.mp3'), function(req, res){

	res.sendFile('C:/xampp/htdocs/cloud/radio/underpost_dillon.mp3');

})


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const { PeerServer } = require('peer');

const peerServer = PeerServer({
  port: data.peer_port,
  ssl: {
    key: fs.readFileSync('c:/dd/virtual_machine/SSL/cyberiaonline/ssl/key.key'),
    cert: fs.readFileSync('c:/dd/virtual_machine/SSL/cyberiaonline/ssl/crt.crt')
  }
});
